// Setup the Outh2 Object
import { IntegrationConfig } from "../_shared/integration.ts";

export const mailchimp: IntegrationConfig = new IntegrationConfig({
  name: "MAILCHIMP",
  oauthObject: {
    clientId: Deno.env.get("MAILCHIMP_CLIENT_ID")!,
    clientSecret: Deno.env.get("MAILCHIMP_CLIENT_SECRET")!,
    authorizationEndpointUri: "https://login.mailchimp.com/oauth2/authorize",
    tokenUri: "https://login.mailchimp.com/oauth2/token",
    defaults: {},
  },
});
