const superagent = require('superagent');

/**
 * @file request.js
 * @desc node对外http请求服务
 *
 * @param {Object} options 请求对象;
 * @param {string} [options.host] 请求的host(暂时废弃)
 * @param {string} [options.uri] 请求的url search不分(暂时废弃)
 * @param {string} [options.url] 请求的url search不分
 * @param {string} [options.method] 请求的方法暂时仅支持post和get
 * @param {Object} [options.headers] 请求的header对象
 * @param {Object} [options.data] 请求参数数据
 * @param {Object} http 请求宿主http对象(暂时废弃)
 * @returns {Promise}
 */
const request = (logger, options, http) => {
  const deferred = think.defer();
  const optionsData = options.data;
  let url = options.url;
  // url变量替换
  url = url.replace(/\{([^$|{|}]*)?\}/g, (matchItem) => {
    const matchParamsKey = matchItem.match(/\{([^$|{|}]*)?\}/)[1];
    const repStr = optionsData[matchParamsKey] || '';
    delete optionsData[matchParamsKey];
    return repStr;
  });
  const method = (options.method || 'post').toLowerCase();
  // 增加queryType参数  post的请求找那个如果是需要queryparams参数的 则添加queryType
  const params =
      options.queryType === 'query'
        ? 'query'
        : method === 'post' || method === 'put' || method === 'delete'
          ? 'send'
          : 'query';
  options.headers = options.headers || {};
  // 记录日志
  logger.info(
    '实际请求参数',
    'url:',
    url,
    'method:',
    method,
    'params:',
    params,
    'optionsData',
    options,
    'options',
    options
  );
  // options.headers.flowid = http.headers.logid;
  superagent[method](url)[params](optionsData || {})
    .set(options.headers)
    .timeout(options.timeout || 20000)
    .end(function(err, res) {
      if (err) {
        try {
          const result =
                      res.body && Object.keys(res.body).length > 0
                        ? res.body
                        : (res.text ? JSON.parse(res.text) : {});
          deferred.reject(result);
        } catch (error) {
          deferred.reject(err);
        }
      } else {
        const result =
                    res.body && Object.keys(res.body).length > 0
                      ? res.body
                      : (res.text ? JSON.parse(res.text) : {});
        deferred.resolve(result);
      }
    });
  return deferred.promise;
};

module.exports = {
  request
};
