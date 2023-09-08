function createHeroDiv(heroId) {
    var heroDiv = document.createElement('div');
    var frameDiv = document.createElement('div');
    var starDiv = document.createElement('div');
    var factionDiv = document.createElement('div');
    var rankDiv = document.createElement('div');

    var heroIcon = "img/heroes/" + heroId + ".jpg"
    var faction = "img/factions/" + allData["heroes"][heroId]["faction"] + ".png";
    var frame;
    if (allData["heroes"][heroId]["ascend"] >= 7) {
        frame = "ascend.png"
    }
    else if (allData["heroes"][heroId]["ascend"] == 6) {
        frame = "mythic-p.png"
    }
    else if (allData["heroes"][heroId]["ascend"] == 5) {
        frame = "mythic.png"
    }
    else if (allData["heroes"][heroId]["ascend"] == 4) {
        frame = "legendary-p.png"
    }
    else if (allData["heroes"][heroId]["ascend"] == 3) {
        frame = "legendary.png"
    }
    else if (allData["heroes"][heroId]["ascend"] == 2) {
        frame = "elite-p.png"
    }
    else if (allData["heroes"][heroId]["ascend"] == 1) {
        frame = "elite.png"
    }
    else {
        frame = "none.png"
    }
    frame = "img/heroes-frame/" + frame;

    var stars = allData["heroes"][heroId]["ascend"] - 7; 
    var prevStar = null;

    var starPositions = {
        1: "36%",
        2: "28%",
        3: "20%",
        4: "16%",
        5: "10%"
    }

    var starType;
    if (allData["heroes"][heroId]["engrave"] >= 80) {
        starType = "80.png"
    }
    else if (allData["heroes"][heroId]["engrave"] >= 60) {
        starType = "60.png"
    }
    else if (allData["heroes"][heroId]["engrave"] >= 30) {
        starType = "30.png"
    }
    else {
        starType = "0.png"
    }
    starType = "img/heroes-star/" + starType;

    var rank;
    var fi;
    var si;
    if (allData["heroes"][heroId]["fi"] == 36) {
        fi = "36"
    }
    else if (allData["heroes"][heroId]["fi"] >= 9) {
        fi = "9"
    }
    else if (allData["heroes"][heroId]["fi"] >= 3) {
        fi = "3"
    }
    else if (allData["heroes"][heroId]["fi"] >= 0 || !allData["heroes"][heroId].hasOwnProperty("fi")) {
        fi = "0"
    }
    if (allData["heroes"][heroId]["si"] >= 30) {
        si = "30"
    }
    else if (allData["heroes"][heroId]["si"] >= 20) {
        si = "20"
    }
    else if (allData["heroes"][heroId]["si"] >= 10) {
        si = "10"
    }
    else if (allData["heroes"][heroId]["si"] >= 0) {
        si = "0"
    }
    else {
        si = "X"
    }
    console.log("fi: " + fi)
    console.log("si: " + si)
    rank = "img/heroes-rank/" + si + fi + ".png";
        
    heroDiv.setAttribute('id', 'hero-' + heroId);
    heroDiv.setAttribute('class', 'hero-icon');
    heroDiv.style.backgroundImage = 'url(' + heroIcon + ')';

    frameDiv.setAttribute('class', 'frame');
    frameDiv.style.backgroundImage = 'url(' + frame + ')';

    factionDiv.setAttribute('class', 'faction');
    factionDiv.style.backgroundImage = 'url(' + faction + ')';

    if (si != "X" && fi != "X") {
        rankDiv.setAttribute('class', 'rank');
        rankDiv.style.backgroundImage = 'url(' + rank + ')';
    }
    

    console.log("stars: " + stars)
    if (stars > 0) {
        starDiv.setAttribute('class', 'star');
        starDiv.style.backgroundImage = 'url(' + starType + ')';
        starDiv.style.left = starPositions[stars]
        while (stars > 1) {
            console.log("adding extra star")
            var extraStarDiv = document.createElement('div');
            extraStarDiv.setAttribute('class', 'star-multiple');
            extraStarDiv.style.backgroundImage = 'url(' + starType + ')';
            console.log("extraStars: " + stars)
            if (prevStar == null) {
                starDiv.appendChild(extraStarDiv);
            }
            else {
                prevStar.appendChild(extraStarDiv)
            }
            prevStar = extraStarDiv;
            stars--
        }
    }

    heroDiv.appendChild(frameDiv);
    frameDiv.appendChild(factionDiv);
    factionDiv.appendChild(rankDiv);
    heroDiv.appendChild(starDiv);
    document.body.prepend(heroDiv);
}

function loadUserData() {
    var id;
    var code;
    var level;
    var faction;

    for (h in heroesArray) {
        id = heroesArray[h]["id"];
        code = heroesArray[h]["slug"];
        faction = heroesArray[h]["faction"];
        console.log(userData[3]["heroes"][id])
        console.log(code)
        allData["heroes"][code] = {}
        if (userData[3]["heroes"].hasOwnProperty(id)){
            allData["heroes"][code] = userData[3]["heroes"][id]
        }
      
        allData["heroes"][code]["faction"] = faction
        createHeroDiv(code)
    }
    for (b in beastsArray) {
        id = beastsArray[b]["id"];
        rarity = beastsArray[b]["elevation"];
        level = userData[3]["pets"][id]["strengthBuff"] + userData[3]["pets"][id]["intelligenceBuff"] + userData[3]["pets"][id]["agilityBuff"];
        allData["beasts"][id] = {"rarity": rarity, "level": level};
    }

    
}
