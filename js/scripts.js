var prefix = "https://afkalc.com";
var heroesMapping = {
    "uhlan":"Estrilda","priest":"Belinda","nbh":"Raine","mouse":"Vurk","troll":"Khasos","lionjugg":"Brutus","yeanling":"Nemora","catassassin":"Kaz","pom":"Lyca","wizard":"Isabella","dk":"Grezhul","ndp":"Shemira","wd":"Numisu","bonearcher":"Ferael","bear":"Warek","td":"Ulmus","ok":"Lucius","swordmaster":"Thane","puck":"Tasi","snk":"Thoran","goda":"Athalia","devilhunter":"Fawkes","mag":"Skreg","th":"Seirus","bane":"Ezizh","nod":"Safiya","elfsaber":"Eironn","pudge":"Nara","ghostsaber":"Baden","gk":"Hendrik","revenger":"Kelthur","lust":"Mehira","turtle":"Gorvo","merchant":"Rowan","twinsb":"Elijah \u0026 Lailah","maid":"Rosaline","valkyrie":"Antandra","foxmagician":"Satrana","dt":"Zolrath","longbow":"Gwyneth","timeg":"Orthros","bunnymaster":"Lorsan","wino":"Rigby","wolf":"Tidus","scimonster":"Izold","phoenix":"Talene","arthur":"Arthur","iced":"Khazard","mk":"Wu Kong","wildkin":"Skriath","nt":"Solise","nunassassin":"Cecilia","fat":"Mezoth","mystic":"Oden","housekeeper":"Oscar","ukyo":"Ukyo","lizard":"Saurus","bones":"Torne","orcleader":"Anoki","spring":"Flora","nakoruru":"Nakoruru","dkid":"Daimon","ezio":"Ezio","oa":"Drez","phantom":"Theowyn","thor":"Zaphrael","thw":"Lucretia","yalbed":"Albedo","anz":"Ainz Ooal Gown","ssr":"Pippa","udd":"Silas","gd":"Mortas","winterl":"Alna","qn":"QUEEN","jk":"JOKER","techmouse":"Kren","windman":"Respen","clergy":"Eluard","princess":"Peggy","tricracoon":"Raku","astrom":"Morael","pop":"Prince of Persia","siren":"Desira","gentryd":"Leofric","gunner":"Walker","merlin":"Merlin","crazyfox":"Thali","golem":"Titus","captain":"Hodgkin","devilmage":"Morrow","lazyd":"Zikis","stone":"Granit","ldv":"Leonard","bdruid":"Mishka","artisan":"Haelus","cknight":"Treznor","snakeman":"Thesku","fp":"Framton","flamee":"Astar","sphoenix":"Talene","bm":"Scarlet","babayaga":"Melusina","gaoler":"Fane","sbane":"Ezizh","scout":"Alaro","astror":"Audrae","druidmaster":"Oku","windsm":"Thane","hidan":"Vyloris","sonia":"Sonja","orcmaster":"Anasta","karen":"Kalene","slk":"Brutus","joa":"Joan of Arc","alen":"Eorin","patronus":"Tarnos","wnt":"Solise","ynf":"Yennefer","gor":"Geralt","chimera":"Canisa \u0026 Ruke","flora":"Nevanthi","sbd":"Baden","cursecarrier":"Salaki","bishop":"Palmer","mars":"Veithael","hlm":"Mulan","hfp":"Belinda","tsl":"Tamrus","doa":"Olgath","adwin":"Edwin","bsparrow":"Maetria","slacker":"Crassio","rm":"Rem","emt":"Emilia","divineblade":"Athalia","hammerman":"Ginneas","summer":"Daemia","so":"Trishea","sq":"Safiya","bc":"Ivan","swq":"Naroko","liberta":"Liberta","lucilla":"Lucilla"
};
var beastsMapping = {
    "6001":"Dreary Ball","6002":"Tufty Ears","6003":"Grassy Orb","6004":"Polar Beast","6005":"Fire Breather","6006":"Blade Ridge","6007":"Winged Lion","6008":"Rock Crown Lizard","6009":"Feline Vesperio","6010":"Bellbellow","6011":"Flutterplume Owl","6012":"Talismane","6013":"Phantasmoth","6014":"Savage Soufflé","6015":"Slumber Seal","6016":"Fox Fatale","6017":"Shroom Spooder"
};
var heroes = {}
var beasts = {}
var team = {}

var loadedHeroes = false;
var loadedBeasts = false;

var addedHeroes = false;
var addedBeasts = false;

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
            if (!addedHeroes) {
                addHeroesToElement();
                addedHeroes = true;
            }
        }
        else {
            window.alert("Please load your heroes so that you can select one.")
        }
    }
    if (type == "b" || isFarmBeast) {
        if (loadedBeasts) {
            showElement('#popup-beast','block')

            if (!addedBeasts) {
                addBeastsToElement();
                addedBeasts = true;
            }
        }
        else {
            window.alert("Please load your beasts so that you can select one.")
        }
    }
}

