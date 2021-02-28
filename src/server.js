const app = require('./app');
const db = require('./db');
const { APP_PORT } = require('./common/config');

db.connect()
  .then(() => {
    console.log('Connected MongoDB');

    app.listen(APP_PORT, () =>
      console.log(`App is running on http://localhost:${APP_PORT}`)
    );
  })
  .catch((err) => { throw err });
