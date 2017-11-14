import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
dotenv.load();

const URL = `${process.env.HOST}:${process.env.PORT}`;

test('Should respond to a {POST /submit-code}', async (done) => {
  let resp = {};
  try {
    resp = await axios.post(`${URL}/submit-code`, {
      code: "// comment",
    });
  } catch (e) {
    console.log('Unexpected error in coderunner-service {POST /submit-code}. e = ', e);
  }
  expect(resp.status).toMatchSnapshot();
  done();
});

test('Should evaluate code correctly and send back stdout', async () => {
  // tuples of [expression, stdout] to test
  const fixtures = [
    "console.log(2)",
    "var x = 'hello world'; console.log(x);",
  ];
  const makeSingleRequest = async (expression) => {
    let resp = {};
    try {
      resp = await axios.post(`${URL}/submit-code`, {
        code: expression,
      });
    } catch (e) {
      console.log(`Unexpected error in coderunner-service {POST /submit-code}.
        expected expression = ${expression}
        resp.data = ${resp.data}
        e = ${e}`
      );
    }
    return resp.data;
  };
  const tests = await Promise.all(fixtures.map(makeSingleRequest));
  tests.forEach(result => expect(result).toMatchSnapshot());
});
