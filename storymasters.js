  function hamburgerMenu() {
    document.getElementById("hamburgerMenu").classList.toggle("show");
  
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
  
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function divPopUp() {
    document.getElementById("character-popup").style.display = "block";
  }
  
  // Function to close the pop-up using the close button
  function closePopUp() {
    document.getElementById("character-popup").style.display = "none";
  }
