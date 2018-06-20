import Permission from './Permission';
import {PERMISSION_TYPE} from "../constants";

/**
 * Role Class used to holds role and its permission and accessibility to the API
 */
class Role {

    constructor(roleName) {
        this.permissions = [];
        this._roleName = roleName;
    }

    /**
     * add new permission to current role
     * @param verbName
     * @returns {Permission}
     */
    addPermission(verbName) {
        let permission = new Permission(verbName);
        this.permissions.push(permission);
        return permission;
    }

    /**
     * get permission by verb name
     * @param verbName
     * @returns {*}
     */
    getPermission(verbName) {
        return this.permissions.filter(permission => permission.verbName === verbName)[0];
    }

    /**
     * add grant access to permission filtered by verb name
     * @param verbName
     * @returns {Permission}
     */
    can(verbName) {
        let permission = this.addPermission(verbName);
        permission.setPermissionType(PERMISSION_TYPE.GRANT);
        return permission;
    }
}

export default Role;