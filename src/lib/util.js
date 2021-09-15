// default config

const logger = require('./logger.js');
const {request} = require('./request.js');
const { response, formatResponse, formatCloudResponse } = require('./response.js');

module.exports = {
  response,
  logger,
  request,
  formatResponse,
  formatCloudResponse
};
