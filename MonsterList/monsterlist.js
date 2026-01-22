import { monsters } from './monster.mjs';

function uniq(arr) {
	return Array.from(new Set(arr)).sort((a,b)=> String(a).localeCompare(String(b)));
}

const TYPE_KEYWORDS = [
	'Aberration','Beast','Celestial','Construct','Dragon','Elemental','Fey','Fiend','Giant','Humanoid','Monstrosity','Ooze','Plant','Undead'
];

const BIOME_KEYWORDS = [
	'Acheron','Any','Arctic','Arid','Astral Plane','Caves','Coasts','Damp','Dark','Deserts','Dungeons','Elemental Plane','Forests','Grasslands','Hills','Hot Springs','Humanoid Settlements','Jungles','Labyrinths','Lakes','Limbo','Lower Planes','Mechanus','Mines','Moors','Mountains','Manor','Pastures','Plains','Remote','Roads','Rocky Terrain','Rocky Uplands','Ruins','Sacred Sites','Sewers','Shadowfell','Seas','Swamps','Tombs','Trails','Underdark','Underground','Underwater','Upper Planes','Urban','Vaults','Volcanoes','Wilderness','Wizard\'s Academy'
];

function collectGroups(monsters) {
	// CRs need numeric sorting (e.g., 1, 1/2, 1/4 should be in numeric order)
	let crs = Array.from(new Set(monsters.map(m => String(m.cr || '').trim()).filter(Boolean)));
	crs.sort((a, b) => {
		const na = crToNumber(a);
		const nb = crToNumber(b);
		if (isNaN(na) && isNaN(nb)) return String(a).localeCompare(String(b));
		if (isNaN(na)) return 1;
		if (isNaN(nb)) return -1;
		return na - nb;
	});
	// Use a fixed set of type keywords to keep the Type filter consistent
	const types = TYPE_KEYWORDS.slice();
	const sources = uniq(monsters.map(m => m.source || '').filter(Boolean));
	const biomes = BIOME_KEYWORDS.slice();
	return { crs, types, sources, biomes };
}

function createCheckbox(name, value, idPrefix) {
	const id = `${idPrefix}-${value.replace(/[^a-z0-9]+/gi,'_')}`;
	const wrapper = document.createElement('div');
	wrapper.className = 'checkbox-wrapper';
	const cb = document.createElement('input');
	cb.type = 'checkbox';
	cb.id = id;
	cb.value = value;
	const label = document.createElement('label');
	label.htmlFor = id;
	label.textContent = value;
	wrapper.appendChild(cb);
	wrapper.appendChild(label);
	return wrapper;
}

function renderFilters(groups, onChange) {
	const container = document.getElementById('filterGroups');
	container.innerHTML = '';
	container.style.display = 'block';
	container.style.width = '100%';
	container.style.boxSizing = 'border-box';
	function makeGroup(title, items, idPrefix) {
			const group = document.createElement('fieldset');
			group.className = 'filter-group';

			const legend = document.createElement('legend');
			legend.className = 'filter-legend';
			legend.textContent = title;
			legend.dataset.title = title;
			group.appendChild(legend);

			// content container that can be collapsed
			const content = document.createElement('div');
			content.className = 'filter-content collapsed';
			items.forEach(it => content.appendChild(createCheckbox(title, it, idPrefix, onChange)));
			group.appendChild(content);

			// collapsed state toggle (start collapsed)
			let collapsed = true;
			// start collapsed and toggle via class
			legend.setAttribute('aria-expanded', 'false');
			legend.addEventListener('click', () => {
				collapsed = !collapsed;
				content.classList.toggle('collapsed', collapsed);
				legend.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
			});

			// update legend with selected count when any checkbox in this group changes
			const updateLegendCount = () => {
				const total = content.querySelectorAll('input[type=checkbox]').length;
				const checked = content.querySelectorAll('input[type=checkbox]:checked').length;
				legend.textContent = checked > 0 ? `${legend.dataset.title} (${checked})` : legend.dataset.title;
			};
			// attach change listeners to update legend counts; do NOT auto-apply filters
			content.querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener('change', () => { updateLegendCount(); updateOuterLegendCount(); }));
			// initialize
			updateLegendCount();

			return group;
	}
	container.appendChild(makeGroup('CR', groups.crs, 'cr'));
	container.appendChild(makeGroup('Type', groups.types, 'type'));
	container.appendChild(makeGroup('Biome', groups.biomes, 'biome'));
	container.appendChild(makeGroup('Source', groups.sources, 'source'));
}

