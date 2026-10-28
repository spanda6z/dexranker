// DexRanker config
// 1) Cloud board: set supabaseUrl + supabaseAnonKey (see supabase-setup.md)
// 2) Ops lock: set opsPassword so Board/Campaign require unlock
// Leave blank = localStorage only + no password gate
window.DEXRANKER_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: '',
  opsPassword: '' // e.g. 'your-secret' — required to open Campaign & Board
};
