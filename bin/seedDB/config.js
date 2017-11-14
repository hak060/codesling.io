import path from 'path';
import { exec } from 'child_process';

const dbConfigs = {
  seed: {
    user: () => exec(
      `mongoimport \
      --db ${process.env.MONGO_DB_NAME} \
      --collection users \
      --drop \
      --file ${path.resolve(__dirname, './usersSeedData.json')} \
      --jsonArray`, 
      (err, stdout, stderr) => {
        if (err) {
          console.log(`error seeding user data. error = ${err}`);
          process.exit(1);
        } else {
          console.log(`success seeding user data. success ${stdout ? '(stdout) ' + stdout : '(stderr) ' + stderr}`);
        };
      }
    ),
    room: () => exec(
      `mongoimport \
      --db ${process.env.MONGO_DB_NAME} \
      --collection rooms \
      --drop \
      --file ${path.resolve(__dirname, './roomsSeedData.json')} \
      --jsonArray`, 
      (err, stdout, stderr) => {
        if (err) {
          console.log(`error seeding room data. error = ${err}`);
          process.exit(1);
        } else {
          console.log(`success seeding room data. success ${stdout ? '(stdout) ' + stdout : '(stderr) ' + stderr}`);
        };
      }
    )
  },
  wipe: {
    data: () => exec(
      `mongo \
      ${process.env.MONGO_DB_NAME} \
      --eval "db.dropDatabase()"`, 
      (err, stdout, stderr) => {
        if (err) {
          console.log(`error wiping database. error = ${err}`);
          process.exit(1);
        } else {
          console.log(`success wiping database. success ${stdout ? '(stdout) ' + stdout : '(stderr) ' + stderr}`);
        };
      }
    )
  }
};

export default dbConfigs;
