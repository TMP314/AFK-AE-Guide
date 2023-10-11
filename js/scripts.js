
var selectedHeroeBeastDivId;
var selectedFactions = {
    "faction-lightbearers": true,
    "faction-maulers": true,
    "faction-wilders": true,
    "faction-graveborns": true,
    "faction-celestials": true,
    "faction-hypogeans": true,
    "faction-dimensionals": true,
};

function onStartup() {
    // Apply to the Hero and Beast Images On Click Events to open pop-up to select hero
    $('.hero').each(function(i, obj) {
        $(this).click(function(){
            openSelectMenu(this.id);
        });
    });
    $('.beast').each(function(i, obj) {
        $(this).click(function(){
            openSelectMenu(this.id);
        });
    });
    //Load data if it exists
    loadState();
}

function openSelectMenu(id) {
    var type = id.substring(0,1)
    var isFarmBeast = (id.substring(1,2) == "b")
    var searchHero;
    var teamHeroes = [];
    var farmHeroes = [];
    var heroFaction;
    selectedHeroeBeastDivId = id;
    if (type == "h" || (type == "f" && !isFarmBeast)) {
        if (loadedHeroes) {
            //Show farm heroes in list
            if (type != "f") {
                for (h in allData["team"]) {
                    if (h.substr(0,1) == "f" && h.substr(1,1) != "b") {
                        farmHeroes.push(searchHero)
                    }
                    else if(h.substr(0,1) == "h") {
                        teamHeroes.push(searchHero)
                    }
                }
                for (i in farmHeroes) {
                    if (!teamHeroes.includes(farmHeroes[i])) {
                        //Check that the faction is not filtered out
                        heroFaction = allData["heroes"][farmHeroes[i]]["faction"]
                        if (selectedFactions["faction-" + heroFaction]) {
                            showElement("#" + farmHeroes[i], "block")
                        }
                        
                    }
                }
            }
            //Show team heroes in list
            else {
                for (h in allData["team"]) {
                    searchHero = allData["team"][h]
                    if (h.substr(0,1) == "f" && h.substr(1,1) != "b") {
                        farmHeroes.push(searchHero)
                    }
                    else if(h.substr(0,1) == "h") {
                        teamHeroes.push(searchHero)
                    }
                }
                for (i in teamHeroes) {
                    // console.log(teamHeroes[i])
                    if (!farmHeroes.includes(teamHeroes[i])) {
                        //Check that the faction is not filtered out
                        heroFaction = allData["heroes"][teamHeroes[i]]["faction"]
                        if (selectedFactions["faction-" + heroFaction]) {
                            showElement("#" + teamHeroes[i], "block")
                        }
                        
                    }
                }
            }
            showElement('#popup-hero','block')
        }
        else {
            window.alert("Please load your heroes so that you can select one.")
        }
    }
    for (f in selectedFactions) {
        if (selectedFactions[f]) {
            selectFaction(f)
            selectFaction(f)
        }
    }
    if (type == "b" || isFarmBeast) {
        if (loadedBeasts) {
            //Show farm beasts in list
            if (type != "f") {
                for (h in allData["team"]) {
                    searchHero = allData["team"][h]
                    if (h.substr(0,1) == "f") {
                        farmHeroes.push(searchHero)
                    }
                    else if(h.substr(0,1) == "b") {
                        teamHeroes.push(searchHero)
                    }
                }
                for (i in farmHeroes) {
                    // console.log(farmHeroes[i])
                    if (!teamHeroes.includes(farmHeroes[i])) {
                        showElement("#" + farmHeroes[i], "block")
                    }
                }
            }
            //Show team beasts in list
            else {
                for (h in allData["team"]) {
                    searchHero = allData["team"][h]
                    if (h.substr(0,1) == "f") {
                        farmHeroes.push(searchHero)
                    }
                    else if(h.substr(0,1) == "b") {
                        teamHeroes.push(searchHero)
                    }
                }
                for (i in teamHeroes) {
                    console.log(teamHeroes[i])
                    if (!farmHeroes.includes(teamHeroes[i])) {
                        showElement("#" + teamHeroes[i], "block")
                    }
                }
            }
            showElement('#popup-beast','block')
        }
        else {
            window.alert("Please load your beasts so that you can select one.")
        }
    }
}

function clearAllData() {
    localStorage.removeItem("allData");
}

