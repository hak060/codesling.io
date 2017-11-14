import _ from 'lodash';

import config from '../../config/env';

/**
 *
 *  createFile
 *
 *  @param envName       {STRING}
 *  @param directoryName {STRING}
 *
 *  @returns STRING
 */
const createEnvFile = (envName, directoryName) => {
  let file = ``;
  const configObj = config[envName];
  if (!configObj) {
    throw Error(`${envName} is not a valid environment name found in config/env.js`);
  }

  const defaults = configObj.defaults;
  const variablePrefix = configObj.directories[directoryName]._envPrefix || '';
  const serversAndServices = _.pickBy(configObj.directories, (subAppSettings, subAppName) => {
    return !!subAppName.match(/\-server|-service/) && subAppName !== directoryName;
  });

  // write default values
  _.each(defaults, (value, key) => file += `${variablePrefix}${key}=${value}\n`);

  // write own app specifics
  _.each(configObj.directories[directoryName], (ownSettingValue, ownSettingKey) => {
    // as long as its not a special config setting (prefixed by a _ in the key name)
    if (ownSettingKey[0] !== '_') {
      file += `${ownSettingKey.toUpperCase()}=${ownSettingValue}\n`;
    }
  });

  // include other services' URLs
  _.each(serversAndServices, (subAppSettings, subAppName) => {
    const { host, port } = subAppSettings;
    subAppName = subAppName.replace('-', '_');
    file += `${variablePrefix}${subAppName.toUpperCase()}_URL=${host}:${port}\n`
  });

  return file;
};

export default createEnvFile;
