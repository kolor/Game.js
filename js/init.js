
function testFunction() {
	console.log("test");
	alert("It works");
}

$(document).ready(function() {  // plays background music once page loaded
 //   $("#backgroundMusic").get(0).play();

});



// Player starting attributes -------------------------------------------------------------------------------------------


var playerPosition = 1;


var playerHealth = 100;
var playerGold = 0;
var playerExperience = 0;
var playerAttack = 0;
var playerDefense = 0;
var playerLuck = 0;
var playerArrows = 0;
var playerHealingPotions = 0;
var bored = 0; // used for slightly different event description if nothing happens 2 turns in a row. Reset to 0 by subsequent meaningful event.
var day = 1;
var turn = 0;
var playerLevel = 0;
var maxAttackValue = 10;
var maxDefenseValue = 10;
var maxLuckValue = 5;

var hasSword = 0;
var hasAxe = 0;
var hasWeapon = 0; //need to keep this for WEAPON checks to ensure player cannot have 2 weapons at same time.

var hasArmor = 0; //need to keep this for WEAPON checks to ensure player cannot have 2 armors at same time.
var hasLeatherArmor = 0;
var hasMetalArmor = 0;

var hasShield = 0; //need to keep this for WEAPON checks to ensure player cannot have 2 shield at same time.
var hasWoodenShield = 0;
var hasMetalShield = 0;

var hasHelmet = 0; //need to keep this for WEAPON checks to ensure player cannot have 2 helmets at same time.
var hasMetalHelmet = 0;
var hasImprovedMetalHelmet = 0;

var hasBow = 0; //need to keep this for WEAPON checks to ensure player cannot have 2 shield at same time.
var hasWoodenBow = 0;
var hasImprovedWoodenBow = 0;

//Populating starter attributes on the .html 
$('#healthCounter').html(playerHealth);
$('#goldCounter').html(playerGold);
$('#experienceCounter').html(playerExperience);
$('#attackCounter').html(playerAttack);
$('#defenseCounter').html(playerDefense);
$('#luckCounter').html(playerLuck);
$('#arrowsCounter').html(playerArrows);
$('#turnCounter').html(turn);
$('#levelCounter').html(playerLevel);
$('#healingPotionsCounter').html(playerHealingPotions);

$('#tile1div').prepend('<img id="player" src="img/maptiles/player.png" />'); //setting player's icon on the starting tile


function gameOver() { // this is what happens when character dies.
 	playerHealth = 100;
 	playerGold = 0;
 	playerExperience = 0;
 	playerAttack = 0;
 	playerDefense = 0;
 	playerLuck = 0;
 	playerArrows = 0;
 	bored = 0; 
 	turn = 0;
 	playerLevel = 0;
 	
 	hasHelmet = 0;
 	hasArmor = 0;
 	hasWeapon = 0;
 	hasShield = 0;
 	hasBow = 0;
 	hasAxe = 0;
 	hasSword = 0;
 	hasLeatherArmor = 0;
 	hasMetalArmor = 0;
 	hasWoodenBow = 0;
 	hasImprovedWoodenBow = 0;
 	hasMetalShield = 0;
 	hasWoodenShield = 0;
 	hasMetalHelmet = 0;
 	hasImprovedMetalHelmet = 0;

 	$('#healthCounter').html(playerHealth);
	$('#goldCounter').html(playerGold);
	$('#experienceCounter').html(playerExperience);
	$('#attackCounter').html(playerAttack);
	$('#defenseCounter').html(playerDefense);
	$('#luckCounter').html(playerLuck);
	$('#arrowsCounter').html(playerArrows);
	$('#turnCounter').html(turn);
	$('#levelCounter').html(playerLevel);

	$('#axeIcon').attr("src", "img/inventory/axe.png");
	$('#swordIcon').attr("src", "img/inventory/sword.png");
	$('#woodenBowIcon').attr("src", "img/inventory/woodenbow.png");
	$('#improvedWoodenBowIcon').attr("src", "img/inventory/improvedwoodenbow.png");
	$('#leatherArmorIcon').attr("src", "img/inventory/leatherarmor.png");
	$('#metalArmorIcon').attr("src", "img/inventory/metalarmor.png");
	$('#woodenShieldIcon').attr("src", "img/inventory/woodenshield.png");
	$('#metalShieldIcon').attr("src", "img/inventory/metalshield.png");
	$('#metalHelmetIcon').attr("src", "img/inventory/metalhelmet.png");
	$('#improvedMetalHelmetIcon').attr("src", "img/inventory/improvedmetalhelmet.png");
	$("#dayOrNightIcon").attr("src", "img/statusicons/day.png");
	$("#dayOrNightCounter").html("day");


};


// player experience threshold for level up -----------------------------------------------------------------

var level1Req = 10;
var level2Req = 20;
var level3Req = 40;
var level4Req = 70;
var level5Req = 100;
var level6Req = 150;
var level7Req = 200;
var level8Req = 300;
var level9Req = 500;
var level10Req = 1000;



// Event experience variables
var nothingHappenedExperience = 1;
var chestExploreExperience = 2;
var bookExperience = 10;
var scrollExperience = 20;


// Prices of objects
var axePrice = 14;
var swordPrice = 20;
var woodenBowPrice = 10;
var improvedWoodenBowPrice = 16;
var woodenShieldPrice = 10;
var metalShieldPrice = 30;
var leatherArmorPrice = 10;
var metalArmorPrice = 30;
var metalHelmetPrice = 10;
var improvedMetalHelmetPrice = 30;
var healingPotionPrice = 10;
var arrowPrice = 2;

$('#axePrice').html(axePrice);
$('#swordPrice').html(swordPrice);
$('#woodenBowPrice').html(woodenBowPrice);
$('#improvedWoodenBowPrice').html(improvedWoodenBowPrice);
$('#woodenShieldPrice').html(woodenShieldPrice);
$('#metalShieldPrice').html(metalShieldPrice);
$('#leatherArmorPrice').html(leatherArmorPrice);
$('#metalArmorPrice').html(metalArmorPrice);
$('#metalHelmetPrice').html(metalHelmetPrice);
$('#healingPotionPrice').html(healingPotionPrice);
$('#improvedMetalHelmetPrice').html(improvedMetalHelmetPrice);
$('#arrowPrice').html(arrowPrice);

var swordSellPrice = swordPrice/2;
var axeSellPrice = axePrice/2;
var woodenBowSellPrice = woodenBowPrice/2;
var improvedWoodenBowSellPrice = improvedWoodenBowPrice/2;
var woodenShieldSellPrice = woodenShieldPrice/2;
var metalShieldSellPrice = metalShieldPrice/2;
var leatherArmorSellPrice = leatherArmorPrice/2;
var metalArmorSellPrice = metalArmorPrice/2;
var metalHelmetSellPrice = metalHelmetPrice/2;
var improvedMetalHelmetSellPrice = improvedMetalHelmetPrice/2;

var healingPotionSellPrice = healingPotionPrice/2;
var arrowSellPrice = arrowPrice/2;

// healing potions
 var smallPotion = 5;
 var mediumPotion = 10;
 var largePotion = 15;


// Weapons stats
var axeAttack = 1;
var swordAttack = 2;
var woodenBowAttack = 0; // add to range combat
var improvedWoodenBowAttack = 1; // Add this to range combat
var woodenShieldDefense = 1;
var metalShieldDefense = 2;
var leatherArmorDefense = 1;
var metalArmorDefense = 2;
var metalHelmetDefense = 1;
var improvedMetalHelmetDefense = 2;

var arrowAttack = 5;
var arrowDamageBonus = 0; // base damage bonus, can be adjusted by various types of bows
var woodenBowDamageBonus = 0;
var improvedWoodenBowDamageBonus = 1; // adds +1 to arrow base damage


// 1. Mobs attributes
// 1.1 Experience needed for the player to attempt to runaway from mob.
var peasantsRunawayExpReq = 10;
var robberRunawayExpReq = 10;
var robbersRunawayExpReq = 10;
var bearRunawayExpReq = 20;
var wolvesRunawayExpReq = 20;
var squirrelsRunawayExpReq = 20;
var spiritRunawayExpReq = 30;
var dragonRunawayExpReq = 40;

// 1.2 Chance for player to run away (must be =< then roll result), computer rolls 1 - 10 to determine result
var peasantsRunawayChance = 6;
var robberRunawayChance = 5;
var robbersRunawayChance = 5;
var bearRunawayChance = 5;
var wolvesRunawayChance = 5;
var squirrelsRunawayChance = 5;
var spiritRunawayChance = 5;
var dragonRunawayChance = 4;
 
// 1.3 Experience lost after player attempted to run away from the mob
var dragonExperienceLoss = 20;
var spiritExperienceLoss = 10;
var squirrelsExperienceLoss = 10;
var wolvesExperienceLoss = 10;
var bearExperienceLoss = 10;
var robbersExperienceLoss = 10;
var robberExperienceLoss = 5;
var peasantsExperienceLoss = 5;

//1.4 Wizard 
var wizardLvlReq = 2; // player has to be min LVLX to get objects from the wizard

//1.5 Mobs health
var robberHealth = 10; // this value adjusted during combat and is reset back to original after rober defeated by functions arrowDamage() and MELEE
var peasantsHealth = 10;
var robbersHealth = 15;
var squirrelsHealth = 10;
var bearHealth = 20;
var wolvesHealth = 15;
var spiritHealth = 25;
var dragonHealth = 50;

//1.6 Mobs defense
var robberDefense = 1;
var peasantsDefense = 0;
var robbersDefense = 2;
var squirrelsDefense = 0;
var bearDefense = 2;
var wolvesDefense = 1;
var spiritDefense = 3;
var dragonDefense = 4;

