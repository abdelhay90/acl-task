import acl from './acl';

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * Role Checker Class to check role and its assigned permissions
 * it's singleton class
 */
class RoleChecker {

    /**
     * @param enforcer
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton"
        }
        this._currentAssertion = null;
    }

    /**
     * @returns Singleton
     */
    static get instance() {
        /* istanbul ignore if */
        if (!this[singleton]) {
            this[singleton] = new RoleChecker(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * check if there rule found or not
     * @param roleName
     * @returns {RoleChecker}
     */
    if(roleName) {
        if (!acl.getRole(roleName)) {
            throw new Error('this role is not found');
        }
        this._currentAssertion = acl.getRole(roleName);
        return this;
    }

    /**
     * check if the permission found on current role or not
     * @param verbName
     * @returns {RoleChecker}
     */
    can(verbName) {
        let permission = this._currentAssertion.getPermission(verbName);
        if (!permission) {
            throw new Error('this permission is not found');
        }
        this._currentPermission = permission;
        return this;
    }

    /**
     * check if the api is path is matched or not
     * @param path
     * @returns {boolean}
     */
    to(path) {
        if (this._currentPermission.condition && this._currentPermission.path === path) {
            return this;
        }
        return this._currentPermission.path === path;
    }

    /**
     * is an alias of to -> check if the api is path is matched or not
     * @param path
     * @returns {boolean}
     */
    from(path) {
        return this.to(path)
    }

    /**
     * check if the permission condition is succeeded or not
     * @param params
     */
    when(params) {
        return this._currentPermission.condition(...params);
    }

}

export default RoleChecker;