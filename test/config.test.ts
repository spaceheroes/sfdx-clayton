import { expect } from 'chai';
import { getErrorsIfMissingFlags } from '../src/config';
import { Messages } from '@salesforce/core';
import sinon = require('sinon');

describe('getErrorsIfMissingFlags', () => {
  it('passing null null', () => {
    const errors = getErrorsIfMissingFlags(null, null);
    expect(errors).to.be.an('array').has.lengthOf(0);
  });
  it('passing matching objects', () => {
    sinon.stub(Messages.prototype, 'getMessage').callsFake(() => 'stub');
    const errors = getErrorsIfMissingFlags({ key1: 'key1', key2: 'key2' }, { key1: {}, key2: {} });
    expect(errors).to.be.an('array').has.lengthOf(0);
  });
});
