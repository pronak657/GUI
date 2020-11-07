// ADD NEW ITEM TO END OF LIST
var list = document.getElementById('page').getElementsByTagName('UL')[0]
console.log(list);

var lastItem = document.createElement('LI');
var text = document.createTextNode("cream");
lastItem.appendChild(text);
list.appendChild(lastItem);

// ADD NEW ITEM START OF LIST
var firstItem = document.createElement('LI');
var text = document.createTextNode("kale");
firstItem.appendChild(text);
list.prepend(firstItem);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var x = list.querySelectorAll('LI');
for(i = 0; i < x.length; i++)
{
    x[i].className = 'cool';
}
// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var numItem = document.getElementById('page').getElementsByTagName('H2')[0];
numItem.innerText += ": " + list.querySelectorAll('LI').length + " ITEMS";