// 1.7 Mobs arrow defense
var robberArrowDefense = 1;
var peasantsArrowDefense = 0;
var robbersArrowDefense = 1;
var squirrelsArrowDefense = 0;
var bearArrowDefense = 0;
var wolvesArrowDefense = 0;
var spiritArrowDefense = 1;
var dragonArrowDefense = 2;

// 1.8 Experience gained after killing the mob
var robberExpBonus = 7;
var peasantsExpBonus = 7;
var robbersExpBonus = 15;
var squirrelsExpBonus = 7;
var bearExpBonus = 15;
var wolvesExpBonus = 10;
var spiritExpBonus = 20;
var dragonExpBonus = 40;


/*


function getPosition(e) {

    //this section is from http://www.quirksmode.org/js/events_properties.html
    var targ;
    if (!e)
        e = window.event;
    if (e.target)
        targ = e.target;
    else if (e.srcElement)
        targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode;

    // jQuery normalizes the pageX and pageY
    // pageX,Y are the mouse positions relative to the document
    // offset() returns the position of the element relative to the document
    var x = e.pageX - $(targ).offset().left;
    var y = e.pageY - $(targ).offset().top;

    return {"x": x, "y": y};
};

// now just make sure you use this with jQuery
// obviously you can use other events other than click
$('canvas').click(function(event) {
    // jQuery would normalize the event
    position = getPosition(event);
    //now you can use the x and y positions
    alert("X: " + position.x + " Y: " + position.y);
});




var canvasPosition = {
    x: canvas.offset().left,
    y: canvas.offset().top
};

console.log(canvasPosition.x);


canvas.onclick = function() {
	alert("it works!");

};





canvas.on('click', function(e) {

    // use pageX and pageY to get the mouse position
    // relative to the browser window

    var mouse = {
        x: e.pageX - canvasPosition.x,
        y: e.pageY - canvasPosition.y
    }
    alert("it works!");

    // now you have local coordinates,
    // which consider a (0,0) origin at the
    // top-left of canvas element
});

*/




function randomEvent() {
	turnCounter();
	dayOrNight();
	var eventRollResult = Math.floor((Math.random() * 10) + 1);
		console.log ("roll result " + eventRollResult);
	if (eventRollResult === 1) { 
		console.log("message for result: CHEST");
		bored = 0;
		   if (confirm("You have found a chest. It looks really old. Do you want to open it?")){ 
        	exploreChest(); 
        	}
    		else {
        	alert("You look at the chest and a terrible chill goes down your spine, for some reason you run away.");
        	}
	}
	else if (eventRollResult === 2) {
		console.log("message for result: CHEST");
		bored = 0;
		if (confirm("You have found a chest. It looks really old. Do you want to open it?")){ 
        	exploreChest();  
        	}
    		else {
        	alert("You have a really bad feeling about this chest and decide to not to touch it. You then continue your journey.");
			}
	}
	else if (eventRollResult === 3) { 
		console.log("message for result: NOTHING HAPPENS");
			if (bored === 1){ 
        	alert("Right, it is getting slightly boring... Nothing happens again. Oh, wait, there might be a village in the distance, why not to check it out?"); 
        	experienceToAdd = nothingHappenedExperience;
		    addExperience();
        	}
    		else {
        	alert("Nothing happens, but you still earn some experience. Continue to explore Vadimaria and you may be lucky enough to find a good adventure!");
        	bored = 1;
        	experienceToAdd = nothingHappenedExperience;
		    addExperience();
			}
				
	}
	else if (eventRollResult === 4) {
		console.log("message for result: NOTHING HAPPENS");
		if (bored === 1) { 
        	alert("Right, it is getting slightly boring... Nothing happens again. Oh, wait, there might be a village in the distance, why not to check it out?"); 
        	experienceToAdd = nothingHappenedExperience;
		    addExperience();
        	}
    		else {
        	alert("Nothing happens, but you still earn some experience. Continue to explore Vadimaria and you may be lucky enough to find a good adventure!");
        	bored = 1;
        	experienceToAdd = nothingHappenedExperience;
		    addExperience();
			}
	}
	else if (eventRollResult === 5) {
		console.log("message for result: NOTHING HAPPENS");
		if (bored === 1){ 
        	alert("Right, it is getting slightly boring... Nothing happens again. Oh, wait, there might be a village in the distance, why not to check it out?"); 
        	experienceToAdd = nothingHappenedExperience;
		    addExperience();
        	}
    		else {
        	alert("Nothing happens, but you still earn some experience. Continue to explore Vadimaria and you may be lucky enough to find a good adventure!");
        	bored = 1;
        	experienceToAdd = nothingHappenedExperience;
		    addExperience();
			}
	}
	else if (eventRollResult === 6) { 
		console.log("message for result: ENCOUNTER");
		bored = 0;
		exploreEncounter();
	}
	else if (eventRollResult === 7) {
		console.log("message for result: ENCOUNTER");
		bored = 0;
		exploreEncounter();
	}
	else if (eventRollResult === 8) {
		console.log("message for result: ENCOUNTER");
		bored = 0;
		exploreEncounter();  
	}
	else if (eventRollResult === 9) {
		console.log("message for result: ENCOUNTER");
		bored = 0;
		exploreEncounter();
	}
	else {
		console.log("message for result: ENCOUNTER");
		bored = 0;
		exploreEncounter(); 
	}
};


function turnCounter(){
	turn = turn + 1;
	$('#turnCounter').html(turn);
}

function dayOrNight(){
	if (day === 1) {
		day = 0;
		$("#dayOrNightIcon").attr("src", "img/statusicons/night.png");
		$("#dayOrNightCounter").html("night");
	} else if (day === 0) {
		day = 1;
		$("#dayOrNightIcon").attr("src", "img/statusicons/day.png");
		$("#dayOrNightCounter").html("day");
	}	
}



