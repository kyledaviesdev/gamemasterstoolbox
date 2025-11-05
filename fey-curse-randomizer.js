document.addEventListener('DOMContentLoaded', () => {
    const curseButton = document.getElementById('random-curse-btn');
    const curseList = document.getElementById('randomized-curse');
  
    async function fetchAndDisplayCurse() {
      try {
        const response = await fetch('fey-curses.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const curses = data.feyCurses;
        const randomIndex = Math.floor(Math.random() * curses.length);
        const randomCurse = curses[randomIndex];
  
        // Clear previous curse
        curseList.innerHTML = '';
  
        // Create list item for the new curse
        const listItem = document.createElement('li');
        listItem.textContent = randomCurse;
        curseList.appendChild(listItem);
      } catch (error) {
        console.error('Could not fetch or display curse:', error);
        curseList.innerHTML = '<li>Error loading curse.</li>';
      }
    }
  
    // Display a curse when the page loads
    fetchAndDisplayCurse();
  
    // Display a new curse when the button is clicked
    curseButton.addEventListener('click', fetchAndDisplayCurse);
  });