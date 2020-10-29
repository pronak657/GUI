
// File: https://pronak657.github.io/GUI/HW5/hw5.html
// COMP 4610 Assignment 5: Creating an Interactive Dynamic Table

// Ronak Patel, UMass Lowell Computer Science, Ronak_Patel@student.uml.edu
// Copyright (c) 2020 by Ronak Patel. All rights reserved. May be
// freely copied or excerpted for educational purposes with credit to the author.
// Created on October 22nd, 2020 at 5:00 PM

// This function is used to validate the user input
function validateForm() {
    var hstart = document.forms["myForm"]["hstart"].value;
    var hend = document.forms["myForm"]["hend"].value;
    var vstart = document.forms["myForm"]["vstart"].value;
    var vend = document.forms["myForm"]["vend"].value;
    
    console.log(parseInt(hstart));
    if (hstart == null || hstart == "" || hend == null || hend == "" || vstart == null || vstart == "" || vend == null || vend == "") 
    {
        document.getElementById("MultiTable").innerHTML = "";
        document.getElementById("MultiTable").innerHTML = "<p class=\"container\"> Please fill out all the values. <p>"
        return false;
    }
    if (hstart.includes("e") || hend.includes("e") || vstart.includes("e") || vend.includes("e")) 
    {
        document.getElementById("MultiTable").innerHTML = "";
        document.getElementById("MultiTable").innerHTML = "<p class=\"container\"> Please only use integers without e <p>"
        return false;
    }
    else
    {
        generateTable()
        return false;
    }
}

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

    // console.log(hmin);
    // console.log(hmax);
    // console.log(vmin);
    // console.log(vmax);
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