//find_option_code.js passes information to exportCode function

// function exportCode (data, chartType, check, optionData, min_a, max_a, min_b, max_b, bigArrayForExport) {

// 	// console.log("check " + check + "   optionData " + optionData)

// 	var column = data.Pf
// 	var row = data.Nf;

//         var last_row = parseInt($('#real-data tr:last-of-type').attr('id').split('_')[1]);
//         var last_col = $('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
//         var last_col_int = last_col.charCodeAt(0);
//         var next_col_int = last_col_int + 1;
//         var next_col = String.fromCharCode(next_col_int);
//         var next_row = last_row + 1;
//         var col_a_int = 97;

//         //pull from URL datatype string or number for first column
//         // $("#dataType_col_a").val(data.Pf[0].type)
//         var dataType_col_a = column[0].type;
//         // console.log("EXPORT CODE dataType_col_a "+ dataType_col_a)

//         //assign rest of column types as number
// 		var column_num = 0
// 			while(col_a_int +1 <= last_col_int){
// 				var col_letter = String.fromCharCode(col_a_int);
// 				$("#real-data #data_types #dataType_col_" + col_letter).attr("value", "number");
// 				col_a_int++;
// 				column_num++;
// 			};

// 		var row = data.Nf;
// 		var column = data.Pf
// 		//resetting variables
// 		var column_num = 0
// 		var col_a_int = 97;
// 		//ASSIGN column label names


// 			labelArray = [];
//             //NOTE - COLUMN NAME USED TO READ
//             //    $("#col_a_label").attr("value", data.Pf[0].label) // column name
//             while(col_a_int <= last_col_int){
//                 var col_letter = String.fromCharCode(col_a_int);
//                 var label_id = $("#real-data #label_col_" + col_letter);

//                   if (typeof(column[column_num]) !== 'undefined'){
//                       label_id.attr("value", column[column_num].label);
//                       labelArray.push(column[column_num].label);
//                       //console.log("line 261 " + column[column_num].label + "col a int" + col_a_int )
//                   } else {
//                       console.log("label is undefined");
//                       label_id.attr("value", "Column " + (col_letter).toUpperCase())
//                   }

//                 col_a_int++;
//                 column_num++;
//             };

//     console.log("labelArray " + labelArray);

// 	var row = data.Nf;
// 	var column = data.Pf
    
//     var bigArray = [];
//           //uploading cell data from URL
//             var col_a_int = 97; //reset var
//             while(col_a_int <= last_col_int){
//                 var col_letter = String.fromCharCode(col_a_int);
//                 var c_num = col_a_int -97;
//                 var smallArray = [];
//                     for(var i=1;i<=last_row;i++) {
//                         var col_id = $("#real-data #cell_" + i + "_" + col_letter);
//                       //check to see if data exists in corresponding cell in URL
//                       //if it does exist, add data, if not, make value null
//                       	// console.log(row[i-1]);
//                           if (typeof(row[i-1]) !=='undefined' ){
//                           		// console.log(row[i-1]);
//                           		console.log("row[i-1]" + row[i-1].c[c_num].v);

//                           		console.log("c_num: " + c_num);

// 	                            acceptable_number = rest = /^\+|^\-|^\d/;
// 								letters = /[A-Za-z]/;
// 								dot = /^\./;
// 	                            a_val = row[i-1].c[c_num].v;
// 	                            starts_with_dot = dot.test(a_val);

// 								if (starts_with_dot == true) { a_val = parseFloat(a_val);}
// 								contains_letters = letters.test(a_val);
// 	                            col_id.attr("value", row[i-1].c[c_num].v);

// 	                            smallArray.push( row[i-1].c[c_num].v );

// 	                            //handling isNaN() on col b and later

