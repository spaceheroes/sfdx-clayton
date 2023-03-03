import { flags } from '@salesforce/command';
import { Messages } from '@salesforce/core';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@spaceheroes/sfdx-clayton', 'scan');

export const HOSTNAME = process.env.CLAYTON_HOSTNAME || 'api.clayton.io';
export const BASE_URL = `https://${HOSTNAME}`;

export const OAUTH_FLAGS_CONFIG = {
  'client-id': flags.string({
    description: messages.getMessage('flagDescriptionClientId'),
    env: 'CLAYTON_CLIENT_ID',
  }),
  'client-secret': flags.string({
    description: messages.getMessage('flagDescriptionClientSecret'),
    env: 'CLAYTON_CLIENT_SECRET',
  }),
  'refresh-token': flags.string({
    description: messages.getMessage('flagDescriptionRefreshToken'),
    env: 'CLAYTON_REFRESH_TOKEN',
  }),
};

export const COMMON_FLAGS = {
  workspace: flags.string({
    char: 'w',
    description: messages.getMessage('flagDescriptionWorkspaceId'),
    required: true,
    env: 'CLAYTON_WORKSPACE_DEFAULT'
  }),
}

export function getErrorsIfMissingFlags(flags: any, config: any): string[] {
  const errors = [];
  for (const keyword in config) {
    if (config[keyword].required) {
      const flag = flags[keyword];
      if (typeof flag === 'undefined' || flag.length < 1) {
        errors.push(messages.getMessage(`flagErrorMissing_${keyword}`));
      }
    }
  }
  return errors;
}

export const HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  'User-Agent': 'sfdx-clayton/1.0',
};

export type ProjectRelatedUrlParams = { project: string; workspace: string };

export const URLs = {
  oauth2Token: `${BASE_URL}/oauth2/token`,
  getProject: ({ workspace, project }: ProjectRelatedUrlParams): string =>
    `${BASE_URL}/api/workspaces/${workspace}/projects/${project}`,
  getPullRequest: ({ workspace, project, pullRequest }: ProjectRelatedUrlParams & { pullRequest: string }): string =>
    `${URLs.getProject({ project, workspace })}/pull-requests/${pullRequest}`,
  getScan: ({ workspace, project, scan }: ProjectRelatedUrlParams & { scan: string }): string =>
    `${URLs.getProject({ project, workspace })}/scans/${scan}?legacy_code=true`,
  getScans: ({ workspace, project }: ProjectRelatedUrlParams): string =>
    `${URLs.getProject({ project, workspace })}/scans`,
  getUser: `${BASE_URL}/api/user`,
};
