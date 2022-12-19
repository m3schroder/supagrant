// Setup the Outh2 Object
import { IntegrationConfig } from "../_shared/integration";

export const mailchimp: IntegrationConfig = new IntegrationConfig({
  name: "MAILCHIMP",
  oauthObject: {
    clientId: Deno.env.get("MAILCHIMP_CLIENT_ID")!,
    clientSecret: Deno.env.get("MAILCHIMP_CLIENT_SECRET")!,
    redirectUri: Deno.env.get("CALLBACK_REDIRECT_URL"),
    authorizationEndpointUri: "https://login.mailchimp.com/oauth2/authorize",
    tokenUri: "https://login.mailchimp.com/oauth2/token",
    defaults: {},
  },
});
