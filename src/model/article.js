const Base = require('./base');
module.exports = class extends Base {
  // 通过id查询文章
  async selectArticleById(params) {
    const { id } = params;
    const result = await this.where({id}).find();
    return this.formatData(result);
  }

  // 查询所有文章
  async selectArticleList(params) {
    const { pageIndex, pageSize } = params;
    const result = await this.page(pageIndex, pageSize).countSelect();
    return this.formatData(result);
  }
};
