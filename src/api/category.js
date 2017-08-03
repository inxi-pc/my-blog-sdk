import API from '../lib/api.js'
import Auth from './auth.js'
import * as Util from '../lib/util.js'

class CategoryModel {
  constructor() {
    // @primary key
    this.category_id = null;
    this.category_parent_id = null;
    this.category_root_id = null;
    this.category_name_en = null;
    this.category_name_cn = null;
    this.category_level = null;
    this.category_created_at = null;
    this.category_updated_at = null;
    this.category_enabled = null;
  }
}

export {
  CategoryModel
}

export default class Category extends API {
  constructor() {
    super();
    this.apiGateway += "/categories/";
    this.listApiGateway = this.apiGateway + 'list';
  }

  /**
   *
   * @return Promise
   */
  createCategory(vue, category) {
    var create = API.clone(category);

    return vue.$http.post(this.apiGateway, create, {
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   *
   * @return Promise
   */
  deleteCategory(vue, categoryId) {
    var url = this.apiGateway + categoryId;

    return vue.$http.delete(url, {
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   *
   * @return Promise
   */
  updateCategory(vue, categoryId, category) {
    var url = this.apiGateway + categoryId;

    var update = API.clone(category);
    update.category_id = null;
    update.category_parent_id = null;
    update.category_root_id = null;
    update.category_level = null;
    update.category_created_at = null;
    update.category_updated_at = null;
    update.category_enabled = null;
    update.children = null;

    return vue.$http.put(url, update, {
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }
  /**
   *
   * @return Promise
   */
  getCategoryById(vue, categoryId) {
    var url = this.apiGateway + categoryId;

    return vue.$http.get(url, {
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   *
   * @return Promise
   */
  getCategoriesByIds(vue, categoryIds) {
    return this.getCategories(categoryIds, {
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   *
   * @return Promise
   */
  getCategoriesByCondition(vue, conditions) {
    return this.getCategories(vue, conditions, {
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   * @return Promise
   */
  getCategoryList(vue, conditions, page, sort) {
    var params = API.mergeParams(conditions, page, sort);
    var url = this.listApiGateway;

    return vue.$http.get(url, {
      params: params,
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   * @return Promise
   */
  getCategories(vue, conditions) {
    var params = API.mergeParams(conditions);

    return vue.$http.get(this.apiGateway, {
      params: params,
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   * @return Promise
   */
  getCategoryListTree(vue, conditions, page, sort) {
    var params = API.mergeParams(conditions, page, sort);
    params.add({
      'tree_enabled': true
    });
    var url = this.listApiGateway;

    return vue.$http.get(url, {
      params: params,
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }

  /**
   * @return Promise
   */
  getCategoriesTree(vue, conditions, page, sort) {
    var params = API.mergeParams(conditions);
    params.add({
      'tree_enabled': true
    });

    return vue.$http.get(this.apiGateway, {
      params: params,
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    });
  }
}
