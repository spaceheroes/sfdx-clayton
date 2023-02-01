import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import axios from 'axios';
import { refreshToken } from '../../../utils/refreshToken';
import { getErrorsIfMissingFlags, OAUTH_FLAGS_CONFIG, ProjectRelatedUrlParams, URLs } from '../../../config';
import { PullRequest } from '../../../types';
import { waitForPullRequestScanStatus } from '../../../utils/waitForScanStatus';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@spaceheroes/sfdx-clayton', 'scan');

export default class ScanByPullRequest extends SfdxCommand {
  public static description = messages.getMessage('commandDescription.by_pull_request');

  public static examples = messages.getMessage('commandExamples.by_pull_request').split(os.EOL);

  protected static flagsConfig = {
    project: flags.string({
      char: 'p',
      description: messages.getMessage('flagDescriptionProjectId'),
      required: true,
    }),
    'pull-request-number': flags.integer({
      char: 'n',
      description: messages.getMessage('flagDescriptionPullRequestNumber'),
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

  public async run(): Promise<PullRequest> {
    const ux = this.ux;
    const errors = getErrorsIfMissingFlags(this.flags, ScanByPullRequest.flagsConfig);
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
      const pullRequestNumber = this.flags['pull-request-number'];
      const url = `${URLs.getScans({ ...this.flags } as ProjectRelatedUrlParams)}/by_pull_request`;

      ux.startSpinner(`Launching scan for PR #${pullRequestNumber}`);
      const lauchPullRequestResponse = await axios.post<PullRequest>(
        url,
        {
          pull_request_number: pullRequestNumber,
          type: 'AUTO',
        },
        { headers }
      );

      if (lauchPullRequestResponse?.data.task.status !== 'ACCEPTED') {
        ux.stopSpinner('failed');
        return lauchPullRequestResponse?.data;
      } else {
        ux.stopSpinner('done');
        ux.logJson(lauchPullRequestResponse?.data as any);
      }

      if (this.flags.wait) {
        ux.startSpinner('Processing scan');
        const pullRequestId = lauchPullRequestResponse?.data.id;
        const pullRequest = await waitForPullRequestScanStatus(accessToken, this.flags, pullRequestId);
        ux.stopSpinner('done');
        ux.logJson(pullRequest as any);
        return pullRequest;
      } else {
        return lauchPullRequestResponse?.data;
      }
    } catch (error) {
      ux.stopSpinner('failed');
      throw new SfError(`\n${error.code}: ${error.message}`);
    }
  }
}
