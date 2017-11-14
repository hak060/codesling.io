import axios from 'axios';
import http from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

import log from '../src/lib/log';
import { generateToken } from '../src/middleware/authentication';

dotenv.config();
dotenv.load();

const URL = `${process.env.HOST}:${process.env.PORT}`;

test('rest-server should respond with a 200 to {GET /api/new-sling}', async () => {
  let resp = {};
  const { accessToken } = generateToken({ username: 'test', id: 1 });
  try {
    resp = await axios.get(`${URL}/api/new-sling`, {
      adapter: http,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    log('Unexpected error for {GET /api/new-sling}. e = ', e);
  }
  expect(resp.status).toMatchSnapshot();
});
