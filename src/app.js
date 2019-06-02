const path = require('path');
const getRhymingWords = require('./api/datamuse');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const publicFolderPath = path.join(__dirname, '../public');

app.use(express.static(publicFolderPath));

app.get('', (req, res) => {
  res.render('index');
});

app.get('/getRhymingWordsAndCount', (req, res) => {
  if (!req.query.rel_rhy) return res.send({ error: 'please provide a word' });
  getRhymingWords(req.query.rel_rhy, (error, result) => {
    if (error) {
      return res.send({ error: error });
    } else {
      return res.send({ result });
    }
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
