import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import {
  createClient,
  PostgrestResponse,
} from "https://esm.sh/@supabase/supabase-js@2.2.0";
import { corsHeaders } from "../_shared/cors.ts";
import { Integration } from "../_shared/integration.ts";

export type Subscription = {
  email: string;
  name: string;
  tags: {
    add: string[];
    remove: string[];
  };
};

serve(async (req: Request) => {
  // This is needed to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Get Integration
  const u = new URL(req.url);
  const integerationId = u.searchParams.get("integrationId")!;
  const integrationResult = await getIntegration(integerationId);
  const integration = integrationResult.data![0];

  let result = null;
  if (integration.integration == "AWEBER") {
    const response = await fetch("https://api.aweber.com/1.0/accounts", {
      headers: new Headers({
        Authorization: "Bearer " + integration.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    result = await response.json();
  } else (integration.integration == "MAILCHIMP") {
    const response = await fetch("https://api.aweber.com/1.0/accounts", {
      headers: new Headers({
        Authorization: "Bearer " + integration.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    result = await response.json();
    
  }

  const data = {
    success: true,
    data: result,
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
async function getIntegration(id: string) {
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const result = await supabaseClient
    .from("integeration")
    .select("*")
    .eq("id", id);

  return result as PostgrestResponse<Integration>;
}
