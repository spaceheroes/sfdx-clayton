import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import axios from 'axios';
import { refreshToken } from '../../../utils/refreshToken';
import { getErrorsIfMissingFlags, OAUTH_FLAGS_CONFIG, ProjectRelatedUrlParams, URLs } from '../../../config';
import { Scan } from '../../../types';
import { waitForRevisionScanStatus } from '../../../utils/waitForScanStatus';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@spaceheroes/sfdx-clayton', 'scan');

export default class ScanByBranchAndRevision extends SfdxCommand {
  public static description = messages.getMessage('commandDescription.by_branch_revision');

  public static examples = messages.getMessage('commandExamples.by_branch_revision').split(os.EOL);

  protected static flagsConfig = {
    branch: flags.string({
      char: 'b',
      description: messages.getMessage('flagDescriptionBranch'),
      required: true,
    }),
    project: flags.string({
      char: 'p',
      description: messages.getMessage('flagDescriptionProjectId'),
      required: true,
    }),
    revision: flags.string({
      char: 'r',
      description: messages.getMessage('flagDescriptionRevision'),
      required: true,
    }),
    workspace: flags.string({
      char: 'w',
      description: messages.getMessage('flagDescriptionWorkspaceId'),
      required: true,
    }),
    wait: flags.string({
      description: messages.getMessage('flagDescriptionWait'),
      required: false,
    }),
    ...OAUTH_FLAGS_CONFIG,
  };

  public async run(): Promise<Scan> {
    const ux = this.ux;
    const errors = getErrorsIfMissingFlags(this.flags, ScanByBranchAndRevision.flagsConfig);
    if (errors.length > 0) {
      throw new SfError(errors.join(os.EOL));
    }
    try {
      const tokenResponse = await refreshToken({
        clientId: this.flags['client-id'],
        clientSecret: this.flags['client-secret'],
        refreshToken: this.flags['refresh-token'],
      });
      const accessToken = tokenResponse?.data?.access_token;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const url = `${URLs.getScans({ ...this.flags } as ProjectRelatedUrlParams)}/by_branch_and_revision`;

      ux.startSpinner(`Launching scan for ${this.flags.revision} on ${this.flags.branch}`);
      const lauchScanResponse = await axios.post<Scan>(
        url,
        {
          branch: this.flags.branch,
          revision: this.flags.revision,
          type: 'AUTO',
        },
        { headers }
      );

      if (lauchScanResponse?.data.task.status !== 'ACCEPTED') {
        ux.stopSpinner('failed');
        return lauchScanResponse?.data;
      } else {
        ux.stopSpinner('done');
        ux.logJson(lauchScanResponse?.data as any);
      }

      if (this.flags.wait) {
        ux.startSpinner('Processing scan');
        const scanId = lauchScanResponse?.data.id;
        const scan = await waitForRevisionScanStatus(accessToken, this.flags, scanId);
        ux.stopSpinner('done');
        ux.logJson(scan as any);
        return scan;
      } else {
        return lauchScanResponse?.data;
      }
    } catch (error) {
      ux.stopSpinner('failed');
      throw new SfError(`\n${error.code}: ${error.message}`);
    }
  }
}
