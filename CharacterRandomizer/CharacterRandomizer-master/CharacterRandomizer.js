// CharacterRandomizer.js - moved from inline <script>

(function () {
  // helpers
  function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // racesData will be loaded from races.json (same directory)
  let racesData = null;

  let classesData = null;

  let backgroundsData = null;

  async function loadData() {
    // load races.json, classes.json and backgrounds.json in parallel
    try {
      const [rRes, cRes, bRes] = await Promise.all([fetch('./races.json'), fetch('./classes.json'), fetch('./backgrounds.json')]);
      if (!rRes.ok) throw new Error('Failed to fetch races.json: ' + rRes.status);
      if (!cRes.ok) throw new Error('Failed to fetch classes.json: ' + cRes.status);
      if (!bRes.ok) throw new Error('Failed to fetch backgrounds.json: ' + bRes.status);
      racesData = await rRes.json();
      classesData = await cRes.json();
      backgroundsData = await bRes.json();
    } catch (err) {
      console.error('Could not load races/classes/backgrounds json, falling back to minimal data.', err);
      // Fallback minimal data to keep functionality
      racesData = {
        "Human": ["None"],
        "Elf": ["High Elf", "Wood Elf"],
        "Dwarf": ["Hill Dwarf", "Mountain Dwarf"]
      };
      classesData = {
        "Fighter": { "pre": "", "post": "", "subclasses": ["Champion"] },
        "Wizard": { "pre": "School of ", "post": "", "subclasses": ["Abjuration", "Evocation"] }
      };
      backgroundsData = ["Outlander", "Soldier", "Sage"];
    }
  }

  function get_race() {
    if (!racesData) {
      // if not loaded yet, return a safe default
      return 'Human';
    }
    const keys = Object.keys(racesData);
    return rand(keys);
  }

  function get_subrace(race) {
    if (!racesData || !racesData[race]) return 'None';
    const r = racesData[race];
    // support new structure: r.subraces is an object of subraceName -> { ability_mods }
    if (r.subraces && typeof r.subraces === 'object') {
      const keys = Object.keys(r.subraces);
      if (keys.length === 0) return 'None';
      return rand(keys);
    }
    // fallback: if r is still an array (older format)
    if (Array.isArray(r)) {
      if (r.length === 0) return 'None';
      return rand(r);
    }
    return 'None';
  }

  // Return ability modifiers object for a race (may be empty object)
  function get_race_ability_mods(race) {
    if (!racesData || !racesData[race]) return {};
    const r = racesData[race];
    return (r && r.ability_mods) ? r.ability_mods : {};
  }

  // Return ability modifiers object for a subrace (may be empty object)
  function get_subrace_ability_mods(race, subrace) {
    if (!racesData || !racesData[race]) return {};
    const r = racesData[race];
    if (!r.subraces) return {};
    const s = r.subraces[subrace];
    return (s && s.ability_mods) ? s.ability_mods : {};
  }

  // Merge mods from `mods` into `combined`.
  // `mods` values may be numbers or the string "N/A" (for flexible choices).
  function mergeMods(combined, mods) {
    Object.keys(mods || {}).forEach(k => {
      const v = mods[k];
      if (v === "N/A") {
        combined[k] = "N/A";
        return;
      }
      const num = Number(v);
      if (Number.isNaN(num)) return;
      if (combined[k] === "N/A") return;
      combined[k] = (combined[k] || 0) + num;
    });
  }

  // Get a class name, optionally filtered by substring (case-insensitive).
  // If `filterStr` is provided and no class matches, returns null.
  function get_class(filterStr) {
    if (!classesData) return 'Fighter';
    const keys = Object.keys(classesData);
    if (!filterStr) return rand(keys);
    const f = String(filterStr).trim().toLowerCase();
    if (!f) return rand(keys);
    // match either class name or any subclass name
    const candidates = keys.filter(k => {
      if (k.toLowerCase().includes(f)) return true;
      const entry = classesData[k];
      const subs = Array.isArray(entry.subclasses) ? entry.subclasses : [];
      return subs.some(s => String(s).toLowerCase().includes(f));
    });
    return candidates.length ? rand(candidates) : null;
  }

  function get_subclass(aclass, filterStr) {
    // If `filterStr` matches a subclass name for this class, prefer that subclass.
    if (!aclass) return '(No Subclass)';
    if (!classesData || !classesData[aclass]) return '(No Subclass)';
    const entry = classesData[aclass];
    const pre = entry.pre || '';
    const post = entry.post || '';
    const subs = Array.isArray(entry.subclasses) && entry.subclasses.length ? entry.subclasses : ['(No Subclass)'];
    if (filterStr) {
      const f = String(filterStr).trim().toLowerCase();
      if (f) {
        const found = subs.find(s => String(s).toLowerCase().includes(f));
        if (found) return pre + found + post;
      }
    }
    return pre + rand(subs) + post;
  }

  // Return ability preference array for a class (may be empty)
  function get_class_ability_preferences(aclass) {
    if (!classesData || !classesData[aclass]) return [];
    const entry = classesData[aclass];
    return Array.isArray(entry.ability_preferences) ? entry.ability_preferences : [];
  }

  function get_background() {
    if (Array.isArray(backgroundsData) && backgroundsData.length) return rand(backgroundsData);
    // fallback: small builtin list
    const backgrounds = ["Acolyte", "Charlatan", "Outlander", "Soldier", "Sage"];
    return rand(backgrounds);
  }

  // Choose a race+subrace that best matches a class's ability preferences.
  // Returns { race, subrace, combinedMods }.
  function chooseRaceForClass(aclass) {
    const prefs = get_class_ability_preferences(aclass) || [];
    const races = racesData ? Object.keys(racesData) : [];
    let best = [];
    let bestScore = -1;

    races.forEach(race => {
      const rEntry = racesData[race] || {};
      const subKeys = (rEntry.subraces && Object.keys(rEntry.subraces).length) ? Object.keys(rEntry.subraces) : ['None'];
      subKeys.forEach(sub => {
        const combined = {};
        mergeMods(combined, get_race_ability_mods(race));
        mergeMods(combined, get_subrace_ability_mods(race, sub));

        // scoring: prefer numeric positive ASIs matching class prefs, then flexible 'N/A' on specific ability, then ANY:N/A
        let score = 0;
        prefs.forEach(pref => {
          const v = combined[pref];
          if (v === "N/A") score += 6;
          else if (typeof v === 'number' && v > 0) score += 10;
          else if (combined['ANY'] === 'N/A') score += 4;
        });

        if (score > bestScore) {
          bestScore = score;
          best = [{ race, sub, combined }];
        } else if (score === bestScore) {
          best.push({ race, sub, combined });
        }
      });
    });

    if (bestScore <= 0 || best.length === 0) {
      // no good match — pick a random race/subrace
      const r = get_race();
      const s = get_subrace(r);
      const combined = {};
      mergeMods(combined, get_race_ability_mods(r));
      mergeMods(combined, get_subrace_ability_mods(r, s));
      return { race: r, subrace: s, combinedMods: combined };
    }

    // Also include flexible ANY matches as compatible candidates so users see races
    // that can pick any ability ("ANY": "N/A") even if they score lower.
    const candidates = best.slice();
    races.forEach(race => {
      const rEntry = racesData[race] || {};
      const subKeys = (rEntry.subraces && Object.keys(rEntry.subraces).length) ? Object.keys(rEntry.subraces) : ['None'];
      subKeys.forEach(sub => {
        const combined = {};
        mergeMods(combined, get_race_ability_mods(race));
        mergeMods(combined, get_subrace_ability_mods(race, sub));
        if (combined['ANY'] === 'N/A') {
          // avoid duplicates (compare race+sub)
          const exists = candidates.some(c => c.race === race && c.sub === sub);
          if (!exists) candidates.push({ race, sub, combined });
        }
      });
    });

    const pick = rand(candidates);
    return { race: pick.race, subrace: pick.sub, combinedMods: pick.combined };
  }

  // Wire button to generate a full character and display it
  function renderFullCharacter(classFilter) {
    const race = get_race();
    const subrace = get_subrace(race);
    const aclass = get_class(classFilter);
    if (aclass === null) return `No class matches filter "${classFilter}"`;
    const subclass = get_subclass(aclass, classFilter);
    const background = get_background();

    // combine ability mods from race and subrace
    const raceMods = get_race_ability_mods(race) || {};
    const subraceMods = get_subrace_ability_mods(race, subrace) || {};
    const combined = {};
    mergeMods(combined, raceMods);
    mergeMods(combined, subraceMods);
    const modsText = Object.keys(combined).length ? Object.keys(combined).map(k => {
      const val = combined[k];
      return val === "N/A" ? `${k} N/A` : `${k} ${val >= 0 ? '+' : ''}${val}`;
    }).join(', ') : 'None';

    const classPrefs = get_class_ability_preferences(aclass);
    const prefsText = classPrefs.length ? classPrefs.join(', ') : 'None';
    return `Race: ${race}<br>Subrace: ${subrace}<br>Ability mods: ${modsText}<br>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>Class: ${aclass}<br>Subclass: ${subclass}<br>Ability preferences: ${prefsText}<br>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>Background: ${background}`;
  }

  // generate one item according to action code (1-7)
  function generateOnce(action, classFilter) {
    // action is numeric-or-string; use string switch
    const a = String(action);
    if (a === '1') return renderFullCharacter();
    if (a === '2') {
      const race = get_race();
      const sub = get_subrace(race);
      const raceMods = get_race_ability_mods(race) || {};
      const subMods = get_subrace_ability_mods(race, sub) || {};
      const combined = {};
      mergeMods(combined, raceMods);
      mergeMods(combined, subMods);
      const modsText = Object.keys(combined).length ? Object.keys(combined).map(k => {
        const val = combined[k];
        return val === "N/A" ? `${k} N/A` : `${k} ${val >= 0 ? '+' : ''}${val}`;
      }).join(', ') : 'None';
      return `Race: ${race}<br>Subrace: ${sub}<br>Ability mods: ${modsText}`;
    }
    if (a === '3') {
      const cls = get_class(classFilter);
      if (cls === null) return `No class matches filter "${classFilter}"`;
      const prefs = get_class_ability_preferences(cls);
      const prefsText = prefs.length ? prefs.join(', ') : 'None';
      return `Class: ${cls}<br>Subclass: ${get_subclass(cls, classFilter)}<br>Ability preferences: ${prefsText}`;
    }
    if (a === '4') {
      return `Background: ${get_background()}`;
    }
    if (a === '5') {
      const race = get_race();
      const cls = get_class(classFilter);
      if (cls === null) return `No class matches filter "${classFilter}"`;
      const prefs = get_class_ability_preferences(cls);
      const prefsText = prefs.length ? prefs.join(', ') : 'None';
      return `Race: ${race}<br>Subrace: ${get_subrace(race)}<br>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>Class: ${cls}<br>Subclass: ${get_subclass(cls, classFilter)}<br>Ability preferences: ${prefsText}`;
    }
    if (a === '6') {
      const race = get_race();
      return `Race: ${race}<br>Subrace: ${get_subrace(race)}<br>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>Background: ${get_background()}`;
    }
    if (a === '7') {
      const cls = get_class(classFilter);
      if (cls === null) return `No class matches filter "${classFilter}"`;
      const prefs = get_class_ability_preferences(cls);
      const prefsText = prefs.length ? prefs.join(', ') : 'None';
      return `Class: ${cls}<br>Subclass: ${get_subclass(cls, classFilter)}<br>Ability preferences: ${prefsText}<br>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>Background: ${get_background()}`;
    }
    if (a === '8') {
      // Maximize: pick a class and then pick the race+subrace that best matches that class's ability preferences
      const cls = get_class(classFilter);
      if (cls === null) return `No class matches filter "${classFilter}"`;
      const subclass = get_subclass(cls, classFilter);
      const prefs = get_class_ability_preferences(cls);
      const choice = chooseRaceForClass(cls);

      const mods = choice.combinedMods || {};
      const modsText = Object.keys(mods).length ? Object.keys(mods).map(k => {
        const val = mods[k];
        return val === "N/A" ? `${k} N/A` : `${k} ${val >= 0 ? '+' : ''}${val}`;
      }).join(', ') : 'None';

      const prefsText = prefs.length ? prefs.join(', ') : 'None';
      return `Class: ${cls}<br>Subclass: ${subclass}<br>Ability preferences: ${prefsText}<br>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>Race: ${choice.race}<br>Subrace: ${choice.subrace}<br>Ability mods: ${modsText}`;
    }
    return '';
  }

  document.addEventListener('DOMContentLoaded', async function () {
    const statusEl = document.getElementById('status');
    if (statusEl) statusEl.textContent = 'Loading data...';
    try {
      await loadData();
      if (statusEl) statusEl.textContent = 'Ready — press Generate';
      // populate class/subclass datalist for autocomplete
      try {
        const listEl = document.getElementById('classList');
        const inputEl = document.getElementById('classFilter');
        if (listEl && classesData) {
          // collect unique names
          const seen = new Set();
          Object.keys(classesData).forEach(cls => {
            if (!seen.has(cls)) {
              const opt = document.createElement('option');
              opt.value = cls;
              listEl.appendChild(opt);
              seen.add(cls);
            }
            const subs = Array.isArray(classesData[cls].subclasses) ? classesData[cls].subclasses : [];
            subs.forEach(s => {
              const sval = String(s);
              if (!seen.has(sval)) {
                const opt = document.createElement('option');
                opt.value = sval;
                listEl.appendChild(opt);
                seen.add(sval);
              }
            });
          });
        }
      } catch (e) {
        console.warn('Could not populate class datalist', e);
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = 'Error loading data; using fallback lists.';
      console.error(err);
    }

    const btn = document.getElementById('buttonID');
    const output = document.getElementById('output');
    if (!btn || !output) {
      if (statusEl) statusEl.textContent = 'Required elements missing from page.';
      return;
    }

    btn.addEventListener('click', function () {
      // determine action and quantity
      const actionSel = document.getElementById('actionSelect');
      const classFilterEl = document.getElementById('classFilter');
      const qtyEl = document.getElementById('quantity');
      const action = actionSel ? actionSel.value : '1';
      let qty = 1;
      const classFilter = classFilterEl ? classFilterEl.value : '';
      if (qtyEl) {
        qty = parseInt(qtyEl.value, 10) || 1;
        if (qty < 1) qty = 1;
        if (qty > 200) qty = 200;
      }

      // generate requested number of results
      const parts = [];
      for (let i = 0; i < qty; i++) {
        parts.push(generateOnce(action, classFilter));
      }
      output.innerHTML = parts.map((p, idx) => `<div class="gen-item">${p}</div>`).join('<hr>');
      if (statusEl) statusEl.textContent = `Generated ${qty} item${qty===1?'':'s'} at ${new Date().toLocaleTimeString()}`;
    });
  });
})();
