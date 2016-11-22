const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let EventModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Placeholder Event',
    set: setName,
  },

  date: {
    type: Date,
    required: true,
    // default: new Date().setDate(Date.getDate() + 14),
    default: new Date(),
  },

  category: {
    type: String,
    required: true,
    default: 'Party',
  },

  eventCreator: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  description: {
    type: String,
    required: true,
    default: 'An event for the ages',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

// Needs more stuff
EventSchema.statics.toAPI = doc => ({
  name: doc.name,
});

EventSchema.statics.findByCreator = (ownerId, callback) => {
  const search = {
    eventCreator: convertId(ownerId),
  };

  return EventModel.find(search).select('name date category description eventCreator').exec(callback);
};

EventSchema.statics.findByCategory = (categoryType, callback) => {
  const search = {
    category: categoryType,
  };

  return EventModel.find(search).select('name date category description eventCreator').exec(callback);
};

EventModel = mongoose.model('Event', EventSchema);

module.exports.EventModel = EventModel;
module.exports.EventSchema = EventSchema;
