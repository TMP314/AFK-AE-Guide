function createHeroDiv(heroId) {
    var heroDiv = document.createElement('div');
    var frameDiv = document.createElement('div');
    var starDiv = document.createElement('div');
    var starBGDiv = document.createElement('div');
    var factionDiv = document.createElement('div');
    var rankDiv = document.createElement('div');
    var heroIcon;
    var selectedGuildMember = allData["selectedGuildMember"];
    var amISelected;
    var teamLoop;
    if (selectedGuildMember == "My Heroes" || selectedGuildMember == allData["player"]) {
        amISelected = true;
    }
    else {
        amISelected = false;
    }
    
    if (amISelected) {
        teamLoop = allData["heroes"]
        heroIcon = "img" + allData["heroes"][heroId]["img"]
    }
    else {
        teamLoop = allData["guild"][selectedGuildMember]["heroes"]
        heroIcon = "img" + allData["guild"][selectedGuildMember]["heroes"][heroId]["img"]
    }

    // console.log("normal: " + heroIcon)
    console.log(selectedGuildMember)

    var faction = "img/factions/" + allData["heroes"][heroId]["faction"] + ".png";
    var frame;
    if (teamLoop[heroId]["ascend"] >= 7) {
        frame = "ascend.png"
    }
    else if (teamLoop[heroId]["ascend"] == 6) {
        frame = "mythic-p.png"
    }
    else if (teamLoop[heroId]["ascend"] == 5) {
        frame = "mythic.png"
    }
    else if (teamLoop[heroId]["ascend"] == 4) {
        frame = "legendary-p.png"
    }
    else if (teamLoop[heroId]["ascend"] == 3) {
        frame = "legendary.png"
    }
    else if (teamLoop[heroId]["ascend"] == 2) {
        frame = "elite-p.png"
    }
    else if (teamLoop[heroId]["ascend"] == 1) {
        frame = "elite.png"
    }
    else {
        frame = "none.png"
    }
    frame = "img/heroes-frame/" + frame;

    var stars = teamLoop[heroId]["ascend"] - 7; 
    var prevStar = null;

    var starPositions = {
        1: "40%",
        2: "32%",
        3: "26%",
        4: "18%",
        5: "10%"
    }

    var starType;
    if (teamLoop[heroId]["engrave"] >= 80) {
        starType = "80.png"
    }
    else if (teamLoop[heroId]["engrave"] >= 60) {
        starType = "60.png"
    }
    else if (teamLoop[heroId]["engrave"] >= 30) {
        starType = "30.png"
    }
    else {
        starType = "0.png"
    }
    starType = "img/heroes-star/" + starType;

    var rank;
    var fi;
    var si;
    if (teamLoop[heroId]["fi"] == 36) {
        fi = "36"
    }
    else if (teamLoop[heroId]["fi"] >= 9) {
        fi = "9"
    }
    else if (teamLoop[heroId]["fi"] >= 3) {
        fi = "3"
    }
    else if (teamLoop[heroId]["fi"] >= 0 || !teamLoop[heroId].hasOwnProperty("fi")) {
        fi = "0"
    }
    if (teamLoop[heroId]["si"] >= 30) {
        si = "30"
    }
    else if (teamLoop[heroId]["si"] >= 20) {
        si = "20"
    }
    else if (teamLoop[heroId]["si"] >= 10) {
        si = "10"
    }
    else if (teamLoop[heroId]["si"] >= 0) {
        si = "0"
    }
    else {
        si = "X"
    }
    rank = "img/heroes-rank/" + si + fi + ".png";
        
    heroDiv.setAttribute('id', '' + heroId);
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
    
    if (stars > 0) {
        starBGDiv.setAttribute('class', 'star-bg');
        starBGDiv.appendChild(starDiv)
        starDiv.setAttribute('class', 'star');
        starDiv.style.backgroundImage = 'url(' + starType + ')';
        starDiv.style.left = starPositions[stars]
        while (stars > 1) {
            var extraStarDiv = document.createElement('div');
            extraStarDiv.setAttribute('class', 'star-multiple');
            extraStarDiv.style.backgroundImage = 'url(' + starType + ')';
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
    heroDiv.appendChild(starBGDiv);
    $("#popup-hero-grid").prepend(heroDiv);
    $("#" + heroId).click(function(){
        addHeroToTeamSlot(selectedHeroeBeastDivId, this.id);
    });
}

function createBeastDiv(beastId) {
    var beastDiv = document.createElement('div');
    var frameDiv = document.createElement('div');
    var beastIcon;

    if (allData["beasts"][beastId]["level"] >= 18 && allData["beasts"][beastId]["rarity"] == "elite") {
        beastIcon = "img/beasts/pet_" + beastId + ".png"
    }
    else if (allData["beasts"][beastId]["level"] < 18 && allData["beasts"][beastId]["rarity"] == "elite") {
        beastIcon = "img/beasts/pet_" + beastId + "_basic.png"
    }
    else {
        beastIcon = "img/beasts/pet_" + beastId + ".png"
    }

    var frame;
    if (allData["beasts"][beastId]["rarity"] == "elite") {
        frame = "img/beasts-frame/frame-elite.png"
    }
    else  {
        frame = "img/beasts-frame/frame-rare.png"
    }

        
    beastDiv.setAttribute('id', '' + beastId);
    beastDiv.setAttribute('class', 'beast-icon');
    beastDiv.style.backgroundImage = 'url(' + beastIcon + ')';
    
    frameDiv.setAttribute('class', 'frame');
    frameDiv.style.backgroundImage = 'url(' + frame + ')';


    beastDiv.appendChild(frameDiv);
    $("#popup-beast-grid").prepend(beastDiv);
    $("#" + beastId).click(function(){
        addHeroToTeamSlot(selectedHeroeBeastDivId, this.id);
    });
}