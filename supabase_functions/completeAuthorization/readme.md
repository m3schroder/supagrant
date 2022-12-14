Resources:
1) Contains an example of generating and refreshing access token for Aweber in NodeJS
https://github.com/aweber/public-api-examples/blob/master/node/get-access-token.js

2) Contains an example of deno oauth2 usage
https://github.com/cmd-johnson/deno-oauth2-client/blob/master/examples/http.ts   

----------------------

To Deploy:
supabase functions deploy completeAuthorization --project-ref azmzvdpframywobqkjmz --no-verify-jwt

----------------------

To Set Aweber Client ID and client Secret:
supabase secrets set AWEBER_CLIENT_ID='REPLACE_CLIENT_ID'
supabase secrets set AWEBER_CLIENT_SECRET='RELACE_CLIENT_SECRET'

