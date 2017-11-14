import config from '../../config/env';

let helpText = 'Available env options are:\n';

Object
  .keys(config)
  .forEach(option => helpText += `  - ${option}\n`);

helpText += 'As defined in config/index.js';

export default helpText;
