import { expect, test } from '@salesforce/command/lib/test';

describe('clayton:scan:by_revision', () => {
  test
    .stderr()
    .stdout()
    .command(['clayton:scan:by_branch_revision'])
    .it('missing arguments', (ctx) => {
      expect(ctx.stderr).to.contain('ERROR running clayton:scan:');
    });
});
