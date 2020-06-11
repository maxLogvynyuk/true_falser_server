import { google } from 'googleapis';

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.CLIENT_URL_GOOGLE // this must match your google api settings
};

/**
 *
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

const defaultScope = [
  'profile',
  'email',
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

function getGooglePeopleApi(auth) {
  return google.people({ version: 'v1', auth });
}

/**
 * Create the google url to be sent to the client.
 */
export function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}


/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
export async function getGoogleAccountFromCode(code) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);
  const people = getGooglePeopleApi(auth);
  const me = await people.people.get({
    'resourceName': 'people/me',
    'requestMask.includeField': 'person.names,person.email_addresses,person.metadata,person.photos' });
  const userGoogleId = me.data.resourceName;
  const userNames = me.data.names;
  const userMetadata = me.data.metadata;
  const userGoogleEmail = me.data.emailAddresses && me.data.emailAddresses.length && me.data.emailAddresses[0].value;
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    userMetadata,
    userNames,
    tokens,
  };
}
