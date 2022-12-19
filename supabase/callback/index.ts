import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";

import {
  createClient,
  PostgrestResponse,
} from "https://esm.sh/@supabase/supabase-js@2.2.0";

import { corsHeaders } from "../_shared/cors.ts";
import { Integration, IntegrationConfig } from "../_shared/integration";

import { updateIntegration } from "../_shared/token";

serve(async (req: Request) => {
  // This is needed to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Get State
  const u = new URL(req.url);
  const integerationId = u.searchParams.get("state")!;

  const entry = await getIntegration(integerationId);
  const integration = entry!.data![0].integration!;

  const oauth2Client = new OAuth2Client(
    IntegrationConfig.getService(integration).oauthObject
  );

  // Obtain authorization URL
  try {
    // Here we're exchanging the temporary code for the user's access token.
    const result = await fetch(oauth2Client.config.tokenUri, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: oauth2Client.config.clientId!,
        client_secret: oauth2Client.config.clientSecret!,
        redirect_uri: oauth2Client.config.redirectUri!,
        code: u.searchParams.get("code")!,
      }),
    });

    const obj = await result.json();
    let expires_at = null;

    if (obj.expires_in) {
      expires_at = new Date(
        Date.now() + obj.expires_in! * 1000
      ).toUTCString()!;
    }

    await updateIntegration(
      integerationId,
      obj.access_token,
      obj.refresh_token,
      expires_at
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  try {
    return Response.redirect(
      "http://localhost:3000/integration-completed?id=" +
        integerationId,
      307
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/**
 * Retrieve the integeration to know it's type (Aweber vs Mailchimp vs ..)
 */
async function getIntegration(id: string) {
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const result = await supabaseClient
    .from("integeration")
    .select("integration")
    .eq("id", id);

  return result as PostgrestResponse<Integration>;
}
