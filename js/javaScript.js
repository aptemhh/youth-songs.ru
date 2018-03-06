var address = 'http://youth-songs.ru:8780/rest/';
var find_url = address + 'find/';
var min_size_font = 13;
var cur_size_font = min_size_font;
var max_size_font = 53;
var delta_size_font = 5;
init();


function init() 
{
	findRest(find_url);
	showMenu();
    document.getElementById("textSong").style.fontSize = cur_size_font+'px';
    $("#finder").keyup(function(event) {
    if (event.keyCode === 13) {
        find();
    }
});
}

function findRest(url)
{
	$.get(url, function(data, status)
	{
		var list = document.getElementById("list");
		list.innerHTML = '';
		for(var k in data) 
		{
			createSlise( data[k]['number'], data[k]['description'], list);	 
		}
    });
}

function createSlise(number, description, list) 
{
	var	newlink = document.createElement('a');
	newlink.setAttribute('class', 'list-group-item');
	newlink.onclick = function() 
	{
		$.get(address+'number/'+number, function(data, status)
		{
			document.getElementById("textSong").innerHTML = transformTextToHTML(data['number'] +'. ' + data['text']);
			hideMenu();
		});
	};
	newlink.innerText = number + '. ' + description;
	list.appendChild(newlink)
}

function find() 
{
	findRest(find_url + document.getElementById("finder").value);
}

function hideMenu() 
{	
	document.getElementById("menu").style.display='none';
	document.getElementById("menu2").style.display='block';
}

function showMenu() 
{	
	document.getElementById("menu").style.display='block';
	document.getElementById("menu2").style.display='none';
}
function upSizeFont() 
{	
	if(cur_size_font < max_size_font)
		cur_size_font += delta_size_font;
	document.getElementById("textSong").style.fontSize = cur_size_font + 'px';
}
function lowSizeFont() 
{	
	if(cur_size_font > min_size_font)
		cur_size_font -= delta_size_font;
	document.getElementById("textSong").style.fontSize = cur_size_font + 'px';
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'gi'), replacement);
};

function transformTextToHTML(text)
{
    return text.replaceAll('(//[^]+//)', '<i>$1</i>').replaceAll('\n', '<br>').replaceAll('(Припев:*)', '<b>$1</b>');
}