function readChecked() {
	const container = document.getElementById('filterGroups');
	const checked = { CR: new Set(), Type: new Set(), Biome: new Set(), Source: new Set() };
	container.querySelectorAll('input[type=checkbox]').forEach(cb => {
		if (!cb.checked) return;
		// Find the nearest fieldset ancestor and its legend to get the canonical group title
		const fieldset = cb.closest('fieldset');
		const legend = fieldset ? fieldset.querySelector('legend') : null;
		const fld = legend && legend.dataset && legend.dataset.title ? legend.dataset.title : (legend && legend.textContent ? legend.textContent.trim().replace(/\s*\(\d+\)$/, '') : null);
		if (!fld || !checked[fld]) {
			console.warn('Unknown filter group:', fld);
			return;
		}
		checked[fld].add(String(cb.value).trim());
	});
	return checked;
}

// Sorting state for the table
let sortState = { key: null, dir: 1 };
const SORT_STORAGE_KEY = 'monsterlist.sortState';
// Currently selected monster name (used to persist selection across renders)
let selectedMonsterName = null;

function saveSortState() {
	try {
		localStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(sortState));
	} catch (e) {
		// ignore write errors (e.g., private mode)
		console.warn('Could not save sort state', e);
	}
}

function loadSortState() {
	try {
		const s = localStorage.getItem(SORT_STORAGE_KEY);
		if (!s) return;
		const parsed = JSON.parse(s);
		if (parsed && (typeof parsed.key === 'string' || parsed.key === null) && (parsed.dir === 1 || parsed.dir === -1)) {
			sortState = { key: parsed.key, dir: parsed.dir };
		}
	} catch (e) {
		console.warn('Could not load sort state', e);
	}
}

function crToNumber(cr) {
	if (cr === undefined || cr === null || cr === '') return NaN;
	// Handle fractional CRs like "1/2"
	if (typeof cr === 'string' && cr.includes('/')) {
		const [n, d] = cr.split('/').map(s => parseFloat(s));
		if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
	}
	const v = parseFloat(cr);
	return isNaN(v) ? NaN : v;
}

function applySort(monsters) {
	if (!sortState.key) return monsters;
	const key = sortState.key;
	const dir = sortState.dir;
	const sorted = monsters.slice().sort((a,b) => {
		let va = a[key] || '';
		let vb = b[key] || '';
		// special handling
		if (key === 'cr') {
			const na = crToNumber(va);
			const nb = crToNumber(vb);
			if (isNaN(na) && isNaN(nb)) return 0;
			if (isNaN(na)) return 1;
			if (isNaN(nb)) return -1;
			return (na - nb) * dir;
		}
		if (key === 'biomes') {
			va = (va || []).join ? (va||[]).join(', ') : (Array.isArray(va) ? va.join(', ') : va);
			vb = (vb || []).join ? (vb||[]).join(', ') : (Array.isArray(vb) ? vb.join(', ') : vb);
		}
		// string compare
		return String(va).localeCompare(String(vb)) * dir;
	});
	return sorted;
}

function matchesMonster(m, checked) {
	// For each group, if checked set is non-empty, monster must match at least one of them
	const mcr = (m.cr === undefined || m.cr === null) ? '' : String(m.cr).trim();
	const mtype = (m.type === undefined || m.type === null) ? '' : String(m.type).trim();
	const msource = (m.source === undefined || m.source === null) ? '' : String(m.source).trim();
	if (checked.CR.size > 0 && !checked.CR.has(mcr)) return false;
	if (checked.Type.size > 0) {
		const mtypeLC = mtype.toLowerCase();
		const typeMatch = Array.from(checked.Type).some(t => mtypeLC.includes(String(t).trim().toLowerCase()));
		if (!typeMatch) return false;
	}
	if (checked.Source.size > 0 && !checked.Source.has(msource)) return false;
	if (checked.Biome.size > 0) {
		const mb = Array.isArray(m.biomes) ? m.biomes : [];
		const mbLower = mb.map(b => String(b).toLowerCase());
		const has = Array.from(checked.Biome).some(b => {
			const bLower = String(b).toLowerCase();
			return mbLower.some(mbl => mbl.includes(bLower));
		});
		if (!has) return false;
	}
	return true;
}

