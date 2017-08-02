import API from '../lib/api.js'
import Auth from './auth.js'
import Helper from '../lib/helper.js'

class UserModel {
    constructor() {
        this.user_id = null;
        this.user_name = null;
        this.user_telephone = null;
        this.user_email = null;
        this.user_password = null;
        this.user_created_at = null;
        this.user_updated_at = null;
    }
}

export { UserModel };

export default class User extends API {
    constructor() {
       super();
       this.apiGateway += '/users/';
       this.listApiGateway = this.apiGateway + 'list';
    }

    /**
     *
     * @return Promise
     */
    createUser(vue, user) {
        var create = API.clone(user);

        return vue.$http.user(this.apiGateway, create, {
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }

    /**
     *
     * @return Promise
     */
    deleteUser(vue, userId) {
        var url = this.apiGateway + userId;

        return vue.$http.delete(url, {
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }

    /**
     *
     * @return Promise
     */
    updateUser(vue, userId, user) {
        var url = this.apiGateway + userId;
        var update = API.clone(user);
        update.user_id = null;
        update.user_name = null;
        update.user_created_at = null;
        update.user_updated_at = null;
        update.user_enabled = null;

        return vue.$http.put(url, update, {
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }

    /**
     *
     * @return Promise
     */
    getUserById(vue, userId) {
        var url = this.apiGateway + userId;

        return vue.$http.get(url, {
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }

    /**
     *
     * @return Promise
     */
    getUsersByIds(vue, userIds) {
        return this.getUsers(vue, userIds);
    }

    /**
     *
     * @return Promise
     */
    getUsersByCondition(vue, conditions) {
        return this.getUsers(vue, conditions);
    }

    /**
     *
     * @return Promise
     */
    getUserList(vue, conditions, page, order) {
        var params = API.mergeParams(conditions, page, order);
        var url = this.listApiGateway;

        return vue.$http.get(url, {
            params: params,
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }

    /**
     *
     * @return Promise
     */
    getUsers(vue, conditions) {
        var params = API.mergeParams(conditions);

        return vue.$http.get(this.apiGateway, {
            params: params,
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }
}
