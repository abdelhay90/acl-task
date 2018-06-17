import acl from 'acl';
import {a, an} from 'acl';
import {USER_TYPE} from "acl/constants";

acl.createRole(USER_TYPE.ADMIN);
acl.createRole(USER_TYPE.GUEST);
acl.createRole(USER_TYPE.USER);