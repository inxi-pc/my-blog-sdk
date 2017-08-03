import API from '../lib/api.js'
import * as Util from '../lib/util.js'

export default class Auth extends API {
  constructor(pingInterval) {
    super();
    this.apiGateway += '/';
    this.pingInterval = pingInterval;
  }

  /**
   *
   * @return Promise
   */
  register(vue, user) {
    var url = this.apiGateway + 'register';

    return vue.$http.post(url, user);
  }

  /**
   *
   * @return Promise
   */
  login(vue, user) {
    var url = this.apiGateway + 'login';

    vue.$http.post(url, user).then(response => {
      Auth.persistAuthorizedToken(response);
      return new Promise((resolve, reject) => {
        resolve(response)
      });
    }, response => {
      return new Promise((resolve, reject) => {
        reject(response)
      });
    });
  }

  /**
   * @return
   */
  logout(vue) {
    Auth.destoryAuthorizedToken();
    this.clearPingTask();
  }

  /**
   * RefreshToken
   */
  setPingTask(vue) {
    this.clearPingTask();

    var context = this;
    var user = Auth.getAuthorizedUser();
    setInterval(function() {
      context.ping(vue, user.user_id);
    }, this.pingInterval);
  }

  clearPingTask() {
    clearInterval();
  }

  ping(vue, userId) {
    var url = this.apiGateway + 'ping/' + userId;

    vue.$http.post(url, null, {
      headers: {
        Authorization: 'bearer ' + Auth.getAuthorizedToken()
      }
    }).then((response) => {
      Auth.persistAuthorizedToken(response);
    }, (response) => {
      console.log(response);
    })
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
    var token = Auth.getAuthorizedToken();

    try {
      return JwtDecoder(token);
    } catch (e) {
      // todo
    }
  }

  /**
   *
   * Generate authorized ajax object for 3rd library, like datatables
   */
  static produceAuthorizedAjaxObject(url, method, data, headers, success, error) {
    var requiredHeaders = {
      Authorization: "bearer " + Auth.getAuthorizedToken()
    };
    var headers = API.mergeParams(requiredHeaders, headers);

    return API.produceAjaxObject(url, method, data, headers, success, error);
  }
}
