var address = 'http://youth-songs.ru:8780/rest/';
var find_url = address + 'find/';
var party_url = address + 'party/nameParty';
var min_size_font = 13;
var cur_size_font = min_size_font;
var max_size_font = 53;
var delta_size_font = 5;
var current_number_song = 0;
var list_song_name;
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
		list_song_name = [];
		for(var k in data) 
		{
			list_song_name.push(data[k]['number']);
			createSlise(data[k]['number'], data[k]['description'], list);	 
		}
    });
}

function createSlise(number, description, list) 
{
	var	newlink = document.createElement('a');
	newlink.setAttribute('class', 'list-group-item');
	newlink.onclick = jumpToSong;
	newlink.innerText = number + '. ' + description;
	newlink.setAttribute('id', number);
	list.appendChild(newlink)
}

function find() 
{
	findRest(find_url + document.getElementById("finder").value);
}

function hideMenu() 
{	
	document.getElementById("menu").style.display='none';
	document.getElementsByClassName("group")[0].style.display='none';
	document.getElementById("menu2").style.display='block';
}

function showMenu() 
{	
	document.getElementById("menu").style.display='block';
	document.getElementsByClassName("group")[0].style.display='block';
	document.getElementById("menu2").style.display='none';
	window.location.href = '#' + current_number_song;
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
    return text.replaceAll('^([0-9]+)', '<b>$1</b>').replaceAll('(//[^]+//)', '<i>$1</i>').replaceAll('\n', '<br>').replaceAll('(Припев:*)', '<b>$1</b>');
}

function jumpToSong() 
{
	loadSong(this.getAttribute('id'));
};

function loadSong(number)
{
	$.get(address + 'number/' + number, 
		function(data, status)
		{
			current_number_song = data['number'];
			document.getElementById("textSong").innerHTML = transformTextToHTML(current_number_song +'. ' + data['text']);
			hideMenu();
		});
}

function nextSong()
{
	var id = list_song_name.indexOf(current_number_song) + 1;
	loadSong(list_song_name[id == list_song_name.length ? id - 1: id]);
}
function downSong()
{
	var id = list_song_name.indexOf(current_number_song) - 1;
	loadSong(list_song_name[id == -1 ? 0 : id]);
}

	