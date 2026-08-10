/* ---------------------------------------------------------------
   Configuration — à renseigner une fois.

   Supabase > Settings > API Keys :
     Project URL       -> SUPABASE_URL
     Publishable key   -> SUPABASE_KEY   (commence par sb_publishable_)

   Cette clé est faite pour être publiée : ce sont les politiques RLS
   qui protègent les données, pas le secret de la clé.

   NE JAMAIS mettre ici une clé sb_secret_ (ex-service_role) :
   elle contourne toutes les règles d'accès.
   --------------------------------------------------------------- */
const SUPABASE_URL = 'https://ibkvyjlglwufxvzxnysa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xUfZHSOHf4TnBRRyzU_qJA_TcXIMSKX';
