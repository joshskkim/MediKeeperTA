const app = require('./index.js');

const port = process.env.PORT || 6060;

app.listen(port, () => {
  console.log('Listening at port: ', port);
});
