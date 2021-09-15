// default config
module.exports = class extends think.Model {
  // :obj or array 替换&&驼峰
  formatParams(data = []) {
    if (Array.isArray(data)) {
      return data.map((item) => {
        return this.formatParamsObj(item);
      });
    } else {
      return this.formatParamsObj(data);
    }
  }
  formatParamsObj(obj) {
    // 映射关系修改
    const dataMap = this.dataMap || {};
    const dataMapHump = {};
    for (const line in dataMap) {
      dataMapHump[obj.field] = line;
    }
    // 转换成下划线
    const resObj = {};
    for (const k in obj) {
      let newKey = dataMapHump[k] || k;
      newKey = newKey.replace(/([A-Z])/g, '_$1').toLowerCase();
      resObj[newKey] = obj[k];
    }
    return resObj;
  }
  // data:obj or array
  formatData(data = []) {
    if (Array.isArray(data)) {
      return data.map((item) => {
        return this.formatDataObj(item);
      });
    } else {
      return this.formatDataObj(data);
    }
  }
  formatDataObj(obj) {
    const dataMap = this.dataMap || {};
    // 转换成下划线
    const resObj = {};
    for (const k in obj) {
      let newKey = dataMap[k] && dataMap[k].field ? dataMap[k].field : k;
      newKey = newKey.replace(/\_(\w)/g, function(all, letter) {
        return letter.toUpperCase();
      });
      resObj[newKey] = obj[k];
    }
    return resObj;
  }
  
  /**
   * update data
   * @param  {Object} where   查询条件  要有id
   * @param  {Array} field  不可重复的字段
   * @param  {Object} data 更新的内容
   * @return {Promise}
   */
  async selectDiffAndUpdate(where, field, data) {
    const repeatField = [];
    for (const item of field) {
      if (data[item]) {
        const repeatData = await this.where({
          [item]: data[item],
          id: ['!=', where.id]
        }).select();
        if (repeatData.length > 0) {
          repeatField.push(item);
        }
      }
    }
    if (repeatField.length > 0) {
      return Promise.reject(new Error(`字段${repeatField.join(',')}不可重复`));
    } else {
      return this.where(where).update(data);
    }
  }
};
