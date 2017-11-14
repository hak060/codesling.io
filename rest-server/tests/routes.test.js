import axios from 'axios';

require('dotenv').config();
require('dotenv').load();

const URL = `${process.env.HOST}:${process.env.PORT}`;

test('rest-server should run and return a 404 to {GET /}', async () => {
  let resp = {};
  try {
    resp = await axios.get(URL + '/');
  } catch (e) {
    expect(e.response.status).toMatchSnapshot();
  }
  expect(resp).toMatchSnapshot();
});
