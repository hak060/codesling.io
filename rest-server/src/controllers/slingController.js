import mongoose from 'mongoose';
import bluebird from 'bluebird';

import Sling from '../db/models/sling';
import log from '../lib/log';
import generateSlingId from '../lib/generateSlingId';

mongoose.Promise = bluebird;

const existsInDatabase = async (slingId) => {
  const sling = await Sling.findOne({ slingId });
  return !!sling;
};

export const fetchNewSlingId = async (req, res) => {
  try {
    let slingId = generateSlingId();
    // regenerate slingId if it already exists
    while (await existsInDatabase(slingId)) {
      slingId = generateSlingId();
    }
    // save sling in db
    const newSling = new Sling({ slingId });
    await newSling.save();
    log('sling successfully created');
    return res.status(200).json({
      success: true,
      slingId,
    });
  } catch (e) {
    log('error fetching newSlingId', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingFetch = async (req, res) => {
  try {
    const sling = await Sling.findOne({ slingId: req.params.slingId });
    log('sling successfully fetched');
    return res.status(200).json({
      success: true,
      sling,
    });
  } catch (e) {
    log('error in slingFetch ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingPost = async (req, res) => {
  try {
    const newSling = new Sling(req.body);
    await newSling.save();
    log('sling successfully created');
    return res.status(200).json({
      success: true,
      newSling,
    });
  } catch (e) {
    log('error in slingPost ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingUpdate = async (req, res) => {
  try {
    const sling = await Sling.findById(req.params.id);
    sling.text = req.body.text;
    await sling.save();
    log('sling successfully updated');
    return res.status(200).json({
      success: true,
      sling,
    });
  } catch (e) {
    log('error in slingUpdate ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const slingDelete = async (req, res) => {
  try {
    const slingDeleted = await Sling.findByIdAndRemove(req.params.id);
    log('sling successfully deleted');
    return res.status(200).json({
      success: true,
      slingDeleted,
    });
  } catch (e) {
    log('error in slingDelete ', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