//                           } else if (isNaN(row[i-1])==true) {
//                           		alert("NOT A NUMBER!!!!!")
//                               //console.log("line 331 ---- Nf is not defined")
//                           } else {
//                               col_id.val(null)
//                               alert("RED BOX!!!!!")
//                           }
//                     };
//                 bigArray.push("\r                  ["+smallArray+"]")
//                 col_a_int++;
//             }; // END OF col_a_int while loop

//     console.log("bigArray " + bigArray);

// // Pf[0].type is the data type for column 0
// // Pf[0].label is the label for column 0 
// // Nf[0] is row 0
// // c[0] is column 0
// // v is the value
// 	var row = data.Nf;
// 	var column = data.Pf;

// 	// console.log("check " + check + "   optionData " + optionData)

// 	var selectedChartType = $('input[name=chart_type]:radio:checked').val();
// 	var indeed = $('input[name=chart_type]:radio:checked').val()



// ///NOTE - you might not need to pull datatype for each column -
// //MAYBE ONLY FOR COL A -- since all the rest will be number
// //(UNLESS OF COURSE YOU DO IGNORE)
// 	var i = [column[0].type, " " + column[1].type, " " + data.Pf[0].type, " " + data.Pf[1].type]

// 	console.log("max_a: " + max_a + "min_a: " + min_a + "max_b: " + max_b + "min_b: " + min_b);


function initialUploadCode (data) {

	// // Pf[0].type is the data type for column 0
	// // Pf[0].label is the label for column 0 
	// // Nf[0] is row 0
	// // c[0] is column 0
	// // v is the value
	var row = data.Nf;
	var column = data.Pf;
	var chartTitle = $('input[name=chart_title]').val();
	              //set default width and height
	var chartWidth = $("#width_chart").val();
	var chartHeight = $("#height_chart").val();

	var label_col_a = $('#real-data input[name=label_col_a]').val()
	var label_col_b = $('#real-data input[name=label_col_b]').val()

	var dataValA = $('#real-data select[name=dataType_col_a]').val()
	var dataValB = $('#real-data select[name=dataType_col_b]').val()

	if (dataValA == "string") { var Q = "'";} else { var Q = "";};

	//NOTE - THIS IS A TEMPORARY WORKAROUND
	optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
			["'title': '" + chartTitle + "',"] + '\r' + ["			"] +
	    	["vAxis: {title: '" + label_col_a + "'},"] + '\r' + ["			"] +
	    	["hAxis: {title: '" + label_col_b + "'},"] + '\r' + ["			"] +
	    	["     	'width': " + chartWidth + ","] + '\r' + ["			"] +
	   		["     	'height': " + chartHeight + ","] + '\r' + ["			"] +
	        ["};"] + '\r']);

	//NOTE - THIS IS A TEMPORARY WORKAROUND
	bigArrayForExport = ([
			  "			['" + column[0].label + "', '" + column[1].label + "']," +'\r' +
		      "			[" + Q + (row[0].c[0].v) + Q + ", " + (row[0].c[1].v) + "]," + '\r' +
		      "			[" + Q + (row[1].c[0].v) + Q + ", " + (row[1].c[1].v) + "]," + '\r' +
		      "			[" + Q + (row[2].c[0].v) + Q + ", " + (row[2].c[1].v) + "]," + '\r' +
		      "			[" + Q + (row[3].c[0].v) + Q + ", " + (row[3].c[1].v) + "]"]);
		      // "		]);" + '\r' + '\r']);

	exportCode (optionData, bigArrayForExport);
}



