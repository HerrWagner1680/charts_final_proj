//BIG CHALLENGE FILLED WITH ERRORS DOCUMENT
https://docs.google.com/spreadsheets/d/1VARVG6QDRJlYHPTEWo9FH-cDOw4d0GdFXGQVhtRG7J8/pubhtml?gid=0&single=true


document.getElementsByClassName('k')
document.getElementsByClassName('s')
$('pre').innerHTML.split('"cols":[');
ttt = $('pre').innerHTML
arr = arr.concat(ttt)
arr.toString().split('cols');
arr = arr.toString().split('{');

//use hasOwnProperty to test for key value
arr.indexOf('"v":"Mexico"},'); // will tell you the index
arr.toString().search('Mexico');

response.getDataTable()
aq.If[0].label // column a name
aq.If[1].label // column b name

aq.Lf[0].c[0].v // column a, row 1 value
aq.Lf[0].c[1].v // column b, row 1 value ... note f is string number with commas



in regards to JSON-P LINKS:
json.table     // gives you object with cols and rows
json.table.cols
json.table.rows

json.table.cols[0].label // covers name of first column
//is UNDEFINED if go too far

json.table.rows[0].c[3] //will show NULL if row value is null
json.table.rows[0].c[2].v // can give value
json.table.rows[0].c[3].v //THIS CAN THROW AN ERROR .. try without v first


document.getElementById('0R8').nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
last one to give you an answer...so you know 7 siblings
after that returns null
a way to use html link to confirm number of columns
place a .innerHTML on end to get value
if blank, then .innerHTML = ""
still null if it goes too far.

starts with document.getElementById('0R0').nextSibling

that row holds the column names

COLUMN NAME --COLUMN 1
document.getElementById('0R0').nextSibling.innerHTML

COLUMN 2
document.getElementById('0R0').nextSibling.nextSibling.innerHTML

keep adding.nextSibling for each column 
if equals null, break






var max_num_rows = 25;

for (r = 0; r < max_num_rows; r++) {

		var max_num_cols = 10

		var the_id = '0R' + r.toString();

		var getID = document.getElementById(the_id);

		if (getID === null){ 
			console.log("Max number of rows: " + (r-1) + " OR " + r + " if you count the column headings." ); 
			break; 
		}

			for (c = 0; c < max_num_cols; c++) {

				getID = getID.nextSibling

				if (getID === null){
					console.log("getID is null - line 39")
					console.log("Total of " + c + "columns. No more.")
					break;
				} else {
					sibb = getID.innerHTML
					console.log("c = " + c + " r = " + r + " getID HTML is: " + sibb);
				}

				//document.getElementById('0R0').nextSibling.innerHTML

			};


};

		// sibb = sibb.nextSibling
		// console.log("r = " + r + " getID HTML is: " + sibb.innerHTML);





//SAMPLE SPREADSHEET URL FOR JSON

//  http://spreadsheets.google.com/feeds/list/
// {KEY}
//   /od6//public/values?alt=json

//FUNCTIONING VERSION:
https://spreadsheets.google.com/feeds/list/15tPYmvsQvHmSdyPp-wzw92lQZdhoM9QGJ-zR-2_k5PA/od6/public/values?alt=json


//NON-functioning version:
https://docs.google.com/spreadsheets/d/15tPYmvsQvHmSdyPp-wzw92lQZdhoM9QGJ-zR-2_k5PA/pubhtml

http://spreadsheets.google.com/feeds/list/15tPYmvsQvHmSdyPp-wzw92lQZdhoM9QGJ-zR-2_k5PA/od6/public/values

15tPYmvsQvHmSdyPp-wzw92lQZdhoM9QGJ-zR-2_k5PA

var num_of_rows = json.feed.entry.length
var column_array = [];
var col_keys = Object.keys(json.feed.entry[0]).slice(6,50); //finds the gsx$ column titles
//col in a way is ROW ZERO

	for (r = 0; r < num_of_rows; r++) {

		for (c = 0; c < col_keys.length; c++) {

			if (json.feed.entry[r][col_keys[c]] === undefined){
				console.log("undef line 29")
				break;
			} else {

			var new_col = json.feed.entry[r][col_keys[c]]["$t"];
			column_array.push(new_col);
			//console.log(column_array);
			}

		};

	};

console.log("columnarray outside the for loop: " + column_array);
// EXTRACTING DATA FROM NEW JSON

var num_of_rows = json.feed.entry.length // number of rows
Object.keys(json.feed.entry).length // number of rows (ignoring column name that would add one)

var col_keys = Object.keys(json.feed.entry[0]).slice(6,50); //finds the gsx$ column titles
//col in a way is ROW ZERO
var col_names = col_keys
col_names.length // tells you the number of columns
col_names[0].substr(4); //removes the gsx$

var col_names[0] = col_names[0].substr(4);
var col_names[1] = col_names[1].substr(4);

var num_of_cols = col_names.length

if (col[2] === undefined) {console.log("undef");}; // shows no more columns


json.feed.entry[0].content["$t"]  // lists content of col two onward for row one
// if length is 4 then last entry is .entry[3]


//json.feed.entry[0].gsx$colone["$t"]    //shows value first row, first column 

ttt = Object.keys(json.feed.entry[0]).slice(6,50);

json.feed.entry[0][ttt[0]]["$t"]

if (json.feed.entry[4] === undefined) {console.log("undef");}; // notes if ROWS out of data
if (json.feed.entry[0][ttt[2]] === undefined) {console.log("undef");}; // notes if COLUMNS out of data

