import 'babel-polyfill';
import acl from '../lib/acl';
const expect = require('chai').expect;

describe('ACL', () => {
    it('should be defined', function () {
        console.log(acl);
        expect(acl).to.not.equal(undefined);
    });
});
