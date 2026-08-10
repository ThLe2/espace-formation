/* ---------------------------------------------------------------
   Configuration — Supabase > Settings > API Keys
   Project URL      -> SUPABASE_URL
   Publishable key  -> SUPABASE_KEY  (commence par sb_publishable_)

   Cette clé est faite pour être publiée : ce sont les politiques
   RLS qui protègent les données. NE JAMAIS mettre ici une clé
   sb_secret_, elle contourne toutes les règles d'accès.
   --------------------------------------------------------------- */
const SUPABASE_URL = 'https://ibkvyjlglwufxvzxnysa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xUfZHSOHf4TnBRRyzU_qJA_TcXIMSKX';

window.LMS_CONFIG = {
  SUPABASE_URL:      SUPABASE_URL,
  SUPABASE_ANON_KEY: SUPABASE_KEY
};
