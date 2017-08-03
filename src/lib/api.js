import JwtDecoder from "jwt-decode"
import * as Util from './util.js'

export default class API {
  constructor(apiGateway) {
    this.apiGateway = apiGateway;
  }

  /**
   * Merge the params
   *
   * @param Object or Array
   * @return Object
   */
  static mergeParams() {
    var params = {};
    for (var argsKey in arguments) {
      if (!Util.isNullOrEmpty(arguments[argsKey])) {
        if (arguments instanceof Object) {
          for (var argKey in arguments[argsKey]) {
            params[argKey] = arguments[argsKey][argKey];
          }
        } else {
          params[argKey] = arguments[argsKey];
        }
      }
    }

    return params;
  }

  static clone(obj) {
    var clone = new obj.constructor;
    for (var i in obj) {
      clone[i] = obj[i];
    }

    return clone;
  }

  static responseHandler(response) {
    if (response.status == 401) {
      Util.gotoModule('auth');
    }
  }

  static getPingInterval() {
    var interval = Util.getConfig('pingInterval');

    return interval > 1000 ? interval : 30000;
  }

  /**
   * Store Authorization token
   */
  static persistAuthorizedToken(response) {
    sessionStorage.setItem('token', response.body.token);
  }

  /**
   * Destroy Authorization token
   */
  static destoryAuthorizedToken() {
    sessionStorage.removeItem('token');
  }

  /**
   * Get Authorization token
   */
  static getAuthorizedToken() {
    return sessionStorage.getItem("token");
  }

  /**
   * Get Authorization user
   */
  static getAuthorizedUser() {
    var token = API.getAuthorizedToken();

    try {
      return JwtDecoder(token);
    } catch (e) {
      API.responseHandler({
        status: 401
      });
    }
  }

  /**
   *
   * Generate authorized ajax object for 3rd library, like datatables
   */
  static produceAuthorizedAjaxObject(url, method, data, headers, success, error) {
    var requiredHeaders = {
      Authorization: "bearer " + API.getAuthorizedToken()
    };
    var headers = API.mergeParams(requiredHeaders, headers);

    return API.produceAjaxObject(url, method, data, headers, success, error);
  }

  /**
   *
   * Basic ajax generation method
   */
  static produceAjaxObject(url, method, data, headers, success, error) {
    var ajax = {};

    if (!Util.isNullOrEmpty(url)) {
      ajax['url'] = url;
    }
    if (!Util.isNullOrEmpty(method)) {
      ajax['method'] = method;
    }
    if (!Util.isNullOrEmpty(data)) {
      ajax['data'] = data;
    }
    if (!Util.isNullOrEmpty(headers)) {
      ajax['headers'] = headers;
    } else {
      ajax['headers'] = requiredHeaders;
    }
    if (!Util.isNullOrEmpty(success) && success instanceof Function) {
      ajax['success'] = success;
    }
    if (!Util.isNullOrEmpty(error) && error instanceof Function) {
      ajax['error'] = error;
    }

    return ajax;
  }
}
