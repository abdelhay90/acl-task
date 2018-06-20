import Role from './Role';
import RoleChecker from "./RoleChecker";
import JSONFormatter from "./JSONFormatter";


/**
 * used to enforce singleton implementation
 * @type {symbol}
 */
let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * ACL "Access Control List" class created to handle the roles and its permission on API
 * it's singleton class
 */
class ACL {

    /**
     * @param enforcer
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton";
        }
        this._roles = {};
    }

    /**
     * @returns ACL
     */
    static get instance() {
        /* istanbul ignore if */
        if (!this[singleton]) {
            this[singleton] = new ACL(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * create new role according to its type
     * @param roleName
     * @returns {Role}
     */
    static createRole(roleName) {
        if (!ACL.instance._roles[roleName]) {
            ACL.instance._roles[roleName] = new Role(roleName);
        }
        return ACL.instance._roles[roleName];
    }

    /**
     * get role according to its types
     * @param roleName
     * @returns {Role}
     */
    static getRole(roleName) {
        return ACL.instance._roles[roleName];
    }

    /**
     * get roles assigned "dictionary"
     * @returns {{Role}}
     */
    static get roles(){
        return ACL.instance._roles;
    }

    /**
     * covert to JSON string
     * @returns {string}
     */
    static toJSONStr(){
        return JSONFormatter.format(ACL.roles, {indentation: ' '});
    }
}

/**
 * making the default export class singleton
 * @type {ACL}
 */

export default ACL;

/**
 * get role and make it ready for permission assignment
 * @param role
 * @returns {Role}
 */
export function a(role) {
    return ACL.getRole(role);
}

/**
 * alias to "a" function
 * @param role
 * @returns {Role}
 */
export function an(role) {
    return a(role);
}

export const check = RoleChecker.instance;