function showMonsterStatBlock(monster) {
	const statBlock = document.getElementById('monsters-stat-block');
	
	let html = `<button class="close-popup">&times;</button>`;
	html += `<h2>${monster.name}</h2>`;
	
	if (monster.type) html += `<div class="stat-row"><span class="stat-label">Type:</span> <span>${monster.type}</span></div>`;
	if (monster.alignment) html += `<div class="stat-row"><span class="stat-label">Alignment:</span> <span>${monster.alignment}</span></div>`;
	if (monster.ac) html += `<div class="stat-row"><span class="stat-label">AC:</span> <span>${monster.ac}</span></div>`;
	if (monster.hp) html += `<div class="stat-row"><span class="stat-label">HP:</span> <span>${monster.hp}</span></div>`;
	
	if (monster.speeds && monster.speeds.length > 0) {
		html += `<h3>Speed</h3>`;
		html += `<div>${monster.speeds.join(', ')}</div>`;
	}
	
	if (monster.str || monster.dex || monster.con || monster.int || monster.wis || monster.cha) {
		html += `<h3>Ability Scores</h3>`;
		if (monster.str) html += `<div class="stat-row"><span class="stat-label">STR:</span> <span>${monster.str}</span></div>`;
		if (monster.dex) html += `<div class="stat-row"><span class="stat-label">DEX:</span> <span>${monster.dex}</span></div>`;
		if (monster.con) html += `<div class="stat-row"><span class="stat-label">CON:</span> <span>${monster.con}</span></div>`;
		if (monster.int) html += `<div class="stat-row"><span class="stat-label">INT:</span> <span>${monster.int}</span></div>`;
		if (monster.wis) html += `<div class="stat-row"><span class="stat-label">WIS:</span> <span>${monster.wis}</span></div>`;
		if (monster.cha) html += `<div class="stat-row"><span class="stat-label">CHA:</span> <span>${monster.cha}</span></div>`;
	}
	
	if (monster.savthrows && monster.savthrows.length > 0) {
		html += `<h3>Saving Throws</h3>`;
		html += `<div>${monster.savthrows.join(', ')}</div>`;
	}
	
	if (monster.skills && monster.skills.length > 0) {
		html += `<h3>Skills</h3>`;
		html += `<div>${monster.skills.join(', ')}</div>`;
	}
	
	if (monster.damresistances && monster.damresistances.length > 0) {
		html += `<h3>Damage Resistances</h3>`;
		html += `<div>${monster.damresistances.join(', ')}</div>`;
	}
	
	if (monster.damimmunities && monster.damimmunities.length > 0) {
		html += `<h3>Damage Immunities</h3>`;
		html += `<div>${monster.damimmunities.join(', ')}</div>`;
	}
	
	if (monster.conimmunities && monster.conimmunities.length > 0) {
		html += `<h3>Condition Immunities</h3>`;
		html += `<div>${monster.conimmunities.join(', ')}</div>`;
	}
	
	if (monster.senses && monster.senses.length > 0) {
		html += `<h3>Senses</h3>`;
		html += `<div>${monster.senses.join(', ')}</div>`;
	}
	
	if (monster.languages && monster.languages.length > 0) {
		html += `<h3>Languages</h3>`;
		html += `<div>${monster.languages.join(', ')}</div>`;
	}
	
	if (monster.cr) html += `<div class="stat-row"><span class="stat-label">Challenge:</span> <span>${monster.cr}</span></div>`;
	if (monster.xp) html += `<div class="stat-row"><span class="stat-label">XP:</span> <span>${monster.xp}</span></div>`;
	
	if (monster.traits && monster.traits.length > 0) {
		html += `<h3>Traits</h3>`;
		monster.traits.forEach(trait => {
			html += `<div style="margin-bottom: 10px;">${trait}</div>`;
		});
	}
	
	if (monster.actions && monster.actions.length > 0) {
		html += `<h3>Actions</h3>`;
		monster.actions.forEach(action => {
			html += `<div style="margin-bottom: 10px;">${action}</div>`;
		});
	}
	
	if (monster.description) {
		html += `<h3>Description</h3>`;
		html += `<div>${monster.description}</div>`;
	}
	
	if (monster.addnote) {
		html += `<h3>Additional Notes</h3>`;
		html += `<div>${monster.addnote}</div>`;
	}
	
	if (monster.source) {
		html += `<h3>Source</h3>`;
		html += `<div>${monster.source}</div>`;
	}
	
	statBlock.innerHTML = html;
	statBlock.classList.add('active');
	
	// Add close button functionality
	const closeBtn = statBlock.querySelector('.close-popup');
	if (closeBtn) {
		closeBtn.addEventListener('click', () => {
			statBlock.classList.remove('active');
		});
	}
}

