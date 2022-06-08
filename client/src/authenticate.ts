import * as msal from "@azure/msal-browser";

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const AUTHORITY = process.env.AUTHORITY;
const KNOWN_AUTHORITY = process.env.KNOWN_AUTHORITY;
const SCOPE = process.env.SCOPE;

const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    authority: AUTHORITY,
    knownAuthorities: [KNOWN_AUTHORITY],
    postLogoutRedirectUri: REDIRECT_URI
  }
};

// Create an instance of PublicClientApplication
const msalInstance = new msal.PublicClientApplication(msalConfig);

var loginRequestOptions = {
  scopes: ["user.read", "mail.send"] // optional Array<string>
};

function loginAttempt() {
  try {
    msalInstance.loginRedirect(loginRequestOptions);
  } catch (err) {
    // handle error
    console.error("Login did not work", err);
  }
}

function logoutAttempt() {
  msalInstance.logoutRedirect();
}

function getTokens() {
  // Handle the redirect flows
  msalInstance
    .handleRedirectPromise()
    .then(tokenResponse => {
      // Handle redirect response
      console.log("tokenResponse", tokenResponse);
    })
    .catch(error => {
      // Handle redirect error
      console.error("we have errors. we do not have tokenResponse", error);
    });
}
