import mongoose from 'mongoose';

const slingSchema = mongoose.Schema({
  slingId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
});

const Sling = mongoose.model('Sling', slingSchema);

export default Sling;
