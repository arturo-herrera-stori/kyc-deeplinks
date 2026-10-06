import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DESTINATIONS, ENVIRONMENTS, FLOWS } from '../public/js/catalog.js';
import { buildDeeplink } from '../public/js/deeplink.js';

test('Flow type only sends flow', () => {
  assert.equal(
    buildDeeplink({ type: 'flow', environment: 'DEV', flow: 'CREDIT_L1_MX', destination: 't2p', level: 'L2' }),
    'stori://kyc?flow=CREDIT_L1_MX',
  );
});

test('Flow + Destination + Level type sends the three params in order', () => {
  assert.equal(
    buildDeeplink({
      type: 'flow-destination-level',
      environment: 'QA',
      flow: 'LUNA_L1_MX',
      destination: 'luna-new-mp',
      level: 'L1',
    }),
    'stori://kyc?flow=LUNA_L1_MX&destination=fc3221926378667141&level=L1',
  );
});

test('Destination + Level type omits flow', () => {
  assert.equal(
    buildDeeplink({
      type: 'destination-level',
      environment: 'DEV',
      flow: 'CREDIT_L1_MX',
      destination: 't2p',
      level: 'L2',
    }),
    'stori://kyc?destination=fc2981118026611077&level=L2',
  );
});

test('Environment switches only the destination ID', () => {
  const selection = { type: 'destination-level', destination: 'luna-old-mp', level: 'L1' };
  assert.equal(
    buildDeeplink({ ...selection, environment: 'DEV' }),
    'stori://kyc?destination=fc2717945212542021&level=L1',
  );
  assert.equal(
    buildDeeplink({ ...selection, environment: 'QA' }),
    'stori://kyc?destination=fc2777295705517381&level=L1',
  );
});

test('Catalog has the five flows with their preselected level', () => {
  assert.deepEqual(
    FLOWS.map(({ value, level }) => [value, level]),
    [
      ['CREDIT_L1_MX', 'L1'],
      ['CREDIT_L2_MX', 'L2'],
      ['CREDIT_L1_FOREIGNER', 'L1'],
      ['DEPOSITS_L2_MX', 'L2'],
      ['LUNA_L1_MX', 'L1'],
    ],
  );
});

test('Only DEV and QA exist and every destination has an ID for each', () => {
  assert.deepEqual(ENVIRONMENTS.map((e) => e.id), ['DEV', 'QA']);
  DESTINATIONS.forEach((d) => assert.deepEqual(Object.keys(d.ids).sort(), ['DEV', 'QA']));
});

test('Unknown values throw', () => {
  const base = { type: 'flow-destination-level', environment: 'DEV', flow: 'CREDIT_L1_MX', destination: 't2p', level: 'L1' };
  assert.throws(() => buildDeeplink({ ...base, type: 'nope' }), /link type/);
  assert.throws(() => buildDeeplink({ ...base, flow: 'NOPE' }), /flow/);
  assert.throws(() => buildDeeplink({ ...base, level: 'L3' }), /level/);
  assert.throws(() => buildDeeplink({ ...base, destination: 'nope' }), /destination/);
  assert.throws(() => buildDeeplink({ ...base, environment: 'PROD' }), /environment/);
});
