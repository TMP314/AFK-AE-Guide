
var selectedHeroeBeastDivId;

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

function isValidTeam(teamNumber) {
    var validCounter = 0;
    for (i=0;i++;i<5) {
        if ($("#h" + teamNumber + i).hasClass("selectable-hero")) {
            validCounter++;
        }
    }
    if ($("#b" + teamNumber + "0").hasClass("selectable-beast")) {
        validCounter++;
    }
    if (validCounter == 6) {
        return true;
    }
    else {
        return false;
    }
}

function openSelectMenu(id) {
    var type = id.substring(0,1)
    var isFarmBeast = (id.substring(1,2) == "b")
    selectedHeroeBeastDivId = id;
    if (type == "h" || (type == "f" && !isFarmBeast)) {
        if (loadedHeroes) {
            showElement('#popup-hero','block')
        }
        else {
            window.alert("Please load your heroes so that you can select one.")
        }
    }
    if (type == "b" || isFarmBeast) {
        if (loadedBeasts) {
            showElement('#popup-beast','block')
        }
        else {
            window.alert("Please load your beasts so that you can select one.")
        }
    }
}

function addHeroToTeamSlot(teamSlot, heroId) {
    if ($("#" + teamSlot).attr("hero-beast-id") != undefined) {
        $("#" + selectedHeroeBeastDivId).empty()
        $("#" + selectedHeroeBeastDivId).css('opacity','50%');
        $("#" + selectedHeroeBeastDivId).removeAttr("hero-beast-id");
        $("#" + selectedHeroeBeastDivId).removeAttr("style");
        addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
        delete allData["team"][selectedHeroeBeastDivId];
    }

    $("#" + teamSlot).css('background-image','none');
    $("#" + teamSlot).css('opacity','100%');
    $("#" + teamSlot).attr("hero-beast-id", heroId);

    //Clone the selected hero, and update it's id
    $("#" + heroId).clone().appendTo($("#" + selectedHeroeBeastDivId));
    var id_old = $("#" + selectedHeroeBeastDivId).children("div").attr("id");
    $("#" + selectedHeroeBeastDivId).children("div").attr("id", "picked-" + id_old)

    if (selectedHeroeBeastDivId.substring(0,1) == "h" || selectedHeroeBeastDivId.substring(0,2) == "f0") {
        hideElement("#popup-hero");
    }
    else if (selectedHeroeBeastDivId.substring(0,1) == "b" || selectedHeroeBeastDivId.substring(0,2) == "fb") {
        hideElement("#popup-beast");
    }
    removeHeroBeastFromSelection(heroId);
    
    allData["team"][teamSlot] = heroId;
    saveCurrentState();
    selectedHeroeBeastDivId = null;
}

function clearHero() {
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
    
    addHeroBeastToSelection(allData["team"][selectedHeroeBeastDivId]);
    delete allData["team"][selectedHeroeBeastDivId];
    saveCurrentState();
    selectedHeroeBeastDivId = null;
}

function addHeroBeastToSelection(divId) {
    console.log("adding hero " + divId) 
    $("#" + divId).css('display','block');
}

function removeHeroBeastFromSelection(divId) {
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
}

function showElement(divId, type){
    $(divId).css("display", type);
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
                addHeroToTeamSlot(t, allData["team"][t])
            }
        }    
    }
    catch {
        console.log("Couldn't load pre-saved allData")
    }
}

var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

onStartup();