function exploreEncounter() {
	var eventEncounterRollResult = Math.floor((Math.random() * 10) + 1);
		console.log ("roll result " + eventEncounterRollResult);
	if (eventEncounterRollResult === 0) { 
		enemyType = "robber"; // sets enemyType for future combat statistics (e.g. enemy attack, defense)
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= robberRunawayExpReq) {
			if (confirm("You are attacked by a lonely robber. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the robber?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("You are attacked by a lonely robber and cannot run away (not enough experience). Let us see what comes out of this...");
		console.log("combat starts");
		rangeCombat();
		}
	}
	else if (eventEncounterRollResult === 2) {
		enemyType = "robber";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= robberRunawayExpReq) {
			if (confirm("You are attacked by a lonely robber. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the robber?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("You are attacked by a lonely robber and cannot run away (not enough experience). Let us see what comes out of this...");
		console.log("combat starts");
		rangeCombat();
		}
	}	
	else if (eventEncounterRollResult === 3) {
		enemyType = "robbers";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= robbersRunawayExpReq) {
			if (confirm("You are attacked by a gang of robbers. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the robbers?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("You are attacked by a gang of robbers and cannot run away (not enough experience). Prepare to fight!");
		console.log("combat starts");
		rangeCombat();
		}
	}
	else if (eventEncounterRollResult === 4) {
		console.log("WILD BEAR");
	    enemyType = "bear";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= bearRunawayExpReq) {
			if (confirm("You see a terrible wild bear in the distance. He smelt you and is looking around. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the beast?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("You are attacked by a terrible wild bear! There is no way to escape and you have to fight now!");
		console.log("combat starts");
		rangeCombat();
		}
	}
	else if (eventEncounterRollResult === 5) {
		$("#wolves").get(0).play();
		console.log("PACK OF VOLVES");
		enemyType = "wolves";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= wolvesRunawayExpReq) {
			if (confirm("You are approached by a pack of hungry wolves. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the pack?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("A large pack of hungry wolves is right behind you and there is nowhere to hide! Show no mercy!");
		console.log("combat starts");
		rangeCombat();
		}
	}
	else if (eventEncounterRollResult === 6) {
		console.log("CRAZY SQUIRRELS");
		enemyType = "squirrels";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= squirrelsRunawayExpReq) {
			if (confirm("You can see a buch of crazy squirrels with red eyes running towards you. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the squrrels?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("A bunch of crazy squirrels with red eyes jump on you from above! Defend yourself!");
		console.log("combat starts");
		rangeCombat();
		}
	}	
	else if (eventEncounterRollResult === 7) { 
		$("#peasants").get(0).play();
		console.log("A CROWD OF HUNGRY PEASANTS");
		enemyType = "peasants";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= peasantsRunawayExpReq) {
			if (confirm("A crowd of poor peasants are approaching from a village nearby. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the peasants?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("A crowd of poor peasants are approaching from a village nearby! Their weapons are weak but many. Teach them a lesson!");
		console.log("combat starts");
		rangeCombat();
		}
	}	
	else if (eventEncounterRollResult === 8) {
		$("#spirit").get(0).play();
		console.log("AN ANGRY SPIRIT");
		enemyType = "spirit";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= spiritRunawayExpReq) {
			if (confirm("Oopsy Daisy... A spirit materializes out of thin air and it does not look friendly either. You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid this spirit?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("Oopsy Daisy... A spirit materializes out of thin air and it does not look friendly at all. I hope you did not skip your combat magic classes at school...");
		console.log("combat starts");
		rangeCombat();
		}
	}	
	else if (eventEncounterRollResult === 9) {
		$("#dragon").get(0).play();
		console.log("A MIGHTY DRAGON");
		enemyType = "dragon";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		if (playerExperience >= dragonRunawayExpReq) {
			if (confirm("Large dark shadow covers the sun - a mighty Red Dragon is flying in the skies and he is one hungry dragon! You can attempt to run away and will lose experience irrespective of the outcome. Would you like to try and avoid the Red Dragon?")){
			console.log("player attempts to run away");
			attemptRunaway();
			} else {
			console.log("combat starts");
			rangeCombat();
			}
		} else {
		alert("Behold the Great Red Dragon! He breathes fire and his claws are sharp. Be victorious or die...");
		console.log("combat starts");
		rangeCombat();
		}
	}	
	else {
		console.log("WIZARD"); 
		enemyType = "wizard";
		console.log("enemyType is now " + enemyType);
		console.log(playerExperience);
		alert("An elderly man with a grey beard wearing a long blue robe is coming towards you. Do not be afraid, for he is a good wizard. If your experience allows he will give you a present of his choice.");
		if (playerLevel >= wizardLvlReq){ 
        	exploreWizard(); 
        	}
    		else {
        	alert("Wizard looks at you and goes away. You are too immature to own powerful things.");
			}
	}
};


function exploreChest() {
	var eventRollResult = Math.floor((Math.random() * 10) + 1);
		console.log ("roll result " + eventRollResult);
	if (eventRollResult === 1) {  
		console.log("message for result: CHEST IS EMPTY");
		alert("Oh, what a bad luck. The lock is broken badly, I guess someone has looted this chest before you - it is completely empty now, but you got some experience at least...");
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventRollResult === 2) { 
		console.log("message for result: CHEST IS EMPTY");
		alert("You spent a few minutes trying to pick the lock. What a disappointment, the chest is empty... but you got some experience at least.");
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventRollResult === 3) { 
		console.log("message for result: FOUND A BOTTLE"); 
			if (confirm("You have found a bottle in the chest and there is some liquid in it. Would you like to drink it?")){ 
        	exploreBottle();  
        	}
    		else {
        	alert("You remember that your mum told you to never drink unknown liquids. You throw the bottle away.");
			experienceToAdd = chestExploreExperience
			addExperience();	 
			}
	}
	else if (eventRollResult === 4) { 
		console.log("message for result: GET X MONEY");
		exploreMoney(); 
	}
	else if (eventRollResult === 5) {
		console.log("message for result: GET X MONEY");
		exploreMoney();  
	}
	else if (eventRollResult === 6) {
		console.log("message for result: GET X MONEY"); 
		exploreMoney(); 
	}
	else if (eventRollResult === 7) { 
		console.log("message for result: ITEM FOUND!");
		alert("Inside the chest you find something wrapped in an old dirty cloth. You unwrap it carefully and it is...");
		exploreItem();
	}
	else if (eventRollResult === 8) {
		console.log("message for result: FOUND A BOTTLE");
		if (confirm("You have found a bottle in the chest. There is some liquid in it. Would you like to drink it?")){ 
        	exploreBottle();  
        	}
    		else {
        	alert("You remember that your mum told you to never drink unknown liquids. You throw the bottle away.");
			}
	}
	else if (eventRollResult === 9) {
		console.log("message for result: YOU DISTURBED A SPIRIT");
		enemyType = "spirit";
		console.log("enemyType type is now " + enemyType);
		alert("Oh no, you have disturbed an ancient spirit who was sleeping in this chest! Prepare to fight!");
		rangeCombat(); 
	}
	else {
		console.log("message for result: GET X MONEY"); 
		exploreMoney(); 
	}
};

function exploreMoney() {
	 eventGoldRollResult = Math.floor((Math.random() * 10) + 1);
		console.log ("roll result " + eventGoldRollResult);
	if (eventGoldRollResult === 1) {
		console.log("message for result: YOU FOUND 1 GOLD COIN");
		alert("On the very bottom of this big chest there was only one gold coin. It was so small that you nearly missed it. Oh well, may be next time you will feel lucky.");
		goldToAdd = 1; 
		addGold();
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 2) {
		console.log("message for result: YOU FOUND 2 GOLD COINS");
		alert("You found 2 gold coins. Not much, but at least something!");
		goldToAdd = 2;
		addGold();	
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 3) {
		console.log("message for result: YOU FOUND 3 GOLD COINS");
		alert("3 gold coins spent their time waiting to be found. Keep looting the chests and you will get rich! In 100 years.");
		goldToAdd = 3; 
		addGold();	
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 4) {
		console.log("message for result: YOU FOUND 4 GOLD COINS");
		alert("4 gold coins biss ta! Spend them wisely, ha ha!");
		goldToAdd = 4; 
		addGold();	 
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 5) {
		console.log("message for result: YOU FOUND 5 GOLD COINS");
		alert("Nice and shiny there were 5 gold coins in there. Not bad!");
		goldToAdd = 5; 
		addGold();	
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 6) {
		console.log("message for result: YOU FOUND 6 GOLD COINS");
		alert("You found 6 gold coins. Nice!");
		goldToAdd = 6; 
		addGold();
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 7) {
		console.log("message for result: YOU FOUND 7 GOLD COINS");
		alert("Now, that's something - 7 gold coins!");
		goldToAdd = 7; 
		addGold();	
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 8) {
		console.log("message for result: YOU FOUND 8 GOLD COINS");
		alert("There were 8 gold coins in the chest. That is enough for a nice dinner and wine... Waiter!");
		goldToAdd = 8; 
		addGold();
		experienceToAdd = chestExploreExperience
		addExperience();	 
	}
	else if (eventGoldRollResult === 9) {
		console.log("message for result: YOU FOUND 9 GOLD COINS");
		alert("You found 9 gold coins in this chest. Keep them safe!");
		goldToAdd = 9; 
		addGold();
		experienceToAdd = chestExploreExperience
		addExperience();	 
	 
	}
	else {
		console.log("message for result: YOU FOUND 10 GOLD COINS");
		alert("10 gold coins! Amazing luck! ");
		goldToAdd = 10; 
		addGold();
		experienceToAdd = chestExploreExperience
		addExperience();	 

			 
	}
};


function exploreBottle() {
	var eventRollResult = Math.floor((Math.random() * 10) + 1);
		console.log ("roll result " + eventRollResult);
	if (eventRollResult === 1) {  
		console.log("message for result: POISONED!");
		explorePoison();
	}
	else if (eventRollResult === 2) {
		console.log("message for result: JUST WATER");
		alert("You drink the liquid and... nothing happens. It was just water.");
		experienceToAdd = chestExploreExperience
		addExperience();	 

	}
	else if (eventRollResult === 3) {
		alert("it was a health potion! You gain " + smallPotion + " heath!"); 
		healthRestoreValue = smallPotion;
		addHealthFromChest(); 
	}
	else if (eventRollResult === 4) {
		alert("it was a health potion! You gain " + smallPotion + " heath!"); 
		healthRestoreValue = smallPotion;
		addHealthFromChest();
	}
	else if (eventRollResult === 5) {
		alert("it was a health potion! You gain " + smallPotion + " heath!"); 
		healthRestoreValue = smallPotion;
		addHealthFromChest(); 
	}
	else if (eventRollResult === 6) {
		alert("it was a health potion! You gain " + smallPotion + " heath!"); 
		healthRestoreValue = smallPotion;
		addHealthFromChest(); 
	}
	else if (eventRollResult === 7) {
		alert("it was a health potion! You gain " + mediumPotion + " heath!"); 
		healthRestoreValue = mediumPotion;
		addHealthFromChest(); 
	}
	else if (eventRollResult === 8) {
		alert("it was a health potion! You gain " + mediumPotion + " heath!"); 
		healthRestoreValue = mediumPotion;
		addHealthFromChest();
	}
	else if (eventRollResult === 9) {
		alert("it was a health potion! You gain " + largePotion + " heath!"); 
		healthRestoreValue = largePotion;
		addHealthFromChest(); 
	}
	else {
		alert("it was a health potion! You gain " + largePotion + " heath!"); 
		healthRestoreValue = largePotion;
		addHealthFromChest();
	}
};


function explorePoison() {
	var eventPoisonRollResult = Math.floor((Math.random() * 10) + 1);
		console.log ("roll result " + eventPoisonRollResult);
	if (eventPoisonRollResult < 3) {
		console.log("message for result: HEAVY POISONING: -20 HEALTH");
		alert("You collapse on the ground -- the bottle contained heavy poison. You lose 20 Health and need a few days to recover");
		poisonHealthDamageValue = 20;
		poisonHealthDamage();
		}
	else if (eventPoisonRollResult < 6) {
		console.log("message for result: POISONED: -10 HEALTH");
		alert("You drink the liquid and immediately throw up. Your stomach burns and it is hard to breathe. It was a poison! You lose 10 Health. Be careful next time...");
		poisonHealthDamageValue = 10;
		poisonHealthDamage();
	}
	else {
		console.log("message for result: SLIGHTLY DIZZY: -5 HEALTH");
		alert("There was poison in this bottle! Happily enough it was not strong enough, you loose only 5 Health.");
		poisonHealthDamageValue = 5;
		poisonHealthDamage(); 
	}
};


function poisonHealthDamage(){
	playerHealth = playerHealth - poisonHealthDamageValue;
		if (playerHealth < 1)  {
	 playerHealth = 0;
	 $('#healthCounter').html(playerHealth);
	 alert("Poison kills you... Game over");
	 gameOver();
	 return false;  // supposed to stop execution of all scripts
	}
	else {
	$('#healthCounter').html(playerHealth);
	experienceToAdd = chestExploreExperience
	addExperience(); 
	}
};



function addHealthFromChest(){
	playerHealth = playerHealth + healthRestoreValue;
		if (playerHealth >= 100)  {
	 playerHealth = 100;
	 $('#healthCounter').html(playerHealth);
	 alert("You have healed up to your maximum health value");
	 experienceToAdd = chestExploreExperience
	 addExperience();	 
		}
	else {
	$('#healthCounter').html(playerHealth);
	experienceToAdd = chestExploreExperience
	addExperience();	 

	
	}
};


function exploreMetalHelmet() {
	if (hasMetalHelmet === 1) {
		if (confirm("Do you wish to sell your helmet for " + metalHelmetSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellMetalHelmet();
			}
		else{}
			}
	else if (hasHelmet === 1) {
	alert("You have only one head :)");
	}
	else {	
		if (playerGold >= metalHelmetPrice) {
			tempDefenseValue = playerDefense + metalHelmetDefense;
			if (tempDefenseValue > maxDefenseValue) {
			alert("You cannot exceed your maximum Defense level of " + maxDefenseValue);
			}
			else {
			$("#purchase").get(0).play();
			playerDefense = playerDefense + metalHelmetDefense;
			$('#defenseCounter').html(playerDefense);
			playerGold = playerGold - metalHelmetPrice;
			$('#goldCounter').html(playerGold);
			hasHelmet = 1;
			hasMetalHelmet = 1; //CRITICAL
			$("#metalHelmetIcon").attr("src", "img/inventory/metalhelmet_equipped.png");
			} 
		}	
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	
	}
};		


function exploreImprovedMetalHelmet() {
	if (hasImprovedMetalHelmet === 1) {
		if (confirm("Do you wish to sell your improved helmet for " + improvedMetalHelmetSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellImprovedMetalHelmet();
			}
		else{}
			}
	else if (hasHelmet === 1) {
	alert("You have only one head :)");
	}
	else {	
		if (playerGold >= improvedMetalHelmetPrice) {
			tempDefenseValue = playerDefense + improvedMetalHelmetDefense;
			if (tempDefenseValue > maxDefenseValue) {
			alert("You cannot exceed your maximum Defense level of " + maxDefenseValue);
			}
			else {
			$("#purchase").get(0).play();
			playerDefense = playerDefense + improvedMetalHelmetDefense;
			$('#defenseCounter').html(playerDefense);
			playerGold = playerGold - improvedMetalHelmetPrice;
			$('#goldCounter').html(playerGold);
			hasHelmet = 1;
			hasImprovedMetalHelmet = 1; //CRITICAL
			$("#improvedMetalHelmetIcon").attr("src", "img/inventory/improvedmetalhelmet_equipped.png");
			} 
		}	
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	
	}
};		
		
function sellMetalHelmet() { 
		if (hasMetalHelmet === 1) {
		$("#sell").get(0).play();
		playerDefense = playerDefense - metalHelmetDefense;
		$('#defenseCounter').html(playerDefense);
		playerGold = playerGold + metalHelmetSellPrice;
		$('#goldCounter').html(playerGold);
		hasHelmet = 0;
		hasMetalHelmet = 0;
		$("#metalHelmetIcon").attr("src", "img/inventory/metalhelmet.png");
		} else {
		alert("You have nothing to sell");
		}
};
	

function sellImprovedMetalHelmet() { 
		if (hasImprovedMetalHelmet === 1) {
		$("#sell").get(0).play();
		playerDefense = playerDefense - improvedMetalHelmetDefense;
		$('#defenseCounter').html(playerDefense);
		playerGold = playerGold + improvedMetalHelmetSellPrice;
		$('#goldCounter').html(playerGold);
		hasHelmet = 0;
		hasImprovedMetalHelmet = 0;
		$("#improvedMetalHelmetIcon").attr("src", "img/inventory/improvedmetalhelmet.png");
		} else {
		alert("You have nothing to sell");
		}
};

	
function exploreLeatherArmor() {
	if (hasLeatherArmor === 1) {
		if (confirm("Do you wish to sell your leather armor for " + leatherArmorSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellLeatherArmor();
			}
		else{}
			}
	else if (hasArmor === 1) {
	alert("You can have only one chestplate");
	}
	else {	
		if (playerGold >= leatherArmorPrice) {
			tempDefenseValue = playerDefense + leatherArmorDefense;
			if (tempDefenseValue > maxDefenseValue) {
			alert("You cannot exceed your maximum Defense level of " + maxDefenseValue);
			}
			else {
			$("#purchase").get(0).play();
			playerDefense = playerDefense + leatherArmorDefense;
			$('#defenseCounter').html(playerDefense);
			playerGold = playerGold - leatherArmorPrice;
			$('#goldCounter').html(playerGold);
			hasArmor = 1;
			hasLeatherArmor = 1; //CRITICAL
			$("#leatherArmorIcon").attr("src", "img/inventory/leatherarmor_equipped.png");
			} 
		}	
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	
	}
};		
	
	
function exploreMetalArmor() {
	if (hasMetalArmor === 1) {
		if (confirm("Do you wish to sell the metal armor for " + metalArmorSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellMetalArmor();
			}
		else{}
			}
	else if (hasArmor === 1) {
	alert("You can have only one chestplate");
	}
	else {	
		if (playerGold >= metalArmorPrice) {
			tempDefenseValue = playerDefense + metalArmorDefense;
			if (tempDefenseValue > maxDefenseValue) {
			alert("You cannot exceed your maximum Defense level of " + maxDefenseValue);
			}
			else {
			$("#purchase").get(0).play();
			playerDefense = playerDefense + metalArmorDefense;
			$('#defenseCounter').html(playerDefense);
			playerGold = playerGold - metalArmorPrice;
			$('#goldCounter').html(playerGold);
			hasArmor = 1;
			hasMetalArmor = 1; //CRITICAL
			$("#metalArmorIcon").attr("src", "img/inventory/metalarmor_equipped.png");
			} 
		}	
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	
	}
};		
	
	
	

function sellLeatherArmor() {  // FINISH THIS
		if (hasLeatherArmor === 1) {
		$("#sell").get(0).play();
		playerDefense = playerDefense - leatherArmorDefense;
		$('#defenseCounter').html(playerDefense);
		playerGold = playerGold + leatherArmorSellPrice;
		$('#goldCounter').html(playerGold);
		hasArmor = 0;
		hasLeatherArmor = 0;
		$("#leatherArmorIcon").attr("src", "img/inventory/leatherarmor.png");
		} else {
		alert("You have nothing to sell");
		}
};
	
function sellMetalArmor() {  // FINISH THIS
		if (hasMetalArmor === 1) {
		$("#sell").get(0).play();
		playerDefense = playerDefense - metalArmorDefense;
		$('#defenseCounter').html(playerDefense);
		playerGold = playerGold + metalArmorSellPrice;
		$('#goldCounter').html(playerGold);
		hasArmor = 0;
		hasMetalArmor = 0;
		$("#metalArmorIcon").attr("src", "img/inventory/metalarmor.png");
		} else {
		alert("You have nothing to sell");
		}
};

	
function exploreAxe() {
	if (hasAxe === 1) {
		if (confirm("Do you wish to sell the axe for " + axeSellPrice + " gold?")) {
        	console.log("player wishes to sell the weapon");
			sellAxe();
	}
	else{}
	}
	else if (hasWeapon === 1) {
	alert("You can have only one melee weapon");
	}
	else {	 
		if (playerGold >= axePrice) {
			tempAttackValue = playerAttack + axeAttack;
			if (tempAttackValue > maxAttackValue) {
			alert("You cannot exceed your maximum Attack level of " + maxAttackValue);
			}
			else {
			$("#purchase").get(0).play();
			playerAttack = playerAttack + axeAttack;
			$('#attackCounter').html(playerAttack);
			playerGold = playerGold - axePrice;
			$('#goldCounter').html(playerGold);
			hasWeapon = 1;
			hasAxe = 1; //CRITICAL
			$("#axeIcon").attr("src", "img/inventory/axe_equipped.png");
			} 
		}	
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	
	}
};	
	
	
function exploreSword() {
	if (hasSword === 1) {
		if (confirm("Do you wish to sell the sword for " + swordSellPrice + " gold?")) {
        	console.log("player wishes to sell the sword");
			sellSword();
	}
	else{}
	}
	else if (hasWeapon === 1) {
	alert("You can have only one melee weapon");
	}
	else {	 
		if (playerGold >= swordPrice) {
			tempAttackValue = playerAttack + swordAttack;
			if (tempAttackValue > maxAttackValue) {
			alert("You cannot exceed your maximum Attack level of " + maxAttackValue);
			}
			else {
			$("#purchase").get(0).play();
			playerAttack = playerAttack + swordAttack;
			$('#attackCounter').html(playerAttack);
			playerGold = playerGold - swordPrice;
			$('#goldCounter').html(playerGold);
			hasWeapon = 1;
			hasSword = 1; //CRITICAL
			$("#swordIcon").attr("src", "img/inventory/sword_equipped.png");
			} 
		}	
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	
	}
};		

	
function sellSword() { 
		if (hasSword === 1) { 
		$("#sell").get(0).play();
		playerAttack = playerAttack - swordAttack;
		$('#attackCounter').html(playerAttack);
		playerGold = playerGold + swordSellPrice;
		$('#goldCounter').html(playerGold);
		hasWeapon = 0;
		hasSword = 0; //CRITICAL
		$("#swordIcon").attr("src", "img/inventory/sword.png");

		} else {
		alert("You have nothing to sell");
		}
};	
	
	
function sellAxe() { // FINISH THIS
		if (hasAxe === 1) { 
		$("#sell").get(0).play();
		playerAttack = playerAttack - axeAttack;
		$('#attackCounter').html(playerAttack);
		playerGold = playerGold + axeSellPrice;
		$('#goldCounter').html(playerGold);
		hasWeapon = 0;
		hasAxe = 0; //CRITICAL
		$("#axeIcon").attr("src", "img/inventory/axe.png");

		} else {
		alert("You have nothing to sell");
		}
};	
	
	
	
function exploreWoodenShield() {
	if (hasWoodenShield === 1) {
		if (confirm("Do you wish to sell the wooden shield for " + woodenShieldSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellWoodenShield();
	}
	else{}
	}
	else if (hasShield === 1) {
	alert("You can have only one shield");
	}
	else {	 
		if (playerGold >= woodenShieldPrice) {
			tempDefenseValue = playerDefense + woodenShieldDefense;
			if (tempDefenseValue > maxDefenseValue) {
			alert("You cannot exceed your maximum Defense level of " + maxDefenseValue);
			}
			else {
			$("#purchase").get(0).play();
			playerDefense = playerDefense + woodenShieldDefense;
			$('#defenseCounter').html(playerDefense);
			playerGold = playerGold - woodenShieldPrice;
			$('#goldCounter').html(playerGold);
			hasShield = 1;
			hasWoodenShield = 1; //CRITICAL
			$("#woodenShieldIcon").attr("src", "img/inventory/woodenshield_equipped.png");
			} 
		}	
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	
	}
};		


function exploreMetalShield() { 
	if (hasMetalShield === 1) {
		if (confirm("Do you wish to sell your metal shield for " + metalShieldSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellMetalShield();
	}
	else{}
	}
	else if (hasShield === 1) {
	alert("You can have only one shield");
	}
	else {
		if (playerGold >= metalShieldPrice) {
			tempDefenseValue = playerDefense + metalShieldDefense;
			if (tempDefenseValue > maxDefenseValue) {
			alert("You cannot exceed your maximum Defense level of " + maxDefenseValue);
			}
			else {
			$("#purchase").get(0).play();
			playerDefense = playerDefense + metalShieldDefense;
			$('#defenseCounter').html(playerDefense);
			playerGold = playerGold - metalShieldPrice;
			$('#goldCounter').html(playerGold);
			hasShield = 1;
			hasMetalShield = 1;
			$("#metalShieldIcon").attr("src", "img/inventory/metalshield_equipped.png");
			} 
		}
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	}
};	





function sellWoodenShield() {  
		if (hasWoodenShield === 1) {
		$("#sell").get(0).play();
		playerDefense = playerDefense - woodenShieldDefense;
		$('#defenseCounter').html(playerDefense);
		playerGold = playerGold + woodenShieldSellPrice;
		$('#goldCounter').html(playerGold);
		hasShield = 0;
		hasWoodenShield = 0; // CRITICAL
		$("#woodenShieldIcon").attr("src", "img/inventory/woodenshield.png");
		} else {
		alert("You have nothing to sell");
		}
}	

function sellMetalShield() {
		if (hasMetalShield === 1) { 
		$("#sell").get(0).play();
		playerDefense = playerDefense - metalShieldDefense;
		$('#defenseCounter').html(playerDefense);
		playerGold = playerGold + metalShieldSellPrice;
		$('#goldCounter').html(playerGold);
		hasShield = 0;
		hasMetalShield = 0; //CRITICAL
		$("#metalShieldIcon").attr("src", "img/inventory/metalshield.png");

		} else {
		alert("You have nothing to sell");
		}
};	


function exploreWoodenBow() { 
	if (hasWoodenBow === 1) {
		if (confirm("Do you wish to sell your wooden bow bor " + woodenBowSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellWoodenBow();
	}
	else{}
	}
	else if (hasBow === 1) {
	alert("You can have only one bow");
	}
	else {
		if (playerGold >= woodenBowPrice) {
			$("#purchase").get(0).play();
			playerGold = playerGold - woodenBowPrice;
			$('#goldCounter').html(playerGold);
			hasBow = 1;
			hasWoodenBow = 1;
			$("#woodenBowIcon").attr("src", "img/inventory/woodenbow_equipped.png");
			arrowDamageBonus = arrowDamageBonus + woodenBowDamageBonus;
			console.log(arrowDamageBonus);
			} 
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	}
}	


function exploreImprovedWoodenBow() { 
	if (hasImprovedWoodenBow === 1) {
		if (confirm("Do you wish to sell your improved wooden bow bow " + improvedWoodenBowSellPrice + " gold?")) {
        	console.log("player wishes to sell the item");
			sellImprovedWoodenBow();
	}
	else{}
	}
	else if (hasBow === 1) {
	alert("You can have only one bow");
	}
	else {
		if (playerGold >= improvedWoodenBowPrice) {
			$("#purchase").get(0).play();
			playerGold = playerGold - improvedWoodenBowPrice;
			$('#goldCounter').html(playerGold);
			hasBow = 1;
			hasImprovedWoodenBow = 1;
			$("#improvedWoodenBowIcon").attr("src", "img/inventory/improvedwoodenbow_equipped.png");
			arrowDamageBonus = arrowDamageBonus + improvedWoodenBowDamageBonus;
			console.log(arrowDamageBonus);
			} 
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	}
}	


function sellWoodenBow() {
		if (hasWoodenBow === 1){
		$("#sell").get(0).play();
		playerGold = playerGold + woodenBowSellPrice;
		$('#goldCounter').html(playerGold);
		hasBow = 0;
		hasWoodenBow = 0; // CRITICAL
		$("#woodenBowIcon").attr("src", "img/inventory/woodenbow.png");
		arrowDamageBonus = arrowDamageBonus - woodenBowDamageBonus;
		console.log(arrowDamageBonus);
		} else {
		alert("You have nothing to sell");
		}
}

function sellImprovedWoodenBow() {
		if (hasImprovedWoodenBow === 1){
		$("#sell").get(0).play();
		playerGold = playerGold + improvedWoodenBowSellPrice;
		$('#goldCounter').html(playerGold);
		hasBow = 0;
		hasImprovedWoodenBow = 0; // CRITICAL
		$("#improvedWoodenBowIcon").attr("src", "img/inventory/improvedwoodenbow.png");
		arrowDamageBonus = arrowDamageBonus - improvedWoodenBowDamageBonus;
		console.log(arrowDamageBonus);
		} else {
		alert("You have nothing to sell");
		}
}


function purchaseArrow() { 
	if (playerArrows >= 3) {
	alert("You can buy only 3 arrows");
	}
	else {
		if (playerGold >= arrowPrice) {
		
		playerArrows = playerArrows + 1;
		$('#arrowsCounter').html(playerArrows);
		playerGold = playerGold - arrowPrice;
		$('#goldCounter').html(playerGold);
		$('#arrowsIcon').html(playerArrows);
		$("#purchase").get(0).play();
		} 
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
	}
};		

function sellArrow() { 
		if (playerArrows > 0){
		$("#sell").get(0).play();
		playerArrows = playerArrows - 1;
		playerGold = playerGold + arrowSellPrice;
		$('#goldCounter').html(playerGold);
		$('#arrowsIcon').html(playerArrows);
		$('#arrowsCounter').html(playerArrows);
		} else {
		alert("You have nothing to sell");
		}
};


function purchaseHealingPotion() {
		if (playerGold >= healingPotionPrice) {
		playerHealingPotions = playerHealingPotions + 1;
		$('#healingPotionsCounter').html(playerHealingPotions);
		playerGold = playerGold - healingPotionPrice;
		$('#goldCounter').html(playerGold);
		$("#purchase").get(0).play();
		} 
		else {
		alert("You do not have enough money. Vadimaria is full of treasures, go and get some!");
		}
}

function addHealthFromHealingPotion(){
	if (playerHealingPotions < 1) {
		alert("You do not have any potions to use");}
	else if (playerHealth < 100) {	
	$("#gulp").get(0).play();
	playerHealingPotions = playerHealingPotions - 1;
	$('#healingPotionsCounter').html(playerHealingPotions);
	playerHealth = playerHealth + mediumPotion;
		if (playerHealth >= 100)  {
	 		playerHealth = 100;
	 		$('#healthCounter').html(playerHealth);
	 		alert("You have healed up to your maximum health value"); }
			else {
			$('#healthCounter').html(playerHealth); 
			}

	}	
}



function attemptRunaway() {  
	var eventRollResult = Math.floor((Math.random() * 10) + 1); 
	console.log("basic roll is: " + eventRollResult);
	attemptRunawayRollResult = eventRollResult - playerLuck; 
	console.log("final roll is:" + attemptRunawayRollResult);
	if (enemyType === "robber" && attemptRunawayRollResult <= robberRunawayChance){ 
		playerExperience = playerExperience - robberExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the robber!");
	} 
	else if (enemyType === "robber" && attemptRunawayRollResult > robberRunawayChance) {
		playerExperience = playerExperience - robberExperienceLoss;
		updateExperience();
		alert("The robber spotted you. Prepare to fight!");
		rangeCombat();
	}
	else if (enemyType === "robbers" && attemptRunawayRollResult <= robbersRunawayChance){
		playerExperience = playerExperience - robbersExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the robbers!");
	} 
	else if (enemyType === "robbers" && attemptRunawayRollResult > robbersRunawayChance) {
		playerExperience = playerExperience - robbersExperienceLoss;
		updateExperience();
		alert("The robbers spotted you. Prepare to fight!");
		rangeCombat();
	}
	else if (enemyType === "bear" && attemptRunawayRollResult <= bearRunawayChance){
		playerExperience = playerExperience - bearExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the bear!");
	} 
	else if (enemyType === "bear" && attemptRunawayRollResult > bearRunawayChance) {
		playerExperience = playerExperience - bearExperienceLoss;
		updateExperience();
		alert("The bear spotted you. Prepare to fight!");
		rangeCombat();
	}
	else if (enemyType === "wolves" && attemptRunawayRollResult <= wolvesRunawayChance){
		playerExperience = playerExperience - wolvesExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the wolves!");
	} 
	else if (enemyType === "wolves" && attemptRunawayRollResult > wolvesRunawayChance) {
		playerExperience = playerExperience - wolvesExperienceLoss;
		updateExperience();
		alert("The wolves spotted you. Prepare to fight!");
		rangeCombat();
	} 
	else if (enemyType === "squirrels" && attemptRunawayRollResult <= squirrelsRunawayChance){
		playerExperience = playerExperience - squirrelsExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the crazy squirrels!");
	} 
	else if (enemyType === "squirrels" && attemptRunawayRollResult > squirrelsRunawayChance) {
		playerExperience = playerExperience - squirrelsExperienceLoss;
		updateExperience();
		alert("The squirrels spotted you. Prepare to fight!");
		rangeCombat();
	} 
	else if (enemyType === "peasants" && attemptRunawayRollResult <= peasantsRunawayChance){
		playerExperience = playerExperience - peasantsExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the poor peasants!");
	}
	else if (enemyType === "peasants" && attemptRunawayRollResult > peasantsRunawayChance) {
		playerExperience = playerExperience - peasantsExperienceLoss;
		updateExperience();
		alert("The peasants spotted you. Prepare to fight!");
		rangeCombat();
	} 
	else if (enemyType === "spirit" && attemptRunawayRollResult <= spiritRunawayChance){
		playerExperience = playerExperience - spiritExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the spirit!");
	}
	else if (enemyType === "spirit" && attemptRunawayRollResult > spiritRunawayChance) {
		playerExperience = playerExperience - spiritExperienceLoss;
		updateExperience();
		alert("The spirit spotted you. Prepare to fight!");
		rangeCombat();
	} 

	else if (enemyType === "dragon" && attemptRunawayRollResult <= dragonRunawayChance){
		playerExperience = playerExperience - dragonExperienceLoss;
		updateExperience();
		alert("You have successfully avoided the Great Red Dragon!");
	}
	else if (enemyType === "dragon" && attemptRunawayRollResult > dragonRunawayChance) {
		playerExperience = playerExperience - dragonExperienceLoss;
		updateExperience();
		alert("The Great Red Dragon spotted you. Prepare to fight!");
		rangeCombat();
	} 
};	


function addGold() {  
	playerGold = playerGold + goldToAdd;
		if (goldToAdd > 1) {
		$("#coinsfound").get(0).play();
		} else {
		$("#onecoinfound").get(0).play();
		}
	$('#goldCounter').html(playerGold);
	
};


function updateExperience(){  // writes current experience value and sets to 0 if negative
	if (playerExperience < 0)  {
	 playerExperience = 0;
	 $('#experienceCounter').html(playerExperience);
	}
	else {
	$('#experienceCounter').html(playerExperience);
	}
};


function rangeCombat() {  // combat starts with checking if player can shoot arrows from a distance
	console.log("range combat function launched");
	if (hasBow === 1 & playerArrows > 0)  {
	console.log("ask if player wants to shoot");
		if (confirm("You can shoot some arrows and possibly deal some damage to the enemy before the battle starts. Would you like to do so?")){ 
        	console.log("player wants to shoot arrows");
        	playerArrows = playerArrows - 1;
        	$('#arrowsCounter').html(playerArrows);
        	$('#arrowsIcon').html(playerArrows);
        	playerShootArrow(); 
        	}
    		else {
        	console.log("Player wants to go straight to melee");
			meleeCombat();
			}
	}
	else {
	console.log("player cannot shoot, start melee");
	meleeCombat();
	}
};



function meleeCombat() {
    $("#swordfight_1").get(0).play();
	var playerRollResult = Math.floor((Math.random() * 20) + 1);
	console.log("player rolled: " + playerRollResult);
	var damageFromPlayer = playerRollResult + playerAttack;
	console.log("Player dealt damage: " + damageFromPlayer);
	 	if (enemyType === "robber") {
	 	var damageToMob = damageFromPlayer - robberDefense;
	 		if (damageToMob < 0) { // to avoid adding negative value to robberHealth which is calculated later on
	 			damageToMob = 0;
	 			}
	 	console.log("final damage to robber after robber's defense kicks in: " + damageToMob);
	 	robberHealth = robberHealth - damageToMob;
	 	 	if (robberHealth < 1) {
				alert("Robber is dead");
				robberHealth = 10; // CRITICAL: resets robber's the original health value for future combats
				lootEnemy();
 	 		} else {
	 	 	alert("You dealt the robber " + damageToMob + " damage. His health is now down to " + robberHealth + "!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
		} else if (enemyType === "peasants") {
	 	var damageToMob = damageFromPlayer - peasantsDefense;
	 		if (damageToMob < 0) {
	 			damageToMob = 0;
	 			}
	 	console.log(damageToMob);
	 	peasantsHealth = peasantsHealth - damageToMob;
	 	 	if (peasantsHealth < 1) {
	 	 		$("#peasants_defeated").get(0).play();
				alert("Peasants are defeated. They run away screaming leaving some dead bodies behind.");
				peasantsHealth = 15; // CRITICAL: resets robber's the original health value for future combats
				lootEnemy();
 	 		} else {
	 	 	alert("You dealt the peasants " + damageToMob + " damage. They are now down to " + peasantsHealth + " health!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
		} else if (enemyType === "robbers") {
	 	var damageToMob = damageFromPlayer - robbersDefense;
	 	if (damageToMob < 0) {
	 			damageToMob = 0;
	 			}
	 	console.log(damageToMob);
	 	robbersHealth = robbersHealth - damageToMob;
	 	 	if (robbersHealth < 1) {
				alert("Robbers are defeated. They run away screaming leaving some dead bodies behind.");
				robbersHealth = 15; // CRITICAL: resets robber's the original health value for future combats
				lootEnemy();
 	 		} else {
	 	 	alert("You dealt the robbers " + damageToMob + " damage. They are now down to " + robbersHealth + " health!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
		} else if (enemyType === "squirrels") {
	 	var damageToMob = damageFromPlayer - squirrelsDefense;
	 	if (damageToMob < 0) {
	 			damageToMob = 0;
	 			}
	 	console.log(damageToMob);
	 	squirrelsHealth = squirrelsHealth - damageToMob;
	 	 	if (squirrelsHealth < 1) {
				alert("Squirrels are dead. Good job!");
				squirrelsHealth = 10; // CRITICAL: resets robber's the original health value for future combats
				lootEnemy();
 	 		} else {
	 	 	alert("You dealt the squirrels " + damageToMob + " damage. They are now down to " + squirrelsHealth + " health!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
		} else if (enemyType === "bear") {
	 	var damageToMob = damageFromPlayer - bearDefense;
	 	if (damageToMob < 0) {
	 			damageToMob = 0;
	 			}
	 	console.log(damageToMob);
	 	bearHealth = bearHealth - damageToMob;
	 	 	if (bearHealth < 1) {
				alert("The terrible bear falls dead. Victory!");
				bearHealth = 20; // CRITICAL: resets robber's the original health value for future combats
				lootEnemy();
 	 		} else {
	 	 	alert("You dealt the beast " + damageToMob + " damage. It is now down to " + bearHealth + " health!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
		} else if (enemyType === "wolves") {
	 	var damageToMob = damageFromPlayer - wolvesDefense;
	 	if (damageToMob < 0) {
	 			damageToMob = 0;
	 			}
	 	console.log(damageToMob);
	 	wolvesHealth = wolvesHealth - damageToMob;
	 	 	if (wolvesHealth < 1) {
				alert("Wolves are dead. Good job!");
				wolvesHealth = 15; // CRITICAL: resets robber's the original health value for future combats
				lootEnemy();
 	 		} else {
	 	 	alert("You dealt the wolves " + damageToMob + " damage. They are now down to " + wolvesHealth + " health!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
		} else if (enemyType === "spirit") {
	 	var damageToMob = damageFromPlayer - spiritDefense;
	 	if (damageToMob < 0) {
	 			damageToMob = 0;
	 			}
	 	console.log("spirit suffered damage: " + damageToMob);
	 	spiritHealth = spiritHealth - damageToMob;
	 	console.log("spirit health is now " + spiritHealth);
	 	 	if (spiritHealth <= 0) {
				alert("Spirit disintegrates... Nothing is left of it. There is nothing you can loot from it either.");
				spiritHealth = 25; // CRITICAL: resets robber's the original health value for future combats
				experienceToAdd = spiritExpBonus;
				addExperience();
 	 		} else {
	 	 	alert("You dealt the spirit " + damageToMob + " damage. It is now down to " + spiritHealth + " health!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
		} else if (enemyType === "dragon") {
	 	var damageToMob = damageFromPlayer - dragonDefense;
	 	if (damageToMob < 0) {
	 			damageToMob = 0;
	 			}
	 	console.log(damageToMob);
	 	dragonHealth = dragonHealth - damageToMob;
	 	 	if (dragonHealth < 1) {
				alert("The Great Red Dragon is slain! What an excellent victory");
				dragonHealth = 50; // CRITICAL: resets robber's the original health value for future combats
				lootEnemy();
 	 		} else {
	 	 	alert("You dealt the Dragon " + damageToMob + " damage. The beast is now down to " + dragonHealth + " health!");
	 	 	console.log("launch mob responds function");
	 	 	mobRespondsInMeleeCombat();
	 	 	}
	 	} 	
}



function mobRespondsInMeleeCombat() {
    $("#swordfight_3").get(0).play();
	if (enemyType === "robber") {
		var enemyRollResult = Math.floor((Math.random() * 10) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the robber");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
	else if (enemyType === "peasants") {
		var enemyRollResult = Math.floor((Math.random() * 10) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the peasants");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
	else if (enemyType === "robbers") {
		var enemyRollResult = Math.floor((Math.random() * 15) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the robbers");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
	else if (enemyType === "squirrels") {
		var enemyRollResult = Math.floor((Math.random() * 8) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the squirrels");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
	else if (enemyType === "wolves") {
		var enemyRollResult = Math.floor((Math.random() * 12) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the wolves");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
	else if (enemyType === "bear") {
		var enemyRollResult = Math.floor((Math.random() * 15) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the bear");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
	else if (enemyType === "spirit") {
		var enemyRollResult = Math.floor((Math.random() * 15) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the spirit");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
	else if (enemyType === "dragon") {
		var enemyRollResult = Math.floor((Math.random() * 20) + 1);
		console.log("enemy rolled " + enemyRollResult);
		var damageToPlayer = enemyRollResult - playerDefense;
		console.log("damage to player is " + damageToPlayer);
		if (damageToPlayer < 0) {
	 			damageToPlayer = 0;
	 			}
	 	playerHealth = playerHealth - damageToPlayer;
	 		
	 	 	if (playerHealth <= 0) {
				alert("You have been defeated. New game will start.");
	 			gameOver();
 	 		} else {
	 	 	alert("You suffered " + damageToPlayer + " damage from the Dragon");
			$('#healthCounter').html(playerHealth);
	 	 	console.log("Player survived mobs response and fights back");
	 	 	meleeCombat();
	 	 	}
	}
}




function playerShootArrow() {  // player shoots arrow, function determines if arrow hits the target
	var eventRollResult = Math.floor((Math.random() * 10) + 1); 
	console.log(eventRollResult);
	if (eventRollResult <= 2){  
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	console.log("run arrowDamage()");
	arrowDamage();
	} else if (eventRollResult <= 3 && playerLevel >= 1) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	} else if (eventRollResult <= 4 && playerLevel >= 2) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	}	else if (eventRollResult <= 5 && playerLevel >= 3) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	}	else if (eventRollResult <= 6 && playerLevel >= 4) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	}
	else if (eventRollResult <= 7 && playerLevel >= 5) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	}
	else if (eventRollResult <= 8 && playerLevel >= 6) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	}
	else if (eventRollResult <= 9 && playerLevel >= 7) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	}
	else { 
	console.log("miss!");
	 if (playerLuck > 0) {
	 console.log("player's luck kicks in");
	 playerShootBonusArrow();
	 }
		else {	
		alert("You need to practice more! It is a miss.");
		rangeCombat();
		console.log("range combat starts again!");
 		}
 	}
};


function playerShootBonusArrow() {  // this is a bonus roll if player's luck in > 0
	var eventRollResult = Math.floor((Math.random() * 10) + 1); 
	console.log("bonus roll is " + eventRollResult);
	if (eventRollResult === 1){
	console.log("bonus shot hit");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	console.log("run arrowDamage()");
	} else if (eventRollResult <= 2 && playerLuck > 1) {
	console.log("bonus shot hit");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	console.log("run arrowDamage()");
	} else if (eventRollResult <= 3 && playerLuck > 2) {
	console.log("Hit!");
	$("#arrow_hit_target").get(0).play();
	arrowDamage();
	console.log("run arrowDamage()");
	}
	else { 
	console.log("bonus shot missed!");
	alert("You need to practice more! It is a miss.");
	console.log("call from playerShotBonusArrow: range combat starts!");
	rangeCombat();
	}
};


function arrowDamage() {
	console.log(enemyType);
	console.log(arrowAttack);
	console.log(arrowDamageBonus);
	if (enemyType === "robber") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - robberArrowDefense;
		console.log(arrowDamage);
		robberHealth = robberHealth - arrowDamage;
		if (robberHealth <= 0) {
			alert("Robber is dead");
			robberHealth = 10; // CRITICAL: resets robber's the original health value for future combats
			console.log(robberHealth);
			lootEnemy();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + robberHealth);
			rangeCombat();
		}
	} else if (enemyType === "robbers") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - robbersArrowDefense;
		console.log(arrowDamage);
		robbersHealth = robbersHealth - arrowDamage;
		if (robbersHealth <= 0) {
			alert("Robbers are dead");
			robbersHealth = 30; // CRITICAL: resets robber's the original health value for future combats
			lootEnemy();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + robbersHealth);
			rangeCombat();
		}
	} else if (enemyType === "peasants") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - peasantsArrowDefense;
		peasantsHealth = peasantsHealth - arrowDamage;
		if (peasantsHealth <= 0) {
			$("#peasants_defeated").get(0).play();
			alert("Peasants are defeated and are running away leaving some dead bodies behind!");
			peasantsHealth = 15; // CRITICAL: resets robber's the original health value for future combats
			lootEnemy();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + peasantsHealth);
			rangeCombat();
		}
	} else if (enemyType === "squirrels") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - squirrelsArrowDefense;
		squirrelsHealth = squirrelsHealth - arrowDamage;
		if (squirrelsHealth <= 0) {
			alert("Squirrels are dead");
			squirrelsHealth = 15; // CRITICAL: resets robber's the original health value for future combats
			lootEnemy();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + squirrelsHealth);
			rangeCombat();
		}
	} else if (enemyType === "bear") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - bearArrowDefense;
		bearHealth = bearHealth - arrowDamage;
		if (bearHealth <= 0) {
			alert("Squirrels are dead");
			bearHealth = 35; // CRITICAL: resets robber's the original health value for future combats
			lootEnemy();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + bearHealth);
			rangeCombat();
		}
	} else if (enemyType === "wolves") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - wolvesArrowDefense;
		wolvesHealth = wolvesHealth - arrowDamage;
		if (wolvesHealth <= 0) {
			alert("Wolves are dead");
			wolvesHealth = 25; // CRITICAL: resets robber's the original health value for future combats
			lootEnemy();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + wolvesHealth);
			rangeCombat();
		}
	} else if (enemyType === "spirit") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - spiritArrowDefense;
		spiritHealth = spiritHealth - arrowDamage;
		if (spiritHealth <= 0) {
			alert("Spirit disintegrates... Unfortunately there is nothing to loot... ");
			spiritHealth = 50; // CRITICAL: resets robber's the original health value for future combats
			experienceToAdd = spiritExpBonus;
			addExperience();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + spiritHealth);
			rangeCombat();
		}
	} else if (enemyType === "dragon") {
		var arrowDamage = (arrowAttack + arrowDamageBonus) - dragonArrowDefense;
		dragonHealth = dragonHealth - arrowDamage;
		if (dragonHealth <= 0) {
			alert("Dragon is slain! What a glorious victory!");
			dragonHealth = 75; // CRITICAL: resets robber's the original health value for future combats
			lootEnemy();
		} else {
			alert("You dealt enemy " + arrowDamage + " damage!. Enemy health is down to " + dragonHealth);
			rangeCombat();
		}
	}
}



function exploreWizard() { // determine what player gets from wizard. POSSIBLY: the more level player has the higher could the roll be => bigger chance of getting some good value item
	var eventRollResult = Math.floor((Math.random() * 20) + 1);
	console.log(eventRollResult);
		if (eventRollResult === 1){  
			console.log("+10 gold");
			alert("The wizard gives you a small bag of gold. There are 10 coins in it"); 
			goldToAdd = 10;
			addGold();
		} else if (eventRollResult === 2){
			console.log("+2 arrows");
			alert("The wizard gives you 2 arrows and you can add them to your existing ones.");
			arrowsToAdd = 2;
			addArrows();
		} else if (eventRollResult === 3){ 
			console.log("+30 gold");
			alert("The wizard gives you a big bag of gold. There are 30 coins in it!");
			goldToAdd = 30;
			addGold();
		} else if (eventRollResult === 4){
			console.log("+10 experience");
			alert("The wizard gives you a book. You read it and gain 10 experience.");
			playerExperience = playerExperience + bookExperience;
			updateExperience();
		} else if (eventRollResult === 5){
			console.log("+10 experience");
			alert("The wizard gives you a book. You read it and gain 10 experience.");
			playerExperience = playerExperience + bookExperience;
			updateExperience();
		} else if (eventRollResult === 6){
			console.log("+20 experience");
			alert("The wizard gives you an old scroll. You read it and gain 20 experience!");
			playerExperience = playerExperience + scrollExperience;
			updateExperience();
		} else if (eventRollResult === 7){ 
			console.log("+1 arrow");
			alert("The wizard gives you an arrow. It is just an arrow but you can add it to your existing ones.");
			arrowsToAdd = 1;
			addArrows();
		} else if (eventRollResult === 8){ 
			console.log("result is 8");
			luckValueToAdd = 1;
			addBonusLuck();
		} else if (eventRollResult === 9){ 
			console.log("result is 9");
		} else if (eventRollResult === 10){
			console.log("result is 10");
		} else if (eventRollResult === 11){
			console.log("result is 12");
		} else if (eventRollResult === 13){ // 
			console.log("result is 13");        
		} else if (eventRollResult === 14){ // healing potion (small/medium/large health. Can be consumed or sold)
			console.log("result is 14");
		} else if (eventRollResult === 15){ // curse for 3 turns, luck decreases
			console.log("result is 14");  	
		} else if (eventRollResult === 16){ // enchant for 3 turns, luck increases
			console.log("result is 16");  	
		} else if (eventRollResult === 17){ // bow. Need inventory functionality for this! Item may give higher bonus??
			console.log("result is 17");  	
		} else if (eventRollResult === 18){ // +1 defense (Shield X). Need inventory functionality for this! Item may give higher bonus.
			console.log("result is 18");  	
		} else if (eventRollResult === 19){ // +1 attack (Sword X). Need inventory functionality for this! Item may give higher bonus.
			console.log("result is 19");  	
		} else if (eventRollResult === 20){ 
			console.log("result is 20");  	
		}
};

function addArrows() { 
		playerArrows = playerArrows + arrowsToAdd;
		$('#arrowsCounter').html(playerArrows);
		$('#arrowsIcon').html(playerArrows);
};		


function addExperience() { 
		playerExperience = playerExperience + experienceToAdd;
		updateExperience();
		if (playerExperience >= level1Req && playerLevel < 1) { 
		console.log("Welcome to LVL1!");
		levelUpSkill();
		console.log(playerLevel);
		} else if (playerExperience >= level2Req && playerLevel < 2) {
		console.log("Welcome to LVL2!");
		levelUpGold();
		console.log(playerLevel);
		} else if (playerExperience >= level3Req && playerLevel < 3) {
		console.log("Welcome to LVL3!");
		levelUpSkill();
		console.log(playerLevel);
		} else if (playerExperience >= level4Req && playerLevel < 4) {
		console.log("Welcome to LVL4!");
		levelUpGold();
		console.log(playerLevel);
		} else if (playerExperience >= level5Req && playerLevel < 5) {
		console.log("Welcome to LVL5!");
		levelUpSkill();
		console.log(playerLevel);
		} else if (playerExperience >= level6Req && playerLevel < 6) {
		console.log("Welcome to LVL6!");
		levelUpGold();
		console.log(playerLevel);
		} else if (playerExperience >= level7Req && playerLevel < 7) {
		console.log("Welcome to LVL7!");
		levelUpSkill();
		console.log(playerLevel);
		} else if (playerExperience >= level8Req && playerLevel < 8) {
		console.log("Welcome to LVL8!");
		levelUpGold();
		console.log(playerLevel);
		} else if (playerExperience >= level9Req && playerLevel < 9) {
		console.log("Welcome to LVL9!");
		levelUpSkill();
		console.log(playerLevel);
		} else if (playerExperience >= level10Req && playerLevel < 10) {
		console.log("Welcome to LVL10");
		levelUpGold();
		console.log(playerLevel);
		}	
};		


function levelUpSkill() {
		playerLevel = playerLevel + 1;
		$('#levelCounter').html(playerLevel);
		$("#levelup").get(0).play();
		var userChoice = prompt("Welcome to level " + playerLevel + "! You can upgrage your Defense or Attack. Type d to add +1 to your Defence or type a to add +1 to your Attack");
			console.log(userChoice); 
			if (userChoice === "d") {
			defenseValueToAdd = 1;
			console.log("adding Defense");
			addBonusDefense();
			} else if (userChoice === "a") {
			attackValueToAdd = 1;
			addBonusAttack();
	}
}

function levelUpGold() {
		playerLevel = playerLevel + 1;
		$('#levelCounter').html(playerLevel);
		$("#levelup").get(0).play();
		alert("You are rewarded with some gold!");
		goldToAdd = (playerLevel * 10)/2;
		addGold();
	}





function exploreItem() {
var eventRollResult = Math.floor((Math.random() * 10) + 1);
	console.log(eventRollResult);
		if (eventRollResult === 1){  
			alert("... an old rusty nail. What a misfortune."); 
		} else if (eventRollResult === 2){
			alert("... a broken arrow. This is of no use");
		} else if (eventRollResult === 3){ 
			alert("... a gold coin. Well, at least something");
			goldToAdd = 1;
			addGold();
		} else if (eventRollResult === 4){ 
			alert("... an arrow! You put it into your bag.");
			arrowsToAdd = 1;
			addArrows();
		} else if (eventRollResult === 5){ 
			alert("... an old manuscript telling how to fight. You feel that your attack is now stronger!");
			attackValueToAdd = 1;
			addBonusAttack();
		} else if (eventRollResult === 6){
			alert("... an old manuscript about how to defend in a combat. You now know more about defense.");
			defenseValueToAdd = 1;
			addBonusDefense();
		} else if (eventRollResult === 7){ 
			alert("... a golden trifold. It brings you luck!");
			luckValueToAdd = 1;
			addBonusLuck();
		} else if (eventRollResult === 8){  
			alert("... an unknown object. You do not know what it is"); // FINISH THIS - healing potion?
		} else if (eventRollResult === 9){ 
			alert("... an unknown object. You do not know what it is"); // FINISH THIS - holy water
		} else {
			alert("... an unknown object. You do not know what it is"); // FINISH THIS - 
		}
};

function addBonusAttack() { // add attack value from bonus events only, NOT weapon purchase!
	playerAttack = playerAttack + attackValueToAdd;
	if (playerAttack > maxAttackValue)  {
	 alert("Your attack value can be maximum " + maxAttackValue);
	 playerAttack = maxAttackValue;
	$('#attackCounter').html(playerAttack);	 
		}
	else {
	$('#attackCounter').html(playerAttack);
	}

};

function addBonusDefense() { // add defense value from bonus events only, NOT weapon purchase!
	playerDefense = playerDefense + defenseValueToAdd;
	if (playerDefense > maxDefenseValue)  {
	 alert("Your defense value can be maximum " + maxDefenseValue);
	 playerDefense = maxDefenseValue;
	$('#defenseCounter').html(playerDefense);	 
		}
	else {
	$('#defenseCounter').html(playerDefense);	 
	}

};


function addBonusLuck() {  // add luck value from bonus events only, NOT purchases.
	playerLuck = playerLuck + luckValueToAdd;
	if (playerLuck > maxLuckValue)  {
	 	alert("Your luck cannot be more than " + maxLuckValue);
	 	playerLuck = maxLuckValue;
	$('#luckCounter').html(playerLuck);	 
		}
	else {
	$('#luckCounter').html(playerLuck);	 
	}
}

function lootEnemy() {
	if (enemyType === "robber") {  
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
			if (eventRollResult === 1){  
				alert("you searched the body and found 1 gold coin"); 
				goldToAdd = 1;
				addGold();
				experienceToAdd = robberExpBonus;
				addExperience();
				} else if (eventRollResult === 2){
				alert("you searched the body and found 2 gold coins"); 
				goldToAdd = 2;
				addGold();
				experienceToAdd = robberExpBonus;
				addExperience();				
				} else {
				alert("you searched the body and found 3 gold coins"); 
				goldToAdd = 3;
				addGold();
				console.log("launching after addGold");
				experienceToAdd = robberExpBonus;
				console.log(experienceToAdd);
				addExperience();
				}
		} else if (enemyType === "peasants"){
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
			if (eventRollResult === 1){  
				alert("you searched the bodies and found 2 gold coins"); 
				goldToAdd = 2;
				addGold();
				experienceToAdd = peasantsExpBonus;
				addExperience();
				} else if (eventRollResult === 2){
				alert("you searched the bodies and found 3 gold coins"); 
				goldToAdd = 3;
				addGold();
				experienceToAdd = peasantsExpBonus;
				addExperience();
				} else {
				alert("you searched the bodies and found 5 gold coins"); 
				goldToAdd = 5;
				addGold();
				experienceToAdd = peasantsExpBonus;
				addExperience();
				}
		} else if (enemyType === "robbers"){
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
			if (eventRollResult === 1){  
				alert("you searched the bodies and found 3 gold coins"); 
				goldToAdd = 3;
				addGold();
				experienceToAdd = robbersExpBonus;
				addExperience();
				} else if (eventRollResult === 2){
				alert("you searched the bodies and found 6 gold coins"); 
				goldToAdd = 6;
				addGold();
				experienceToAdd = robbersExpBonus;
				addExperience();
				} else {
				alert("you searched the bodies and found 8 gold coins"); 
				goldToAdd = 8;
				addGold();
				experienceToAdd = robbersExpBonus;
				addExperience();
				}
		} else if (enemyType === "squirrels"){
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
				experienceToAdd = squirrelsExpBonus;
				addExperience();
		} else if (enemyType === "bear"){
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
				experienceToAdd = bearExpBonus;
				addExperience();
		} else if (enemyType === "wolves"){
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
				experienceToAdd = wolvesExpBonus;
				addExperience();
		} else if (enemyType === "spirit"){
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
				experienceToAdd = spiritExpBonus;
				addExperience();
		} else if (enemyType === "dragon"){
			var eventRollResult = Math.floor((Math.random() * 3) + 1);
			if (eventRollResult === 1){  
				alert("you searched the body and found 10 gold coins"); 
				goldToAdd = 10;
				addGold();
				experienceToAdd = dragonExpBonus;
				addExperience();
				} else if (eventRollResult === 2){
				alert("you searched the body and found 15 gold coins"); 
				goldToAdd = 15;
				addGold();
				experienceToAdd = dragonExpBonus;
				addExperience();
				} else {
				alert("you searched the body and found 20 gold coins"); 
				goldToAdd = 20;
				addGold();
				experienceToAdd = dragonExpBonus;
				addExperience();
				}
		}
}



