// File: https://pronak657.github.io/GUI/HW8/hw8.html
// COMP 4610 Assignment 8: Implementing a Bit of Scrabble with Drag-and-Drop

//  Ronak Patel, UMass Lowell Computer Science, Ronak_Patel@student.uml.edu
//  Copyright (c) 2020 by Ronak Patel. All rights reserved. May be
//  freely copied or excerpted for educational purposes with credit to the author.
//  Created on November 29th, 2020 at 5:00 PM
 
$( document ).ready(function() {
	setUp();
});

CardsOnDeck = 0;
CLetters = [];
TotalTiles = 100;
tileNum = 0;
// Function to set up the initial start of the game
function setUp() {
	setUpBoard();
	displayRemainingTiles(7);
	CLetters = chooseLetters();
}

// Function to remove letters from CLetter array
// when the tile gets moved to the board
function removeItemOnce(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
	  arr.splice(index, 1);
	}
}

// Function to handle the drop of a tile on the 
// board. Center the tile, update the score,
// update drag and drop properties and update CLetter array
function dropEvent( event, ui ) {
	var draggable = ui.draggable;
	tileLetter = draggable.prop('currentSrc').split("/")
	letter = tileLetter[tileLetter.length - 1][14]
	//console.log($(draggable).prop('currentSrc').includes("Tile_Blank"));
	//console.log( 'ID "' + draggable.attr('id') + '" was dropped board' );
	var $this = $(this);

	if(draggable.prop('currentSrc').includes("Blank"))
	{
		letter = "_"
	}
    ui.draggable.position({
		my: "center",
		at: "center",
		of: $this,
		using: function(pos) {
			$(this).animate(pos, 200, "linear");
		}
	});

	document.getElementById("nextWord").disabled = false;
	CardsOnDeck--;
	
	removeItemOnce(CLetters, letter);
	$('.containmentWrapper .container img').droppable('disable');
	
	
	console.log(letter);
	$("#" + draggable.attr('id')).draggable('disable');
	
	nextTile = 'SB' + (parseInt($(event.target).attr('id')[2]) + 1)
	$('#' + nextTile).droppable('enable');
	displayWord(letter);
	displayScore(letter, $(event.target).prop('currentSrc').includes("Double_Letter_Score"));
	//console.log($(event.target).prop('currentSrc').includes("Double_Score"));

	if(letter == "_")
	{
		blankTileDialog(draggable, event, ui, $(this))
	}
}

// Function to display pop-up with all letters when the blank tile
// is dropped on the board
function blankTileDialog(blankTile, event, ui, $this) {
	console.log("Blank Tile dropped");
	var tileSelectorDialog = $("<div id='blankTileDialog'></div>");
	var letter, choosnTile;
	for (letter in ScrabbleTiles) {
		if (letter != "_") {
			
			var image_name = "Scrabble_Tile_";
			
			tileLocation = "graphics_data/Scrabble_Tiles/" + image_name + letter + ".jpg";
			
			choosnTile = $("<img src='" + tileLocation + "' class='dialogBoxTile' id='tile" + letter + "'>");
	
			choosnTile.click(function() {
				//tileLetter = ui.draggable.prop('currentSrc').split("/")
				var newLetter = $(this).attr("id")[4]
				newTileLocation = "graphics_data/Scrabble_Tiles/" + image_name + newLetter + ".jpg";
				blankTile.attr("id", "tile" + tileNum);
				blankTile.attr("src", newTileLocation);
				tileNum++;
				// Close the pop-up and update the word and score accordingly
				tileSelectorDialog.dialog("close");
				var w = $("#word").html();
				var word = w.replace("_", newLetter);
				$("#word").html(word);
				displayScore(newLetter, $(event.target).prop('currentSrc').includes("Double_Letter_Score"));
			});
		tileSelectorDialog.append(choosnTile);
		
	  	}
	}
	tileSelectorDialog.dialog({ title: "Selcet a letter", modal: true, draggable: false, resizable: false, width: 500 });
}

// Function to set up the board and make it
// droppable
function setUpBoard() {
	
	emptyName = "SB"

	for(i = 1; i <= 7; i++)
	{
		s = emptyName + i;
		$("#" + s).droppable( 
			{
				drop: dropEvent,
				classes: {
					"ui-droppable-active": "ui-state-active",
					"ui-droppable-hover": "ui-state-hover"
				},
			}
		);
	}
	$('.containmentWrapper .container img').droppable('disable');
	$("#SB1").droppable('enable');	
}

