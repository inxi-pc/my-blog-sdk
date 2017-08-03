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
