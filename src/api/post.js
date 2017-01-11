import API from 'app_lib/api.js'
import Auth from 'app_api/auth.js'
import * as Helper from 'app_lib/helper.js'

class PostModel {
    constructor() {
        // @primary key
        this.post_id = null;
        // @reference
        this.user_id = null;
        // @reference
        this.category_id = null;
        this.post_title = null;
        this.post_content = null;
        this.post_created_at = null;
        this.post_updated_at = null;
        this.post_published = null;
        this.post_enabled = null;
        this.user = null;
        this.category = null;
    }
}

export { PostModel }

export default class Post extends API {
    constructor() {
        super();
        this.apiGateway  += '/posts/';
        this.listApiGateway = this.apiGateway + 'list';
    }

    /**
     *
     * @return Promise
     */
    createPost(vue, post) {
        var create = API.clone(post);
        var user = Auth.getAuthorizedUser();
        create.user_id = user.user_id;

        return vue.$http.post(this.apiGateway, create, {
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }

    /**
     *
     * @return Promise
     */
    deletePost(vue, postId) {
        var url = this.apiGateway + postId;

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
    updatePost(vue, postId, post) {
        var url = this.apiGateway + postId;
        var update = API.clone(post);
        update.post_id = null;
        update.post_created_at = null;
        update.post_updated_at = null;
        update.post_enabled = null;
        update.user = null;
        update.category = null;

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
    getPostById(vue, postId, withUser = false, withCategory = false) {
        var url = this.apiGateway + postId;

        return vue.$http.get(url, {
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            },
            params: {
                withUser: withUser,
                withCategory: withCategory
            }
        });
    }

    /**
     *
     * @return Promise
     */
    getPostsByCondition(vue, conditions, withUser = false, withCategory = false) {
        return this.getPosts(vue, conditions, withUser, withCategory);
    }

    /**
     *
     * @return Promise
     */
    getPostList(vue, conditions, page, order, withUser = false, withCategory = false) {
        var params = API.mergeParams(conditions, page, order, { withUser: withUser, withCategory: withCategory });
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
    getPosts(vue, conditions, withUser = false, withCategory = false) {
        var params = API.mergeParams(conditions, { withUser: withUser, withCategory: withCategory });

        return vue.$http.get(this.apiGateway, {
            params: params,
            headers: {
                Authorization: 'bearer ' + API.getAuthorizedToken()
            }
        });
    }
}
