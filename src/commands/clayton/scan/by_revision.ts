import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import axios from 'axios';
import { refreshToken } from '../../../utils/refreshToken';
import { getErrorsIfMissingFlags, OAUTH_FLAGS_CONFIG, ProjectRelatedUrlParams, URLs } from '../../../config';
import { Scan } from '../../../types';
import { waitForScanStatus } from '../../../utils/waitForScanStatus';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@spaceheroes/sfdx-clayton', 'scan');

export default class ScanByRevision extends SfdxCommand {
  public static description = messages.getMessage('commandDescription.by_revision');

  public static examples = messages.getMessage('commandExamples.by_revision').split(os.EOL);

  protected static flagsConfig = {
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
    const errors = getErrorsIfMissingFlags(this.flags, ScanByRevision.flagsConfig);
    if (errors.length > 0) {
      throw new SfError(errors.join(os.EOL));
    }
    try {
      const tokenResponse = await refreshToken({
        clientId: this.flags['client-id'],
        clientSecret: this.flags['client-secret'],
        refreshToken: this.flags['refresh-token'],
      });
      const accessToken = tokenResponse?.data?.access_token
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const url = `${URLs.getScans({ ...this.flags } as ProjectRelatedUrlParams)}/by_revision`;

      ux.startSpinner('Launching scan');
      const lauchScanResponse = await axios.post<Scan>(
        url,
        {
          revision: this.flags.revision,
          type: 'AUTO',
        },
        { headers }
      );
      const scanId = lauchScanResponse?.data.id;
      ux.stopSpinner('done');
      ux.logJson(lauchScanResponse?.data as any);

      if (this.flags.wait) {
        ux.startSpinner('Processing scan');
        const scan = await waitForScanStatus(accessToken, scanId)
        ux.stopSpinner('done');
        ux.logJson(scan as any);
        return scan;
      } else {
        return lauchScanResponse?.data;
      }
    } catch (error) {
      throw new SfError(`\n${error.code}: ${error.message}`);
    }
  }
}
