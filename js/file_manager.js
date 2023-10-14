var fileHero = null;
var fileGuild = null;
var fileInputHero = document.getElementById('myfile')
var fileInputGuild = document.getElementById('myfile-guild')
fileInputHero.addEventListener('change', function () {
        fileHero = fileInputHero.files[0]
        let reader = new FileReader();
        try {
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                $("#hero-copy").val( e.target.result );
            };
            })(fileHero);

            // Read in the image file as a data URL.
            reader.readAsText(fileHero);
        }
        catch {
            console.log("no file selected")
        }  
}, false);


fileInputGuild.addEventListener('change', function () {
    fileGuild = fileInputGuild.files[0]
        let reader = new FileReader();

        try {
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                $("#guild-copy").val( e.target.result );
            };
            })(fileGuild);
            // Read in the image file as a data URL.
            reader.readAsText(fileGuild);
        }
        catch {
            console.log("no file selected")
        } 
}, false);



function getKeyByValue(object, value) { 
    return Object.keys(object).find(key => 
        object[key] === value); 
}

function parseJSON(type) {
    var heroCopy;
    var baseText;
    var guildData;
    if (type == "hero") {
        heroCopy = $("#hero-copy").val();
        baseText = "Copy your AFKCalc JSON or Guild's JSON Text here, or upload either file"
    }
    else if (type == "guild") {
        heroCopy = $("#guild-copy").val();
        baseText = "Copy your guilds AFKCalc JSON Text here, or upload the file"
    }
    
    if (heroCopy != undefined || heroCopy != baseText) {
        try {
            if (type == "hero") {
                userData = JSON.parse(heroCopy);
                loadUserData(userData)
            }
            else if (type == "guild") {
                guildData = JSON.parse(heroCopy);
                loadGuildData(guildData)
            }

            saveCurrentState()
        }
        catch {
            window.alert("Please load valid data into the text box");
        }
        loadUserData()
    }

}

function loadUserData(userData) {
    var id;
    var code;
    var level;
    var faction;

    $("#popup-hero-grid").empty()
    $("#popup-beast-grid").empty()
    for (h in heroesArray) {
        id = heroesArray[h]["id"];
        code = heroesArray[h]["slug"];
        faction = heroesArray[h]["faction"];
        allData["heroes"][code] = {}
        if (userData[3]["heroes"].hasOwnProperty(id)){
            allData["heroes"][code] = userData[3]["heroes"][id]
        }
        allData["heroes"][code]["faction"] = faction
        allData["heroes"][code]["img"] = heroesArray[h]["image"]
        allData["player"] = userData[3]['playerName'];
        createHeroDiv(code)
    }
    console.log("loaded heroes")

    for (b in beastsArray) {
        // console.log("Creating beast: " + b)
        id = beastsArray[b]["id"];
        rarity = beastsArray[b]["elevation"];
        level = 0;
        if (userData[3]["pets"].hasOwnProperty(id)) {
            level = userData[3]["pets"][id]["strengthBuff"] + userData[3]["pets"][id]["intelligenceBuff"] + userData[3]["pets"][id]["agilityBuff"];
        }
        allData["beasts"][id] = {"rarity": rarity, "level": level};
        createBeastDiv(id)
    }    

    
    loadedHeroes = true;
    loadedBeasts = true
    saveCurrentState("allData")
    hideElement('#popup');
    window.alert("Succesfully loaded AFKCalc data!");
}

function loadGuildData(guildData) {
    var id;
    var code;
    var level;
    var faction;
    var name;
    var furniture;
    var signature;
    var engrave;
    var ascend;
    var img;
    var awakened;
    for (var playerInArray in guildData) {
        name = guildData[playerInArray]["name"];
        allData["guild"][name] = {
            "beasts": {},
            "heroes": {},
            "guide": {},
            "team": {},
            "sod": false
        };
        for (heroInArray in guildData[playerInArray]["heroes"]) {  
            heroName = guildData[playerInArray]["heroes"][heroInArray]["name"]
            awakened = guildData[playerInArray]["heroes"][heroInArray]["isAwakened"]
            if (awakened) {
                code = getKeyByValue(awakanedName, heroName)
            }
            else {
                code = getKeyByValue(heroesName, heroName)
            }
            console.log(code)
            img = allData["heroes"][code]["img"]
            furniture = guildData[playerInArray]["heroes"][heroInArray]["furniture"]["mythicCount"]
            signature = guildData[playerInArray]["heroes"][heroInArray]["signature"]["level"]
            engrave = guildData[playerInArray]["heroes"][heroInArray]["engrave"]["level"]
            ascend = ascensionLevels[guildData[playerInArray]["heroes"][heroInArray]["ascension"]["level"]]
            for (h in heroesArray) {
                if (heroesArray[h]["slug"] == code) {
                    faction = faction = heroesArray[h]["faction"];
                }
            }
            allData["guild"][name]["heroes"][code] = {"name": heroName, "faction": faction, "img": img, "ascend": ascend, "fi": furniture, "si": signature, "engrave": engrave};
        }

        for (beastInArray in guildData[playerInArray]["pets"]) {
            id = guildData[playerInArray]["pets"][beastInArray]["id"]
            for (b in beastsArray) {
                if (beastsArray[b]["id"] == id) {
                    rarity = beastsArray[b]["elevation"];
                }
            }
            level = guildData[playerInArray]["pets"][beastInArray]["strength"] + guildData[playerInArray]["pets"][beastInArray]["intelligence"] + guildData[playerInArray]["pets"][beastInArray]["agility"];
            allData["guild"][name]["beasts"][id] = {"rarity": rarity, "level": level};
        }
        loadGuildMemberIntoDropDown(name)
    }
    saveCurrentState()
    hideElement('#popup-guild');
    window.alert("Succesfully loaded Guild AFKCalc data!");
    loadedGuild = true;
}

