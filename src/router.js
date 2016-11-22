const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/eventMaker', mid.requiresLogin, controllers.Event.eventCreationPage);
  app.post('/makeEvent', mid.requiresLogin, controllers.Event.makeEvent);
  app.get('/bbq', controllers.Event.eventListBBQ);
  app.get('/wedding', controllers.Event.eventListWedding);
  app.get('/birthday', controllers.Event.eventListBirthday);
  app.get('/other', controllers.Event.eventListOther);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};


module.exports = router;