function closeMonsterStatBlock() {
	const statBlock = document.getElementById('monsters-stat-block');
	statBlock.classList.remove('active');
}

function renderList(monsters, checked) {
	const tbody = document.getElementById('monster-table-body');
	tbody.innerHTML = '';
	let matches = monsters.filter(m => matchesMonster(m, checked));
	// apply current sort
	matches = applySort(matches);
	const info = document.getElementById('filterInfo');
	info.textContent = `${matches.length} monsters shown`;
	matches.forEach(m => {
		const tr = document.createElement('tr');
		tr.tabIndex = 0; // make rows focusable for keyboard
		const nameTd = document.createElement('td');
		nameTd.textContent = m.name;
		nameTd.style.cursor = 'pointer';
		const crTd = document.createElement('td');
		crTd.textContent = m.cr;
		const typeTd = document.createElement('td');
		typeTd.textContent = m.type;
		const biomesTd = document.createElement('td');
		biomesTd.textContent = (m.biomes || []).join(', ');
		const alignTd = document.createElement('td');
		alignTd.textContent = m.alignment || '';
		const srcTd = document.createElement('td');
		srcTd.textContent = m.source || '';
		tr.appendChild(nameTd);
		tr.appendChild(crTd);
		tr.appendChild(typeTd);
		tr.appendChild(biomesTd);
		tr.appendChild(alignTd);
		tr.appendChild(srcTd);
		tbody.appendChild(tr);
		// row click selects the row and persists selection until clicking elsewhere
		tr.addEventListener('click', (ev) => {
			ev.stopPropagation();
			// Show the stat block popup
			showMonsterStatBlock(m);
			// clear previous selection
			if (selectedMonsterName && selectedMonsterName !== m.name) {
				const prev = document.querySelector('#monster-table tbody tr.selected');
				if (prev) prev.classList.remove('selected');
			}
			// toggle selection for this row
			if (tr.classList.contains('selected')) {
				tr.classList.remove('selected');
				selectedMonsterName = null;
			} else {
				tr.classList.add('selected');
				selectedMonsterName = m.name;
			}
		});
		// also allow keyboard selection via Enter/Space
		tr.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); tr.click(); } });
	});
	// restore selection if needed (after render)
	if (selectedMonsterName) {
		const restore = Array.from(tbody.querySelectorAll('tr')).find(r => r.firstElementChild && r.firstElementChild.textContent === selectedMonsterName);
		if (restore) restore.classList.add('selected');
	}

		// update header sort indicators
		document.querySelectorAll('#monster-table thead th.sortable').forEach(th => {
			const key = th.dataset.key;
			th.classList.remove('sorted-asc','sorted-desc');
			th.setAttribute('aria-sort','none');
			if (sortState.key === key) {
				if (sortState.dir === 1) { th.classList.add('sorted-asc'); th.setAttribute('aria-sort','ascending'); }
				else { th.classList.add('sorted-desc'); th.setAttribute('aria-sort','descending'); }
			}
		});
}

