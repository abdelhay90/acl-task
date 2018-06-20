import 'babel-polyfill';
import acl from '../lib/acl';
import RoleChecker from '../lib/acl/lib/RoleChecker';
import {a, an, check} from '../lib/acl';
import {PERMISSION_TYPE, ROLE_TYPE, VERBS} from '../lib/acl/constants';
import {expect} from 'chai';

const mocked = `{
 admin: {
  permissions: [
   {
    verbName: 'get',
    type: 0,
    path: '/users',
    condition: null
   }
  ],
  _roleName: 'admin'
 },
 user: {
  permissions: [
   {
    verbName: 'post',
    type: 0,
    path: '/users/:userId/articles',
    condition: function (params, user) {
                return user.id === params.userId;
            }
   }
  ],
  _roleName: 'user'
 }
}`;
describe('ACL', () => {
    acl.createRole(ROLE_TYPE.ADMIN);
    acl.createRole(ROLE_TYPE.USER);
    beforeEach(() => {

    });

    it('should be defined', function () {
        expect(acl).to.not.equal(undefined);
    });

    it('should be singleton classes', function () {
        expect(() => {
            let t = new acl();
        }).to.throw();

        expect(() => {
            let acl = new RoleChecker();
        }).to.throw();
    });

    describe('Roles', function () {
        it('should add roles', function () {
            expect(acl.getRole(ROLE_TYPE.ADMIN)).to.not.equal(undefined);
            expect(acl.getRole(ROLE_TYPE.USER)).to.not.equal(undefined);
            expect(Object.keys(acl.roles).length).to.equal(2);
        });

        it('should assign permissions', function () {
            let permission = an(ROLE_TYPE.ADMIN).can(VERBS.GET).from('/users');
            expect(permission.verbName).to.equal(VERBS.GET);
            expect(permission.type).to.equal(PERMISSION_TYPE.GRANT);
            expect(permission.path).to.equal('/users');
            expect(acl.getRole(ROLE_TYPE.ADMIN).permissions.length).to.equal(1);
        });

        it('should assign conditional permissions', function () {
            let permission = a(ROLE_TYPE.USER).can(VERBS.POST).to('/users/:userId/articles').when((params, user) =>
                user.id === params.userId);
            expect(permission.verbName).to.equal(VERBS.POST);
            expect(permission.type).to.equal(PERMISSION_TYPE.GRANT);
            expect(permission.path).to.equal('/users/:userId/articles');
            expect(acl.getRole(ROLE_TYPE.USER).permissions.length).to.equal(1);
        });
    });

    describe('Role Checker', function () {
        it('should check if the role is valid', function () {
            expect(check.if(ROLE_TYPE.ADMIN)).to.not.equal(undefined);
            expect(check.if(ROLE_TYPE.ADMIN).can(VERBS.GET)).to.not.equal(undefined);
            expect(() => {
                check.if(ROLE_TYPE.GUEST)
            }).to.throw();
            expect(() => {
                check.if(ROLE_TYPE.ADMIN).can(VERBS.POST)
            }).to.throw();
            expect(check.if(ROLE_TYPE.ADMIN).can(VERBS.GET).from('/admins')).to.equal(false);
            expect(check.if(ROLE_TYPE.ADMIN).can(VERBS.GET).from('/users')).to.equal(true);
            expect(
                check
                    .if(ROLE_TYPE.USER)
                    .can(VERBS.POST)
                    .to('/users/:userId/articles')
                    .when([
                        {userId: '15'},
                        {id: '15'}
                    ])
            ).to.equal(true);
        });
    });

    describe('to JSON string', function () {
        it('should return json str', function () {
            expect(acl.toJSONStr()).to.equal(mocked);
        });
    });
});
