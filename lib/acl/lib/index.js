import {VERBS} from "../constants";

class ACL {
    constructor() {
        if (!ACL.instance) {
            this._data = [];
            ACL.instance = this;
        }

        return ACL.instance;
    }

    createRole(roleName) {
        return this;
    }

    can(verbName) {
        return this;
    }

    to(path) {
        return this;
    }

    from(path) {
        return this;
    }

    when(condition) {

    }
}

const instance = new ACL();
Object.freeze(instance);

export default instance;

export function a() {
    return instance;
}

export function an() {
    return instance;
}