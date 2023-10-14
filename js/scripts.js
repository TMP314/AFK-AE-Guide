
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
    window.addEventListener('click', function(e){   
        if (document.getElementById('dropdown-guild-selector').contains(e.target)){
            if(e.target.tagName.toLowerCase() === "a") {
                console.log(e.target.innerHTML)
                allData["selectedGuildMember"] = e.target.innerHTML
                loadGuildMemberData(allData["selectedGuildMember"])
            }
        } else{
            if ($("#myDropdown").hasClass("show")) {
                dropDownToggle();
            }
          
        }
      });

    //Load data if it exists
    loadState();
}   

function loadGuildMemberData(name) {
    console.log("Loading guild member data: " + name)
    dropDownToggle();
    // if (name == "My Heroes" || name == allData["player"]) {
        // if (Object.keys(allData["team"]).length !== 0) {
            clearTeams(true);
        // }
    // }
    
    $("#popup-hero-grid").empty()
    $("#popup-beast-grid").empty()
    if (name == "My Heroes" || name == allData["player"]) {
        for (h in allData["heroes"]) {
            createHeroDiv(h)
        }
        for (h in allData["beasts"]) {
            createBeastDiv(h)
        }
        for (t in allData["team"]) {
            selectedHeroeBeastDivId = t
            // console.log("Trying to add " + t)
            addHeroToTeamSlot(t, allData["team"][t])
        }
    }
    else {
        for (h in allData["guild"][name]["heroes"]) {
            createHeroDiv(h)
        }
        for (h in allData["guild"][name]["beasts"]) {
            createBeastDiv(h)
        }
        for (t in allData["guild"][name]["team"]) {
            selectedHeroeBeastDivId = t
            // console.log("Trying to add " + t)
            addHeroToTeamSlot(t, allData["guild"][name]["team"][t])
        }
    }
    
}

function dropDownToggle() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        } else {
        a[i].style.display = "none";
        }
    }
}

function loadGuildMemberIntoDropDown(name) {
    var div = document.createElement('a');
    div.setAttribute('href', '#' + name)
    div.innerHTML = name
    $("#guild-member-container").append(div)
}

function loadAllGuildMembersIntoDropDown() {
    var guildMember;
    if (!loadedGuild) {
        for (guildMember in allData["guild"]) {
            loadGuildMemberIntoDropDown(guildMember)
        }
    }
    loadedGuild = true;
}

