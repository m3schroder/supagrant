import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v1.0.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { EmailService, Integeration } from "../_shared/email.ts";
import {
  createClient,
  PostgrestResponse,
} from "https://esm.sh/@supabase/supabase-js@2.2.0";
import { EMAIL_SERVICES } from "../_emailServices/services.ts";

serve(async (req: Request): Promise<Response> => {
  // This is needed to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  EmailService.RegisterServices(EMAIL_SERVICES);

  const oauth2Client = new OAuth2Client(
    EmailService.getService("AWEBER").oauthObject
  );

  // Save the state along with the title, domain, integeration type in the database
  const integeration = await storeIntegeration();

  // The id of the integeration is the state
  const state = integeration.data![0].id;

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

async function storeIntegeration() {
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const result = await supabaseClient.from("integeration").insert({
    title: "example 1",
    user_id: "fc28d40e-6993-476f-8d8d-58410ea8985e",
    integeration: "AWEBER",
  });

  console.log(result);
  return result as PostgrestResponse<Integeration>;
}
