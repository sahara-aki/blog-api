const util = require('../lib/util');
module.exports = class extends think.Controller {
  // 复写success
  success(data, message) {
    const response = util.response;
    const jsonBody = response(200, message || '操作成功', data);
    this.ctx.json({
      ...jsonBody
    });
    return false;
  }

  // 复写fail
  returnFail(errno, errmsg, data) {
    const response = util.response;
    const jsonBody = response(errno, errmsg, data);
    this.ctx.json({
      ...jsonBody
    });
    return false;
  }
};
