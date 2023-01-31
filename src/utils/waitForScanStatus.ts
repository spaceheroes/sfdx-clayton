import { PollingClient, StatusResult } from '@salesforce/core';
import { Duration } from '@salesforce/kit';
import axios from 'axios';
import { URLs, ProjectRelatedUrlParams } from '../config';
import { Scan } from '../types';

export async function waitForScanStatus(accessToken: string, scanId: string, status = 'PROCESSED'): Promise<Scan> {
  const pollingOptions: Partial<PollingClient.Options> = {
    frequency: Duration.seconds(250),
    timeout: Duration.minutes(Math.max(this.flags.wait, 5)),
    poll: async (): Promise<StatusResult> => {
      const getScanUrl = URLs.getScan({ scan: scanId, ...(this.flags as ProjectRelatedUrlParams) });
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
