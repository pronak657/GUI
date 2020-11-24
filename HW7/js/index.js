// File: https://pronak657.github.io/GUI/HW6/hw7.html
// COMP 4610 Assignment 7: Using the jQuery UI Slider and Tab Widgets

//  Ronak Patel, UMass Lowell Computer Science, Ronak_Patel@student.uml.edu
//  Copyright (c) 2020 by Ronak Patel. All rights reserved. May be
//  freely copied or excerpted for educational purposes with credit to the author.
//  Created on November 16th, 2020 at 5:00 PM

var numTabs = 1;

$( document ).ready(function() {
	slider();
	validateForm();
	removeTab();
});

// call the addTab function when the save button is clicked
$("#save").click(function() {
    addTab($(this));
});

// This function takes current table content and
// creates another tab with the same table content
function addTab(link) {
	
	var hstart = parseInt(document.forms["myForm"]["hstart"].value);
	var hend = parseInt(document.forms["myForm"]["hend"].value);
	var vstart = parseInt(document.forms["myForm"]["vstart"].value);
	var vend = parseInt(document.forms["myForm"]["vend"].value);

	hmin = Math.min(hstart, hend);
	hmax = Math.max(hstart, hend);

	vmin = Math.min(vstart, vend);
	vmax = Math.max(vstart, vend);

	var tabName = '[' + hmin + 'X' + hmax + '] x [' + vmin + 'X' + vmax + ']'
	var hrefName = "'#tab-" + numTabs + "'";
	var idName = "'tab-" + numTabs + "'";

	tabContent = $("#MultiTable").html() ;
	//console.log(tabContent)
	var tabs = $( "#tabs" ).tabs();
	var ul = tabs.find( "ul" );

	// add the appropriate html content for the tabs
	document.getElementById("tabUl").innerHTML += "<li><a href=" + hrefName + ">" + tabName + "</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span><input type='checkbox' class='tabCheckBox'></li>";	
	document.getElementById("tabWrapper").innerHTML += "<div class='table' id=" + idName + ">" + tabContent + "</div>";
	$("#tabs").tabs("refresh");
	numTabs++;
}

// This funcntion listens for click event when the
// close icon is clicked and removes the tab
function removeTab() {
	$("#tabs").on("click", "span.ui-icon-close", function () {
		var divId = $(this).closest("li").remove().attr("aria-controls");
		$("#" + divId).remove();
		$("#tabs").tabs("refresh");
	});
}

// This function takes all the selected tabs
// and deletes all of them
function deleteSelectedTabs() {
	$("#tabs ul li").each(function() { 
		var divId = $(this).attr("aria-controls");
		//console.log(divId);
		console.log($(this).attr("tabCheckBox"));

		//ignore the tab with MultiTable id since that's the
		// current tab
		if(divId == ("MultiTable")) {}
	  	else if ($(this).find('input').prop("checked")) {
			$(this).remove()
			$("#" + divId).remove();
			$("#tabs").tabs("refresh");
		}
	});
	$("a[href='#MultiTable']").click();
}

// This function deletes all tab all together
function deleteAllTabs() {
	$("#tabs ul li").each(function() { 
		var divId = $(this).attr("aria-controls");
		//console.log(divId);
		console.log($(this).attr("tabCheckBox"));
		if(divId == ("MultiTable")) {}
	  	else {
			$(this).remove()
			$("#" + divId).remove();
			$("#tabs").tabs("refresh");
		}
	});
	$("a[href='#MultiTable']").click();
}

function submitForm() {
	if( $("form[name='myForm']").valid() == true ) {
	  $("form[name='myForm']").submit();
	}
}

