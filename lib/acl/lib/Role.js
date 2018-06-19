import Permission from './Permission';
import {PERMISSION_TYPE} from "../constants";

/**
 * Role Class used to holds role and its permission and accessibility to the API
 */
class Role {

    constructor(roleName) {
        this._permissions = [];
    }

    /**
     * add new permission to current role
     * @param verbName
     * @returns {Permission}
     */
    addPermission(verbName) {
        var permission = new Permission(verbName)
        this._permissions.push(permission);
        return permission;
    }

    /**
     * get permission by verb name
     * @param verbName
     * @returns {*}
     */
    getPermission(verbName) {
        return this._permissions.filter(permission => permission.verbName === verbName)[0];
    }

    /**
     * add grant access to permission filtered by verb name
     * @param verbName
     * @returns {Permission}
     */
    can(verbName) {
        var permission = this.addPermission(verbName);
        permission.setPermissionType(PERMISSION_TYPE.GRANT);
        //setPermissionType
        return permission;
    }
}

export default Role;