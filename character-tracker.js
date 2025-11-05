import jobs from "./storymastersclasses.mjs";
import species from "./storymastersspecies.mjs";
import backgrounds from "./storymastersbackgrounds.mjs";
let characters = [];
let n = 0;

const hamburgerBtn = document.getElementById("hamburgerBtn")
hamburgerBtn.addEventListener("click", hamburgerMenu)
const ccharbtn = document.getElementById("create-char-btn")
ccharbtn.addEventListener("click", divPopUp)
const addChar = document.getElementById("add-char-btn")
addChar.addEventListener("click", addNewCharacter)
const saveChars = document.getElementById("save-chars")
saveChars.addEventListener("click", saveCharacters)
const loadChars = document.getElementById("load-chars")
loadChars.addEventListener("click", loadCharacters)
const close = document.getElementById("close-button")
close.addEventListener("click", closePopUp)
const addSJ = document.getElementById('character-job-input')
addSJ.addEventListener("input", presentSjOptions)
const addSS = document.getElementById('character-species-input')
addSS.addEventListener("input", presentSsOptions)
const addPIBF = document.getElementById('character-background-input')
addPIBF.addEventListener("input", presentPIBFOptions)

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
  let spInput = document.getElementById("character-species-input")
  let spDatalist = document.createElement('datalist')
  spDatalist.setAttribute('id', 'species')
  species.forEach(race => {
    let option = document.createElement('option');
    option.textContent = race.name;
    spDatalist.appendChild(option);
  });
  spInput.appendChild(spDatalist)
  let clInput = document.getElementById("character-job-input")
  let clDatalist = document.createElement('datalist')
  clDatalist.setAttribute('id', 'jobs')
  jobs.forEach(job => {
    let option = document.createElement('option');
    option.textContent = job.name;
    clDatalist.appendChild(option);
  });
  clInput.appendChild(clDatalist)
  let bkgInput = document.getElementById("character-background-input")
  let bkgDatalist = document.createElement('datalist')
  bkgDatalist.setAttribute('id', 'backgounds')
  backgrounds.forEach(background => {
    let option = document.createElement('option');
    option.textContent = background.name;
    bkgDatalist.appendChild(option);
  });
  bkgInput.appendChild(bkgDatalist)
}

// Function to close the pop-up using the close button
function closePopUp() {
  document.getElementById("character-popup").style.display = "none";
}


  function addTags(tags, tagBox) {
    tags.forEach(tag => {
      const button = document.createElement('button');
      button.classList.add('tag-button');
      button.setAttribute('type', 'button');
      button.textContent = tag;
      button.addEventListener('click', () => filterByTag(tag));
      tagBox.appendChild(button);
    });
  }

  function addList(list, itemBox, listType) {
    list.forEach(item => {
      const button = document.createElement('button');
      button.classList.add('item-button');
      button.setAttribute('type', 'button');
      button.textContent = item;
      button.addEventListener('click', () => {switch (listType) {
        case "traits":
            filterByTraits(item)
          break;
        case "allies":
            filterByAllies(item)
          break;
        case "languages":
            filterByLanguages(item)
          break;
      }});
      itemBox.appendChild(button);
    });
  }

const characterList = document.getElementById('character-list');

function createcharacterListItem(character) {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character')

    characterDiv.innerHTML = `
        <div class="character-personalities">
            <h3 class="character-name">Name: ${character.name}</h3>
            <h3 class="character-personality">Personality: ${character.personality}</h3>
            <h3 class="character-ideals">Ideals: ${character.ideals}</h3>
            <h3 class="character-bonds">Bonds: ${character.bonds}</h3>
            <h3 class="character-flaws">Flaws: ${character.flaws}</h3>
            <div id="character-traits-${n}" class="traits-buttons-box">
                <h3 class="character-traits">Traits: </h3>
            </div>
        </div>
        <div class="character-being">
            <h3 class="character-species">Species: ${character.species}</h3>
            <h3 class="character-subspecies">Subspecies: ${character.subspecies}</h3>
            <div class="class-section">
              <img src="${character.icon}" class="pic-on-color">
              <div class="class-info">
                <h3 class="character-job colored">Class: ${character.job}</h3>
                <h3 class="character-subjob colored">Subclass: ${character.subjob}</h3>
              </div>
            </div>
            <h3 class="character-background">Background: ${character.background}</h3>
            <h3 class="character-level">Level: ${character.level}</h3>
        </div>
        <div class="character-backgrounds">
            <h3 class="character-backstory">Backstory: ${character.backstory}</h3>
            <div id="character-allies-${n}" class="allies-buttons-box">
                <h3 class="character-allies">Allies/Organizations: </h3>
            </div>
            <div id="character-languages-${n}" class="languages-buttons-box">
                <h3 class="character-languages">Languages: </h3>
            </div>
        </div>
        
        <div id="character-tags-${n}" class="tag-buttons-box"></div>
    `;
    const removeButton = document.createElement('button');
    removeButton.innerHTML = `<i class="fa fa-trash"></i>`;
    removeButton.classList.add('remove-char-btn');
    characterDiv.appendChild(removeButton);
    
    removeButton.addEventListener('click', () => {
      const characterIndex = characters.indexOf(character);
      if (characterIndex !== -1) {
        characters.splice(characterIndex, 1); // Remove character from array
        displayCharacters(characters);  // Update displayed list
      }
    });

    return characterDiv;
  }

  function displayCharacters(filteredCharacters) {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = ''; // Clear existing list items
  
    filteredCharacters.forEach(character => {
      const characterItem = createcharacterListItem(character);
      characterList.appendChild(characterItem);
      const tagBox = document.getElementById(`character-tags-${n}`);
      const traitsBox = document.getElementById(`character-traits-${n}`);
      const alliesBox = document.getElementById(`character-allies-${n}`);
      const languagesBox = document.getElementById(`character-languages-${n}`);
      addList(character.traits,traitsBox,"traits")
      addList(character.allies,alliesBox,"allies")
      addList(character.languages,languagesBox,"languages")
      addTags(character.tags,tagBox);
      n++;
    });
    n = 0;
  }

  function filterByTag(tag) {
    const lowerCaseTag = tag.toLowerCase(); // Convert the tag to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.tags.some(characterTag => characterTag.toLowerCase() === lowerCaseTag);
    });
    displayCharacters(filteredCharacters);
  }

  function filterByTraits(trait) {
    const lowerCaseTrait = trait.toLowerCase(); // Convert the trait to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.traits.some(characterTrait => characterTrait.toLowerCase() === lowerCaseTrait);
    });
    displayCharacters(filteredCharacters);
  }
  
  function filterByAllies(ally) {
    const lowerCaseAlly = ally.toLowerCase(); // Convert the ally to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.allies.some(characterally => characterally.toLowerCase() === lowerCaseAlly);
    });
    displayCharacters(filteredCharacters);
  }

  function filterByLanguages(language) {
    const lowerCaseLanguage = language.toLowerCase(); // Convert the language to lowercase
    const filteredCharacters = characters.filter(character => {
      return character.languages.some(characterLanguage => characterLanguage.toLowerCase() === lowerCaseLanguage);
    });
    displayCharacters(filteredCharacters);
  }

window.addEventListener('DOMContentLoaded', () => {
displayCharacters(characters);
});

function noneCheck(item) {
  if (item = "") {
    return "None";
  }
}

function stringSplit(item) 
{
  if (item != "None")
  {
    return item.split(", ");
  }
}

function iconSrc(job)
{
  switch (job.toLowerCase()) {
    case "barbarian":
      return "./images/class-icons-barbarian.png";
    case "bard":
      return "./images/class-icons-bard.png";
    case "cleric":
      return "./images/class-icons-cleric.png";
    case "druid":
      return "./images/class-icons-druid.png";
    case "fighter":
      return "./images/class-icons-fighter.png";
    case "monk":
      return "./images/class-icons-monk.png";
    case "paladin":
      return "./images/class-icons-paladin.png";
    case "ranger":
      return "./images/class-icons-ranger.png";
    case "rogue":
      return "./images/class-icons-rogue.png";
    case "sorcerer":
      return "./images/class-icons-sorcerer.png";
    case "warlock":
      return "./images/class-icons-warlock.png";
    case "wizard":
      return "./images/class-icons-wizard.png";
    default:
      return "";
  }
}

