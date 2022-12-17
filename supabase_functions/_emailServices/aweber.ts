// Setup the Outh2 Object

import { EmailService, Subscription } from "../_shared/email.ts";

export const Aweber: EmailService = new EmailService({
  name: "AWEBER",
  oauthObject: {
    clientId: Deno.env.get("AWEBER_CLIENT_ID")!,
    clientSecret: Deno.env.get("AWEBER_CLIENT_SECRET")!,
    authorizationEndpointUri: "https://auth.aweber.com/oauth2/authorize",
    tokenUri: "https://auth.aweber.com/oauth2/token",
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
  },
  subscribe: (subscription: Subscription) => {
    // TODO - Implement subscription with Aweber
    return Promise.resolve(true);
  },
});
