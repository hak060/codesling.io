import dbConfigs from './config';

let helpText = 'Available commands are: \n';

Object
  .keys(dbConfigs)
  .forEach(option => helpText += ` - ${option}\n`);

helpText += 'As defined in bin/seedDb/config.js';

export default helpText;