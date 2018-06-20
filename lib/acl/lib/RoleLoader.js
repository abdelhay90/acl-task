import acl from './acl';
import {a} from './acl';

export function loadRoles(model) {
    if (!model.roles) {
        throw 'this model does not contain any roles';
    }

    for (let role of model.roles) {
        acl.createRole(role.type);
        let permissions = role['permissions'];
        for (let i = 0; i < permissions.length; i++) {
            let permission = permissions[i];
            a(role.type).can(permission.verbName).to(permission.path);
        }
    }

    return acl.roles;
}