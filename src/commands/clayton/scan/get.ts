import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import axios from 'axios';
import { refreshToken } from '../../../utils/refreshToken';
import { COMMON_FLAGS, getErrorsIfMissingFlags, HEADERS, OAUTH_FLAGS_CONFIG, URLs } from '../../../config';
import { Scan } from '../../../types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@spaceheroes/sfdx-clayton', 'scan');

export default class GetScan extends SfdxCommand {
  public static description = messages.getMessage('commandDescription.get');

  public static examples = messages.getMessage('commandExamples.get').split(os.EOL);

  protected static flagsConfig = {
    project: flags.string({
      char: 'p',
      description: messages.getMessage('flagDescriptionProjectId'),
      required: true,
    }),
    scan: flags.string({
      char: 's',
      description: messages.getMessage('flagDescriptionScanId'),
      required: true,
    }),
    ...COMMON_FLAGS,
    ...OAUTH_FLAGS_CONFIG,
  };

  public async run(): Promise<Scan> {
    const errors = getErrorsIfMissingFlags(this.flags, GetScan.flagsConfig);
    if (errors.length > 0) {
      throw new SfError([os.EOL, ...errors].join(os.EOL));
    }
    try {
      this.ux.startSpinner('Fetching scan');
      const tokenResponse = await refreshToken({
        clientId: this.flags['client-id'],
        clientSecret: this.flags['client-secret'],
        refreshToken: this.flags['refresh-token'],
      });
      const headers = { Authorization: `Bearer ${tokenResponse?.data?.access_token}`, ...HEADERS };
      const url = URLs.getScan(this.flags as unknown as any);
      const getScanResponse = await axios.get<Scan>(url, { headers });
      const scan = getScanResponse?.data;
      this.ux.stopSpinner('done');
      this.ux.logJson(scan as any);
      return scan;
    } catch (error) {
      this.ux.stopSpinner('failed');
      throw new SfError(`\n${error.code}: ${error.message}`);
    }
  }
}
