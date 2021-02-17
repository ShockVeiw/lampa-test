const app = require('./app');
const mongoose = require('mongoose');
const { APP_PORT, MONGO_CONNECTION_STRING } = require('./common/config');

mongoose.connect(
  MONGO_CONNECTION_STRING, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;

    console.log('Connected MongoDB');

    app.listen(APP_PORT, () =>
      console.log(`App is running on http://localhost:${APP_PORT}`)
    );
  }
);

