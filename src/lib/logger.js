/**
 * 日志重写
 */
module.exports = class {
  constructor(config) {
    this.type = config.type || '';
    this.typeName = this.typeList[this.type] || this.type;
    this.nodetraceid = config.nodetraceid || '';
  }
  get typeList() {
    return {
      auth: '权限auth验证',
      proxy: '接口代理层',
      logic: '参数校验',
      controller: 'controller层',
      service: 'service层',
      model: 'model层'
    };
  }
  trace(...args) {
    think.logger.trace(this.typeName, ...args, {nodetraceid: this.nodetraceid});
  }

  debug(...args) {
    think.logger.debug(this.typeName, ...args, {
      nodetraceid: this.nodetraceid
    });
  }

  info(...args) {
    think.logger.info(this.typeName, ...args, {
      nodetraceid: this.nodetraceid
    });
  }

  warn(...args) {
    think.logger.warn(this.typeName, ...args, {
      nodetraceid: this.nodetraceid
    });
  }

  error(...args) {
    think.logger.error(this.typeName, ...args, {
      nodetraceid: this.nodetraceid
    });
  }
};
