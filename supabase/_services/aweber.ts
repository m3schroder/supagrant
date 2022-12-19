// Setup the Outh2 Object
import { IntegrationConfig } from "../_shared/integration";

export const aweber: IntegrationConfig = new IntegrationConfig({
  name: "AWEBER",
  oauthObject: {
    clientId: Deno.env.get("AWEBER_CLIENT_ID")!,
    clientSecret: Deno.env.get("AWEBER_CLIENT_SECRET")!,
    redirectUri: Deno.env.get("CALLBACK_REDIRECT_URL"),
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
});