function clearFilters() {
	document.querySelectorAll('#filterGroups input[type=checkbox]').forEach(cb => cb.checked = false);
	// reset legend counts
	document.querySelectorAll('#filterGroups fieldset legend').forEach(legend => {
		if (legend.dataset && legend.dataset.title) legend.textContent = legend.dataset.title;
	});
	// reset outer Filters legend
	const outer = document.getElementById('filtersLegend');
	if (outer && outer.dataset && outer.dataset.title) outer.textContent = outer.dataset.title;
}

function updateOuterLegendCount() {
	const outer = document.getElementById('filtersLegend');
	if (!outer) return;
	const totalChecked = document.querySelectorAll('#filterGroups input[type=checkbox]:checked').length;
	outer.textContent = totalChecked > 0 ? `${outer.dataset.title || 'Filters'} (${totalChecked})` : (outer.dataset.title || 'Filters');
}


document.addEventListener('DOMContentLoaded', () => {
	const groups = collectGroups(monsters);
	renderFilters(groups);

	// Setup scroll to top button
	const scrollToTopBtn = document.getElementById('scrollToTopBtn');
	const tableHeader = document.querySelector('#monster-table thead tr');
	
	const handleScroll = () => {
		if (tableHeader) {
			const headerRect = tableHeader.getBoundingClientRect();
			if (headerRect.top < 0) {
				scrollToTopBtn.style.display = 'block';
			} else {
				scrollToTopBtn.style.display = 'none';
			}
		}
	};
	
	if (scrollToTopBtn && tableHeader) {
		scrollToTopBtn.addEventListener('click', () => {
			tableHeader.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
		window.addEventListener('scroll', handleScroll);
	}

	// Apply Filters button: apply current checked filters to the table
	const applyBtn = document.getElementById('applyFiltersButton');
	if (applyBtn) {
		applyBtn.addEventListener('click', () => {
			try {
				const checked = readChecked();
				// apply and render
				renderList(monsters, checked);
				updateOuterLegendCount();
			} catch (err) {
				console.error('Error applying filters', err);
			}
		});
	}

	// attach click handlers to headers for sorting
	document.querySelectorAll('#monster-table thead th.sortable').forEach(th => {
		th.style.cursor = 'pointer';
		th.tabIndex = 0; // make focusable for keyboard
		const key = th.dataset.key;
		const toggle = () => {
			if (sortState.key === key) sortState.dir = -sortState.dir;
			else { sortState.key = key; sortState.dir = 1; }
			saveSortState();
			renderList(monsters, readChecked());
		};
		th.addEventListener('click', toggle);
		th.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(); } });
	});

	// setup outer legend toggle and store title
	const outerLegend = document.getElementById('filtersLegend');
	const outerContent = document.getElementById('filtersContent');
	if (outerLegend && outerContent) {
		outerLegend.dataset.title = outerLegend.textContent;
		// start collapsed
		outerContent.style.display = 'none';
		outerLegend.setAttribute('aria-expanded', 'false');
		outerLegend.addEventListener('click', () => {
			const wasCollapsed = outerContent.style.display === 'none';
			outerContent.style.display = wasCollapsed ? 'block' : 'none';
			outerLegend.setAttribute('aria-expanded', wasCollapsed ? 'true' : 'false');
		});
	}

	const clearBtn = document.getElementById('clearButton');
	clearBtn.addEventListener('click', () => {
		clearFilters();
		renderList(monsters, readChecked());
	});

	// initial render with no filters => show all
	renderList(monsters, readChecked());

	// update outer legend counts initially
	updateOuterLegendCount();

	// clicking outside the table clears any selection
	document.addEventListener('click', (ev) => {
		const statBlock = document.getElementById('monsters-stat-block');
		const table = document.getElementById('monster-table');
		// Close stat block if clicking outside of it
		if (statBlock && statBlock.classList.contains('active') && !statBlock.contains(ev.target)) {
			closeMonsterStatBlock();
		}
		// Clear row selection if clicking outside the table
		if (table && !table.contains(ev.target)) {
			const prev = document.querySelector('#monster-table tbody tr.selected');
			if (prev) {
				prev.classList.remove('selected');
				selectedMonsterName = null;
			}
		}
	});
});