function addNewCharacter()
  {
    let name = document.getElementById('character-name-input').value;
    let personality = document.getElementById('character-personality-input').value;
    let ideals = document.getElementById('character-ideals-input').value;
    let bonds = document.getElementById('character-bonds-input').value;
    let flaws = document.getElementById('character-flaws-input').value;
    let traits = document.getElementById('character-traits-input').value;
    let species = document.getElementById('character-species-input').value;
    let subspecies = document.getElementById('character-subspecies-input').value;
    let job = document.getElementById('character-job-input').value;
    let subjob = document.getElementById('character-subjob-input').value;
    let background = document.getElementById('character-background-input').value;
    let level = document.getElementById('character-level-input').value;
    let backstory = document.getElementById('character-backstory-input').textContent;
    let allies = document.getElementById('character-allies-input').value;
    let languages = document.getElementById('character-languages-input').value;
    let tags = document.getElementById('character-tags-input').value;
    let icon = iconSrc(job);
    noneCheck(name);
    noneCheck(personality);
    noneCheck(ideals);
    noneCheck(bonds);
    noneCheck(flaws);
    noneCheck(traits);
    noneCheck(species);
    noneCheck(subspecies);
    noneCheck(job);
    noneCheck(subjob);
    noneCheck(background);
    noneCheck(level);
    noneCheck(backstory);
    noneCheck(allies);
    noneCheck(languages);
    noneCheck(tags);
    let newChar = {}

    newChar["name"] = name;
    newChar["personality"] = personality;
    newChar["ideals"] = ideals;
    newChar["bonds"] = bonds;
    newChar["flaws"] = flaws;
    newChar["species"] = species;
    newChar["subspecies"] = subspecies;
    newChar["job"] = job;
    newChar["subjob"] = subjob;
    newChar["background"] = background;
    newChar["level"] = level;
    newChar["backstory"] = backstory;
    newChar["icon"] = icon;
    newChar["traits"] = stringSplit(traits);
    newChar["allies"] = stringSplit(allies);
    newChar["languages"] = stringSplit(languages);
    newChar["tags"] = stringSplit(tags);
    characters.push(newChar);
    displayCharacters(characters);
    closePopUp();
  }

  const characterPopup = document.getElementById('character-popup');
  let isDragging = false;
  let offsetX, offsetY;
  
  characterPopup.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - characterPopup.offsetLeft;
      offsetY = e.clientY - characterPopup.offsetTop;
  });
  
  document.addEventListener('mouseup', () => {
      isDragging = false;
  });
  
  document.addEventListener('mousemove', (e) => {
      if (isDragging) {
          characterPopup.style.left = (e.clientX - offsetX) + 'px';
          characterPopup.style.top = (e.clientY - offsetY) + 'px';
      }
  });

  function saveCharacters()
  {
    // Convert the characters array to a JSON string
    const jsonData = JSON.stringify(characters, null, 2);

    // Create a Blob object representing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a hidden anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;

    // Prompt the user for the desired filename and download location
    const filename = prompt("Enter the desired filename (without extension):");

    if (filename) {
        a.download = filename + ".json";
    }


    a.click();


    // Revoke the URL to release memory
    URL.revokeObjectURL(url);
  }

  function loadCharacters()
  {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonData = e.target.result;
            const charactersData = JSON.parse(jsonData);
            characters = charactersData;
            displayCharacters(characters);
        };
        reader.readAsText(file);
    };
    input.click();
  }

  function presentSjOptions() 
  {
    let sj = document.getElementById('character-subjob-input')
    let sjDatalist = document.createElement('datalist')
    let job = document.getElementById('character-job-input').value
    switch (job) {
      case 'Artificer':
        sjDatalist.setAttribute('id', 'ArtificerList')
        sjDatalist.innerHTML = `
        <option>Alchemist</option>
        <option>Armorer</option>
        <option>Artillerist</option>
        <option>Battle Smith</option>
        `
        sj.setAttribute('list', 'ArtificerList')
        break;
      case 'Barbarian':
        sjDatalist.setAttribute('id', 'BarbarianList')
        sjDatalist.innerHTML = `
        <option>Path of the Ancestral Guardian</option>
        <option>Path of the Beast</option>
        <option>Path of the Berserker</option>
        <option>Path of the Giant</option>
        <option>Path of the Storm Herald</option>
        <option>Path of the Totem Warrior</option>
        <option>Path of the Zealot</option>
        <option>Path of the Wild Magic</option>
        `
        sj.setAttribute('list', 'BarbarianList')
        break;
      case 'Bard':
        sjDatalist.setAttribute('id', 'BardList')
        sjDatalist.innerHTML = `
        <option>College of Creation</option>
        <option>College of Eloquence</option>
        <option>College of Glamour</option>
        <option>College of Lore</option>
        <option>College of Spirits</option>
        <option>College of Swords</option>
        <option>College of Valor</option>
        <option>College of Whispers</option>
        `
        sj.setAttribute('list', 'BardList')
        break;
      case 'Cleric':
        sjDatalist.setAttribute('id', 'ClericList')
        sjDatalist.innerHTML = `
        <option>Arcana Domain</option>
        <option>Forge Domain</option>
        <option>Grave Domain</option>
        <option>Knowledge Domain</option>
        <option>Life Domain</option>
        <option>Light Domain</option>
        <option>Order Domain</option>
        <option>Peace Domain</option>
        <option>Tempest Domain</option>
        <option>Trickery Domain</option>
        <option>Twilight Domain</option>
        <option>War Domain</option>
        `
        sj.setAttribute('list', 'ClericList')
        break;
      case 'Druid':
        sjDatalist.setAttribute('id', 'DruidList')
        sjDatalist.innerHTML = `
        <option>Circle of Dreams</option>
        <option>Circle of Spores</option>
        <option>Circle of Stars</option>
        <option>Circle of Wildfire</option>
        <option>Circle of the Land</option>
        <option>Circle of the Moon</option>
        <option>Circle of the Shepherd</option>
        `
        sj.setAttribute('list', 'DruidList')
        break;
      case 'Fighter':
        sjDatalist.setAttribute('id', 'FighterList')
        sjDatalist.innerHTML = `
        <option>Arcane Archer</option>
        <option>Battle Master</option>
        <option>Cavalier</option>
        <option>Champion</option>
        <option>Echo Knight</option>
        <option>Eldritch Knight</option>
        <option>Psi Warrior</option>
        <option>Purple Dragon Knight</option>
        <option>Rune Knight</option>
        <option>Samurai</option>
        `
        sj.setAttribute('list', 'FighterList')
        break;
      case 'Monk':
        sjDatalist.setAttribute('id', 'MonkList')
        sjDatalist.innerHTML = `
        <option>Way of Mercy</option>
        <option>Way of Shadow</option>
        <option>Way of the Ascendant Dragon</option>
        <option>Way of the Astral Self</option>
        <option>Way of the Drunken Master</option>
        <option>Way of the Four Elements</option>
        <option>Way of the Kensei</option>
        <option>Way of the Long Death</option>
        <option>Way of the Open Hand</option>
        <option>Way of the Sun Soul</option>
        `
        sj.setAttribute('list', 'MonkList')
        break;
      case 'Paladin':
        sjDatalist.setAttribute('id', 'PaladinList')
        sjDatalist.innerHTML = `
        <option>Oath of Conquest</option>
        <option>Oath of Devotion</option>
        <option>Oath of Glory</option>
        <option>Oath of Redemption</option>
        <option>Oath of the Ancients</option>
        <option>Oath of the Crown</option>
        <option>Oath of the Watchers</option>
        <option>Oath of Vengence</option>
        <option>Oathbreaker</option>
        `
        sj.setAttribute('list', 'PaladinList')
        break;
      case 'Ranger':
        sjDatalist.setAttribute('id', 'RangerList')
        sjDatalist.innerHTML = `
        <option>Beast Master</option>
        <option>Drakewarden</option>
        <option>Fey Wanderer</option>
        <option>Gloom Stalker</option>
        <option>Horizon Walker</option>
        <option>Hunter Ranger</option>
        <option>Monster Slayer</option>
        <option>Swarmkeeper</option>
        `
        sj.setAttribute('list', 'RangerList')
        break;
      case 'Rogue':
        sjDatalist.setAttribute('id', 'RogueList')
        sjDatalist.innerHTML = `
        <option>Arcane Trickster</option>
        <option>Assassin</option>
        <option>Inquisitive</option>
        <option>Mastermind</option>
        <option>Phantom</option>
        <option>Scout</option>
        <option>Soulknife</option>
        <option>Swashbuckler</option>
        <option>Thief</option>
        `
        sj.setAttribute('list', 'RogueList')
        break;
      case 'Sorcerer':
        sjDatalist.setAttribute('id', 'SorcererList')
        sjDatalist.innerHTML = `
        <option>Aberrant Mind</option>
        <option>Clockwork Soul</option>
        <option>Divine Soul</option>
        <option>Draconic Blodline</option>
        <option>Lunar Sorcery</option>
        <option>Shadow Magic</option>
        <option>Storm Sorcery</option>
        <option>Wild Magic</option>
        `
        sj.setAttribute('list', 'SorcererList')
        break;
        case 'Warlock':
          sjDatalist.setAttribute('id', 'WarlockList')
          sjDatalist.innerHTML = `
          <option>Archfey</option>
          <option>Celestial</option>
          <option>Fathomless</option>
          <option>Fiend</option>
          <option>Genie</option>
          <option>Great Old One</option>
          <option>Hexblade</option>
          <option>Undead</option>
          <option>Undying</option>
          `
          sj.setAttribute('list', 'WarlockList')
          break;
        case 'Wizard':
          sjDatalist.setAttribute('id', 'WizardList')
          sjDatalist.innerHTML = `
          <option>Bladesinging</option>
          <option>Chronurgy Magic</option>
          <option>Graviturgy Magic</option>
          <option>Order of Scribes</option>
          <option>School of Abjuration</option>
          <option>School of Divination</option>
          <option>School of Enchantment</option>
          <option>School of Evocation</option>
          <option>School of Illusion</option>
          <option>School of Necromancy</option>
          <option>School of Transmutation</option>
          <option>War Magic</option>
          `
          sj.setAttribute('list', 'WizardList')
          break;  
      default:
        break;
    }
    sj.appendChild(sjDatalist);
  }

  function presentSsOptions() 
  {
    let ss = document.getElementById('character-subspecies-input')
    let ssDatalist = document.createElement('datalist')
    let species = document.getElementById('character-species-input').value
    switch (species) {
      case 'Aasimar':
        ssDatalist.setAttribute('id', 'AasimarList')
        ssDatalist.innerHTML = `
        <option>Fallen Aasimar</option>
        <option>Protector Aasimar</option>
        <option>Scourge Aasimar</option>
        <option>Variant Aasimar</option>
        `
        ss.setAttribute('list', 'AasimarList')
        break;
      case 'Dragonborn':
        ssDatalist.setAttribute('id', 'DragonbornList')
        ssDatalist.innerHTML = `
        <option>Black (Acid)</option>
        <option>Blue (Lightning)</option>
        <option>Green (Poison)</option>
        <option>Red (Fire)</option>
        <option>White (Cold)</option>
        <option>Amethyst (Force)</option>
        <option>Crystal (Radiant)</option>
        <option>Emerald (Psychic)</option>
        <option>Sapphire (Thunder)</option>
        <option>Topaz (Necrotic)</option>
        <option>Brass (Fire)</option>
        <option>Bronze (Lightning)</option>
        <option>Copper (Acid)</option>
        <option>Gold (Fire)</option>
        <option>Silver (Cold)</option>
        <option>Draconblood</option>
        <option>Ravenite</option>
        `
        ss.setAttribute('list', 'DragonbornList')
        break;
      case 'Dwarf':
        ssDatalist.setAttribute('id', 'DwarfList')
        ssDatalist.innerHTML = `
        <option>Hill Dwarf</option>
        <option>Mountian Dwarf</option>
        `
        ss.setAttribute('list', 'DwarfList')
        break;
      case 'Elf':
        ssDatalist.setAttribute('id', 'ElfList')
        ssDatalist.innerHTML = `
        <option>Astral Elf</option>
        <option>Drow</option>
        <option>Eladrin</option>
        <option>High Elf</option>
        <option>Pallid Elf</option>
        <option>Sea Elf</option>
        <option>Shadar-Kai</option>
        <option>Wood Elf</option>
        `
        ss.setAttribute('list', 'ElfList')
        break;
      case 'Genasi':
        ssDatalist.setAttribute('id', 'GenasiList')
        ssDatalist.innerHTML = `
        <option>Air Genasi</option>
        <option>Earth Genasi</option>
        <option>Fire Genasi</option>
        <option>Water Genasi</option>
        `
        ss.setAttribute('list', 'GenasiList')
        break;
      case 'Gith':
        ssDatalist.setAttribute('id', 'GithList')
        ssDatalist.innerHTML = `
        <option>Githyanki</option>
        <option>Githzerai</option>
        `
        ss.setAttribute('list', 'GithList')
        break;
      case 'Gnome':
        ssDatalist.setAttribute('id', 'GnomeList')
        ssDatalist.innerHTML = `
        <option>Deep Gnome</option>
        <option>Forest Gnome</option>
        <option>Rock Gnome</option>
        `
        ss.setAttribute('list', 'GnomeList')
        break;
      case 'Half-Elf':
        ssDatalist.setAttribute('id', 'Half-ElfList')
        ssDatalist.innerHTML = `
        <option>Base Half-Elf</option>
        <option>Half-Drow</option>
        <option>Half-High Elf</option>
        <option>Half-Sea Elf</option>
        <option>Half-Wood Elf</option>
        `
        ss.setAttribute('list', 'Half-ElfList')
        break;
      case 'Halfling':
        ssDatalist.setAttribute('id', 'HalflingList')
        ssDatalist.innerHTML = `
        <option>Ghostwise Halfling</option>
        <option>Lightfoot Halfling</option>
        <option>Lotusden Halfling</option>
        <option>Stout Halfling</option>
        `
        ss.setAttribute('list', 'HalflingList')
        break;
      case 'Human':
        ssDatalist.setAttribute('id', 'HumanList')
        ssDatalist.innerHTML = `
        <option>Base Human</option>
			  <option>Varient Human</option>
        `
        ss.setAttribute('list', 'HumanList')
        break;
      case 'Shifter':
        ssDatalist.setAttribute('id', 'ShifterList')
        ssDatalist.innerHTML = `
        <option>Beasthide Shifter</option>
        <option>Longtooth Shifter</option>
        <option>Swiftstride Shifter</option>
        <option>Wildhunt Shifter</option>
        `
        ss.setAttribute('list', 'ShifterList')
        break;
      case 'Tiefling':
        ssDatalist.setAttribute('id', 'TieflingList')
        ssDatalist.innerHTML = `
        <option>Asmodeus Tiefling</option>
        <option>Baalzebul Tiefling</option>
        <option>Devil's Tongue Tiefling</option>
        <option>Dispater Tiefling</option>
        <option>Feral Tiefling</option>
        <option>Fierna Tiefling</option>
        <option>Glasya Tiefling</option>
        <option>Levistus Tiefling</option>
        <option>Mammon Tiefling</option>
        <option>Mephistopheles Tiefling</option>
        <option>Winged Tiefling</option>
        <option>Zariel Tiefling</option>
        `
        ss.setAttribute('list', 'TieflingList')
        break;
      default:
        break;
    }
    ss.appendChild(ssDatalist);
  }

  function presentPIBFOptions() 
  {
    let personality = document.getElementById('character-personality-input')
    let personalityDatalist = document.createElement('datalist')
    let ideals = document.getElementById('character-ideals-input')
    let idealsDatalist = document.createElement('datalist')
    let bonds = document.getElementById('character-bonds-input')
    let bondsDatalist = document.createElement('datalist')
    let flaws = document.getElementById('character-flaws-input')
    let flawsDatalist = document.createElement('datalist')
    let background = document.getElementById('character-background-input').value
    switch (background) {
      case 'Acolyte':
      personalityDatalist.setAttribute('id', 'AcolytePList')
        personalityDatalist.innerHTML = `
        <option>I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.</option>
        <option>I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.</option>
        <option>I see omens in every event and action. The gods try to speak to us, we just need to listen.</option>
        <option>Nothing can shake my optimistic attitude.</option>
        <option>I quote (or misquote) sacred texts and proverbs in almost every situation.</option>
        <option>I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.</option>
        <option>I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.</option>
        <option>I've spent so long in the temple that I have little practical experience dealing with people in the outside world.</option>
        `
        personality.setAttribute('list', 'AcolytePList')
      idealsDatalist.setAttribute('id', 'AcolyteIList')
        idealsDatalist.innerHTML = `
        <option>Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)</option>
        <option>Charity. I always try to help those in need, no matter what the personal cost. (Good)</option>
        <option>Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)</option>
        <option>Power. I hope to one day rise to the top of my faith's religious hierarchy. (Lawful)</option>
        <option>Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)</option>
        <option>Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against their teachings. (Any)</option>
        `
        ideals.setAttribute('list', 'AcolyteIList')
      bondsDatalist.setAttribute('id', 'AcolyteBList')
        bondsDatalist.innerHTML = `
        <option>I would die to recover an ancient relic of my faith that was lost long ago.</option>
        <option>I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.</option>
        <option>I owe my life to the priest who took me in when my parents died.</option>
        <option>Everything I do is for the common people.</option>
        <option>I will do anything to protect the temple where I served.</option>
        <option>I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.</option>
        `
        bonds.setAttribute('list', 'AcolyteBList')
      flawsDatalist.setAttribute('id', 'AcolyteFList')
        flawsDatalist.innerHTML = `
        <option>I judge others harshly, and myself even more severely.</option>
        <option>I put too much trust in those who wield power within my temple's hierarchy.</option>
        <option>My piety sometimes leads me to blindly trust those that profess faith in my god.</option>
        <option>I am inflexible in my thinking.</option>
        <option>I am suspicious of strangers and expect the worst of them.</option>
        <option>Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.</option>
        `
        flaws.setAttribute('list', 'AcolyteFList')
        break;
      case 'Anthropologist':
      personalityDatalist.setAttribute('id', 'AnthropologistPList')
        personalityDatalist.innerHTML = `
        <option>I prefer the company of those who aren't like me, including people of other races.</option>
        <option>I'm a stickler when it comes to observing proper etiquette and local customs.</option>
        <option>I would rather observe than meddle.</option>
        <option>By living among violent people, I have become desensitized to violence.</option>
        <option>I would risk life and limb to discover a new culture or unravel the secrets of a dead one.</option>
        <option>When I arrive at a new settlement for the first time, I must learn all its customs.</option>
        `
        personality.setAttribute('list', 'AnthropologistPList')
      idealsDatalist.setAttribute('id', 'AnthropologistIList')
        idealsDatalist.innerHTML = `
        <option>Discovery. I want to be the first person to discover a lost culture. (Any)</option>
        <option>Distance. One must not interfere with the affairs of another culture – even one in need of aid. (Lawful)</option>
        <option>Knowledge. By understanding other races and cultures, we learn to understand ourselves. (Any)</option>
        <option>Power. Common people crave strong leadership, and I do my utmost to provide it. (Lawful)</option>
        <option>Protection. I must do everything possible to save a society facing extinction. (Good)</option>
        <option>Indifferent. Life is cruel. What's the point in saving people if they're going to die anyway? (Chaotic)</option>
        `
        ideals.setAttribute('list', 'AnthropologistIList')
      bondsDatalist.setAttribute('id', 'AnthropologistBList')
        bondsDatalist.innerHTML = `
        <option>My mentor gave me a journal filled with lore and wisdom. Losing it would devastate me.</option>
        <option>Having lived among the people of a primeval tribe or clan, I long to return and see how they are faring.</option>
        <option>Years ago, tragedy struck the members of an isolated society I befriended, and I will honor them.</option>
        <option>I want to learn more about a particular humanoid culture that fascinates me.</option>
        <option>I seek to avenge a clan, tribe, kingdom, or empire that was wiped out.</option>
        <option>I have a trinket that I believe is the key to finding a long-lost society.</option>
        `
        bonds.setAttribute('list', 'AnthropologistBList')
      flawsDatalist.setAttribute('id', 'AnthropologistFList')
        flawsDatalist.innerHTML = `
        <option>Boats make me seasick.</option>
        <option>I talk to myself, and I don't make friends easily.</option>
        <option>I believe that I'm intellectually superior to people from other cultures and have much to teach them.</option>
        <option>I've picked up some unpleasant habits living among races such as goblins, lizardfolk, or orcs.</option>
        <option>I complain about everything.</option>
        <option>I wear a tribal mask and never take it off.</option>
        `
        flaws.setAttribute('list', 'AnthropologistFList')
        break;
      case 'Archaeologist':
        personalityDatalist.setAttribute('id', 'ArchaeologistPList')
        personalityDatalist.innerHTML = `
        <option>I love a good puzzle or mystery.</option>
        <option>I'm a pack rat who never throws anything away.</option>
        <option>Fame is more important to me than money.</option>
        <option>I have no qualms about stealing from the dead.</option>
        <option>I'm happier in a dusty old tomb than I am in the centers of civilization.</option>
        <option>Traps don't make me nervous. Idiots who trigger traps make me nervous.</option>
        <option>I might fail, but I will never give up.</option>
        <option>You might think I'm a scholar, but I love a good brawl. These fists were made for punching.</option>
        `
        personality.setAttribute('list', 'ArchaeologistPList')
        idealsDatalist.setAttribute('id', 'ArchaeologistIList')
        idealsDatalist.innerHTML = `
        <option>Preservation. That artifact belongs in a museum. (Good)</option>
        <option>Greed. I won't risk my life for nothing. I expect some kind of payment. (Any)</option>
        <option>Death Wish. Nothing is more exhilarating than a narrow escape from the jaws of death. (Chaotic)</option>
        <option>Dignity. The dead and their belongings deserve to be treated with respect. (Lawful)</option>
        <option>Immortality. All my exploring is part of a plan to find the secret of everlasting life. (Any)</option>
        <option>Danger. With every great discovery comes grave danger. The two walk hand in hand. (Any)</option>
        `
        ideals.setAttribute('list', 'ArchaeologistIList')
        bondsDatalist.setAttribute('id', 'ArchaeologistBList')
        bondsDatalist.innerHTML = `
        <option>Ever since I was a child, I've heard stories about a lost city. I aim to find it, learn its secrets, and earn my place in the history books.</option>
        <option>I want to find my mentor, who disappeared on an expedition some time ago.</option>
        <option>I have a friendly rival. Only one of us can be the best, and I aim to prove it's me.</option>
        <option>I won't sell an art object or other treasure that has historical significance or is one of a kind.</option>
        <option>I'm secretly in love with the wealthy patron who sponsors my archaeological exploits.</option>
        <option>I hope to bring prestige to a library, a museum, or a university.</option>
        `
        bonds.setAttribute('list', 'ArchaeologistBList')
        flawsDatalist.setAttribute('id', 'ArchaeologistFList')
        flawsDatalist.innerHTML = `
        <option>I have a secret fear of some common wild animal – and in my work, I see them everywhere.</option>
        <option>I can't leave a room without searching it for secret doors.</option>
        <option>When I'm not exploring dungeons or ruins, I get jittery and impatient.</option>
        <option>I have no time for friends or family. I spend every waking moment thinking about and preparing for my next expedition.</option>
        <option>When given the choice of going left or right, I always go left.</option>
        <option>I can't sleep except in total darkness.</option>
        `
        flaws.setAttribute('list', 'ArchaeologistFList')
        break;
      case 'Athlete':
      personalityDatalist.setAttribute('id', 'AthletePList')
        personalityDatalist.innerHTML = `
        <option>I feel most at peace during physical exertion, whether exercise or battle.</option>
        <option>I don't like to sit idle.</option>
        <option>I have a daily exercise routine I refuse to break.</option>
        <option>Obstacles exist to be overcome.</option>
        <option>When I see others struggling, I offer to help.</option>
        <option>I love to trade banter and gibes.</option>
        <option>Anything worth doing is worth doing best.</option>
        <option>I get irritated if people praise someone else and not me.</option>
        `
        personality.setAttribute('list', 'AthletePList')
      idealsDatalist.setAttribute('id', 'AthleteIList')
        idealsDatalist.innerHTML = `
        <option>Competition. I strive to test myself in all things. (Chaotic)</option>
        <option>Triumph. The best part of winning is seeing my rivals brought low. (Evil)</option>
        <option>Camaraderie. The strongest bonds are forged through struggle. (Good)</option>
        <option>People. I strive to inspire my spectators. (Neutral)</option>
        <option>Tradition. Every game has rules, and the playing field must be level. (Lawful)</option>
        <option>Growth. Lessons hide in victory and defeat. (Any)</option>
        `
        ideals.setAttribute('list', 'AthleteIList')
      bondsDatalist.setAttribute('id', 'AthleteBList')
        bondsDatalist.innerHTML = `
        <option>My teammates are my family.</option>
        <option>I will overcome a rival and prove myself their better.</option>
        <option>My mistake got someone hurt. Ill never make that mistake again.</option>
        <option>I will be the best for the honor and glory of my home.</option>
        <option>The person who trained me is the most important person in my world.</option>
        <option>I strive to live up to a specific hero's example.</option>
        `
        bonds.setAttribute('list', 'AthleteBList')
      flawsDatalist.setAttribute('id', 'AthleteFList')
        flawsDatalist.innerHTML = `
        <option>I indulge in a habit that threatens my reputation or health.</option>
        <option>I'll do absolutely anything to win.</option>
        <option>I ignore anyone who doesn't compete and anyone who loses to me.</option>
        <option>I have lingering pain of old injuries.</option>
        <option>Any defeat or failure on my part is because my opponents cheated.</option>
        <option>I must be the captain of any group I join.</option>
        `
        flaws.setAttribute('list', 'AthleteFList')
        break;
      case 'Charlatan':
      personalityDatalist.setAttribute('id', 'CharlatanPList')
        personalityDatalist.innerHTML = `
        <option>I fall in and out of love easily, and am always pursuing someone.</option>
        <option>I have a joke for every occasion, especially occasions where humor is inappropriate.</option>
        <option>Flattery is my preferred trick for getting what I want.</option>
        <option>I'm a born gambler who can't resist taking a risk for a potential payoff.</option>
        <option>I lie about almost everything, even when there's no good reason to.</option>
        <option>Sarcasm and insults are my weapons of choice.</option>
        <option>I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment.</option>
        <option>I pocket anything I see that might have some value.</option>
        `
        personality.setAttribute('list', 'CharlatanPList')
      idealsDatalist.setAttribute('id', 'CharlatanIList')
        idealsDatalist.innerHTML = `
        <option>Independence. I am a free spirit – no one tells me what to do. (Chaotic)</option>
        <option>Fairness. I never target people who can't afford to lose a few coins. (Lawful)</option>
        <option>Charity. I distribute the money I acquire to the people who really need it. (Good)</option>
        <option>Creativity. I never run the same con twice. (Chaotic)</option>
        <option>Friendship. Material goods come and go. Bonds of friendship last forever. (Good)</option>
        <option>Aspiration. I'm determined to make something of myself. (Any)</option>
        `
        ideals.setAttribute('list', 'CharlatanIList')
      bondsDatalist.setAttribute('id', 'CharlatanBList')
        bondsDatalist.innerHTML = `
        <option>I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.</option>
        <option>I owe everything to my mentor – a horrible person who's probably rotting in jail somewhere.</option>
        <option>Somewhere out there, I have a child who doesn't know me. I'm making the world better for him or her.</option>
        <option>I come from a noble family, and one day I'll reclaim my lands and title from those who stole them from me.</option>
        <option>A powerful person killed someone I love. Some day soon, I'll have my revenge.</option>
        <option>I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself.</option>
        `
        bonds.setAttribute('list', 'CharlatanBList')
      flawsDatalist.setAttribute('id', 'CharlatanFList')
        flawsDatalist.innerHTML = `
        <option>I can't resist a pretty face.</option>
        <option>I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in.</option>
        <option>I'm convinced that no one could ever fool me the way I fool others.</option>
        <option>I'm too greedy for my own good. I can't resist taking a risk if there's money involved.</option>
        <option>I can't resist swindling people who are more powerful than me.</option>
        <option>I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough.</option>
        `
        flaws.setAttribute('list', 'CharlatanFList')
        break;
      case 'Criminal':
      personalityDatalist.setAttribute('id', 'CriminalPList')
        personalityDatalist.innerHTML = `
        <option>I always have a plan for what to do when things go wrong.</option>
        <option>I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.</option>
        <option>The first thing I do in a new place is note the locations of everything valuable – or where such things could be hidden.</option>
        <option>I would rather make a new friend than a new enemy.</option>
        <option>I am incredibly slow to trust. Those who seem the fairest often have the most to hide.</option>
        <option>I don't pay attention to the risks in a situation. Never tell me the odds.</option>
        <option>The best way to get me to do something is to tell me I can't do it.</option>
        <option>I blow up at the slightest insult.</option>
        `
        personality.setAttribute('list', 'CriminalPList')
      idealsDatalist.setAttribute('id', 'CriminalIList')
        idealsDatalist.innerHTML = `
        <option>Honor. I don't steal from others in the trade. (Lawful)</option>
        <option>Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)</option>
        <option>Charity. I steal from the wealthy so that I can help people in need. (Good)</option>
        <option>Greed. I will do whatever it takes to become wealthy. (Evil)</option>
        <option>People. I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)</option>
        <option>Redemption. There's a spark of good in everyone. (Good)</option>
        `
        ideals.setAttribute('list', 'CriminalIList')
      bondsDatalist.setAttribute('id', 'CriminalBList')
        bondsDatalist.innerHTML = `
        <option>I'm trying to pay off an old debt I owe to a generous benefactor.</option>
        <option>My ill-gotten gains go to support my family.</option>
        <option>Something important was taken from me, and I aim to steal it back.</option>
        <option>I will become the greatest thief that ever lived.</option>
        <option>I'm guilty of a terrible crime. I hope I can redeem myself for it.</option>
        <option>Someone I loved died because of I mistake I made. That will never happen again.</option>
        `
        bonds.setAttribute('list', 'CriminalBList')
      flawsDatalist.setAttribute('id', 'CriminalFList')
        flawsDatalist.innerHTML = `
        <option>When I see something valuable, I can't think about anything but how to steal it.</option>
        <option>When faced with a choice between money and my friends, I usually choose the money.</option>
        <option>If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.</option>
        <option>I have a "tell" that reveals when I'm lying.</option>
        <option>I turn tail and run when things look bad.</option>
        <option>An innocent person is in prison for a crime that I committed. I'm okay with that.</option>
        `
        flaws.setAttribute('list', 'CriminalFList')
        break;
      case 'Entertainer':
      personalityDatalist.setAttribute('id', 'EntertainerPList')
        personalityDatalist.innerHTML = `
        <option>I know a story relevant to almost every situation.</option>
        <option>Whenever I come to a new place, I collect local rumors and spread gossip.</option>
        <option>I'm a hopeless romantic, always searching for that "special someone."</option>
        <option>Nobody stays angry at me or around me for long, since I can defuse any amount of tension.</option>
        <option>I love a good insult, even one directed at me.</option>
        <option>I get bitter if I'm not the center of attention.</option>
        <option>I'll settle for nothing less than perfection.</option>
        <option>I change my mood or my mind as quickly as I change key in a song.</option>
        `
        personality.setAttribute('list', 'EntertainerPList')
      idealsDatalist.setAttribute('id', 'EntertainerIList')
        idealsDatalist.innerHTML = `
        <option>Beauty. When I perform, I make the world better than it was. (Good)</option>
        <option>Tradition. The stories, legends, and songs of the past must never be forgotten, for they teach us who we are. (Lawful)</option>
        <option>Creativity. The world is in need of new ideas and bold action. (Chaotic)</option>
        <option>Greed. I'm only in it for the money and fame. (Evil)</option>
        <option>People. I like seeing the smiles on people's faces when I perform. That's all that matters. (Neutral)</option>
        <option>Honesty. Art should reflect the soul; it should come from within and reveal who we really are. (Any)</option>
        `
        ideals.setAttribute('list', 'EntertainerIList')
      bondsDatalist.setAttribute('id', 'EntertainerBList')
        bondsDatalist.innerHTML = `
        <option>My instrument is my most treasured possession, and it reminds me of someone I love.</option>
        <option>Someone stole my precious instrument, and someday I'll get it back.</option>
        <option>I want to be famous, whatever it takes.</option>
        <option>I idolize a hero of the old tales and measure my deeds against that person's.</option>
        <option>I will do anything to prove myself superior to my hated rival.</option>
        <option>I would do anything for the other members of my old troupe.</option>
        `
        bonds.setAttribute('list', 'EntertainerBList')
      flawsDatalist.setAttribute('id', 'EntertainerFList')
        flawsDatalist.innerHTML = `
        <option>I'll do anything to win fame and renown.</option>
        <option>I'm a sucker for a pretty face.</option>
        <option>A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.</option>
        <option>I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.</option>
        <option>I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.</option>
        <option>Despite my best efforts, I am unreliable to my friends.</option>
        `
        flaws.setAttribute('list', 'EntertainerFList')
        break;
      case 'Faceless':
      personalityDatalist.setAttribute('id', 'FacelessPList')
        personalityDatalist.innerHTML = `
        <option>I'm earnest and uncommonly direct.</option>
        <option>I strive to have no personality—it's easier to forget what's hardly there.</option>
        <option>I treasure a memento of a person or instance that set me upon my path.</option>
        <option>I sleep just as much as I need to and on an unusual schedule.</option>
        <option>I think far ahead, a detachedness often mistaken for daydreaming.</option>
        <option>I cultivate a single obscure hobby or study and eagerly discuss it at length.</option>
        <option>I am ever learning how to be among others—when to stay quiet, when to laugh.</option>
        <option>I behave like an extreme opposite of my persona.</option>
        `
        personality.setAttribute('list', 'FacelessPList')
      idealsDatalist.setAttribute('id', 'FacelessIList')
        idealsDatalist.innerHTML = `
        <option>Justice. Place in society shouldn't determine one's access to what is right. (Good)</option>
        <option>Security. Doing what must be done can't bring the innocent to harm. (Lawful)</option>
        <option>Confusion. Deception is a weapon. Strike from where your foes won't expect. (Chaotic)</option>
        <option>Infamy. My name will be a malediction, a curse that fulfills my will. (Evil)</option>
        <option>Incorruptibility. Be a symbol, and leave your flawed being behind. (Any)</option>
        <option>Anonymity. It's my deeds that should be remembered, not their instrument. (Any)</option>
        `
        ideals.setAttribute('list', 'FacelessIList')
      bondsDatalist.setAttribute('id', 'FacelessBList')
        bondsDatalist.innerHTML = `
        <option>I do everything for my family. My first thought is keeping them safe.</option>
        <option>What I do, I do for the world. The people don't realize how much they need me.</option>
        <option>I've seen too many in need. I must not fail them as everyone else has.</option>
        <option>I stand in opposition, lest the wicked go unopposed.</option>
        <option>I am exceptional. I do this because no one else can, and no one can stop me.</option>
        <option>I do everything for those who were taken from me.</option>
        `
        bonds.setAttribute('list', 'FacelessBList')
      flawsDatalist.setAttribute('id', 'FacelessFList')
        flawsDatalist.innerHTML = `
        <option>I an callous about death. It comes to us all eventually.</option>
        <option>I never make eye contact or hold it unflinchingly.</option>
        <option>I have no sense of humor. Laughing is uncomfortable and embarrassing.</option>
        <option>I overexert myself, sometimes needing to recuperate for a day or more.</option>
        <option>I think far ahead, a detachedness often mistaken for daydreaming.</option>
        <option>I see morality entirely in black and white.</option>
        `
        flaws.setAttribute('list', 'FacelessFList')
        break;
      case 'Far Traveler':
      personalityDatalist.setAttribute('id', 'Far-TravelerPList')
        personalityDatalist.innerHTML = `
        <option>I have different assumptions from those around me concerning personal space, blithely invading others' space in innocence, or reacting to ignorant invasion of my own.</option>
        <option>I have my own ideas about what is and is not food, and I find the eating habits of those around me fascinating, confusing, or revolting.</option>
        <option>I have a strong code of honor or sense of propriety that others don't comprehend.</option>
        <option>I express affection or contempt in ways that are unfamiliar to others.</option>
        <option>I honor my deities through practices that are foreign to this land.</option>
        <option>I begin or end my day with small traditional rituals that are unfamiliar to those around me.</option>
        `
        personality.setAttribute('list', 'Far-TravelerPList')
      idealsDatalist.setAttribute('id', 'Far-TravelerIList')
        idealsDatalist.innerHTML = `
        <option>Open. I have much to learn from the kindly folk I meet along my way. (Good)</option>
        <option>Reserved. As someone new to these strange lands, I am cautious and respectful in my dealings. (Lawful)</option>
        <option>Adventure. I'm far from home, and everything is strange and wonderful! (Chaotic)</option>
        <option>Cunning. Though I may not know their ways, neither do they know mine, which can be to my advantage. (Evil)</option>
        <option>Inquisitive. Everything is new, but I have a thirst to learn. (Neutral)</option>
        <option>Suspicious. I must be careful, for I have no way of telling friend from foe here. (Any)</option>
        `
        ideals.setAttribute('list', 'Far-TravelerIList')
      bondsDatalist.setAttribute('id', 'Far-TravelerBList')
        bondsDatalist.innerHTML = `
        <option>So long as I have this token from my homeland, I can face any adversity in this strange land.</option>
        <option>The gods of my people are a comfort to me so far from home.</option>
        <option>I hold no greater cause than my service to my people.</option>
        <option>My freedom is my most precious possession. I'll never let anyone take it from me again.</option>
        <option>I'm fascinated by the beauty and wonder of this new land.</option>
        <option>Though I had no choice, I lament having to leave my loved ones behind. I hope to see them again one day.</option>
        `
        bonds.setAttribute('list', 'Far-TravelerBList')
      flawsDatalist.setAttribute('id', 'Far-TravelerFList')
        flawsDatalist.innerHTML = `
        <option>I am secretly (or not so secretly) convinced of the superiority of my own culture over that of this foreign land.</option>
        <option>I pretend not to understand the local language in order to avoid interactions I would rather not have.</option>
        <option>I have a weakness for the new intoxicants and other pleasures of this land.</option>
        <option>I don't take kindly to some of the actions and motivations of the people of this land, because these folk are different from me.</option>
        <option>I consider the adherents of other gods to be deluded innocents at best, or ignorant fools at worst.</option>
        <option>I have a weakness for the exotic beauty of the people of these lands.</option>
        `
        flaws.setAttribute('list', 'Far-TravelerFList')
        break;
      case 'Feylost':
      personalityDatalist.setAttribute('id', 'FeylostPList')
        personalityDatalist.innerHTML = `
        <option>I'm haunted by fey laughter that only I can hear, though I know it's just my mind playing tricks on me.</option>
        <option>Like a nomad, I can't settle down in one place for very long.</option>
        <option>Good music makes me weep like a baby.</option>
        <option>Wherever I go, I try to bring a little of the warmth and tranquility of home with me.</option>
        <option>I have never lost my childlike sense of wonder.</option>
        <option>When I have a new idea, I get wildly excited about it until I come up with another, better idea.</option>
        <option>I live by my own set of weird and wonderful rules.</option>
        <option>I can't bring myself to trust most adults.</option>
        `
        personality.setAttribute('list', 'FeylostPList')
      idealsDatalist.setAttribute('id', 'FeylostIList')
        idealsDatalist.innerHTML = `
        <option>Friendship. I never leave a friend behind. (Good)</option>
        <option>Empathy. No creature should be made to suffer. (Good)</option>
        <option>Wanderlust. I prefer to take the less traveled path. (Chaotic)</option>
        <option>Changeability. Change is good, which is why I live by an ever-changing set of rules. (Chaotic)</option>
        <option>Honor. A deal is a deal, and I would never break one. (Lawful)</option>
        <option>Rule of Three. Everything in the multiverse happens in threes. I see the "rule of three" everywhere. (Lawful)</option>
        <option>Obsession. I won't let go of a grudge. (Evil)</option>
        <option>Greed. I will do whatever it takes to get what I want, regardless of the harm it might cause. (Evil)</option>
        `
        ideals.setAttribute('list', 'FeylostIList')
      bondsDatalist.setAttribute('id', 'FeylostBList')
        bondsDatalist.innerHTML = `
        <option>I would never break my word.</option>
        <option>I find magic in all its forms to be compelling. The more magical a place, the more I am drawn to it.</option>
        <option>I do what I can to protect the natural world.</option>
        <option>A trusted friend is the most important thing in the multiverse to me.</option>
        <option>I can't bring myself to harm a Fey creature, either because I consider myself one or because I fear the repercussions.</option>
        <option>The Witchlight Carnival feels like home to me.</option>
        <option>I'm drawn to the Feywild and long to return there, if only for a short while.</option>
        <option>I feel indebted to Mister Witch and Mister Light for giving me a home and a purpose.</option>
        `
        bonds.setAttribute('list', 'FeylostBList')
      flawsDatalist.setAttribute('id', 'FeylostFList')
        flawsDatalist.innerHTML = `
        <option>I easily lose track of time. My poor sense of time means I'm always late.</option>
        <option>I think the whole multiverse is out to get me.</option>
        <option>I'm always operating under a tight timeline, and I'm obsessed with keeping everything on schedule.</option>
        <option>I'm a kleptomaniac who covets shiny, sparkling treasure.</option>
        <option>I'm forgetful. Sometimes I can't remember even the simplest things.</option>
        <option>I never give away anything for free and always expect something in return.</option>
        <option>I have many vices and tend to indulge them.</option>
        <option>I'm always changing my mind-well, almost always.</option>
        `
        flaws.setAttribute('list', 'FeylostFList')
        break;
      case 'Fisher':
      personalityDatalist.setAttribute('id', 'FisherPList')
        personalityDatalist.innerHTML = `
        <option>I am unmoved by the wrath of nature.</option>
        <option>My friends are my crew; we sink or float together.</option>
        <option>I need long stretches of quiet to clear my head.</option>
        <option>Rich folk don't know the satisfaction of hard work.</option>
        <option>I laugh heartily, feel deeply, and fear nothing.</option>
        <option>I work hard; nature offers no handouts.</option>
        <option>I dislike bargaining; state your price and mean it.</option>
        <option>Luck favors me, and I take risks others might not.</option>
        `
        personality.setAttribute('list', 'FisherPList')
      idealsDatalist.setAttribute('id', 'FisherIList')
        idealsDatalist.innerHTML = `
        <option>Camaraderie. Good people make even the longest voyage bearable. (Good)</option>
        <option>Luck. Our luck depends on respecting its rules—now throw this salt over your shoulder. (Lawful)</option>
        <option>Daring. The richest bounty goes to those who risk everything. (Chaotic)</option>
        <option>Plunder. Take all that you can and leave nothing for the scavengers. (Evil)</option>
        <option>Balance. Do not fish the same spot twice in a row; suppress your greed, and nature will reward you. (Neutral)</option>
        <option>Hard Work. No wave can move a soul hard at work. (Any)</option>
        `
        ideals.setAttribute('list', 'FisherIList')
      bondsDatalist.setAttribute('id', 'FisherBList')
        bondsDatalist.innerHTML = `
        <option>I lost something important in the deep sea, and I intend to find it.</option>
        <option>Someone else's greed destroyed my livelihood, and I will be compensated.</option>
        <option>I will fish the many famous waters of this land.</option>
        <option>The gods saved me during a terrible storm, and I will honor their gift.</option>
        <option>My destiny awaits me at the bottom of a particular pond in the Feywild.</option>
        <option>I must repay my village's debt.</option>
        `
        bonds.setAttribute('list', 'FisherBList')
      flawsDatalist.setAttribute('id', 'FisherFList')
        flawsDatalist.innerHTML = `
        <option>I am judgmental, especially of those I deem homebodies or otherwise lazy.</option>
        <option>I become depressed and anxious if I'm away from the sea too long.</option>
        <option>I have lived a hard life and find it difficult to empathize with others.</option>
        <option>I am inclined to tell long-winded stories at inopportune times.</option>
        <option>I work hard, but I play harder.</option>
        <option>I am obsessed with catching an elusive aquatic beast, often to the detriment of other pursuits.</option>
        `
        flaws.setAttribute('list', 'FisherFList')
        break;
      case 'Folk Hero':
      personalityDatalist.setAttribute('id', 'Folk-HeroPList')
        personalityDatalist.innerHTML = `
        <option>I judge people by their actions, not their words.</option>
        <option>If someone is in trouble, I'm always ready to lend help.</option>
        <option>When I set my mind to something, I follow through no matter what gets in my way.</option>
        <option>I have a strong sense of fair play and always try to find the most equitable solution to arguments.</option>
        <option>I'm confident in my own abilities and do what I can to instill confidence in others.</option>
        <option>Thinking is for other people. I prefer action.</option>
        <option>I misuse long words in an attempt to sound smarter.</option>
        <option>I get bored easily. When am I going to get on with my destiny?</option>
        `
        personality.setAttribute('list', 'Folk-HeroPList')
      idealsDatalist.setAttribute('id', 'Folk-HeroIList')
        idealsDatalist.innerHTML = `
        <option>Respect. People deserve to be treated with dignity and respect. (Good)</option>
        <option>Fairness. No one should get preferential treatment before the law, and no one is above the law. (Lawful)</option>
        <option>Freedom. Tyrants must not be allowed to oppress the people. (Chaotic)</option>
        <option>Might. If I become strong, I can take what I want – what I deserve. (Evil)</option>
        <option>Sincerity. There's no good in pretending to be something I'm not. (Neutral)</option>
        <option>Destiny. Nothing and no one can steer me away from my higher calling. (Any)</option>
        `
        ideals.setAttribute('list', 'Folk-HeroIList')
      bondsDatalist.setAttribute('id', 'Folk-HeroBList')
        bondsDatalist.innerHTML = `
        <option>I have a family, but I have no idea where they are. One day, I hope to see them again.</option>
        <option>I worked the land, I love the land, and I will protect the land.</option>
        <option>A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.</option>
        <option>My tools are symbols of my past life, and I carry them so that I will never forget my roots.</option>
        <option>I protect those who cannot protect themselves.</option>
        <option>I wish my childhood sweetheart had come with me to pursue my destiny.</option>
        `
        bonds.setAttribute('list', 'Folk-HeroBList')
      flawsDatalist.setAttribute('id', 'Folk-HeroFList')
        flawsDatalist.innerHTML = `
        <option>The tyrant who rules my land will stop at nothing to see me killed.</option>
        <option>I'm convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.</option>
        <option>The people who knew me when I was young know my shameful secret, so I can never go home again.</option>
        <option>I have a weakness for the vices of the city, especially hard drink.</option>
        <option>Secretly, I believe that things would be better if I were a tyrant lording over the land.</option>
        <option>I have trouble trusting in my allies.</option>
        `
        flaws.setAttribute('list', 'Folk-HeroFList')
        break;
      case 'Giant Foundling':
      personalityDatalist.setAttribute('id', 'Giant-FoundlingPList')
        personalityDatalist.innerHTML = `
        <option>What I lack in stature, I make up for with sheer spite.</option>
        <option>I insist on being taken seriously as a full-grown adult. Nobody talks down to me!</option>
        <option>Crowded spaces make me uncomfortable. I'd much rather be in a wide-open field than a bustling tavern.</option>
        <option>I embrace my shorter stature. It helps me stay unnoticed—and underestimated.</option>
        <option>Every avalanche begins as a single pebble.</option>
        <option>The world always feels too big, and I'm afraid I'll never find my place in it.</option>
        `
        personality.setAttribute('list', 'Giant-FoundlingPList')
        break;
      case 'Gladiator':
      personalityDatalist.setAttribute('id', 'GladiatorPList')
        personalityDatalist.innerHTML = `
        <option>I know a story relevant to almost every situation.</option>
        <option>Whenever I come to a new place, I collect local rumors and spread gossip.</option>
        <option>I'm a hopeless romantic, always searching for that "special someone."</option>
        <option>Nobody stays angry at me or around me for long, since I can defuse any amount of tension.</option>
        <option>I love a good insult, even one directed at me.</option>
        <option>I get bitter if I'm not the center of attention.</option>
        <option>I'll settle for nothing less than perfection.</option>
        <option>I change my mood or my mind as quickly as I change key in a song.</option>
        `
        personality.setAttribute('list', 'GladiatorPList')
      idealsDatalist.setAttribute('id', 'GladiatorIList')
        idealsDatalist.innerHTML = `
        <option>Beauty. When I perform, I make the world better than it was. (Good)</option>
        <option>Tradition. The stories, legends, and songs of the past must never be forgotten, for they teach us who we are. (Lawful)</option>
        <option>Creativity. The world is in need of new ideas and bold action. (Chaotic)</option>
        <option>Greed. I'm only in it for the money and fame. (Evil)</option>
        <option>People. I like seeing the smiles on people's faces when I perform. That's all that matters. (Neutral)</option>
        <option>Honesty. Art should reflect the soul; it should come from within and reveal who we really are. (Any)</option>
        `
        ideals.setAttribute('list', 'GladiatorIList')
      bondsDatalist.setAttribute('id', 'GladiatorBList')
        bondsDatalist.innerHTML = `
        <option>My instrument is my most treasured possession, and it reminds me of someone I love.</option>
        <option>Someone stole my precious instrument, and someday I'll get it back.</option>
        <option>I want to be famous, whatever it takes.</option>
        <option>I idolize a hero of the old tales and measure my deeds against that person's.</option>
        <option>I will do anything to prove myself superior to my hated rival.</option>
        <option>I would do anything for the other members of my old troupe.</option>
        `
        bonds.setAttribute('list', 'GladiatorBList')
      flawsDatalist.setAttribute('id', 'GladiatorFList')
        flawsDatalist.innerHTML = `
        <option>I'll do anything to win fame and renown.</option>
        <option>I'm a sucker for a pretty face.</option>
        <option>A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.</option>
        <option>I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.</option>
        <option>I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.</option>
        <option>Despite my best efforts, I am unreliable to my friends.</option>
        `
        flaws.setAttribute('list', 'GladiatorFList')
        break;
      case 'Guild Artisan':
      personalityDatalist.setAttribute('id', 'Guild-ArtisanPList')
        personalityDatalist.innerHTML = `
        <option>I believe that anything worth doing is worth doing right. I can't help it – I'm a perfectionist.</option>
        <option>I'm a snob who looks down on those who can't appreciate fine art.</option>
        <option>I always want to know how things work and what makes people tick.</option>
        <option>I'm full of witty aphorisms and have a proverb for every occasion.</option>
        <option>I'm rude to people who lack my commitment to hard work and fair play.</option>
        <option>I like to talk at length about my profession.</option>
        <option>I don't part with my money easily and will haggle tirelessly to get the best deal possible.</option>
        <option>I'm well known for my work, and I want to make sure everyone appreciates it. I'm always taken aback when people haven't heard of me.</option>
        `
        personality.setAttribute('list', 'Guild-ArtisanPList')
      idealsDatalist.setAttribute('id', 'Guild-ArtisanIList')
        idealsDatalist.innerHTML = `
        <option>Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)</option>
        <option>Generosity. My talents were given to me so that I could use them to benefit the world. (Good)</option>
        <option>Freedom. Everyone should be free to pursue his or her own livelihood. (Chaotic)</option>
        <option>Greed. I'm only in it for the money. (Evil)</option>
        <option>People. I'm committed to the people I care about, not to ideals. (Neutral)</option>
        <option>Aspiration. I work hard to be the best there is at my craft. (Any)</option>
        `
        ideals.setAttribute('list', 'Guild-ArtisanIList')
      bondsDatalist.setAttribute('id', 'Guild-ArtisanBList')
        bondsDatalist.innerHTML = `
        <option>The workshop where I learned my trade is the most important place in the world to me.</option>
        <option>I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy.</option>
        <option>I owe my guild a great debt for forging me into the person I am today.</option>
        <option>I pursue wealth to secure someone's love.</option>
        <option>One day I will return to my guild and prove that I am the greatest artisan of them all.</option>
        <option>I will get revenge on the evil forces that destroyed my place of business and ruined my livelihood.</option>
        `
        bonds.setAttribute('list', 'Guild-ArtisanBList')
      flawsDatalist.setAttribute('id', 'Guild-ArtisanFList')
        flawsDatalist.innerHTML = `
        <option>I'll do anything to get my hands on something rare or priceless.</option>
        <option>I'm quick to assume that someone is trying to cheat me.</option>
        <option>No one must ever learn that I once stole money from guild coffers.</option>
        <option>I'm never satisfied with what I have - I always want more.</option>
        <option>I would kill to acquire a noble title.</option>
        <option>I'm horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I'm surrounded by rivals.</option>
        `
        flaws.setAttribute('list', 'Guild-ArtisanFList')
        break;
      case 'Guild Merchant':
      personalityDatalist.setAttribute('id', 'Guild-MerchantPList')
        personalityDatalist.innerHTML = `
        <option>I believe that anything worth doing is worth doing right. I can't help it - I'm a perfectionist.</option>
        <option>I'm a snob who looks down on those who can't appreciate fine art.</option>
        <option>I always want to know how things work and what makes people tick.</option>
        <option>I'm full of witty aphorisms and have a proverb for every occasion.</option>
        <option>I'm rude to people who lack my commitment to hard work and fair play.</option>
        <option>I like to talk at length about my profession.</option>
        <option>I don't part with my money easily and will haggle tirelessly to get the best deal possible.</option>
        <option>I'm well known for my work, and I want to make sure everyone appreciates it. I'm always taken aback when people haven't heard of me.</option>
        `
        personality.setAttribute('list', 'Guild-MerchantPList')
      idealsDatalist.setAttribute('id', 'Guild-MerchantIList')
        idealsDatalist.innerHTML = `
        <option>Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)</option>
        <option>Generosity. My talents were given to me so that I could use them to benefit the world. (Good)</option>
        <option>Freedom. Everyone should be free to pursue his or her own livelihood. (Chaotic)</option>
        <option>Greed. I'm only in it for the money. (Evil)</option>
        <option>People. I'm committed to the people I care about, not to ideals. (Neutral)</option>
        <option>Aspiration. I work hard to be the best there is at my craft. (Any)</option>
        `
        ideals.setAttribute('list', 'Guild-MerchantIList')
      bondsDatalist.setAttribute('id', 'Guild-MerchantBList')
        bondsDatalist.innerHTML = `
        <option>The workshop where I learned my trade is the most important place in the world to me.</option>
        <option>I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy.</option>
        <option>I owe my guild a great debt for forging me into the person I am today.</option>
        <option>I pursue wealth to secure someone's love.</option>
        <option>One day I will return to my guild and prove that I am the greatest artisan of them all.</option>
        <option>I will get revenge on the evil forces that destroyed my place of business and ruined my livelihood.</option>
        `
        bonds.setAttribute('list', 'Guild-MerchantBList')
      flawsDatalist.setAttribute('id', 'Guild-MerchantFList')
        flawsDatalist.innerHTML = `
        <option>I'll do anything to get my hands on something rare or priceless.</option>
        <option>I'm quick to assume that someone is trying to cheat me.</option>
        <option>No one must ever learn that I once stole money from guild coffers.</option>
        <option>I'm never satisfied with what I have – I always want more.</option>
        <option>I would kill to acquire a noble title.</option>
        <option>I'm horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I'm surrounded by rivals.</option>
        `
        flaws.setAttribute('list', 'Guild-MerchantFList')
        break;
      case 'Haunted One':
      personalityDatalist.setAttribute('id', 'Haunted-OnePList')
        personalityDatalist.innerHTML = `
        <option>I don't run from evil. Evil runs from me.</option>
        <option>I like to read and memorize poetry. It keeps me calm and brings me fleeting moments of happiness.</option>
        <option>I spend money freely and live life to the fullest, knowing that tomorrow I might die.</option>
        <option>I live for the thrill of the hunt.</option>
        <option>I don't talk about the thing that torments me. I'd rather not burden others with my curse.</option>
        <option>I expect danger around every corner.</option>
        <option>I refuse to become a victim, and I will not allow others to be victimized.</option>
        <option>I put no trust in divine beings.</option>
        `
        personality.setAttribute('list', 'Haunted-OnePList')
      idealsDatalist.setAttribute('id', 'Haunted-OneIList')
        idealsDatalist.innerHTML = `
        <option>Selflessness. I try to help those in need, no matter what the personal cost. (Good)</option>
        <option>Determination. I'll stop the spirits that haunt me or die trying. (Any)</option>
        <option>Greater Good. I kill monsters to make the world a safer place, and to exorcise my own demons. (Good)</option>
        <option>Freedom. I have a dark calling that puts me above the law. (Chaotic)</option>
        <option>Logic. I like to know my enemy's capabilities and weaknesses before rushing into battle. (Lawful)</option>
        <option>Destruction. I'm a monster that destroys other monsters, and anything else that gets in my way. (Evil)</option>
        `
        ideals.setAttribute('list', 'Haunted-OneIList')
      bondsDatalist.setAttribute('id', 'Haunted-OneBList')
        bondsDatalist.innerHTML = `
        <option>I keep my thoughts and discoveries in a journal. My journal is my legacy.</option>
        <option>I would sacrifice my life and my soul to protect the innocent.</option>
        <option>My torment drove away the person I love. I strive to win back the love I've lost.</option>
        <option>A terrible guilt consumes me. I hope that I can find redemption through my actions.</option>
        <option>There's evil in me, I can feel it. It must never be set free.</option>
        <option>I have a child to protect. I must make the world a safer place for them.</option>
        `
        bonds.setAttribute('list', 'Haunted-OneBList')
      flawsDatalist.setAttribute('id', 'Haunted-OneFList')
        flawsDatalist.innerHTML = `
        <option>I have certain rituals that I must follow every day. I can never break them.</option>
        <option>I assume the worst in people.</option>
        <option>I feel no compassion for the dead. They’re the lucky ones.</option>
        <option>I have an addiction.</option>
        <option>I am a purveyor of doom and gloom who lives in a world without hope.</option>
        <option>I talk to spirits that no one else can see.</option>
        `
        flaws.setAttribute('list', 'Haunted-OneFList')
        break;
      case 'Hermit':
      personalityDatalist.setAttribute('id', 'HermitPList')
        personalityDatalist.innerHTML = `
        <option>I've been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.</option>
        <option>I am utterly serene, even in the face of disaster.</option>
        <option>The leader of my community had something wise to say on every topic, and I am eager to share that wisdom.</option>
        <option>I feel tremendous empathy for all who suffer.</option>
        <option>I'm oblivious to etiquette and social expectations.</option>
        <option>I connect everything that happens to me to a grand, cosmic plan.</option>
        <option>I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings.</option>
        <option>I am working on a grand philosophical theory and love sharing my ideas.</option>
        `
        personality.setAttribute('list', 'HermitPList')
      idealsDatalist.setAttribute('id', 'HermitIList')
        idealsDatalist.innerHTML = `
        <option>Greater Good. My gifts are meant to be shared with all, not used for my own benefit. (Good)</option>
        <option>Logic. Emotions must not cloud our sense of what is right and true, or our logical thinking. (Lawful)</option>
        <option>Free Thinking. Inquiry and curiosity are the pillars of progress. (Chaotic)</option>
        <option>Power. Solitude and contemplation are paths toward mystical or magical power. (Evil)</option>
        <option>Live and Let Live. Meddling in the affairs of others only causes trouble. (Neutral)</option>
        <option>Self-Knowledge. If you know yourself, there's nothing left to know. (Any)</option>
        `
        ideals.setAttribute('list', 'HermitIList')
      bondsDatalist.setAttribute('id', 'HermitBList')
        bondsDatalist.innerHTML = `
        <option>Nothing is more important than the other members of my hermitage, order, or association.</option>
        <option>I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.</option>
        <option>I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me.</option>
        <option>I entered seclusion because I loved someone I could not have.</option>
        <option>Should my discovery come to light, it could bring ruin to the world.</option>
        <option>My isolation gave me great insight into a great evil that only I can destroy.</option>
        `
        bonds.setAttribute('list', 'HermitBList')
      flawsDatalist.setAttribute('id', 'HermitFList')
        flawsDatalist.innerHTML = `
        <option>Now that I've returned to the world, I enjoy its delights a little too much.</option>
        <option>I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.</option>
        <option>I am dogmatic in my thoughts and philosophy.</option>
        <option>I let my need to win arguments overshadow friendships and harmony.</option>
        <option>I'd risk too much to uncover a lost bit of knowledge.</option>
        <option>I like keeping secrets and won't share them with anyone.</option>
        `
        flaws.setAttribute('list', 'HermitFList')
        break;
      case 'House Agent':
      personalityDatalist.setAttribute('id', 'House-AgentPList')
        personalityDatalist.innerHTML = `
        <option>I'm always looking to improve efficiency.</option>
        <option>I love to share trivia about my house's business.</option>
        <option>I never forget an insult against me or my house.</option>
        <option>I'm enthusiastic about everything my house does.</option>
        <option>I represent my house and take pride in my looks.</option>
        <option>I'm critical of monarchies and limits on the houses.</option>
        `
        personality.setAttribute('list', 'House-AgentPList')
      idealsDatalist.setAttribute('id', 'House-AgentIList')
        idealsDatalist.innerHTML = `
        <option>Common Good. My house serves a vital function, and its prosperity will help everyone. (Good)</option>
        <option>Tradition. I uphold traditions of my house and bring honor to my family. (Lawful)</option>
        <option>Innovation. Abandon old traditions and find better ways to do things. (Chaotic)</option>
        <option>Power. I want to ensure the prosperity of my house and wield its power myself. (Evil)</option>
        <option>Discovery. I want to learn all I can, both for my house and for my own curiosity. (Any)</option>
        <option>Comfort. I want to ensure that me and mine enjoy the best things in life. (Any)</option>
        `
        ideals.setAttribute('list', 'House-AgentIList')
      bondsDatalist.setAttribute('id', 'House-AgentBList')
        bondsDatalist.innerHTML = `
        <option>My house is my family. I would do anything for it.</option>
        <option>I love someone from another house, but the relationship is forbidden.</option>
        <option>Someone I love was killed by a rival faction within my house, and I will have revenge.</option>
        <option>I don't care about the house as a whole, but I would do anything for my old mentor.</option>
        <option>My house must evolve, and I'll lead the evolution.</option>
        <option>I'm determined to impress the leaders of my house, and to become a leader myself.</option>
        `
        bonds.setAttribute('list', 'House-AgentBList')
      flawsDatalist.setAttribute('id', 'House-AgentFList')
        flawsDatalist.innerHTML = `
        <option>I'm fixated on following official protocols.</option>
        <option>I'm obsessed with conspiracy theories and worried about secret societies and hidden demons.</option>
        <option>My house and blood line make me the best!</option>
        <option>My secret could get me expelled from my house.</option>
        <option>My religious beliefs aren't widespread in my house.</option>
        <option>I'm working for a hidden faction in my house that gives me secret assignments.</option>
        `
        flaws.setAttribute('list', 'House-AgentFList')
        break;
      case 'Knight':
      personalityDatalist.setAttribute('id', 'KnightPList')
        personalityDatalist.innerHTML = `
        <option>My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.</option>
        <option>The common folk love me for my kindness and generosity.</option>
        <option>No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.</option>
        <option>I take great pains to always look my best and follow the latest fashions.</option>
        <option>I don't like to get my hands dirty, and I won't be caught dead in unsuitable accommodations.</option>
        <option>Despite my noble birth, I do not place myself above other folk. We all have the same blood.</option>
        <option>My favor, once lost, is lost forever.</option>
        <option>If you do me an injury, I will crush you, ruin your name, and salt your fields.</option>
        `
        personality.setAttribute('list', 'KnightPList')
      idealsDatalist.setAttribute('id', 'KnightIList')
        idealsDatalist.innerHTML = `
        <option>Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)</option>
        <option>Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)</option>
        <option>Independence. I must prove that I can handle myself without the coddling of my family. (Chaotic)</option>
        <option>Power. If I can attain more power, no one will tell me what to do. (Evil)</option>
        <option>Family. Blood runs thicker than water. (Any)</option>
        <option>Noble Obligation. It is my duty to protect and care for the people beneath me. (Good)</option>
        `
        ideals.setAttribute('list', 'KnightIList')
      bondsDatalist.setAttribute('id', 'KnightBList')
        bondsDatalist.innerHTML = `
        <option>I will face any challenge to win the approval of my family.</option>
        <option>My house's alliance with another noble family must be sustained at all costs.</option>
        <option>Nothing is more important than the other members of my family.</option>
        <option>I am in love with the heir of a family that my family despises.</option>
        <option>My loyalty to my sovereign is unwavering.</option>
        <option>The common folk must see me as a hero of the people.</option>
        `
        bonds.setAttribute('list', 'KnightBList')
      flawsDatalist.setAttribute('id', 'KnightFList')
        flawsDatalist.innerHTML = `
        <option>I secretly believe that everyone is beneath me.</option>
        <option>I hide a truly scandalous secret that could ruin my family forever.</option>
        <option>I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger.</option>
        <option>I have an insatiable desire for carnal pleasures.</option>
        <option>In fact, the world does revolve around me.</option>
        <option>By my words and actions, I often bring shame to my family.</option>
        `
        flaws.setAttribute('list', 'KnightFList')
        break;
      case 'Marine':
      personalityDatalist.setAttribute('id', 'MarinePList')
        personalityDatalist.innerHTML = `
        <option>I speak rarely but mean every word I say.</option>
        <option>I laugh loudly and see the humor in stressful situations.</option>
        <option>I prefer to solve problems without violence, but I finish fights decisively.</option>
        <option>I enjoy being out in nature; poor weather never sours my mood.</option>
        <option>I am dependable.</option>
        <option>I am always working on some project or other.</option>
        <option>I become cantankerous and quiet in the rain.</option>
        <option>When the sea is within my sight, my mood is jovial and optimistic.</option>
        `
        personality.setAttribute('list', 'MarinePList')
      idealsDatalist.setAttribute('id', 'MarineIList')
        idealsDatalist.innerHTML = `
        <option>Teamwork. Success depends on cooperation and communication. (Good)</option>
        <option>Code. The marines' code provides a solution for every problem, and following it is imperative. (Lawful)</option>
        <option>Embracing. Life is messy. Throwing yourself into the worst of it is necessary to get the job done. (Chaotic)</option>
        <option>Might. The strong train so that they might rule those who are weak. (Evil)</option>
        <option>Bravery. To act when others quake in fear- this is the essence of the warrior. (Any)</option>
        <option>Perseverance. No injury or obstacle can turn me from my goal. (Any)</option>
        `
        ideals.setAttribute('list', 'MarineIList')
      bondsDatalist.setAttribute('id', 'MarineBList')
        bondsDatalist.innerHTML = `
        <option>I face danger and evil to offset an unredeemable act in my past.</option>
        <option>I. Will. Finish. The. Job.</option>
        <option>I must set an example of hope for those who have given up.</option>
        <option>I'm searching for a fellow marine captured by an elusive enemy.</option>
        <option>Fear leads to tyranny, and both must be eradicated.</option>
        <option>My commander betrayed my unit, and I will have revenge.</option>
        `
        bonds.setAttribute('list', 'MarineBList')
      flawsDatalist.setAttribute('id', 'MarineFList')
        flawsDatalist.innerHTML = `
        <option>I grow combative and unpredictable when I drink.</option>
        <option>I find civilian life difficult and struggle to say the right thing in social situations.</option>
        <option>My intensity can drive others away.</option>
        <option>I hold grudges and have difficulty forgiving others.</option>
        <option>I become irrational when innocent people are hurt.</option>
        <option>I sometimes stay up all night listening to the ghosts of my fallen enemies.</option>
        `
        flaws.setAttribute('list', 'MarineFList')
        break;
      case 'Noble':
      personalityDatalist.setAttribute('id', 'NoblePList')
        personalityDatalist.innerHTML = `
        <option>My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.</option>
        <option>The common folk love me for my kindness and generosity.</option>
        <option>No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.</option>
        <option>I take great pains to always look my best and follow the latest fashions.</option>
        <option>I don't like to get my hands dirty, and I won't be caught dead in unsuitable accommodations.</option>
        <option>Despite my noble birth, I do not place myself above other folk. We all have the same blood.</option>
        <option>My favor, once lost, is lost forever.</option>
        <option>If you do me an injury, I will crush you, ruin your name, and salt your fields.</option>
        `
        personality.setAttribute('list', 'NoblePList')
      idealsDatalist.setAttribute('id', 'NobleIList')
        idealsDatalist.innerHTML = `
        <option>Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)</option>
        <option>Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)</option>
        <option>Independence. I must prove that I can handle myself without the coddling of my family. (Chaotic)</option>
        <option>Power. If I can attain more power, no one will tell me what to do. (Evil)</option>
        <option>Family. Blood runs thicker than water. (Any)</option>
        <option>Noble Obligation. It is my duty to protect and care for the people beneath me. (Good)</option>
        `
        ideals.setAttribute('list', 'NobleIList')
      bondsDatalist.setAttribute('id', 'NobleBList')
        bondsDatalist.innerHTML = `
        <option>I will face any challenge to win the approval of my family.</option>
        <option>My house's alliance with another noble family must be sustained at all costs.</option>
        <option>Nothing is more important than the other members of my family.</option>
        <option>I am in love with the heir of a family that my family despises.</option>
        <option>My loyalty to my sovereign is unwavering.</option>
        <option>The common folk must see me as a hero of the people.</option>
        `
        bonds.setAttribute('list', 'NobleBList')
      flawsDatalist.setAttribute('id', 'NobleFList')
        flawsDatalist.innerHTML = `
        <option>I secretly believe that everyone is beneath me.</option>
        <option>I hide a truly scandalous secret that could ruin my family forever.</option>
        <option>I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger.</option>
        <option>I have an insatiable desire for carnal pleasures.</option>
        <option>In fact, the world does revolve around me.</option>
        <option>By my words and actions, I often bring shame to my family.</option>
        `
        flaws.setAttribute('list', 'NobleFList')
        break;
      case 'Outlander':
      personalityDatalist.setAttribute('id', 'OutlanderPList')
        personalityDatalist.innerHTML = `
        <option>I'm driven by a wanderlust that led me away from home.</option>
        <option>I watch over my friends as if they were a litter of newborn pups.</option>
        <option>I once ran twenty-five miles without stopping to warn my clan of an approaching orc horde. I'd do it again if I had to.</option>
        <option>I have a lesson for every situation, drawn from observing nature.</option>
        <option>I place no stock in wealthy or well-mannered folk. Money and manners won't save you from a hungry owlbear.</option>
        <option>I'm always picking things up, absently fiddling with them, and sometimes accidentally breaking them.</option>
        <option>I feel far more comfortable around animals than people.</option>
        <option>I was, in fact, raised by wolves.</option>
        `
        personality.setAttribute('list', 'OutlanderPList')
      idealsDatalist.setAttribute('id', 'OutlanderIList')
        idealsDatalist.innerHTML = `
        <option>Change. Life is like the seasons, in constant change, and we must change with it. (Chaotic)</option>
        <option>Greater Good. It is each person's responsibility to make the most happiness for the whole tribe. (Good)</option>
        <option>Honor. If I dishonor myself, I dishonor my whole clan. (Lawful)</option>
        <option>Might. The strongest are meant to rule. (Evil)</option>
        <option>Nature. The natural world is more important than all the constructs of civilization. (Neutral)</option>
        <option>Glory. I must earn glory in battle, for myself and my clan. (Any)</option>
        `
        ideals.setAttribute('list', 'OutlanderIList')
      bondsDatalist.setAttribute('id', 'OutlanderBList')
        bondsDatalist.innerHTML = `
        <option>My family, clan, or tribe is the most important thing in my life, even when they are far from me.</option>
        <option>An injury to the unspoiled wilderness of my home is an injury to me.</option>
        <option>I will bring terrible wrath down on the evildoers who destroyed my homeland.</option>
        <option>I am the last of my tribe, and it is up to me to ensure their names enter legend.</option>
        <option>I suffer awful visions of a coming disaster and will do anything to prevent it.</option>
        <option>It is my duty to provide children to sustain my tribe.</option>
        `
        bonds.setAttribute('list', 'OutlanderBList')
      flawsDatalist.setAttribute('id', 'OutlanderFList')
        flawsDatalist.innerHTML = `
        <option>I am too enamored of ale, wine, and other intoxicants.</option>
        <option>There's no room for caution in a life lived to the fullest.</option>
        <option>I remember every insult I've received and nurse a silent resentment toward anyone who's ever wronged me.</option>
        <option>I am slow to trust members of other races, tribes, and societies.</option>
        <option>Violence is my answer to almost any challenge.</option>
        <option>Don't expect me to save those who can't save themselves. It is nature's way that the strong thrive and the weak perish.</option>
        `
        flaws.setAttribute('list', 'OutlanderFList')
        break;
      case 'Pirate':
      personalityDatalist.setAttribute('id', 'PiratePList')
        personalityDatalist.innerHTML = `
        <option>My friends know they can rely on me, no matter what.</option>
        <option>I work hard so that I can play hard when the work is done.</option>
        <option>I enjoy sailing into new ports and making new friends over a flagon of ale.</option>
        <option>I stretch the truth for the sake of a good story.</option>
        <option>To me, a tavern brawl is a nice way to get to know a new city.</option>
        <option>I never pass up a friendly wager.</option>
        <option>My language is as foul as an otyugh nest.</option>
        <option>I like a job well done, especially if I can convince someone else to do it.</option>
        `
        personality.setAttribute('list', 'PiratePList')
      idealsDatalist.setAttribute('id', 'PirateIList')
        idealsDatalist.innerHTML = `
        <option>Respect. The thing that keeps a ship together is mutual respect between captain and crew. (Good)</option>
        <option>Fairness. We all do the work, so we all share in the rewards. (Lawful)</option>
        <option>Freedom. The sea is freedom-the freedom to go anywhere and do anything. (Chaotic)</option>
        <option>Mastery. I'm a predator, and the other ships on the sea are my prey. (Evil)</option>
        <option>People. I'm committed to my crewmates, not to ideals. (Neutral)</option>
        <option>Aspiration. Someday I'll own my own ship and chart my own destiny. (Any)</option>
        `
        ideals.setAttribute('list', 'PirateIList')
      bondsDatalist.setAttribute('id', 'PirateBList')
        bondsDatalist.innerHTML = `
        <option>I'm loyal to my captain first, everything else second.</option>
        <option>The ship is most important - crewmates and captains come and go.</option>
        <option>I'll always remember my first ship.</option>
        <option>In a harbor town, I have a paramour whose eyes nearly stole me from the sea.</option>
        <option>I was cheated out of my fair share of the profits, and I want to get my due.</option>
        <option>Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengeance will be mine.</option>
        `
        bonds.setAttribute('list', 'PirateBList')
      flawsDatalist.setAttribute('id', 'PirateFList')
        flawsDatalist.innerHTML = `
        <option>I follow orders, even if I think they're wrong.</option>
        <option>I'll say anything to avoid having to do extra work.</option>
        <option>Once someone questions my courage, I never back down no matter how dangerous the situation.</option>
        <option>Once I start drinking, it's hard for me to stop.</option>
        <option>I can't help but pocket loose coins and other trinkets I come across.</option>
        <option>My pride will probably lead to my destruction.</option>
        `
        flaws.setAttribute('list', 'PirateFList')
        break;
      case 'Rewarded':
      personalityDatalist.setAttribute('id', 'RewardedPList')
        personalityDatalist.innerHTML = `
        <option>A safe home is a foundation on which anything else can be built. (Key, Throne)</option>
        <option>I was elevated to heights I could never otherwise attain, and I won’t waste my fortune. (Star, Sun)</option>
        <option>I try to be a source of inspiration and joy to others. Life is never as bad as you think! (Euryale, Jester)</option>
        <option>Courage and boldness can carry the day when all else fails. (Comet, Knight)</option>
        <option>My good fortune means I can lift others up as well. (Gem, Moon)</option>
        <option>Having the right answers is the first step to solving any problem, no matter how dire. (Fates, Sage)</option>
        `
        personality.setAttribute('list', 'RewardedPList')
        break;
      case 'Ruined':
      personalityDatalist.setAttribute('id', 'RuinedPList')
        personalityDatalist.innerHTML = `
        <option>I’ve changed from my past, and I work to live up to my new path. (Balance, Throne)</option>
        <option>Every moment is a gift I refuse to squander. (Euryale, Skull)</option>
        <option>Now that I’ve overcome having nothing, I can survive anything. (Fool, Ruin, Talons)</option>
        <option>I know enemies are set against me, and I always prepare for the worst. (Flames, Rogue)</option>
        <option>I interpret every event as part of a larger pattern I just haven’t worked out yet. (Puzzle, Star)</option>
        <option>I must make up for so much time I’ve already lost. (Donjon, Void)</option>
        `
        personality.setAttribute('list', 'RuinedPList')
        break;
      case 'Rune Carver':
      personalityDatalist.setAttribute('id', 'Rune-CarverPList')
        personalityDatalist.innerHTML = `
        <option>Is it practical to learn an ancient language that is rarely spoken? No. But is it fun? Very.</option>
        <option>I learned one of my ancestors was a lauded rune carver whose story was lost to time. I seek to rekindle that legacy.</option>
        <option>The old, traditional markings of runecraft look so boring. Why not give my runes some flair?</option>
        <option>In my studies of runes, I strive to understand how great civilizations of the past fell, so that I may prevent it from happening to societies of the present.</option>
        <option>Life may be a whirlwind of chaos around me, but whenever I create my runes, I feel at peace.</option>
        <option>My brain struggles to process ink words written on paper, but the tactile feeling of carved runes makes my mind sing.</option>
        `
        personality.setAttribute('list', 'Rune-CarverPList')
        break;
      case 'Sage':
      personalityDatalist.setAttribute('id', 'SagePList')
        personalityDatalist.innerHTML = `
        <option>I use polysyllabic words that convey the impression of great erudition.</option>
        <option>I've read every book in the world's greatest libraries – or I like to boast that I have.</option>
        <option>I'm used to helping out those who aren't as smart as I am, and I patiently explain anything and everything to others.</option>
        <option>There's nothing I like more than a good mystery.</option>
        <option>I'm willing to listen to every side of an argument before I make my own judgment.</option>
        <option>I… speak… slowly… when talking… to idiots,… which… almost… everyone… is… compared… to me.</option>
        <option>I am horribly, horribly awkward in social situations.</option>
        <option>I'm convinced that people are always trying to steal my secrets.</option>
        `
        personality.setAttribute('list', 'SagePList')
      idealsDatalist.setAttribute('id', 'SageIList')
        idealsDatalist.innerHTML = `
        <option>Knowledge. The path to power and self-improvement is through knowledge. (Neutral)</option>
        <option>Beauty. What is beautiful points us beyond itself toward what is true. (Good)</option>
        <option>Logic. Emotions must not cloud our logical thinking. (Lawful)</option>
        <option>No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)</option>
        <option>Power. Knowledge is the path to power and domination. (Evil)</option>
        <option>Self-Improvement. The goal of a life of study is the betterment of oneself. (Any)</option>
        `
        ideals.setAttribute('list', 'SageIList')
      bondsDatalist.setAttribute('id', 'SageBList')
        bondsDatalist.innerHTML = `
        <option>It is my duty to protect my students.</option>
        <option>I have an ancient text that holds terrible secrets that must not fall into the wrong hands.</option>
        <option>I work to preserve a library, university, scriptorium, or monastery.</option>
        <option>My life's work is a series of tomes related to a specific field of lore.</option>
        <option>I've been searching my whole life for the answer to a certain question.</option>
        <option>I sold my soul for knowledge. I hope to do great deeds and win it back.</option>
        `
        bonds.setAttribute('list', 'SageBList')
      flawsDatalist.setAttribute('id', 'SageFList')
        flawsDatalist.innerHTML = `
        <option>I am easily distracted by the promise of information.</option>
        <option>Most people scream and run when they see a demon. I stop and take notes on its anatomy.</option>
        <option>Unlocking an ancient mystery is worth the price of a civilization.</option>
        <option>I overlook obvious solutions in favor of complicated ones.</option>
        <option>I speak without really thinking through my words, invariably insulting others.</option>
        <option>I can't keep a secret to save my life, or anyone else's.</option>
        `
        flaws.setAttribute('list', 'SageFList')
        break;
      case 'Sailor':
      personalityDatalist.setAttribute('id', 'SailorPList')
        personalityDatalist.innerHTML = `
        <option>My friends know they can rely on me, no matter what.</option>
        <option>I work hard so that I can play hard when the work is done.</option>
        <option>I enjoy sailing into new ports and making new friends over a flagon of ale.</option>
        <option>I stretch the truth for the sake of a good story.</option>
        <option>To me, a tavern brawl is a nice way to get to know a new city.</option>
        <option>I never pass up a friendly wager.</option>
        <option>My language is as foul as an otyugh nest.</option>
        <option>I like a job well done, especially if I can convince someone else to do it.</option>
        `
        personality.setAttribute('list', 'SailorPList')
      idealsDatalist.setAttribute('id', 'SailorIList')
        idealsDatalist.innerHTML = `
        <option>Respect. The thing that keeps a ship together is mutual respect between captain and crew. (Good)</option>
        <option>Fairness. We all do the work, so we all share in the rewards. (Lawful)</option>
        <option>Freedom. The sea is freedom-the freedom to go anywhere and do anything. (Chaotic)</option>
        <option>Mastery. I'm a predator, and the other ships on the sea are my prey. (Evil)</option>
        <option>People. I'm committed to my crewmates, not to ideals. (Neutral)</option>
        <option>Aspiration. Someday I'll own my own ship and chart my own destiny. (Any)</option>
        `
        ideals.setAttribute('list', 'SailorIList')
      bondsDatalist.setAttribute('id', 'SailorBList')
        bondsDatalist.innerHTML = `
        <option>I'm loyal to my captain first, everything else second.</option>
        <option>The ship is most important - crewmates and captains come and go.</option>
        <option>I'll always remember my first ship.</option>
        <option>In a harbor town, I have a paramour whose eyes nearly stole me from the sea.</option>
        <option>I was cheated out of my fair share of the profits, and I want to get my due.</option>
        <option>Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengeance will be mine.</option>
        `
        bonds.setAttribute('list', 'SailorBList')
      flawsDatalist.setAttribute('id', 'SailorFList')
        flawsDatalist.innerHTML = `
        <option>I follow orders, even if I think they're wrong.</option>
        <option>I'll say anything to avoid having to do extra work.</option>
        <option>Once someone questions my courage, I never back down no matter how dangerous the situation.</option>
        <option>Once I start drinking, it's hard for me to stop.</option>
        <option>I can't help but pocket loose coins and other trinkets I come across.</option>
        <option>My pride will probably lead to my destruction.</option>
        `
        flaws.setAttribute('list', 'SailorFList')
        break;
      case 'Shipwright':
      personalityDatalist.setAttribute('id', 'ShipwrightPList')
        personalityDatalist.innerHTML = `
        <option>I love talking and being heard more than I like to listen.</option>
        <option>I'm extremely fond of puzzles.</option>
        <option>I thrive under pressure.</option>
        <option>I love sketching and designing objects, especially boats.</option>
        <option>I'm not afraid of hard work—in fact, I prefer it.</option>
        <option>A pipe, an ale, and the smell of the sea: paradise.</option>
        <option>I have an endless supply of cautionary tales related to the sea.</option>
        <option>I don't mind getting my hands dirty.</option>
        `
        personality.setAttribute('list', 'ShipwrightPList')
      idealsDatalist.setAttribute('id', 'ShipwrightIList')
        idealsDatalist.innerHTML = `
        <option>Crew. If everyone on deck pitches in, we'll never sink. (Good)</option>
        <option>Careful Lines. A ship must be balanced according to the laws of the universe. (Lawful)</option>
        <option>Invention. Make what you need out of whatever is at hand. (Chaotic)</option>
        <option>Perfection. To measure a being and find it lacking is the greatest disappointment. (Evil)</option>
        <option>Reflection. Muddied water always clears in time. (Any)</option>
        <option>Hope. The horizon at sea holds the greatest promise. (Any)</option>
        `
        ideals.setAttribute('list', 'ShipwrightIList')
      bondsDatalist.setAttribute('id', 'ShipwrightBList')
        bondsDatalist.innerHTML = `
        <option>I must visit all the oceans of the world and behold the ships that sail there.</option>
        <option>Much of the treasure I claim will be used to enrich my community.</option>
        <option>I must find a kind of wood rumored to possess magical qualities.</option>
        <option>I repair broken things to redeem what's broken in myself.</option>
        <option>I will craft a boat capable of sailing through the most dangerous of storms.</option>
        <option>A kraken destroyed my masterpiece; its teeth shall adorn my hearth.</option>
        `
        bonds.setAttribute('list', 'ShipwrightBList')
      flawsDatalist.setAttribute('id', 'ShipwrightFList')
        flawsDatalist.innerHTML = `
        <option>I don't know when to throw something away. You never know when it might be useful again.</option>
        <option>I get frustrated to the point of distraction by shoddy craftsmanship.</option>
        <option>Though I am an excellent crafter, my work tends to look as though it belongs on a ship.</option>
        <option>I am so obsessed with sketching my ideas for elaborate inventions that I sometimes forget little thing like eating and sleeping.</option>
        <option>I'm judgmental of those who are not skilled with tools of some kind.</option>
        <option>I sometimes take things that don't belong to me, especially if they are very well made.</option>
        `
        flaws.setAttribute('list', 'ShipwrightFList')
        break;
      case 'Smuggler':
      personalityDatalist.setAttribute('id', 'SmugglerPList')
        personalityDatalist.innerHTML = `
        <option>I love being on the water but hate fishing.</option>
        <option>I think of everything in terms of monetary value.</option>
        <option>I never stop smiling.</option>
        <option>Nothing rattles me; I have a lie for every occasion.</option>
        <option>I love gold but won't cheat a friend.</option>
        <option>I enjoy doing things others believe to be impossible.</option>
        <option>I become wistful when I see the sun rise over the ocean.</option>
        <option>I am no common criminal; I am a mastermind.</option>
        `
        personality.setAttribute('list', 'SmugglerPList')
      idealsDatalist.setAttribute('id', 'SmugglerIList')
        idealsDatalist.innerHTML = `
        <option>Wealth Heaps of coins in a secure vault is all I dream of. (Any)</option>
        <option>Smuggler's Code I uphold the unwritten rules of the smugglers, who do not cheat one another or directly harm innocents. (Lawful)</option>
        <option>All for a Coin I'll do nearly anything if it means I turn a profit. (Evil)</option>
        <option>Peace and Prosperity I smuggle only to achieve a greater goal that benefits my community. (Good)</option>
        <option>People For all my many lies, I place a high value on friendship. (Any)</option>
        <option>Daring I am most happy when risking everything. (Any)</option>
        `
        ideals.setAttribute('list', 'SmugglerIList')
      bondsDatalist.setAttribute('id', 'SmugglerBList')
        bondsDatalist.innerHTML = `
        <option>My vessel was stolen from me, and I burn with the desire to recover it.</option>
        <option>I intend to become the leader of the network of smugglers that I belong to.</option>
        <option>I owe a debt that cannot be repaid in gold.</option>
        <option>After one last job, I will retire from the business.</option>
        <option>I was tricked by a fellow smuggler who stole something precious from me. I will find that thief.</option>
        <option>I give most of my profits to a charitable cause, and I don't like to brag about it.</option>
        `
        bonds.setAttribute('list', 'SmugglerBList')
      flawsDatalist.setAttribute('id', 'SmugglerFList')
        flawsDatalist.innerHTML = `
        <option>Lying is reflexive, and I sometimes engage in it without realizing.</option>
        <option>I tend to assess my relationships in terms of profit and loss.</option>
        <option>I believe everyone has a price and am cynical toward those who present themselves as virtuous.</option>
        <option>I struggle to trust the words of others.</option>
        <option>Few people know the real me.</option>
        <option>Though I act charming, I feel nothing for others and don't know what friendship is.</option>
        `
        flaws.setAttribute('list', 'SmugglerFList')
        break;
      case 'Soldier':
      personalityDatalist.setAttribute('id', 'SoldierPList')
        personalityDatalist.innerHTML = `
        <option>I'm always polite and respectful.</option>
        <option>I'm haunted by memories of war. I can't get the images of violence out of my mind.</option>
        <option>I've lost too many friends, and I'm slow to make new ones.</option>
        <option>I'm full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.</option>
        <option>I can stare down a hell hound without flinching.</option>
        <option>I enjoy being strong and like breaking things.</option>
        <option>I have a crude sense of humor.</option>
        <option>I face problems head-on. A simple, direct solution is the best path to success.</option>
        `
        personality.setAttribute('list', 'SoldierPList')
      idealsDatalist.setAttribute('id', 'SoldierIList')
        idealsDatalist.innerHTML = `
        <option>Greater Good. Our lot is to lay down our lives in defense of others. (Good)</option>
        <option>Responsibility. I do what I must and obey just authority. (Lawful)</option>
        <option>Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)</option>
        <option>Might. In life as in war, the stronger force wins. (Evil)</option>
        <option>Live and Let Live. Ideals aren't worth killing over or going to war for. (Neutral)</option>
        <option>Nation. My city, nation, or people are all that matter. (Any)</option>
        `
        ideals.setAttribute('list', 'SoldierIList')
      bondsDatalist.setAttribute('id', 'SoldierBList')
        bondsDatalist.innerHTML = `
        <option>I would still lay down my life for the people I served with.</option>
        <option>Someone saved my life on the battlefield. To this day, I will never leave a friend behind.</option>
        <option>My honor is my life.</option>
        <option>I'll never forget the crushing defeat my company suffered or the enemies who dealt it.</option>
        <option>Those who fight beside me are those worth dying for.</option>
        <option>I fight for those who cannot fight for themselves.</option>
        `
        bonds.setAttribute('list', 'SoldierBList')
      flawsDatalist.setAttribute('id', 'SoldierFList')
        flawsDatalist.innerHTML = `
        <option>The monstrous enemy we faced in battle still leaves me quivering with fear.</option>
        <option>I have little respect for anyone who is not a proven warrior.</option>
        <option>I made a terrible mistake in battle that cost many lives - and I would do anything to keep that mistake secret.</option>
        <option>My hatred of my enemies is blind and unreasoning.</option>
        <option>I obey the law, even if the law causes misery.</option>
        <option>I'd rather eat my armor than admit when I'm wrong.</option>
        `
        flaws.setAttribute('list', 'SoldierFList')
        break;
      case 'Spy':
      personalityDatalist.setAttribute('id', 'SpyPList')
        personalityDatalist.innerHTML = `
        <option>I always have a plan for what to do when things go wrong.</option>
        <option>I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.</option>
        <option>The first thing I do in a new place is note the locations of everything valuable – or where such things could be hidden.</option>
        <option>I would rather make a new friend than a new enemy.</option>
        <option>I am incredibly slow to trust. Those who seem the fairest often have the most to hide.</option>
        <option>I don't pay attention to the risks in a situation. Never tell me the odds.</option>
        <option>The best way to get me to do something is to tell me I can't do it.</option>
        <option>I blow up at the slightest insult.</option>
        `
        personality.setAttribute('list', 'SpyPList')
      idealsDatalist.setAttribute('id', 'SpyIList')
        idealsDatalist.innerHTML = `
        <option>Honor. I don't steal from others in the trade. (Lawful)</option>
        <option>Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)</option>
        <option>Charity. I steal from the wealthy so that I can help people in need. (Good)</option>
        <option>Greed. I will do whatever it takes to become wealthy. (Evil)</option>
        <option>People. I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)</option>
        <option>Redemption. There's a spark of good in everyone. (Good)</option>
        `
        ideals.setAttribute('list', 'SpyIList')
      bondsDatalist.setAttribute('id', 'SpyBList')
        bondsDatalist.innerHTML = `
        <option>I'm trying to pay off an old debt I owe to a generous benefactor.</option>
        <option>My ill-gotten gains go to support my family.</option>
        <option>Something important was taken from me, and I aim to steal it back.</option>
        <option>I will become the greatest thief that ever lived.</option>
        <option>I'm guilty of a terrible crime. I hope I can redeem myself for it.</option>
        <option>Someone I loved died because of I mistake I made. That will never happen again.</option>
        `
        bonds.setAttribute('list', 'SpyBList')
      flawsDatalist.setAttribute('id', 'SpyFList')
        flawsDatalist.innerHTML = `
        <option>When I see something valuable, I can't think about anything but how to steal it.</option>
        <option>When faced with a choice between money and my friends, I usually choose the money.</option>
        <option>If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.</option>
        <option>I have a "tell" that reveals when I'm lying.</option>
        <option>I turn tail and run when things look bad.</option>
        <option>An innocent person is in prison for a crime that I committed. I'm okay with that.</option>
        `
        flaws.setAttribute('list', 'SpyFList')
        break;
      case 'Urchin':
      personalityDatalist.setAttribute('id', 'UrchinPList')
        personalityDatalist.innerHTML = `
        <option>I hide scraps of food and trinkets away in my pockets.</option>
        <option>I ask a lot of questions.</option>
        <option>I like to squeeze into small places where no one else can get to me.</option>
        <option>I sleep with my back to a wall or tree, with everything I own wrapped in a bundle in my arms.</option>
        <option>I eat like a pig and have bad manners.</option>
        <option>I think anyone who's nice to me is hiding evil intent.</option>
        <option>I don't like to bathe.</option>
        <option>I bluntly say what other people are hinting at or hiding.</option>
        `
        personality.setAttribute('list', 'UrchinPList')
      idealsDatalist.setAttribute('id', 'UrchinIList')
        idealsDatalist.innerHTML = `
        <option>Respect. All people, rich or poor, deserve respect. (Good)</option>
        <option>Community. We have to take care of each other, because no one else is going to do it. (Lawful)</option>
        <option>Change. The low are lifted up, and the high and mighty are brought down. Change is the nature of things. (Chaotic)</option>
        <option>Retribution. The rich need to be shown what life and death are like in the gutters. (Evil)</option>
        <option>People. I help the people who help me-that's what keeps us alive. (Neutral)</option>
        <option>Aspiration. I'm going to prove that I'm worthy of a better life. (Any)</option>
        `
        ideals.setAttribute('list', 'UrchinIList')
      bondsDatalist.setAttribute('id', 'UrchinBList')
        bondsDatalist.innerHTML = `
        <option>My town or city is my home, and I'll fight to defend it.</option>
        <option>I sponsor an orphanage to keep others from enduring what I was forced to endure.</option>
        <option>I owe my survival to another urchin who taught me to live on the streets.</option>
        <option>I owe a debt I can never repay to the person who took pity on me.</option>
        <option>I escaped my life of poverty by robbing an important person, and I'm wanted for it.</option>
        <option>No one else should have to endure the hardships I've been through.</option>
        `
        bonds.setAttribute('list', 'UrchinBList')
      flawsDatalist.setAttribute('id', 'UrchinFList')
        flawsDatalist.innerHTML = `
        <option>If I'm outnumbered, I will run away from a fight.</option>
        <option>Gold seems like a lot of money to me, and I'll do just about anything for more of it.</option>
        <option>I will never fully trust anyone other than myself.</option>
        <option>I'd rather kill someone in their sleep then fight fair.</option>
        <option>It's not stealing if I need it more than someone else.</option>
        <option>People who can't take care of themselves get what they deserve.</option>
        `
        flaws.setAttribute('list', 'UrchinFList')
        break;
      case 'Witchlight Hand':
      personalityDatalist.setAttribute('id', 'Witchlight-HandPList')
        personalityDatalist.innerHTML = `
        <option>I'm haunted by fey laughter that only I can hear, though I know it's just my mind playing tricks on me.</option>
        <option>Like a nomad, I can't settle down in one place for very long.</option>
        <option>Good music makes me weep like a baby.</option>
        <option>Wherever I go, I try to bring a little of the warmth and tranquility of home with me.</option>
        <option>I have never lost my childlike sense of wonder.</option>
        <option>When I have a new idea, I get wildly excited about it until I come up with another, better idea.</option>
        <option>I live by my own set of weird and wonderful rules.</option>
        <option>I can't bring myself to trust most adults.</option>
        `
        personality.setAttribute('list', 'Witchlight-HandPList')
      idealsDatalist.setAttribute('id', 'Witchlight-HandIList')
        idealsDatalist.innerHTML = `
        <option>Friendship. I never leave a friend behind. (Good)</option>
        <option>Empathy. No creature should be made to suffer. (Good)</option>
        <option>Wanderlust. I prefer to take the less traveled path. (Chaotic)</option>
        <option>Changeability. Change is good, which is why I live by an ever-changing set of rules. (Chaotic)</option>
        <option>Honor. A deal is a deal, and I would never break one. (Lawful)</option>
        <option>Rule of Three. Everything in the multiverse happens in threes. I see the "rule of three" everywhere. (Lawful)</option>
        <option>Obsession. I won't let go of a grudge. (Evil)</option>
        <option>Greed. I will do whatever it takes to get what I want, regardless of the harm it might cause. (Evil)</option>
        `
        ideals.setAttribute('list', 'Witchlight-HandIList')
      bondsDatalist.setAttribute('id', 'Witchlight-HandBList')
        bondsDatalist.innerHTML = `
        <option>I would never break my word.</option>
        <option>I find magic in all its forms to be compelling. The more magical a place, the more I am drawn to it.</option>
        <option>I do what I can to protect the natural world.</option>
        <option>A trusted friend is the most important thing in the multiverse to me.</option>
        <option>I can't bring myself to harm a Fey creature, either because I consider myself one or because I fear the repercussions.</option>
        <option>The Witchlight Carnival feels like home to me.</option>
        <option>I'm drawn to the Feywild and long to return there, if only for a short while.</option>
        <option>I feel indebted to Mister Witch and Mister Light for giving me a home and a purpose.</option>
        `
        bonds.setAttribute('list', 'Witchlight-HandBList')
      flawsDatalist.setAttribute('id', 'Witchlight-HandFList')
        flawsDatalist.innerHTML = `
        <option>I easily lose track of time. My poor sense of time means I'm always late.</option>
        <option>I think the whole multiverse is out to get me.</option>
        <option>I'm always operating under a tight timeline, and I'm obsessed with keeping everything on schedule.</option>
        <option>I'm a kleptomaniac who covets shiny, sparkling treasure.</option>
        <option>I'm forgetful. Sometimes I can't remember even the simplest things.</option>
        <option>I never give away anything for free and always expect something in return.</option>
        <option>I have many vices and tend to indulge them.</option>
        <option>I'm always changing my mind-well, almost always.</option>
        `
        flaws.setAttribute('list', 'Witchlight-HandFList')
        break;
      default:
        break;
    }
    personality.appendChild(personalityDatalist);
    ideals.appendChild(idealsDatalist);
    bonds.appendChild(bondsDatalist);
    flaws.appendChild(flawsDatalist);
  }