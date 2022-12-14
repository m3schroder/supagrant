import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";

import { corsHeaders } from "../_shared/cors.ts";
import { authObject } from "../_shared/aweber.ts";

serve(async (req: Request) => {
  // This is needed to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const oauth2Client = new OAuth2Client(authObject);

  // Obtain authorization URL
  const result = await oauth2Client.code.getToken(req.url);

  // TODO - Save access token and refresh token in the database using the state ID

  const data = {
    redirectUrl: result,
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
