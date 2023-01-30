import axios from 'axios';
import * as querystring from 'querystring';
import { HEADERS, URLs } from '../config';

export type OauthParams = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

export function refreshToken({ clientId, clientSecret, refreshToken }: OauthParams): Promise<any> {
  const params = querystring.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  return axios.post(URLs.oauth2Token, params, {
    headers: {
      ...HEADERS,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
