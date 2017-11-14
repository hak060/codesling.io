import {
  genSalt,
  compare,
  hash,
} from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => {
  const salts = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salts);
  return hashedPassword;
};

export const comparePasswords = async (password, hashedPassword) => {
  const authenticated = await compare(password, hashedPassword);
  return authenticated;
};
