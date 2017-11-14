import uuid from 'uuid-v4';

const words = [
  'pumpkin',
  'noodles',
  'pasta',
  'salmon',
  'apples',
  'cookies',
  'pineapple',
  'tuna',
  'potato',
  'onions',
];

/**
 *
 *  generateSlingId
 *
 *  generates random sling id
 */
const generateSlingId = () => {
  const randomIdx = Math.floor(Math.random() * words.length);
  const randomId = uuid().slice(0, 4);
  return `${words[randomIdx]}-${randomId}`;
};

export default generateSlingId;
