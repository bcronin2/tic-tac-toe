const promptUtil = require('prompt');

const prompt = (message, cb) => {
  promptUtil.start();
  promptUtil.get([message], (err, result) => cb(result[message]));
};

module.exports = { prompt };
