import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required']
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    }
  ],
});

const User = mongoose.model('User', userSchema);

export default User;