// Function to choose random letters from the database
function chooseLetters(numOfCardNeeded) {
	numOfCardNeeded = numOfCardNeeded || 7;
	$("#tiles").append("<div id='currentSet'></div>");
	for(i = 0; i < numOfCardNeeded; i++)
	{
		randomNum = Math.floor(Math.random() * 27);
		if(randomNum != 26)
		{
			var c = String.fromCharCode(65 + randomNum);
			
			if(ScrabbleTiles[c]["number-remaining"] != 0)
			{
				CLetters.push(c);
				displayTile(c);
				--ScrabbleTiles[c]["number-remaining"];
			}
			else
			{
				i--;
			}
			
		}
		else 
		{
			if(ScrabbleTiles['_']["number-remaining"] != 0)
			{
				CLetters.push('_');
				displayTile('_');
				--ScrabbleTiles['_']["number-remaining"];
			}
			else
			{
				i--;
			}
			
		}
	}
	CLetters.sort();
	//console.log(currentTiles);
	return CLetters;
}

// Function to take the letter generated by randomeLetters()
// and show those as a draggable tiles
function displayTile(randomLetter) {
	var image_name = "Scrabble_Tile_";
	tileId = "tile" + tileNum;
	tileLocation = "graphics_data/Scrabble_Tiles/" + image_name + randomLetter + ".jpg";

	if(randomLetter == '_')
	{
		tileLocation = "graphics_data/Scrabble_Tiles/" + image_name + "Blank.jpg"

	}
	tile = $("<img class='tileOnHolder' id='" +  tileId +  "' src='" + tileLocation+ "' >")
	tile.draggable(
		{
			revert: 'invalid',
			scroll: false,
		}
	);
	$("#currentSet").append(tile);
	CardsOnDeck++;
	tileNum++;
}

// This function executes when user clicks New Word button
// Function only draws the tiles needed to bring total number of
// tiles on holder to 7
function newLetters() {
	$('#SB1').droppable('enable');
	$("#currentSet").remove();
	//console.log(CLetters.length);
	//console.log(CLetters);
	//$("#tiles").append("<div id='currentSet'></div>");

	n = CardsOnDeck;
	cl = CLetters;
	CardsOnDeck = 0;
	CLetters = [];

	if( parseInt($("#remainingTiles").html()) >= (7-n))
	{
		if(n < 7)
		{
			chooseLetters(7 - n);
		}
		else
		{
			$("#tiles").append("<div id='currentSet'></div>");
		}
		for(i = 0; i < cl.length; i++)
		{
			displayTile(cl[i]);
			CLetters.push(cl[i]);
		}
		$("#word").html("");
		document.getElementById("nextWord").disabled = true;
		displayRemainingTiles(7-n);
	}
	else
	{
		alert("Not enough Tiles Left. Reseting the game.");
		resetScore()
	}
}

// Function to update the word created so far
function displayWord(tile) {
	word = $("#word").html() + tile;
	$("#word").html(word);
}

// Function to display the total score of the current game
function displayScore(tile, doubleScore) {
	value = parseInt(ScrabbleTiles[tile]['value']);
	if(doubleScore) value = value * 2;
	score = parseInt($("#score").html()) + value;
	$("#score").html(score);
}

// Function to show the remaining tiles in the dataset
function displayRemainingTiles(num) {
	CurNum = parseInt($("#remainingTiles").html())
	$("#remainingTiles").html(CurNum - num);
}

// Function to reset the game and start again
function resetScore() {
	//score = parseInt($("#score").html());
	var currentScore = parseInt($("#score").html())
	if(currentScore > parseInt($("#highestScore").html()))
	{
		$("#highestScore").html(currentScore);
	}

	$("#score").html('0');
	$("#word").html('');
	$("#remainingTiles").html("100")
	$('.containmentWrapper .container img').droppable('enable');
	$("#currentSet").remove();
	document.getElementById("nextWord").disabled = true;
	CardsOnDeck = 0;
	CLetters = [];
	tileNum = 0;
	resetTileData();
	setUp()

}

// Function to reset the Tile dataset back to default
function resetTileData() {
	for (var key in ScrabbleTiles) {
		if (ScrabbleTiles.hasOwnProperty(key)) {
			ScrabbleTiles[key]["number-remaining"] = ScrabbleTiles[key]["original-distribution"];
		}
	}
}

/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;