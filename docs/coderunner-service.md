# Codesling Coderunner Service Developer Documentation

**Note:** If you want to run all backend services along with the clientside development server, check out the main `README.md` [instructions](README.md#getting-started)

To begin developing on the Coderunner Service, run the following from the `coderunner-service` folder:

```bash
yarn
yarn start
```

# REST API

```plaintext
POST /submit-code
  request
    body = JSON {
      code: STRING (required)
    }
  response
    status = 200 | 400
    data = STRING (stdout)
```
