// Setup the Outh2 Object

export const authObject = {
  clientId: Deno.env.get("AWEBER_CLIENT_ID")!,
  clientSecret: Deno.env.get("AWEBER_CLIENT_SECRET")!,
  authorizationEndpointUri: "https://auth.aweber.com/oauth2/authorize",
  tokenUri: "https://auth.aweber.com/oauth2/token",
  //redirectUri: "http://localhost:3000/callback",  TODO: Review if needed
  defaults: {
    scope: [
      "account.read",
      "list.read",
      "list.write",
      "subscriber.read",
      "subscriber.write",
      "email.read",
      "email.write",
      "subscriber.read-extended",
      "landing-page.read",
    ],
  },
};