function addHeroToTeamSlot(teamSlot, heroId) {
    var type = teamSlot.substr(0,1)
    var farmtype = teamSlot.substr(0,2)
    var faction
    console.log("teamSlot: " + teamSlot)
    console.log("heroId: " + heroId)
    
    
    
    if ($("#" + teamSlot).attr("hero-beast-id") != undefined) {
        if (type != "b" && farmtype != "fb") {
            faction = allData["heroes"][heroId]["faction"]
            console.log(faction)
        }
        $("#" + selectedHeroeBeastDivId).empty()
        $("#" + selectedHeroeBeastDivId).css('opacity','50%');
        $("#" + selectedHeroeBeastDivId).removeAttr("hero-beast-id");
        $("#" + selectedHeroeBeastDivId).removeAttr("style");
        if (selectedFactions["faction-" + faction]) {
            addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
        }
        // addHeroBeastToSelection( ][selectedHeroeBeastDivId]);
        delete allData["team"][selectedHeroeBeastDivId];
    }

    $("#" + teamSlot).css('background-image','none');
    $("#" + teamSlot).css('opacity','100%');
    $("#" + teamSlot).attr("hero-beast-id", heroId);

    //Clone the selected hero, and update it's id
    $("#" + heroId).clone().appendTo($("#" + selectedHeroeBeastDivId));
    var id_old = $("#" + selectedHeroeBeastDivId).children("div").attr("id");
    $("#" + selectedHeroeBeastDivId).children("div").attr("id", "picked-" + type + "-" + id_old)
    $("#" + "picked-" + type + "-" + id_old).css("display", "block");

    if (selectedHeroeBeastDivId.substring(0,1) == "h" || (selectedHeroeBeastDivId.substring(0,1) == "g" && selectedHeroeBeastDivId.substring(0,2) != "gb") || selectedHeroeBeastDivId.substring(0,2) == "f0") {
        hideElement("#popup-hero");
    }
    else if (selectedHeroeBeastDivId.substring(0,1) == "b" || selectedHeroeBeastDivId.substring(0,2) == "gb" || selectedHeroeBeastDivId.substring(0,2) == "fb") {
        hideElement("#popup-beast");
    }
    removeHeroBeastFromSelection(heroId);
    
    allData["team"][teamSlot] = heroId;
    saveCurrentState();
    selectedHeroeBeastDivId = null;
}

function clearHero() {
    var faction = allData["team"][selectedHeroeBeastDivId]["faction"]
    $("#" + selectedHeroeBeastDivId).empty()
    $("#" + selectedHeroeBeastDivId).css('opacity','50%');
    $("#" + selectedHeroeBeastDivId).removeAttr("hero-beast-id");
    $("#" + selectedHeroeBeastDivId).removeAttr("style");
    if (selectedHeroeBeastDivId.substring(0,1) == "h" || selectedHeroeBeastDivId.substring(0,2) == "f0") {
        hideElement("#popup-hero");
    }
    else if (selectedHeroeBeastDivId.substring(0,1) == "b" || selectedHeroeBeastDivId.substring(0,2) == "fb") {
        hideElement("#popup-beast");
    }
    
    if (selectedFactions["faction-" + faction]) {
        addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
    }
    // addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
    delete allData["team"][selectedHeroeBeastDivId];
    saveCurrentState();
    selectedHeroeBeastDivId = null;
}

function addHeroBeastToSelection(divId) {
    // console.log("adding hero " + divId) 
    $("#" + divId).css('display','block');
}

function removeHeroBeastFromSelection(divId) {
    // console.log("hiding hero " + divId) 
    $("#" + divId).css('display','none');
}

function clearTeams() {
    var attr;
    $('.hero').each(function() {
        attr = $(this).attr('hero-beast-id')
        if (typeof attr !== 'undefined' && attr !== false) {
            selectedHeroeBeastDivId = $(this).attr('id')
            clearHero();
        }      
    });
    $('.beast').each(function() {
        attr = $(this).attr('hero-beast-id')
        if (typeof attr !== 'undefined' && attr !== false) {
            selectedHeroeBeastDivId = $(this).attr('id')
            clearHero();
        }      
    });
    clearGuide()
}

function clearGuide() {
    var idStart;
    $('.hero').each(function() {
        idStart = $(this).attr('id').substr(0,5)   
        if (idStart == "guide") {
            this.remove()
        }
    });
    $('.empty-guide-hero').each(function() {
        $(this).removeAttr("style")
    });

    $('.beast').each(function() {
        idStart = $(this).attr('id').substr(0,5)  
        if (idStart == "guide") {
            this.remove()
        }
    });
    $('.empty-guide-beast').each(function() {
        $(this).removeAttr("style")
    });
}

function showElement(divId, type){
    $(divId).css("display", type);
    $(".header").addClass("blur");
    $(".main").addClass("blur");
    $(".generate-container").addClass("blur");
    $(".footer").addClass("blur");
}

function showElementChildren(divId, type){
    $(divId).children().css("display", type);
    $(".header").addClass("blur");
    $(".main").addClass("blur");
    $(".generate-container").addClass("blur");
    $(".footer").addClass("blur");
}

