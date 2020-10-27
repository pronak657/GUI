//https://stackoverflow.com/questions/14643617/create-table-using-javascript
//https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
function validateForm() {
    var hstart = document.forms["myForm"]["hstart"].value;
    var hend = document.forms["myForm"]["hend"].value;
    var vstart = document.forms["myForm"]["vstart"].value;
    var vend = document.forms["myForm"]["vend"].value;
    
    if (hstart == null || hstart == "" || hend == null || hend == "", vstart == null || vstart == "" || vend == null || vend == "") 
    {
        document.getElementById("MultiTable").innerHTML = "";
        document.getElementById("MultiTable").innerHTML = "<p class=\"container\"> Please fill out all the values. <p>"
        return false;
    }
    else
    {
        generateTable()
        return false;
    }
}

function generateTable()
{
    var hstart = document.forms["myForm"]["hstart"].value;
    var hend = document.forms["myForm"]["hend"].value;
    var vstart = document.forms["myForm"]["vstart"].value;
    var vend = document.forms["myForm"]["vend"].value;
    //console.log(hstart)
    // hdiff = Math.abs(hend - hstart);
    // vdiff = Math.abs(vend - vstart);
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
        //console.log(myTableDiv.outerHTML)
        myTableDiv.innerHTML = '';
    }

    var table = document.createElement('TABLE');
    table.border = '1';
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

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
    //console.log('complete')
    myTableDiv.appendChild(table);
    return 0;
}