import { DESTINATIONS, ENVIRONMENTS, FLOWS, LEVELS, LINK_TYPES } from './catalog.js';
import { buildDeeplink } from './deeplink.js';

const STORAGE_KEY = 'kyc-deeplinks:environment';
const COPY_FEEDBACK_MS = 2000;

const OPTIONS = {
  environment: ENVIRONMENTS.map((e) => ({ value: e.id, label: e.label })),
  type: LINK_TYPES.map((t) => ({ value: t.id, label: t.label })),
  flow: FLOWS.map((f) => ({ value: f.value, label: f.label, group: f.group })),
  destination: DESTINATIONS.map((d) => ({ value: d.id, label: d.label, group: 'destination' })),
  level: LEVELS.map((l) => ({ value: l, label: l })),
};

const form = document.getElementById('builder');
const preview = document.getElementById('preview');
const openLink = document.getElementById('open');
const copyButton = document.getElementById('copy');
const copyStatus = document.getElementById('copy-status');
const qrContainer = document.getElementById('qr');

function loadEnvironment() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (ENVIRONMENTS.some((e) => e.id === saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
  }
  return ENVIRONMENTS[0].id;
}

function saveEnvironment(environment) {
  try {
    localStorage.setItem(STORAGE_KEY, environment);
  } catch {
    // Not persisting is acceptable; the page keeps working.
  }
}

const state = {
  environment: loadEnvironment(),
  type: LINK_TYPES[0].id,
  flow: FLOWS[0].value,
  destination: DESTINATIONS[0].id,
  level: FLOWS[0].level,
};

function renderOptions() {
  Object.entries(OPTIONS).forEach(([name, options]) => {
    const container = form.querySelector(`[data-options="${name}"]`);
    container.replaceChildren(
      ...options.map(({ value, label, group }) => {
        const option = document.createElement('label');
        option.className = 'option';
        if (group) option.dataset.group = group;

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = name;
        input.value = value;

        const text = document.createElement('span');
        text.textContent = label;

        option.append(input, text);
        return option;
      }),
    );
  });
}

function renderQr(link) {
  if (typeof window.qrcode !== 'function') {
    const notice = document.createElement('p');
    notice.className = 'qr-fallback';
    notice.textContent = 'No se pudo cargar el generador de QR. Usa "Copiar" o "Abrir en la app".';
    qrContainer.replaceChildren(notice);
    return;
  }
  const qr = window.qrcode(0, 'M');
  qr.addData(link);
  qr.make();
  qrContainer.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 4, scalable: true, title: link });
}

function render() {
  Object.keys(OPTIONS).forEach((name) => {
    const input = form.querySelector(`input[name="${name}"][value="${state[name]}"]`);
    if (input) input.checked = true;
  });

  const { params } = LINK_TYPES.find((t) => t.id === state.type);
  form.querySelectorAll('[data-param]').forEach((field) => {
    field.hidden = !params.includes(field.dataset.param);
  });

  const link = buildDeeplink(state);
  preview.textContent = link;
  openLink.href = link;
  renderQr(link);
}

function showCopyStatus(message, kind) {
  copyStatus.textContent = message;
  copyStatus.dataset.state = kind;
  clearTimeout(showCopyStatus.timer);
  showCopyStatus.timer = setTimeout(() => {
    copyStatus.textContent = '';
    delete copyStatus.dataset.state;
  }, COPY_FEEDBACK_MS);
}

function selectPreview() {
  const range = document.createRange();
  range.selectNodeContents(preview);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(preview.textContent);
    showCopyStatus('Copiado', 'ok');
  } catch {
    selectPreview();
    showCopyStatus('No se pudo copiar; el link quedó seleccionado para copiarlo a mano', 'error');
  }
}

form.addEventListener('change', (event) => {
  const { name, value } = event.target;
  if (!(name in state)) return;

  state[name] = value;
  if (name === 'environment') saveEnvironment(value);
  if (name === 'flow' && state.type === 'flow-destination-level') {
    state.level = FLOWS.find((f) => f.value === value).level;
  }
  render();
});

form.addEventListener('submit', (event) => event.preventDefault());
copyButton.addEventListener('click', copyLink);

renderOptions();
render();