function exportCode (optionData, bigArrayForExport) {

 	var radio = ($('input[type=radio]:checked').val())
// 	var col_a_array_nan = [ $('#real-data input[name=cell_1_a]').val(), $('#real-data input[name=cell_2_a]').val(), $('#real-data input[name=cell_3_a]').val(), $('#real-data input[name=cell_4_a]').val()];
// 	//EXPORTING CODE ---- experiment -- make this into separate function
// 	// this sep function should upload on start of program as well
// 	// var yep = 567;
	// var title = $('input[name=chart_title]').val();
	// n = $('#real-data input[name=cell_1_a]').val()
	// if ( isNaN(n) == true) {
	// 	console.log("no num in col a")
	// 	var mess = "no num in col a" //variable is trapped in scope of if statement
	// };
	// var label_col_a = $('#real-data input[name=label_col_a]').val()
	// var label_col_b = $('#real-data input[name=label_col_b]').val()
	var dataValA = $('#real-data select[name=dataType_col_a]').val()
	var dataValB = $('#real-data select[name=dataType_col_b]').val()

	var CHART_TYPE = ["AreaChart", "BarChart", "SteppedAreaChart", "ColumnChart", "LineChart", "PieChart", "ScatterChart"];
	var CHART_OPTIONS = [["'something': 'asdf',","'title': 'title'"],["pie3D : true,"]];
	switch(radio){
		case "area": ct = 0; break;
		case "bar": ct = 1; break;
		case "step": ct = 2; break;
		case "column": ct = 3; break;
		case "line": ct = 4; break;
		case "donut": ct = 5; break;
		case "pie":	ct = 5; break;
		case "scatter": ct = 6; break;
		case "trend_lin": ct = 6; break;
		case "trend_exp": ct = 6; break;
		case "trend_poly": ct = 6; break;
		default:
	        console.log('default');
	      	alert("default - radio type - EXPORT CODE");
	      	break;
	}; // END OF SWITCH CASE 	



//XXXXXXXXX
//NOTE - WITH NUMBER NUMBER --- there should be NO quotes around first column!!!!
//XXXXXXXXXX
// or do some weird variable equaling a single quote?

	if (dataValA == "string") { var Q = "'";} else { var Q = "";};

	// console.log("testing 1 without quotes");
	// console.log(Q + "testing " + Q + "with" + Q + " quotes");




	// console.log("check " + check + "   optionData " + optionData)

	// console.log("minimum col a: " + parseInt(min_a)) 

	//BELOW IS THE CODE THAT WILL SHOW IN THE TEXT AREA
	document.getElementsByName('export_code')[0].value=(
	  "<html>" + '\r' + 
	  "<head>" + '\r' +
	    "	<script type='text/javascript' src='https://www.google.com/jsapi'></script>" + '\r' +
	    "	<script type='text/javascript'>" + '\r' + '\r' +
	      "	google.load('visualization', '1', {packages:['corechart']});" + '\r' +
	      "	google.setOnLoadCallback(drawChart);" + '\r' + '\r' +
	      "	function drawChart() {" + '\r' +
	      "		var data = google.visualization.arrayToDataTable([" + '\r' +
	      bigArrayForExport + '\r' +
	      // "	 	  ['" + column[0].label + "', '" + column[1].label + "']," +'\r' +
	      // "		  [" + Q + (row[0].c[0].v) + Q + ", " + (row[0].c[1].v) + "]," + '\r' +
	      // "		  [" + Q + (row[1].c[0].v) + Q + ", " + (row[1].c[1].v) + "]," + '\r' +
	      // "		  [" + Q + (row[2].c[0].v) + Q + ", " + (row[2].c[1].v) + "]," + '\r' +
	      // "		  [" + Q + (row[3].c[0].v) + Q + ", " + (row[3].c[1].v) + "]" + '\r' +
	        "		]);" + '\r' + '\r' + 
	        optionData + '\r' + 

	        "		var chart = new google.visualization." + CHART_TYPE[ct] + 
	        "(document.getElementById('chart_material'));" + '\r' + 
	        "		chart.draw(data, options);" + '\r' + 
	      "	};" + '\r' + '\r' +
	    "	</script>" +  '\r' + 
	    "</head>" + '\r' + '\r' + 
	  "<body>" + '\r' + 
	    "	<div id='chart_material'></div>" + '\r' + 
	  "</body>" + '\r' + 
	"</html>"   );
};