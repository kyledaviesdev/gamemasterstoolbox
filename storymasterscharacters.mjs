const characters = [
	{
		name: "Roaden",
        species: "Half-Elf",
        subspecies: "None",
        job: "Rogue",
        subjob: "Phantom",
        icon: "./images/class-icons-rogue.png",
        background: "Spy (Enforcer)",
        level: "3",
        personality: "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
        ideals: "People. I’m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)",
        bonds: "I’m guilty of a terrible crime. I hope I can redeem myself for it.",
        flaws: "I turn tail and run when things look bad.",
        traits: [
            "Darkvision", "Fey Ancestry", "Whispers of the Dead", "Sneak Attack", "Wails from the Grave",
            "Thieves' Cant", "Steady Aim", "Cunning Action"
        ],
        languages: [
            "Common", "Elvish", "Dwarvish", "Thieves' Cant"
        ],
        allies: [
            "Landon Brush"
        ],
        backstory: 
        `Roaden was shunned as a child and as such only found friendship on the streets, one time he got caught pilfering important documents from a noble man (Landon Brush).
        The nobleman instead of punishing him had Roaden work for him as a spy and enforcer.`,
        tags: [
            "PC", "Sword Coast"
        ]
	},
	{
		name: "Ike Brimstone",
        species: "Genasi",
        subspecies: "Fire",
        job: "Monk",
        subjob: "None",
        icon: "./images/class-icons-monk.png",
        background: "Soldier (Scout)",
        level: "2",
        personality: "I'm always polite and respectful.",
        ideals: "Greater Good. Our lot is to lay down our lives in defense of others. (Good)",
        bonds: "Someone saved my life on the battlefield. To this day, I will never leave a friend behind.",
        flaws: "I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.",
        traits: [
            "Unarmored Defense", "Martial Arts", "Fire Resistance", "Darkvision", "Reach to the Blaze", "Military Rank", "Flurry of Blows",
            "Ki", "Patient Defense", "Step of the Wind", "Unarmored Movement", "Dedicated Weapon"
        ],
        languages: [
            "Common", "Dwarvish"
        ],
        allies: [
            "Brimstone Trading Co."
        ],
        backstory: 
        `My "father" (just what I call him, I don't let him hear me say it, though) helps run the Caravan for the trade route between our home of Calimshan and Neverwinter. 
        I am used to being one of the guards for the caravan but in our latest excursion there was an incident and I got injured just after the fork to Helm's Hold 
        and was told to rest and heal at Neverwinter till the caravan returns after next winter.`,
        tags: [
            "PC", "Calimshan"
        ]
	},
	{
		name: "Reginald Who",
        species: "Owlin",
        subspecies: "Barn Owl",
        job: "Wizard",
        subjob: "None",
        icon: "./images/class-icons-wizard.png",
        background: "Noble",
        level: "1",
        personality: "I'm always polite and respectful.",
        ideals: "Greater Good. Our lot is to lay down our lives in defense of others. (Good)",
        bonds: "Set to protect the Prince",
        flaws: "I made a terrible mistake and I would do anything to keep that mistake secret.",
        traits: [
            "Flight", "Darkvision", "Nocturnal", "Noteriety", "Spellcasting", "Arcane Recovery"
        ],
        languages: [
            "Common", "Dwarvish", "Elvish"
        ],
        allies: [
            "Landon Brush", "Silven Brush"
        ],
        backstory: 
        `Reginald's father is the advisor to the king. As such, he grew up in the castle, playing with the prince (Silven Brush), as he grew his magic started to show and 
        he was charged with protecting the prince and advising him as he prepares to take on his role as king.`,
        tags: [
            "NPC", "Sword Coast"
        ]
	},
	{
		name: "Dominque (Dom)",
        species: "Human",
        subspecies: "Variant",
        job: "Fighter",
        subjob: "None",
        icon: "./images/class-icons-fighter.png",
        background: "Soldier (Officer)",
        level: "1",
        personality: "I'm haunted by memories of war. I can't get the images of violence out of my mind.",
        ideals: "Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)",
        bonds: "I'll never forget the crushing defeat my company suffered or the enemies who dealt it.",
        flaws: "My hatred of my enemies is blind and unreasoning.",
        traits: [
            "Seond Wind", "Fighting Style: Interception", "Military Rank", "Alert"
        ],
        languages: [
            "Common", "Elvish"
        ],
        allies: [
            "Survivors of my unit", "City guards"
        ],
        backstory: 
        `Dom was an officer in the army of his city, the enemy got the jump on his unit and a lot of them died. Now he freelances for the city and serves with
        the city guard on occasion and has made friends with many of them.`,
        tags: [
            "NPC", "Neverwinter"
        ]
	},
	{
		name: "Salandor",
        species: "Dragonborn",
        subspecies: "Silver",
        job: "Warlock",
        subjob: "The Fathomless",
        icon: "./images/class-icons-warlock.png",
        background: "Sailor",
        level: "1",
        personality: "My friends know they can rely on me, no matter what.",
        ideals: "Respect. The thing that keeps a ship together is mutual respect between captain and crew. (Good)",
        bonds: "Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengeance will be mine.",
        flaws: "Once someone questions my courage, I never back down no matter how dangerous the situation.",
        traits: [
            "Gift of the Sea", "Tentacle of the Deeps", "Expanded Spell List", "Damage Resistance",
            "Breath Weapon", "Ship's Passage"
        ],
        languages: [
            "Common", "Draconic"
        ],
        allies: [
            "The Fathomless", "Portsman"
        ],
        backstory: 
        `As he grew up Salandor travelled with friends and family as sailing merchants. One day pirates attacked,
        the ship and the crew went down. As Salandor went down in the depths holding on to the last of his breath,
        that is when he met The Fathomless, his patron. The Fathomless traded him breath and swore to help
        with revenge on the pirates, in trade for knowledge of the lands above.`,
        tags: [
            "PC", "Sword Coast", "Cold"
        ]
	},
]
export default characters