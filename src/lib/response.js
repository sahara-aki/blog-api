const STATUSCODE = require('./codeMap.js');

const response = (errno, errmsg, data) => {
  const errnoField = think.config('errnoField');
  const errmsgField = think.config('errmsgField');
  const defaultErrno = think.config('defaultErrno');
  const configErrmsg = STATUSCODE[errno] && STATUSCODE[errno].msg;
  // 拼装返回体
  const result = {};
  result[errnoField] = errno || defaultErrno;
  result[errmsgField] = errmsg || configErrmsg || 'fail';
  result.data = data || {};
  // const result = { header: {}, body: {} };
  // result.header[errnoField] = errno || defaultErrno;
  // result.header[errmsgField] = errmsg || configErrmsg || 'fail';
  // result.body = { ...data };
  return result;
};

const formatResponse = (res, pageParams = {}) => {
  if (res.data) {
    return {
      pageNum: pageParams.pageNum,
      pageSize: pageParams.pageSize,
      pages: res.data.pages,
      total: res.data.total || 0,
      data: res.data.records || []
    };
  } else {
    return {
      pageNum: pageParams.pageNum,
      pageSize: pageParams.pageSize,
      pages: 0,
      total: 0,
      data: []
    };
  }
};
const formatCloudResponse = (data, pageParams) => {
  if (data.length) {
    return {
      pageNum: pageParams.pageNum,
      pageSize: pageParams.pageSize,
      total: pageParams.count || 0,
      data
    };
  } else {
    return {
      pageNum: pageParams.pageNum,
      pageSize: pageParams.pageSize,
      total: pageParams.count || 0,
      data: []
    };
  }
};

module.exports = {
  response,
  formatResponse,
  formatCloudResponse
};
