import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";

import {
  createClient,
  PostgrestResponse,
} from "https://esm.sh/@supabase/supabase-js@2.2.0";
import { EMAIL_SERVICES } from "../_emailServices/services.ts";

import { corsHeaders } from "../_shared/cors.ts";
import { EmailService, Integeration } from "../_shared/email.ts";

serve(async (req: Request) => {
  EmailService.RegisterServices(EMAIL_SERVICES);

  // This is needed to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const oauth2Client = new OAuth2Client(
    EmailService.getService("AWEBER").oauthObject
  );

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

/**
 * Retrieve the integeration to know it's type (Aweber vs Mailchimp vs ..)
 */
async function getIntegeration(id: string) {
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const result = await supabaseClient.from("integeration").select();

  console.log(result);
  return result as PostgrestResponse<Integeration>;
}

/**
 * Save authentication access_token and refresh Token
 */
async function updateIntegeration() {
  
}