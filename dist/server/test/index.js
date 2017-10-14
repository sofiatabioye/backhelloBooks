'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;

describe('SimpleTest', function () {
  it('handle addition', function () {
    assert.equal(1 + 3, 4);
  });
});