function addHeroesToElement() {
    for (i in heroes) {
        jQuery('<div>', {
            id: i,
            class: 'selectable-hero'
        }).appendTo("#popup-hero-grid");
        $("#" + i).css('background-image','url(' + heroes[i] + ')');
        $("#" + i).click(function(){
            addHeroToTeamSlot(selectedHeroeBeastDivId, this.id);
        });
    }
}

function addHeroToTeamSlot(teamSlot, heroId) {
    // console.log("Adding hero id: " + heroId + " to the slot: " + teamSlot)
    var type = teamSlot.substr(0,1);
    $("#" + teamSlot).css('background-image','url(' + heroes[heroId] + ')');
    $("#" + teamSlot).removeClass("hero");
    $("#" + teamSlot).addClass("selectable-hero");
    $("#" + teamSlot).attr("hero-beast-id", heroId);
    hideElement('#popup-hero');
    removeHeroBeastFromSelection(heroId);
    team[teamSlot] = heroId;
    // if (type != "f") {
    //     showTeamHeroesBeastsInFarmSelection()
    // }
    // else if (type == "f") {
    //     showTeamHeroesBeastsInTeamSelection()
    // }
    saveCurrentState("team");
}

function clearHero() {
    $("#" + selectedHeroeBeastDivId).css("background-image", "");
    $("#" + selectedHeroeBeastDivId).addClass("hero");
    $("#" + selectedHeroeBeastDivId).removeClass("selectable-hero");
    $("#" + selectedHeroeBeastDivId).attr("hero-code", null);
    hideElement("#popup-hero");
    addHeroBeastToSelection( $("#" + selectedHeroeBeastDivId).attr("hero-beast-id"));
    delete team[selectedHeroeBeastDivId];
    saveCurrentState("team");
}

// function showTeamHeroesBeastsInFarmSelection() {
//     for (i in team) {
//         if (i.substr(0,1) == "f") {
//             $('#' + team[i]).css('display','block')
//         }
//     }
// }

// function hideTeamHeroesBeastsInFarmSelection() {
//     for (i in team) {
//         if (i.substr(0,1) != "f") {
//             $('#' + team[i]).css('display','none')
//         }
//     }
// }

// function showTeamHeroesBeastsInTeamSelection() {
//     for (i in team) {
//         if (i.substr(0,1) != "f") {
//             $('#' + team[i]).css('display','block')
//         }
//     }
// }

// function hideTeamHeroesBeastsInTeamSelection() {
//     for (i in team) {
//         if (i.substr(0,1) == "f") {
//             $('#' + team[i]).css('display','none')
//         }
//     }
// }

function addHeroBeastToSelection(divId) {
    $("#" + divId).css('display','block');
}

function removeHeroBeastFromSelection(divId) {
    $("#" + divId).css('display','none');
}

function addBeastsToElement() {
    for (i in beasts) {
        jQuery('<div>', {
            id: i,
            class: 'selectable-beast'
        }).appendTo("#popup-beast-grid");
        $("#" + i).css('background-image','url(' + beasts[i] + ')');
        $("#" + i).click(function(){
            addBeastToTeamSlot(selectedHeroeBeastDivId, this.id);
        });
    }
}

function addBeastToTeamSlot(teamSlot, beastId) {
    // console.log("Adding beast id: " + beastId + " to the slot: " + teamSlot)
    $("#" + teamSlot).css('background-image','url(' + beasts[beastId] + ')');
    $("#" + teamSlot).removeClass("beast");
    $("#" + teamSlot).addClass("selectable-beast");
    $("#" + teamSlot).attr("hero-beast-id", beastId);
    hideElement('#popup-beast');
    removeHeroBeastFromSelection(beastId);
    team[teamSlot] = beastId;
    saveCurrentState("team");
}

function clearBeast() {
    $("#" + selectedHeroeBeastDivId).css("background-image", "");
    $("#" + selectedHeroeBeastDivId).addClass("beast");
    $("#" + selectedHeroeBeastDivId).removeClass("selectable-beast");
    hideElement("#popup-beast");
    addHeroBeastToSelection( $("#" + selectedHeroeBeastDivId).attr("hero-beast-id"));
    delete team[selectedHeroeBeastDivId];
    saveCurrentState("team");
}

