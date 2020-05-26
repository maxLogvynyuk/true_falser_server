import * as queryString from 'query-string';
import nodeFetch from 'node-fetch';

const springfieldParameters = queryString.stringify({
  // response_type: 'token',
  display: 'popup',
  client_id: process.env.FACEBOOK_APP_ID,
  redirect_uri: process.env.CLIENT_URL_FACEBOOK,
  scope: 'email',
  // scope: ['email', 'user_friends', 'name'].join(','), // comma seperated string
  auth_type: 'rerequest',
});

export const facebookLoginUrl = `https://www.facebook.com/v7.0/dialog/oauth?${springfieldParameters}`;

// let accessTokenObject = {
//   accessToken: null,
// };

async function getFacebookUserData(accessToken) {
  const response = await nodeFetch(
    `https://graph.facebook.com/me?fields=id,email,first_name,last_name&access_token=${accessToken}`,
    {
    method: 'get',
    // params: {
    //   fields: ['id', 'email', 'first_name', 'last_name'].join(','),
    //   access_token: accessToken,
    // },
  });
  const data = await response.json();
  console.log('getFacebookUserData!!!!', data); // { id, email, first_name, last_name }
  return data;
}

export async function getAccessTokenAndFacebookUserData(codeValue) {
  const queryValues = queryString.stringify({
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: process.env.CLIENT_URL_FACEBOOK,
    code: codeValue
  }, {
    sort: false,
  });
  const response = await nodeFetch(
    // `https://graph.facebook.com/v7.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&redirect_uri=${process.env.CLIENT_URL_FACEBOOK}&code=${codeValue}`,
    `https://graph.facebook.com/v7.0/oauth/access_token?${queryValues}`,
    {
      method: 'get',
    });
  const data = await response.json();
  console.log('getAccessTokenFromCode!!!!', data); // { access_token, token_type, expires_in }
  // accessTokenObject.accessToken = {...data.access_token};
  const facebookUserData = await getFacebookUserData(data.access_token);
  console.info('facebookUserData!!!', facebookUserData);
  return facebookUserData;
}
