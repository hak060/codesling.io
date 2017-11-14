import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import config from '../../config/env';
import help from './help';
import createFile from './createFile';

const env = process.argv[3];
const envObject = config[env];

if (!envObject) {
  console.log(`${env} is not a valid environment name to setup.`);
  console.log(help);
  process.exit(1);
}

try {
  const subAppDirNames = Object.keys(envObject.directories);
  subAppDirNames.forEach((subAppDirName) => {
    // services belong in a sub-folder
    const isService = !!subAppDirName.match(/\-service/);
    const relativePath = `../../${isService ? 'services/' : ''}${subAppDirName}`;

    const folderPath = path.resolve(__dirname, relativePath);
    const envFile = createFile(env, subAppDirName);
    fs.writeFileSync(folderPath + '/.env', envFile);
  });
  console.log('successfully created .env files');
} catch (e) {
  console.log('error creating .env files. e = ', e);
  process.exit(1);
}