function clearTeams() {
    // console.log("Clearing teams")
    var team_number = 0;
    var hero_number = 0;

    while (team_number < 5) {
        while (hero_number < 5) {
            selectedHeroeBeastDivId = "h" + team_number + hero_number;
            if ($("#" + selectedHeroeBeastDivId).hasClass("selectable-hero")) {
                // console.log("Removing: " + selectedHeroeBeastDivId)
                clearHero()
            }
            hero_number++;
        }
        selectedHeroeBeastDivId = "b" + team_number + "0";
        if ($("#" + selectedHeroeBeastDivId).hasClass("selectable-beast")) {
            clearBeast()
        }
        hero_number = 0;
        team_number++;
    }
    team_number = 0;
    hero_number = 0;
    while (team_number < 2) {
        while (hero_number < 5) {
            selectedHeroeBeastDivId = "f" + team_number + hero_number;
            if ($("#" + selectedHeroeBeastDivId).hasClass("selectable-hero")) {
                console.log("Removing: " + selectedHeroeBeastDivId)
                clearHero()
            }
            hero_number++;
        }
        selectedHeroeBeastDivId = "fb" + team_number;
        console.log("Removing: " + selectedHeroeBeastDivId)
        if ($("#" + selectedHeroeBeastDivId).hasClass("selectable-beast")) {
            console.log("Removing: " + selectedHeroeBeastDivId)
            clearBeast()
        }
        hero_number = 0;
        team_number++;
    }

    saveCurrentState("team");
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

function loadHeroesAndBeasts(){
    var count = 0;
    var countMax = 500;
    var searching = true;
    var indexIncrement = 0;
    var replaceString;
    var searchString;
    var endString;
    var start;
    var end;
    var link;
    var heroCode;
    var message1;
    var message2;

    //Search for heroes
    var heroCopy = $("#hero-copy").val();
    while (searching) {
        replaceString = "amp;";
        searchString = 'src="';
        endString = 'q=75"';
        start = heroCopy.indexOf(searchString, indexIncrement);

        if (start == -1) {
            searching = false;
        }

        if (start != -1) {
            end = heroCopy.indexOf(endString, start)
            indexIncrement = end;
            link = heroCopy.substring(start+5, end+4).replaceAll(replaceString, "");
            searchString = '.jpg'
            endString = '2F'
            start = link.indexOf(searchString);
            end = link.lastIndexOf(endString, start);
            heroCode = link.substring(end + 2, start).toLowerCase();
            heroes[heroCode] = prefix + link;
           
        }
        
        count++;
        if (count > countMax) {
            searching = false;
        }
    }

    //Search for beasts
    var beastCopy = $("#beast-copy").val();
    count = 0;
    searching = true;
    indexIncrement = 0;
    while (searching) {
        replaceString = "amp;";
        searchString = 'src="';
        endString = 'q=75"';
        start = beastCopy.indexOf(searchString, indexIncrement);
        // console.log("Start: " + start)

        if (start == -1) {
            searching = false;
        }

        if (start != -1) {
            end = beastCopy.indexOf(endString, start)
            // console.log("End: " + end)
            indexIncrement = end;
            link = beastCopy.substring(start+5, end+4).replaceAll(replaceString, "");
            // console.log(link);
            searchString = '%26level'
            endString = 'id%3D'
            start = link.indexOf(searchString);
            end = link.lastIndexOf(endString, start);
            beastCode = link.substring(end + 5, start).toLowerCase();
            // console.log(beastCode)
            beasts[beastCode] = prefix + link;
        }
        
        count++;
        if (count > countMax) {
            searching = false;
        }
    }

    if (Object.keys(heroes).length > 0) {
        loadedHeroes = true;
        message1 = "Successfully loaded " + Object.keys(heroes).length + " heroes."
        saveCurrentState("heroes");
    }
    else {
        message1 = "Failed! Unable to load heroes."
    }

    if (Object.keys(beasts).length > 0) {
        loadedBeasts = true;
        message2 = "Successfully loaded " + Object.keys(beasts).length + " beasts."
        saveCurrentState("beasts");
    }
    else {
        message2 = "Failed! Unable to load beasts."
    }

    window.alert(message1 + "\n" + message2);
    hideElement('#popup');
}

function saveCurrentState(saveType) {
    //Need to run this after:
    //1. Heroes or Beasts are Loaded
    //2. A Hero is input or cleared
    //3. A Beast is input or cleared
    if (saveType == "heroes") {
        localStorage.setItem('heroes', JSON.stringify(heroes));
    }
    else if (saveType == "beasts") {
        localStorage.setItem('beasts', JSON.stringify(beasts));
    }
    else if (saveType == "team") {
        localStorage.setItem('team', JSON.stringify(team));
    } 
}

function loadState() {
    //Load the saved state
    
    if (JSON.parse(localStorage.getItem('heroes')) !== null && JSON.parse(localStorage.getItem('beasts')) !== null) {
        heroes = JSON.parse(localStorage.getItem('heroes'));
        if (Object.keys(heroes).length > 0) {
            loadedHeroes = true;
        }
        beasts = JSON.parse(localStorage.getItem('beasts'));
        if (Object.keys(beasts).length > 0) {
            loadedBeasts = true;
        }
        var temp_team = JSON.parse(localStorage.getItem('team'));
        if (Object.keys(temp_team).length > 0) {
            for (i in temp_team) {
                if (i.substring(0,1) == "h"){
                    addHeroToTeamSlot(i, temp_team[i]);
                }
                else if (i.substring(0,1) == "b"){
                    addBeastToTeamSlot(i, temp_team[i]);
                }
                else if (i.substring(0,1) == "f"){
                    addHeroToTeamSlot(i, temp_team[i]);
                }
                else if (i.substring(0,2) == "fb"){
                    addBeastToTeamSlot(i, temp_team[i]);
                }
                
            }
        }
    }  
}

var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

onStartup();

