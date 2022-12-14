import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";

import { corsHeaders } from "../_shared/cors.ts";

serve(async (req: Request) => {
  // This is needed to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Setup the Outh2 Object
  const oauth2Client = new OAuth2Client({
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
  });

  // Generate a random state
  const state = crypto.randomUUID();

  // Obtain authorization URL
  const { uri } = await oauth2Client.code.getAuthorizationUri({
    state,
    disablePkce: true,
  });

  const data = {
    redirectUrl: uri,
  };

  try {
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
