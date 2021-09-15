const Base = require('./base.js');

module.exports = class extends Base {
  async getArticleListAction() {
    const params = this.post();
    const res = await this.model('article').selectArticleList(params);
    this.success(res);
  }
};
