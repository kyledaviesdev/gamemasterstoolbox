import { monsters } from './monster.mjs';

function uniq(arr) {
	return Array.from(new Set(arr)).sort((a,b)=> String(a).localeCompare(String(b)));
}

function collectGroups(monsters) {
	const crs = uniq(monsters.map(m => m.cr || '').filter(Boolean));
	const types = uniq(monsters.map(m => m.type || '').filter(Boolean));
	const sources = uniq(monsters.map(m => m.source || '').filter(Boolean));
	const biomes = uniq([].concat(...monsters.map(m => Array.isArray(m.biomes)? m.biomes : [])).filter(Boolean));
	return { crs, types, sources, biomes };
}

function createCheckbox(name, value, idPrefix, onChange) {
	const id = `${idPrefix}-${value.replace(/[^a-z0-9]+/gi,'_')}`;
	const wrapper = document.createElement('div');
	wrapper.style.display = 'inline-flex';
	wrapper.style.alignItems = 'center';
	wrapper.style.gap = '6px';
	const cb = document.createElement('input');
	cb.type = 'checkbox';
	cb.id = id;
	cb.value = value;
	cb.addEventListener('change', onChange);
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
			group.style.border = '1px solid #ddd';
			group.style.padding = '6px';
			group.style.width = '100%';
			group.style.boxSizing = 'border-box';
			group.style.marginBottom = '8px';

			const legend = document.createElement('legend');
			legend.textContent = title;
			legend.dataset.title = title;
			legend.style.cursor = 'pointer';
			group.appendChild(legend);

			// content container that can be collapsed
			const content = document.createElement('div');
			content.style.display = 'flex';
			content.style.flexWrap = 'wrap';
			content.style.gap = '8px';
			content.style.marginTop = '6px';
			content.style.width = '100%';
			content.style.boxSizing = 'border-box';
			items.forEach(it => content.appendChild(createCheckbox(title, it, idPrefix, onChange)));
			group.appendChild(content);

			// collapsed state toggle (start collapsed)
			let collapsed = true;
			content.style.display = 'none';
			legend.setAttribute('aria-expanded', 'false');
			legend.addEventListener('click', () => {
				collapsed = !collapsed;
				content.style.display = collapsed ? 'none' : 'flex';
				legend.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
			});

			// update legend with selected count when any checkbox in this group changes
			const updateLegendCount = () => {
				const total = content.querySelectorAll('input[type=checkbox]').length;
				const checked = content.querySelectorAll('input[type=checkbox]:checked').length;
				legend.textContent = checked > 0 ? `${legend.dataset.title} (${checked})` : legend.dataset.title;
			};
			// attach change listeners to update legend count
			content.querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener('change', () => { updateLegendCount(); updateOuterLegendCount(); onChange(); }));
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
		const fld = cb.parentElement.parentElement.querySelector('legend').textContent;
		checked[fld].add(cb.value);
	});
	return checked;
}

// Sorting state for the table
let sortState = { key: null, dir: 1 };
const SORT_STORAGE_KEY = 'monsterlist.sortState';

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
	if (checked.CR.size > 0 && !checked.CR.has(m.cr)) return false;
	if (checked.Type.size > 0 && !checked.Type.has(m.type)) return false;
	if (checked.Source.size > 0 && !checked.Source.has(m.source)) return false;
	if (checked.Biome.size > 0) {
		const mb = Array.isArray(m.biomes) ? m.biomes : [];
		const has = Array.from(checked.Biome).some(b => mb.includes(b));
		if (!has) return false;
	}
	return true;
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
		const nameTd = document.createElement('td');
		nameTd.textContent = m.name;
		const crTd = document.createElement('td');
		crTd.textContent = m.cr;
		const typeTd = document.createElement('td');
		typeTd.textContent = m.type;
		const biomesTd = document.createElement('td');
		biomesTd.textContent = (m.biomes || []).join(', ');
		const srcTd = document.createElement('td');
		srcTd.textContent = m.source || '';
		tr.appendChild(nameTd);
		tr.appendChild(crTd);
		tr.appendChild(typeTd);
		tr.appendChild(biomesTd);
		tr.appendChild(srcTd);
		tbody.appendChild(tr);
	});

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
	renderFilters(groups, () => {
		const checked = readChecked();
		renderList(monsters, checked);
	});

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
});

