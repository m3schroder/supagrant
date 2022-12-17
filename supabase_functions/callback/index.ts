import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";

import {
  createClient,
  PostgrestResponse,
} from "https://esm.sh/@supabase/supabase-js@2.2.0";

import { corsHeaders } from "../_shared/cors.ts";
import { Integration, IntegrationConfig } from "../_shared/integration.ts";

serve(async (req: Request) => {
  // This is needed to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Get State
  const u = new URL(req.url);
  const integerationId = u.searchParams.get("state")!;

  const entry = await getIntegration(integerationId);
  const integration = entry!.data![0].integration;


  const oauth2Client = new OAuth2Client(
    IntegrationConfig.getService(integration).oauthObject
  );

  console.log(IntegrationConfig.getService(integration).oauthObject);
  console.log(oauth2Client);

  // Obtain authorization URL
  const result = await oauth2Client.code.getToken(req.url);

  console.log(oauth2Client);

  // Save access_token and refreh_token
  await updateIntegration(
    integerationId,
    result.accessToken,
    result.refreshToken!
  );

  try {
    return Response.redirect(
      "https://vercel-supanewsletter.com/integeration-completed?id=" +
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

/**
 * Save authentication access_token and refresh Token
 */
async function updateIntegration(
  id: string,
  access_token: string,
  refresh_token: string
) {
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const result = await supabaseClient
    .from("integeration")
    .update({
      access_token: access_token,
      refresh_token: refresh_token,
    })
    .eq("id", id);

  return result as PostgrestResponse<Integration>;
}