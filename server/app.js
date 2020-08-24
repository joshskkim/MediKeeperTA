const app = require('./config.js');

const port = 6060;

app.listen(port, () => {
  console.log('Listening at port: ', port);
});
