/**
 * Permission class used to set permission on certain role
 */
class Permission {
    constructor(verbName) {
        this.verbName = verbName;
        this.type = null;
        this.path = '';
        this.condition = null;
    }

    /**
     * set permission type and path
     * @param permissionType
     * @param path
     */
    setPermissionType(permissionType, path) {
        this.type = permissionType;
    }

    /**
     * set current API path
     * @param path
     * @returns {Permission}
     */
    to(path) {
        this.path = path;
        return this;
    }

    /**
     * is an alias of to -> set current API path
     * @param path
     * @returns {Permission}
     */
    from(path) {
        return this.to(path);
    }

    /**
     * apply user defined condition on current permission
     * @param condition
     * @returns {Permission}
     */
    when(condition) {
        this.condition = condition;
        return this;
    }
}

export default Permission;