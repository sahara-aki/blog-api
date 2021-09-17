const Base = require('./base.js');

module.exports = class extends Base {
  async getArticleListAction() {
    const params = this.post();
    const res = await this.model('article').selectArticleList(params);
    this.success(res);
  }
  async getArticleDetailAction() {
    const id = this.post('id');
    const res = await this.model('article').selectArticleById({
      id
    });
    this.success(res);
  }
};
