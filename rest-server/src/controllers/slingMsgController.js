import mongoose from 'mongoose';
import bluebird from 'bluebird';

import SlingMsg from '../db/models/slingMsg';
import log from '../lib/log';

mongoose.Promise = bluebird;

export const slingMsgFetch = async (req, res) => {
  try {
    const slingMsgs = await SlingMsg.find({ slingId: req.params.slingId });
    log('succesfully fetched all sling messages');
    return res.status(200).json({
      success: true,
      slingMsgs,
    });
  } catch (e) {
    log('error in fetchSlingMsg ', e);
    return res.status(500).json({
      success: false,
      e,
    });
  }
};

export const slingMsgPost = async (req, res) => {
  try {
    const newSlingMsg = await SlingMsg(req.body);
    await newSlingMsg.save();
    log('successfully saved sling message');
    return res.status(200).json({
      success: true,
      newSlingMsg,
    });
  } catch (e) {
    log('error in postSlingMsg ', e);
    return res.status(500).json({
      success: false,
      e,
    });
  }
};
