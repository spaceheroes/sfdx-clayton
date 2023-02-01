import { PollingClient, StatusResult } from '@salesforce/core';
import { Duration } from '@salesforce/kit';
import axios from 'axios';
import { URLs, ProjectRelatedUrlParams } from '../config';
import { PullRequest, Scan } from '../types';

const frequency = Duration.seconds(150);

export async function waitForRevisionScanStatus(
  accessToken: string,
  flags,
  scanId: string,
  status = 'PROCESSED'
): Promise<Scan> {
  const pollingOptions: Partial<PollingClient.Options> = {
    frequency,
    timeout: Duration.minutes(Math.max(flags.wait, 1)),
    poll: async (): Promise<StatusResult> => {
      const getScanUrl = URLs.getScan({ scan: scanId, ...(flags as ProjectRelatedUrlParams) });
      const getScanResponse = await axios.get<Scan>(getScanUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return {
        payload: getScanResponse?.data as any,
        completed: getScanResponse?.data?.task?.status === status,
      };
    },
  };
  const pollingScanClient = await PollingClient.create(pollingOptions);
  return pollingScanClient.subscribe<Scan>();
}

export async function waitForPullRequestScanStatus(
  accessToken: string,
  flags,
  pullRequest: string,
  status = 'PROCESSED'
): Promise<PullRequest> {
  const pollingOptions: Partial<PollingClient.Options> = {
    frequency,
    timeout: Duration.minutes(Math.max(flags.wait, 1)),
    poll: async (): Promise<StatusResult> => {
      const getPullRequestUrl = URLs.getPullRequest({
        pullRequest: pullRequest,
        ...(flags as ProjectRelatedUrlParams),
      });
      const getPullRequestResponse = await axios.get<Scan>(getPullRequestUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return {
        payload: getPullRequestResponse?.data as any,
        completed: getPullRequestResponse?.data?.task?.status === status,
      };
    },
  };
  const pollingScanClient = await PollingClient.create(pollingOptions);
  return pollingScanClient.subscribe<Scan>();
}
