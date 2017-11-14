import _ from 'lodash';
import path from 'path';
import dotenv from 'dotenv';

import dbConfigs from './config';
import help from './help';

dotenv.config({ path: path.resolve(__dirname, '../../rest-server/.env') });

const command = process.argv[3];
const commandObj = dbConfigs[command];

if (!commandObj) {
  console.log(`${command} is not a valid command name to configure seed data.`);
  console.log(help);
  process.exit(1);
}

if (!process.env.MONGO_DB_NAME) {
  console.log(`env file does not exist. \n Please make sure env setup is complete.`);
  process.exit(1);
}

try {
  _.each(commandObj, (option) => {
    option();
  })
} catch (e) {
  console.log(`error fulfilling ${command} command.`);
  process.exit(1);
} 
