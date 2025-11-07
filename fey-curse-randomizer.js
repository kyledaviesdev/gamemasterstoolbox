document.addEventListener('DOMContentLoaded', () => {
    const curseButton = document.getElementById('random-curse-btn');
  const curseTableBody = document.querySelector('#curse-table tbody');
  const curseHeading = document.getElementById('curse-heading');
  // Back-compat: older markup used a single-item list with id `randomized-curse`.
  // Detect it and update it if present to avoid null deref errors from cached/legacy code.
  const legacyCurseList = document.getElementById('randomized-curse');

    function shuffleArray(array) {
      // Fisher-Yates shuffle
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function buildRandomList(curses, count = 100) {
      const result = [];
      if (!Array.isArray(curses) || curses.length === 0) return result;

      if (curses.length >= count) {
        // shuffle a copy and take the first `count` unique items
        const copy = curses.slice();
        shuffleArray(copy);
        return copy.slice(0, count);
      }

      // If there are fewer curses than count, pick random items with replacement
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * curses.length);
        result.push(curses[idx]);
      }
      return result;
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c]));
    }

    // Render the given array of curses into two columns with 50 rows each
    function renderTableTwoColumns(curseArray) {
      const rows = 50;
      // Ensure we have exactly rows*2 slots (fill with empty strings if needed)
      const totalNeeded = rows * 2;
      let filled = Array.isArray(curseArray) ? curseArray.slice() : [];

      if (filled.length === 0) {
        // no curses available, fill with empty strings to avoid runtime errors
        filled = new Array(totalNeeded).fill('');
      } else {
        while (filled.length < totalNeeded) {
          // If not enough unique curses, pick random ones with replacement
          const idx = Math.floor(Math.random() * curseArray.length);
          filled.push(curseArray[idx] || '');
        }
      }

      // Only manipulate the DOM if the table body exists
      if (curseTableBody) {
        // Clear existing rows
        curseTableBody.innerHTML = '';

        for (let r = 0; r < rows; r++) {
          const leftIdx = r;
          const rightIdx = r + rows;
          const tr = document.createElement('tr');

          const tdLeft = document.createElement('td');
          const leftNumber = leftIdx < filled.length ? leftIdx + 1 : '';
          const leftText = leftIdx < filled.length ? filled[leftIdx] : '';
          tdLeft.innerHTML = leftNumber ? `<strong>${leftNumber}.</strong> ${escapeHtml(leftText)}` : '';
          tdLeft.style.padding = '6px 8px';

          const tdRight = document.createElement('td');
          const rightNumber = rightIdx < filled.length ? rightIdx + 1 : '';
          const rightText = rightIdx < filled.length ? filled[rightIdx] : '';
          tdRight.innerHTML = rightNumber ? `<strong>${rightNumber}.</strong> ${escapeHtml(rightText)}` : '';
          tdRight.style.padding = '6px 8px';

          tr.appendChild(tdLeft);
          tr.appendChild(tdRight);
          curseTableBody.appendChild(tr);
        }
      }

      // Update legacy single-curse list (if present) for backwards compatibility.
      if (legacyCurseList) {
        try {
          legacyCurseList.innerHTML = '';
          const li = document.createElement('li');
          li.textContent = filled.length > 0 ? filled[0] : 'No curses available.';
          legacyCurseList.appendChild(li);
        } catch (e) {
          console.warn('Could not update legacy curse list:', e);
        }
      }
    }

    async function fetchAndDisplayTable() {
      try {
        const response = await fetch('fey-curses.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const curses = data.feyCurses || [];

        // Update heading with count of possible curses
        try {
          const count = Array.isArray(curses) ? curses.length : 0;
          if (curseHeading) curseHeading.textContent = `Fey Curses (${count} Curses)`;
        } catch (e) {
          if (curseHeading) curseHeading.textContent = `Fey Curses (0 Curses)`;
        }

        const randomized = buildRandomList(curses, 100);
        renderTableTwoColumns(randomized);
      } catch (error) {
        console.error('Could not fetch or display curses table:', error);
        if (curseHeading) curseHeading.textContent = `Fey Curses (0 Curses)`;
        curseTableBody.innerHTML = '<tr><td colspan="2">Error loading curses.</td></tr>';
      }
    }

    // Display table when page loads
    fetchAndDisplayTable();

    // Re-randomize table when button is clicked
    curseButton.addEventListener('click', fetchAndDisplayTable);
  });