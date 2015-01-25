$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
      
      	case 'r':
      		// event.preventDefault();
      		refreshing();
      		break;
		case 'p':
            // event.preventDefault();
            saveAsImg(document.getElementById('chart_div0'));
            break;
        }
    }
});





//NOTE - initial upload is still a draft
//ONLY reads two columns and four rows

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
	   		["     	'height': " + chartHeight + ","] + '\r' + ["		"] +
	        ["};"] + '\r']);

	//NOTE - THIS IS A TEMPORARY WORKAROUND
	bigArrayForExport = ([ '\r' + 
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

	if (dataValA == "string") { var Q = "'";} else { var Q = "";};

	//BELOW IS THE CODE THAT WILL SHOW IN THE TEXT AREA
	document.getElementsByName('export_code')[0].value=(
	  "<html>" + '\r' + 
	  "<head>" + '\r' +
	    "	<script type='text/javascript' src='https://www.google.com/jsapi'></script>" + '\r' +
	    "	<script type='text/javascript'>" + '\r' + '\r' +
	      "	google.load('visualization', '1', {packages:['corechart']});" + '\r' +
	      "	google.setOnLoadCallback(drawChart);" + '\r' + '\r' +
	      "	function drawChart() {" + '\r' +
	      "		var data = google.visualization.arrayToDataTable([" + 
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