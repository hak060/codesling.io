import { each } from 'lodash';

import clientEvents from '../src/clientEvents';

describe('All client event handlers should be functions', () => {
  test('all client events should be a function', () => {
    each(clientEvents, clientEventHandler => {
      expect(typeof clientEventHandler).toMatchSnapshot();
    });
  });
});
