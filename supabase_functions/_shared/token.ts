import {
  createClient,
  PostgrestResponse,
} from "https://esm.sh/@supabase/supabase-js@2.2.0";

import { Integration, IntegrationConfig } from "../_shared/integration.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";

export async function getUpdatedIntegration(id: string) {
  const integration = await getIntegration(id);

  // If now is greater than the time that an access_token expires, refresh the expires token and save it in the database
  if (integration.expires_at && new Date(integration.expires_at) < new Date()) {
    const oauth2Client = new OAuth2Client(
      IntegrationConfig.getService(integration.integration).oauthObject
    );

    const newToken = await oauth2Client.refreshToken.refresh(
      integration.refresh_token
    );

    integration.access_token = newToken.accessToken;
    integration.refresh_token = newToken.refreshToken!;

    await updateIntegration(
      integration.id!,
      integration.access_token,
      integration.refresh_token
    );
  }

  return integration;
}

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

  return (result as PostgrestResponse<Integration>).data![0];
}

/**
 * Save authentication access_token and refresh Token
 */
export async function updateIntegration(
  id: string,
  access_token: string,
  refresh_token: string | undefined
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
