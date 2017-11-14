import mongoose from 'mongoose';

const slingMsg = mongoose.Schema({
  slingId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
});

const SlingMsg = mongoose.model('SlingMessage', slingMsg);

export default SlingMsg;
