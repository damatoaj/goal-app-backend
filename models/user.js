const mongoose = require('mongoose');
const outcomeGoal = require('./outcome');

const options = {
    timestamps: true,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, userDocToReturn) => {
        delete userDocToReturn.password;
        return userDocToReturn;
      }
    }
  }

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    outcomeGoals: [{type: mongoose.Schema.Types.ObjectId, ref: 'OutcomeGoals'}]
  }, options);
  
  module.exports = mongoose.model('User', userSchema);