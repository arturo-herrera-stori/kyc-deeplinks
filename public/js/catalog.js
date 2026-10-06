const deepFreeze = (value) => {
  Object.values(value).forEach((child) => {
    if (child && typeof child === 'object') deepFreeze(child);
  });
  return Object.freeze(value);
};

export const SCHEME = 'stori://kyc';

export const ENVIRONMENTS = deepFreeze([
  { id: 'DEV', label: 'DEV' },
  { id: 'QA', label: 'QA' },
]);

export const LEVELS = deepFreeze(['L1', 'L2']);

// `level` is the one preselected when the flow is chosen; `group` drives the color.
export const FLOWS = deepFreeze([
  { value: 'CREDIT_L1_MX', label: 'CREDIT L1 MX', level: 'L1', group: 'credit' },
  { value: 'CREDIT_L2_MX', label: 'CREDIT L2 MX', level: 'L2', group: 'credit' },
  { value: 'CREDIT_L1_FOREIGNER', label: 'CREDIT L1 FOREIGNER', level: 'L1', group: 'credit' },
  { value: 'CREDIT_L1_MX_OCR', label: 'CREDIT L1 MX OCR', level: 'L1', group: 'credit' },
  { value: 'DEPOSITS_L2_MX', label: 'DEPOSITS L2 MX', level: 'L2', group: 'deposits' },
  { value: 'LUNA_L1_MX', label: 'LUNA L1 MX', level: 'L1', group: 'luna' },
]);

// Every destination needs an ID for each entry in ENVIRONMENTS.
export const DESTINATIONS = deepFreeze([
  {
    id: 't2p',
    label: 'T2P',
    ids: { DEV: 'fc2981118026611077', QA: 'fc2980055818713477' },
  },
  {
    id: 'luna-new-mp',
    label: 'LUNA - New MP',
    ids: { DEV: 'fc3220397196754053', QA: 'fc3221926378667141' },
  },
  {
    id: 'luna-old-mp',
    label: 'LUNA - Old MP',
    ids: { DEV: 'fc2717945212542021', QA: 'fc2777295705517381' },
  },
]);

// `params` order is the query-string order of the generated deeplink.
export const LINK_TYPES = deepFreeze([
  { id: 'flow', label: 'Flow', params: ['flow'] },
  {
    id: 'flow-destination-level',
    label: 'Flow + Destination + Level',
    params: ['flow', 'destination', 'level'],
  },
  { id: 'destination-level', label: 'Destination + Level', params: ['destination', 'level'] },
]);
