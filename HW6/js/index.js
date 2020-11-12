
// File: https://pronak657.github.io/GUI/HW6/hw6.html
// COMP 4610 Assignment 6: Creating an Interactive Dynamic Table

// Ronak Patel, UMass Lowell Computer Science, Ronak_Patel@student.uml.edu
// Copyright (c) 2020 by Ronak Patel. All rights reserved. May be
// freely copied or excerpted for educational purposes with credit to the author.
// Created on November 8th, 2020 at 5:00 PM

$().ready(function() {
    $("form[name='myForm']").validate({
      // validation rules
      rules: {
        hstart: "required",
        hend: "required",
        vstart: "required",
        vend: "required"
      },

      // validation error messages
      messages: {
        hstart: {
            required: "Please enter horizontal start value between -100 to 100",
            min: "Number entered is too small.<br/>Please enter a number greater than or equal to -100",
            max: "Number entered is too large.<br/>Please enter a number less than or equal to 100",
        },
        hend: {
            required: "Please enter horizontal start value between -100 to 100",
            min: "Number entered is too small.<br/>Please enter a number greater than or equal to -100",
            max: "Number entered is too large.<br/>Please enter a number less than or equal to 100",
        },
        vstart: {
            required: "Please enter horizontal start value between -100 to 100",
            min: "Number entered is too small.<br/>Please enter a number greater than or equal to -100",
            max: "Number entered is too large.<br/>Please enter a number less than or equal to 100",
        },
        vend: {
            required: "Please enter horizontal start value between -100 to 100",
            min: "Number entered is too small.<br/>Please enter a number greater than or equal to -100",
            max: "Number entered is too large.<br/>Please enter a number less than or equal to 100",
        },
      },
      submitHandler: function(form) {
        generateTable();
        return false;
      }
    });
});

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
    return 0;
}