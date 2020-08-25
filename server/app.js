const app = require('./index.js');

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log('Listening at port: ', port);
});