// This function listens for slider change event
// and then updates the text box and table accordingly
function slider() {
	$( "#tabs" ).tabs();

	// update text field based on slider value
	$("#hstart-slider").slider(
	{
		min:-60,
		max:60,
		value: 0,
		slide: function(event, ui) {
			//var v = $("#hstart-slider").slider("value");
			$('input[name=hstart]').val(ui.value);
			submitForm();
		}
	});

	// update slider based on text value
	$("#hstart").keyup(function() {
		$("#hstart-slider").slider("value", $(this).val());
		submitForm();
	});

	$("#hend-slider").slider(
	{
		min:-60,
		max:60,
		value: 0,
		slide: function(event, ui) {
			//var v = $("#hstart-slider").slider("value");
			$('input[name=hend]').val(ui.value);
			submitForm();
		}
	});
	
	$("#hend").keyup(function() {
		$("#hend-slider").slider("value", $(this).val());
		submitForm();
	});

	$("#vstart-slider").slider(
		{
			min:-60,
			max:60,
			value: 0,
			slide: function(event, ui) {
				//var v = $("#hstart-slider").slider("value");
				$('input[name=vstart]').val(ui.value);
				submitForm();
			}
		});

	$("#vstart").keyup(function() {
		$("#vstart-slider").slider("value", $(this).val());
		submitForm();
	});

	$("#vend-slider").slider(
		{
			min:-60,
			max:60,
			value: 0,
			slide: function(event, ui) {
				//var v = $("#hstart-slider").slider("value");
				$('input[name=vend]').val(ui.value);
				submitForm();
			}
		});

	$("#vend").keyup(function() {
		$("#vend-slider").slider("value", $(this).val());
		submitForm();
	});
}

// This function is to validate the form and show
// appropriate errors accordingly 
function validateForm() {

	$("form[name='myForm']").validate({
	  // validation rules
	  rules: {
		hstart: "required",
		hend: "required",
		vstart: "required",
		vend: "required"
	},

	  // validation error messagesa
	messages: {
		hstart: {
			required: "Please enter horizontal start value between -60 to 60",
			min: "Number entered is too small.<br/>Please enter a number greater than or equal to -60",
			max: "Number entered is too large.<br/>Please enter a number less than or equal to 60",
		},
		hend: {
			required: "Please enter horizontal end value between -60 to 60",
			min: "Number entered is too small.<br/>Please enter a number greater than or equal to -60",
			max: "Number entered is too large.<br/>Please enter a number less than or equal to 60",
		},
		vstart: {
			required: "Please enter vertical start value between -60 to 60",
			min: "Number entered is too small.<br/>Please enter a number greater than or equal to -60",
			max: "Number entered is too large.<br/>Please enter a number less than or equal to 60",
		},
		vend: {
			required: "Please enter vertical end value between -60 to 60",
			min: "Number entered is too small.<br/>Please enter a number greater than or equal to -60",
			max: "Number entered is too large.<br/>Please enter a number less than or equal to 60",
		},
	  },
	submitHandler: function(form) {
		generateTable();
		return false;
	},
	
	onkeyup:function(form) {
		submitForm();
	},
	
	});
};

//This funciton generates and fills up the table based on user input
// using createElement functions to generate table with table, tbody,
// tr and td tags
function generateTable()
{
	var hstart = parseInt(document.forms["myForm"]["hstart"].value);
	var hend = parseInt(document.forms["myForm"]["hend"].value);
	var vstart = parseInt(document.forms["myForm"]["vstart"].value);
	var vend = parseInt(document.forms["myForm"]["vend"].value);

	hmin = Math.min(hstart, hend);
	hmax = Math.max(hstart, hend);

	vmin = Math.min(vstart, vend);
	vmax = Math.max(vstart, vend);

	var myTableDiv = document.getElementById("MultiTable");
	if(myTableDiv.childNodes.length != 0)
	{
		myTableDiv.innerHTML = '';
	}

	var table = document.createElement('TABLE');
	table.border = '1';
	var tableBody = document.createElement('TBODY');
	table.appendChild(tableBody);

	// This for loop is to generate just the top row
	for (var i = 0; i < 1; i++)
	{
		var tr = document.createElement('TR');
		tableBody.appendChild(tr);

		var td = document.createElement('TD');
		td.width = '75';
		td.appendChild(document.createTextNode(""));
		tr.appendChild(td);
		for (var j = hmin; j <= hmax; j++)
		{
			var td = document.createElement('TD');
			td.width = '75';
			td.appendChild(document.createTextNode(j));
			tr.appendChild(td);
		}
	}

	// Here we generate all the columns and fill up the cells
	for (var i = vmin; i <= vmax; i++)
	{
		var tr = document.createElement('TR');
		tableBody.appendChild(tr);

		var td = document.createElement('TD');
		td.width = '75';
		td.appendChild(document.createTextNode(i));
		tr.appendChild(td);
		for (var j = hmin; j <= hmax; j++)
		{
			var td = document.createElement('TD');
			td.width = '75';
			td.appendChild(document.createTextNode((i*j)));
			tr.appendChild(td);
		}
	}
	myTableDiv.appendChild(table);
	$("a[href='#MultiTable']").click();
	return 0;
}