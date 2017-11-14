import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import StdOut from './index';

test('displays text passed in', () => {
  const component = shallow(
    <StdOut
      text="Hello, world!"
    />
  );
  expect(toJSON(component)).toMatchSnapshot();
});
