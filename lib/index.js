import acl from 'acl';
import {a, an} from 'acl';
import {ROLE_TYPE} from "acl/constants";

acl.createRole(ROLE_TYPE.ADMIN);
acl.createRole(ROLE_TYPE.GUEST);
acl.createRole(ROLE_TYPE.USER);