function hideElement(divId) {
    $(divId).css("display", "none");
    $(".header").removeClass("blur");
    $(".main").removeClass("blur");
    $(".generate-container").removeClass("blur");
    $(".footer").removeClass("blur");
}

function saveCurrentState() {
    //Need to run this after:
    //1. Heroes or Beasts are Loaded
    //2. A Hero is input or cleared
    //3. A Beast is input or cleared
    localStorage.setItem('allData', JSON.stringify(allData));
}

function loadState() {
    //Load the saved state
    try {
        if (localStorage.getItem('allData') != "null" && localStorage["allData"] != undefined) {
            allData = JSON.parse(localStorage.getItem('allData'));
            loadedHeroes = true;
            loadedBeasts = true;
            for (h in allData["heroes"]) {
                createHeroDiv(h)
            }
            for (h in allData["beasts"]) {
                createBeastDiv(h)
            }
            for (t in allData["team"]) {
                selectedHeroeBeastDivId = t
                console.log("Trying to add " + t)
                addHeroToTeamSlot(t, allData["team"][t])
            }
            $("#sod").prop("checked", allData["sod"])
            enableDisableTeam6()
        }   
    }
    catch {
        console.log("Couldn't load pre-saved allData")
    }
}

function enableDisableTeam6() {
    if ($("#sod").is(":checked")) {
        $("#sod-team").css("display","block")
        allData["sod"] = true
        localStorage.setItem('allData', JSON.stringify(allData));
    }
    else {
        $("#sod-team").css("display","none")
        allData["sod"] = false
        localStorage.setItem('allData', JSON.stringify(allData));
    }
}

var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

function selectFaction(faction) {
    var showHero = true;
    selectedFactions[faction] = !selectedFactions[faction];
    if (selectedFactions[faction]) {
        $("#" + faction).removeClass("unselected")
        $("#" + faction).addClass("selected")
        for (i in allData["heroes"]) { 
            
            if ( "faction-" + allData["heroes"][i]["faction"] == faction) {
                showHero = true;
                if (selectedHeroeBeastDivId.substr(0,1) == "f") {
                    for (h in allData["team"]) {
                        if (i == allData["team"][h] && h.substr(0,1) == "f") {
                            // console.log("Hero " + i + " exists in team at slot " + h)
                            showHero = false;
                        }
                    }
                    if (showHero) {
                        addHeroBeastToSelection(i)
                    }
                }
                if (selectedHeroeBeastDivId.substr(0,1) == "h" || selectedHeroeBeastDivId.substr(0,1) == "g" ) {
                    for (h in allData["team"]) {
                        if (i == allData["team"][h] && h.substr(0,1) == "h") {
                            // console.log("Hero " + i + " exists in team at slot " + h)
                            showHero = false;
                        }
                    }
                    if (showHero || selectedHeroeBeastDivId.substr(0,1) == "g") {
                        // console.log("Adding hero " + i)
                        addHeroBeastToSelection(i)
                    }
                }

            }
        }
    }
    else {
        $("#" + faction).addClass("unselected")
        $("#" + faction).removeClass("selected")
        for (i in allData["heroes"]) {
            if ( "faction-" + allData["heroes"][i]["faction"] == faction) {
                removeHeroBeastFromSelection(i)
            }
        }
    }
}

function isValidTeam() {
    var beastCount = 0;
    var heroCount = 0;
    for (i in allData["team"]) {
        if (i.substr(0,1) == "b") {
            beastCount++
        }
        else if (i.substr(0,1) == "h") {
            heroCount++
        }
    }
    if (beastCount == 5 && heroCount == 25) {
        return true;
    }
    else {
        return false;
    }
}

function startGuide() {
    if (isValidTeam()) {
        // console.log("Team is valid, will start guide generation process")
        showElement('#popup-guide-p1', 'block')
    }
    else {
        window.alert("Please complete filling in your five teams")
    }
}

function openFarmHeroMenu(heroCount) {
    $("#popup-hero-farming").find(".popup-header").text("Select up to " + heroCount + " Farm Heroes")
    allData["numberOfFarmHeroes"] = heroCount
    if (heroCount == 5) {
        hideElement("#f05")
        hideElement("#f06")
        hideElement("#f07")
        hideElement("#f08")
        hideElement("#f09")
        hideElement("#fb1")
    }
    else if (heroCount == 7) {
        hideElement("#f07")
        hideElement("#f08")
        hideElement("#f09")
        hideElement("#fb1")
    }
    else if (heroCount == 8) {
        hideElement("#f08")
        hideElement("#f09")
        hideElement("#fb1")
    }
    hideElement('#popup-guide-p1')
    showElement('#popup-hero-farming', 'block')
}

