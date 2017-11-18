import mongoose from 'mongoose';
import bluebird from 'bluebird';

import User from '../db/models/user';
import { hashPassword, comparePasswords } from '../lib/bcrypt';
import { generateToken } from '../middleware/authentication';
import log from '../lib/log';

mongoose.Promise = bluebird;

export const authUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    log('User authenticated, user from db', user);
    const authenticated = await comparePasswords(req.body.password, user.password);
    if (authenticated) {
      let token = generateToken(user);
      token.username = user.username;
      token.email = user.email;
      res.status(200).send(token);
    } else {
      log('User is not authenticated');
      res.status(204).send('User not authenticated');
    }
  } catch (error) {
    log('Error in authUser ', error);
    res.status(400).send(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      log('User already exists');
      return res.status(204).send('User already exists');
    }

    const password = await hashPassword(req.body.password);
    const newUser = new User(Object.assign(req.body, { password }));
    await newUser.save();
    log('User successfully created');

    const token = generateToken(req.body);
    console.log('token ==== ', token)
    console.log('create user.req', req.body);
    //{ username: 'asdf', password: 'asdf' }
    return res.status(200).send(token);
  } catch (error) {
    log('Error in createUser ', error);
    return res.status(400).send(error);
  }
};

export const userUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.username = req.body.username;
    user.password = req.body.password;
    await user.save();
    log('User successfully updated');
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    log('Error in userUpdate ', error);
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

export const userDelete = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndRemove(req.params.id);
    log('User successfully deleted');
    return res.status(200).json({
      success: true,
      userDeleted,
    });
  } catch (error) {
    log('Error in userDelete ', error);
    return res.status(400).json({
      success: false,
      error,
    });
  }
};
