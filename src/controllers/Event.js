const models = require('../models');

const Event = models.Event;

const eventCreationPage = (req, res) =>
  /*
  Event.EventModel.findByCategory(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }*/

     res.render('eventMaker', { csrfToken: req.csrfToken() })
  // });
;

const eventListPageBBQ = (req, res) => {
  console.log('Load Event List');
  Event.EventModel.findByCategory('barbecue', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    console.log(docs);
    return res.render('eventViewer', { csrfToken: req.csrfToken(), events: docs });
  });
};

const eventListPageWedding = (req, res) => {
  console.log('Load Event List');
  Event.EventModel.findByCategory('wedding', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    console.log(docs);
    return res.render('eventViewer', { csrfToken: req.csrfToken(), events: docs });
  });
};

const eventListPageBirthday = (req, res) => {
  console.log('Load Event List');
  Event.EventModel.findByCategory('birthday', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    console.log(docs);
    return res.render('eventViewer', { csrfToken: req.csrfToken(), events: docs });
  });
};

const eventListPageOther = (req, res) => {
  console.log('Load Event List');
  Event.EventModel.findByCategory('other', (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    console.log(docs);
    return res.render('eventViewer', { csrfToken: req.csrfToken(), events: docs });
  });
};


const makeEvent = (req, res) => {
  if (!req.body.name || !req.body.date || !req.body.category) {
    return res.status(400).json({ error: 'Error: Event name, date, and category are required' });
  }

  const eventData = {
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    eventCreator: req.session.account._id,
    description: req.body.description,
  };

  const newEvent = new Event.EventModel(eventData);

  return newEvent.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ redirect: '/bbq' });
  });
};

module.exports.eventCreationPage = eventCreationPage;
module.exports.makeEvent = makeEvent;
module.exports.eventListBBQ = eventListPageBBQ;
module.exports.eventListBirthday = eventListPageBirthday;
module.exports.eventListWedding = eventListPageWedding;
module.exports.eventListOther = eventListPageOther;
