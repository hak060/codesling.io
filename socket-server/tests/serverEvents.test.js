import { each } from 'lodash';

import * as serverEvents from '../src/serverEvents';

describe('All server events should be functions', () => {
  test('all server events should be a function', () => {
    each(serverEvents, (serverEventHandler) => {
      expect(typeof serverEventHandler).toMatchSnapshot();
    });
  });
});