function openSelectMenu(id) {
    var type = id.substring(0,1)
    var isFarmBeast = (id.substring(1,2) == "b")
    var searchHero;
    var teamHeroes = [];
    var farmHeroes = [];
    var heroFaction;
    var selectedGuildMember = allData["selectedGuildMember"]
    var amISelected;
    var teamLoop;
    if (selectedGuildMember == "My Heroes" || selectedGuildMember == allData["player"]) {
        amISelected = true;
    }
    else {
        amISelected = false;
    }
    
    if (amISelected) {
        teamLoop = allData["team"]
    }
    else {
        teamLoop = allData["guild"][selectedGuildMember]["team"]
    }

    selectedHeroeBeastDivId = id;
    
    if (type == "h" || (type == "f" && !isFarmBeast)) {
        if (loadedHeroes || !amISelected) {
            //Show farm heroes in list
            if (type != "f") {
                for (h in teamLoop) {
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
                for (h in teamLoop) {
                    searchHero = teamLoop[h]
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
                for (h in teamLoop) {
                    searchHero = teamLoop[h]
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
                for (h in teamLoop) {
                    searchHero = teamLoop[h]
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
    if (Object.keys(allData["team"]).length !== 0) {
        clearTeams();
    }
}

function addHeroToTeamSlot(teamSlot, heroId) {
    // console.log("Adding heroes to slots")
    var type = teamSlot.substr(0,1)
    var farmtype = teamSlot.substr(0,2)
    var faction;
    var selectedGuildMember = allData["selectedGuildMember"]
    var amISelected;
    if (selectedGuildMember == "My Heroes" || selectedGuildMember == allData["player"]) {
        amISelected = true;
    }
    else {
        amISelected = false;
    }
    console.log(amISelected)
    if ($("#" + teamSlot).attr("hero-beast-id") != undefined) {
        if (type != "b" && farmtype != "fb") {
            if (amISelected) {
                faction = allData["heroes"][heroId]["faction"]
            }
            else {
                faction = allData["guild"][selectedGuildMember]["heroes"][heroId]["faction"]
            }
            // console.log(faction)
        }
        $("#" + selectedHeroeBeastDivId).empty()
        $("#" + selectedHeroeBeastDivId).css('opacity','50%');
        $("#" + selectedHeroeBeastDivId).removeAttr("hero-beast-id");
        $("#" + selectedHeroeBeastDivId).removeAttr("style");
        if (selectedFactions["faction-" + faction]) {
            if (amISelected) {
                addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
            }
            else {
                addHeroBeastToSelection(allData["guild"][selectedGuildMember]["team"][selectedHeroeBeastDivId]);
            }
            
        }
        // addHeroBeastToSelection( ][selectedHeroeBeastDivId]);
        if (amISelected) {
            delete allData["team"][selectedHeroeBeastDivId];
        }
        else {
            delete allData["guild"][selectedGuildMember]["team"][selectedHeroeBeastDivId];
        }
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
    
    if (amISelected) {
        allData["team"][teamSlot] = heroId;
    }
    else {
        allData["guild"][selectedGuildMember]["team"][teamSlot] = heroId;
    }
    saveCurrentState();
    selectedHeroeBeastDivId = null;
}

function clearHero(swap) {
    var faction;
    
    
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
    
    if (Object.keys(allData["team"]).length !== 0) {
        faction = allData["team"][selectedHeroeBeastDivId]["faction"]
        if (selectedFactions["faction-" + faction]) {
            addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
        }
    }
    // addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
    if (!swap) {
        delete allData["team"][selectedHeroeBeastDivId];
    }
    
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

function clearTeams(swap) {
    var attr;
    $('.hero').each(function() {
        attr = $(this).attr('hero-beast-id')
        if (typeof attr !== 'undefined' && attr !== false) {
            selectedHeroeBeastDivId = $(this).attr('id')
            if (selectedHeroeBeastDivId.substr(0,5) != "guide") {
                clearHero(swap);
            }
            
        }      
    });
    $('.beast').each(function() {
        attr = $(this).attr('hero-beast-id')
        if (typeof attr !== 'undefined' && attr !== false) {
            selectedHeroeBeastDivId = $(this).attr('id')
            if (selectedHeroeBeastDivId.substr(0,5) != "guide") {
                clearHero(swap);
            }
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
            allData["selectedGuildMember"] = "My Heroes"
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
                // console.log("Trying to add " + t)
                addHeroToTeamSlot(t, allData["team"][t])
            }
            // $("#sod").prop("checked", allData["sod"])
            // enableDisableTeam6()
            for (g in allData["guild"]){
                loadGuildMemberIntoDropDown(g);
            }
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
    var selectedGuildMember = allData["selectedGuildMember"];
    var amISelected;
    var heroLoop;
    var teamLoop;
    if (selectedGuildMember == "My Heroes" || selectedGuildMember == allData["player"]) {
        amISelected = true;
    }
    else {
        amISelected = false;
    }
    
    if (amISelected) {
        heroLoop = allData["heroes"]
        teamLoop = allData["team"]
    }
    else {
        heroLoop = allData["guild"][selectedGuildMember]["heroes"]
        teamLoop = allData["guild"][selectedGuildMember]["team"]
    }
    selectedFactions[faction] = !selectedFactions[faction];
    if (selectedFactions[faction]) {
        $("#" + faction).removeClass("unselected")
        $("#" + faction).addClass("selected")
        for (i in heroLoop) { 
            
            if ( "faction-" + heroLoop[i]["faction"] == faction) {
                showHero = true;
                if (selectedHeroeBeastDivId.substr(0,1) == "f") {
                    for (h in teamLoop) {
                        if (i == teamLoop[h] && h.substr(0,1) == "f") {
                            // console.log("Hero " + i + " exists in team at slot " + h)
                            showHero = false;
                        }
                    }
                    if (showHero) {
                        addHeroBeastToSelection(i)
                    }
                }
                if (selectedHeroeBeastDivId.substr(0,1) == "h" || selectedHeroeBeastDivId.substr(0,1) == "g" ) {
                    for (h in teamLoop) {
                        if (i == teamLoop[h] && h.substr(0,1) == "h") {
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
        for (i in heroLoop) {
            if ( "faction-" + heroLoop[i]["faction"] == faction) {
                removeHeroBeastFromSelection(i)
            }
        }
    }
}

function isValidTeam() {
    var beastCount = 0;
    var heroCount = 0;
    var selectedGuildMember = allData["selectedGuildMember"];
    var amISelected;
    var heroLoop;
    var teamLoop;
    if (selectedGuildMember == "My Heroes" || selectedGuildMember == allData["player"]) {
        amISelected = true;
    }
    else {
        amISelected = false;
    }
    
    if (amISelected) {
        teamLoop = allData["team"]
    }
    else {
        teamLoop = allData["guild"][selectedGuildMember]["team"]
    }
    for (i in teamLoop) {
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
    var selectedGuildMember = allData["selectedGuildMember"];
    var amISelected;
    var guideLoop;
    var teamLoop;
    if (selectedGuildMember == "My Heroes" || selectedGuildMember == allData["player"]) {
        amISelected = true;
    }
    else {
        amISelected = false;
    }
    
    if (amISelected) {
        teamLoop = allData["team"]
        guideLoop = allData["guide"]
    }
    else {
        teamLoop = allData["guild"][selectedGuildMember]["team"]
        guideLoop = allData["guild"][selectedGuildMember]["guide"]
    }
    clearGuide()
    for (i in mappingForGuide) {
        guideLoop[i] = mappingForGuide[i]
    }

    for (slot in guideLoop) {
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
            if (guideLoop[slot].substr(0,1) == "f") {
                for (phaseRow in guidePhases[phase]) {
                    for (let cell=0;cell<5;cell++) {
                        currentCell = "g" + guidePhases[phase][phaseRow] + cell
                        // console.log("Phaserow: " + guidePhases[phase][phaseRow])
                        // console.log("Checking for slot: " + slot + " against guide slot: " + currentCell)
                        // console.log("For hero: " + allData["team"][guideLoop[slot]] + " against guide hero: " + allData["team"][guideLoop[currentCell]])
                        if ((teamLoop[guideLoop[slot]] == teamLoop[teamLoop[currentCell]]) && teamLoop[currentCell].substr(0,1) != "f") {
                            console.log("Current farm hero: " + teamLoop[slot])
                            console.log("is being used/to be used at: " + currentCell)
                            console.log("will not be adding this farm hero, and instead will keep it blank.")
                            canAddFarmhero = false;
                        }
                    }
                }
            }
            

            if (canAddFarmhero) {
                //Clone the selected hero, and update it's id
                $("#" + guideLoop[slot]).clone().prependTo($("#" + slot));
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
            if (guideLoop[slot].substr(0,1) == "f") {
                for (phaseRow in guidePhases[phase]) {
                    currentCell = "gb" + guidePhases[phase][phaseRow]
                    // console.log("Phaserow: " + guidePhases[phase][phaseRow])
                    // console.log("Checking for slot: " + slot + " against guide slot: " + currentCell)
                    // console.log("For hero: " + teamLoop[teamLoop[slot]] + " against guide hero: " + teamLoop[teamLoop[currentCell]])
                    if ((teamLoop[guideLoop[slot]] == teamLoop[guideLoop[currentCell]]) && guideLoop[currentCell].substr(0,1) != "f") {
                        console.log("Current farm hero: " + teamLoop[slot])
                        console.log("is being used/to be used at: " + currentCell)
                        console.log("will not be adding this farm hero, and instead will keep it blank.")
                        canAddFarmBeast = false;
                    }
                }
            }

            if (canAddFarmBeast) {
                //Clone the selected beast, and update it's id
                $("#" + guideLoop[slot]).clone().prependTo($("#" + slot));
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