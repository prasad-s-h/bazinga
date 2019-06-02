const request = require('request');

const getRhymingWords = (word, callback) => {
  const url = `https://api.datamuse.com/words?rel_rhy=${encodeURI(word)}`;
  console.log('url = ', url);
  let message;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      message = 'Something went wrong, please Try again';
      return callback(message);
    } else if (body.length === 0) {
      message = 'please provide a valid word';
      return callback(message);
    } else if (body.length >= 1) {
      message = body;
      return callback(undefined, message);
    }
  });
};

module.exports = getRhymingWords;
