/**
 * Campaign store: Supabase when configured, else localStorage.
 */
(function (global) {
  const CAM_KEY = 'dexranker_campaigns_v1';
  const cfg = global.DEXRANKER_CONFIG || {};
  let sb = null;
  let mode = 'local';

  function localList() {
    try { return JSON.parse(localStorage.getItem(CAM_KEY) || '[]'); } catch { return []; }
  }
  function localSave(list) {
    localStorage.setItem(CAM_KEY, JSON.stringify(list));
  }

  function rowToCamp(r) {
    return {
      id: r.id,
      mint: r.mint,
      symbol: r.symbol || '',
      name: r.name || '',
      pkg: r.pkg || '',
      channels: r.channels,
      contact: r.contact || '',
      notes: r.notes || '',
      placementNotes: r.placement_notes || '',
      status: r.status || 'pending',
      createdAt: r.created_at || r.createdAt || new Date().toISOString()
    };
  }
  function campToRow(c) {
    return {
      id: c.id,
      mint: c.mint,
      symbol: c.symbol || null,
      name: c.name || null,
      pkg: c.pkg || null,
      channels: c.channels != null ? c.channels : null,
      contact: c.contact || null,
      notes: c.notes || null,
      placement_notes: c.placementNotes || '',
      status: c.status || 'pending',
      created_at: c.createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async function init() {
    if (cfg.supabaseUrl && cfg.supabaseAnonKey && global.supabase) {
      try {
        sb = global.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
        const { error } = await sb.from('campaigns').select('id').limit(1);
        if (error) throw error;
        mode = 'cloud';
      } catch (e) {
        console.warn('DexRanker cloud unavailable, using localStorage', e);
        sb = null;
        mode = 'local';
      }
    }
    return mode;
  }

  async function list() {
    if (mode === 'cloud' && sb) {
      const { data, error } = await sb.from('campaigns').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(rowToCamp);
    }
    return localList();
  }

  async function upsert(c) {
    if (mode === 'cloud' && sb) {
      const { error } = await sb.from('campaigns').upsert(campToRow(c));
      if (error) throw error;
      return;
    }
    const list = localList();
    const i = list.findIndex(x => x.id === c.id);
    if (i >= 0) list[i] = c; else list.unshift(c);
    localSave(list);
  }

  async function setStatus(id, status) {
    if (mode === 'cloud' && sb) {
      const { error } = await sb.from('campaigns').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
      return;
    }
    const list = localList();
    const i = list.findIndex(x => x.id === id);
    if (i >= 0) { list[i].status = status; localSave(list); }
  }

  async function setNotes(id, placementNotes) {
    if (mode === 'cloud' && sb) {
      const { error } = await sb.from('campaigns').update({ placement_notes: placementNotes, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
      return;
    }
    const list = localList();
    const i = list.findIndex(x => x.id === id);
    if (i >= 0) { list[i].placementNotes = placementNotes; localSave(list); }
  }

  async function clearDone() {
    if (mode === 'cloud' && sb) {
      const { error } = await sb.from('campaigns').delete().eq('status', 'done');
      if (error) throw error;
      return;
    }
    localSave(localList().filter(c => c.status !== 'done'));
  }

  async function replaceAll(camps) {
    if (mode === 'cloud' && sb) {
      const rows = camps.map(campToRow);
      const { error } = await sb.from('campaigns').upsert(rows);
      if (error) throw error;
      return;
    }
    const existing = localList();
    const byId = {};
    existing.forEach(c => { byId[c.id] = c; });
    camps.forEach(c => { if (c && c.id) byId[c.id] = c; });
    localSave(Object.values(byId).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')));
  }

  global.CampaignStore = {
    init, list, upsert, setStatus, setNotes, clearDone, replaceAll,
    getMode: () => mode
  };
})(window);