function generateGuide() {
    hideElement('#popup-hero-farming')
    showElement('#popup-guide-p2', 'block')
    setGuideData()
    saveCurrentState()
}

function setGuideData() {
    var guideLength;
    var guideRow;
    var phase;
    var currentCell;
    var canAddFarmhero = true;
    var canAddFarmBeast = true;
    clearGuide()
    for (i in mappingForGuide) {
        allData["guide"][i] = mappingForGuide[i]
    }

    for (slot in allData["guide"]) {
        guideLength = slot.length
        // console.log("Length: " + guideLength)
        if (slot.substr(1,1) != "b") {
            guideRow = slot.substr(1,guideLength-2)
        }
        else {
            guideRow = slot.substr(2,guideLength-2)
        }
        for (p in guidePhases) {
            // console.log("checking p: " + p + " in " + guidePhases)
            if (guidePhases[p].includes(guideRow*1)) {
                phase = p;
            }
        }
        // console.log("Row: " + guideRow)
        // console.log("Phase: " + phase)
        canAddFarmhero = true;
        canAddFarmBeast = true;
        if (slot.substr(1,1) != "b") {
            //Check if the current hero to be placed is a farm hero, and if so, does it exist anywhere in the current phase
            if (allData["guide"][slot].substr(0,1) == "f") {
                for (phaseRow in guidePhases[phase]) {
                    for (let cell=0;cell<5;cell++) {
                        currentCell = "g" + guidePhases[phase][phaseRow] + cell
                        // console.log("Phaserow: " + guidePhases[phase][phaseRow])
                        // console.log("Checking for slot: " + slot + " against guide slot: " + currentCell)
                        // console.log("For hero: " + allData["team"][allData["guide"][slot]] + " against guide hero: " + allData["team"][allData["guide"][currentCell]])
                        if ((allData["team"][allData["guide"][slot]] == allData["team"][allData["guide"][currentCell]]) && allData["guide"][currentCell].substr(0,1) != "f") {
                            console.log("Current farm hero: " + allData["guide"][slot])
                            console.log("is being used/to be used at: " + currentCell)
                            console.log("will not be adding this farm hero, and instead will keep it blank.")
                            canAddFarmhero = false;
                        }
                    }
                }
            }
            

            if (canAddFarmhero) {
                //Clone the selected hero, and update it's id
                $("#" + allData["guide"][slot]).clone().prependTo($("#" + slot));
                $("#" + slot).children("div").attr("id", "guide-" + slot)
                $("#" + "guide-" + slot).css("display", "block");
                $("#" + "guide-" + slot).attr("class", "hero");
                $("#" + "guide-" + slot).find(".hero-icon").attr("class", "hero-icon-guide");
                $("#" + "guide-" + slot).css("position", "absolute");
                $("#" + "guide-" + slot).find(".frame").attr("class", "frame-guide")

                $("#" + slot).css("opacity", 1.0);
                $("#" + slot).css("background-image", "none");
            }
            
        }
        else {
            if (allData["guide"][slot].substr(0,1) == "f") {
                for (phaseRow in guidePhases[phase]) {
                    currentCell = "gb" + guidePhases[phase][phaseRow]
                    // console.log("Phaserow: " + guidePhases[phase][phaseRow])
                    // console.log("Checking for slot: " + slot + " against guide slot: " + currentCell)
                    // console.log("For hero: " + allData["team"][allData["guide"][slot]] + " against guide hero: " + allData["team"][allData["guide"][currentCell]])
                    if ((allData["team"][allData["guide"][slot]] == allData["team"][allData["guide"][currentCell]]) && allData["guide"][currentCell].substr(0,1) != "f") {
                        console.log("Current farm hero: " + allData["guide"][slot])
                        console.log("is being used/to be used at: " + currentCell)
                        console.log("will not be adding this farm hero, and instead will keep it blank.")
                        canAddFarmBeast = false;
                    }
                }
            }

            if (canAddFarmBeast) {
                //Clone the selected beast, and update it's id
                $("#" + allData["guide"][slot]).clone().prependTo($("#" + slot));
                $("#" + slot).children("div").attr("id", "guide-" + slot)
                $("#" + "guide-" + slot).css("display", "block");
                $("#" + "guide-" + slot).attr("class", "beast");
                $("#" + "guide-" + slot).find(".beast-icon").attr("class", "beast-icon-guide");
                $("#" + "guide-" + slot).css("position", "absolute");
                $("#" + "guide-" + slot).find(".frame").attr("class", "frame-guide")

                $("#" + slot).css("opacity", 1.0);
                $("#" + slot).css("background-image", "none");
            }
            
        }
    }
}

onStartup();

 