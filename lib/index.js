import mockData from './mock-data/mock-acl.json';
import {loadRoles} from "./acl/lib/RoleLoader";
import acl from './acl';

loadRoles(mockData);
console.log(acl.toJSONStr());
