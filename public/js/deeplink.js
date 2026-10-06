import { DESTINATIONS, ENVIRONMENTS, FLOWS, LEVELS, LINK_TYPES, SCHEME } from './catalog.js';

const find = (list, predicate, what, value) => {
  const item = list.find(predicate);
  if (!item) throw new Error(`Unknown ${what}: ${value}`);
  return item;
};

const resolvers = {
  flow: ({ flow }) => find(FLOWS, (f) => f.value === flow, 'flow', flow).value,
  level: ({ level }) => find(LEVELS, (l) => l === level, 'level', level),
  destination: ({ destination, environment }) => {
    find(ENVIRONMENTS, (e) => e.id === environment, 'environment', environment);
    const dest = find(DESTINATIONS, (d) => d.id === destination, 'destination', destination);
    return dest.ids[environment];
  },
};

export function buildDeeplink(selection) {
  const type = find(LINK_TYPES, (t) => t.id === selection.type, 'link type', selection.type);
  const query = new URLSearchParams();
  type.params.forEach((param) => query.append(param, resolvers[param](selection)));
  return `${SCHEME}?${query}`;
}
