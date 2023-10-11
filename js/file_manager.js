var fileHero = null;
var fileGuild = null;
var fileInputHero = document.getElementById('myfile')
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




function getKeyByValue(object, value) { 
    return Object.keys(object).find(key => 
        object[key] === value); 
}

function parseJSON() {
    var heroCopy = $("#hero-copy").val();
    if (heroCopy != undefined || heroCopy != "Copy your AFKCalc JSON or Guild's JSON Text here, or upload either file") {
        try {
            userData = JSON.parse(heroCopy);
            loadUserData(userData)
            saveCurrentState()
        }
        catch {
            window.alert("Please load valid hero data into the text box");
        }
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
        console.log("Creating beast: " + b)
        id = beastsArray[b]["id"];
        rarity = beastsArray[b]["elevation"];
        level = userData[3]["pets"][id]["strengthBuff"] + userData[3]["pets"][id]["intelligenceBuff"] + userData[3]["pets"][id]["agilityBuff"];
        allData["beasts"][id] = {"rarity": rarity, "level": level};
        createBeastDiv(id)
    }    

    
    loadedHeroes = true;
    loadedBeasts = true
    saveCurrentState("allData")
    hideElement('#popup');
    window.alert("Succesfully loaded AFKCalc data!");
}