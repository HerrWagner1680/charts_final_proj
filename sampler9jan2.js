
//DISABLES INACTIVE CHART TYPES
$( 'select').change(function() {
// $( 'select[name=dataType_col_a] select[name=dataType_col_b]').change(function() {
  if ($('select[name=dataType_col_a]').val() == "string" && 
		$('select[name=dataType_col_b]').val() == "number") {
		$("input[class=no_val_val]").attr('disabled', false);
		$("input[class=no_string]").attr('disabled', true);
  } else if ($('select[name=dataType_col_a]').val() == "number" && 
	   $('select[name=dataType_col_b]').val() == "string") {
		$("input[type=radio]").attr('disabled', true);
		$("input[id=histo2]").attr('disabled', false);
  } else if ($('select[name=dataType_col_a]').val() == "number" && 
		$('select[name=dataType_col_b]').val() == "number") {
		$("input[class=no_val_val]").attr('disabled', true);
		$("input[class=no_string]").attr('disabled', false);
  } else {
		$("input[type=radio]").attr('disabled', true);  	
  }
});
// END OF - DISABLES INACTIVE CHART TYPES

function addPieRotateSlider() {
	$("#select_typ").append("<span id='rot'><label for='slider3'> Degrees of rotation: " + 
		"</label><input id='slider3' type ='range' min ='-180' max='180' step ='10' value='0'/>" + 
		"<input type='text' id='rangeValue3' size='2' value='0' readonly/></span>");
};

function addPieHoleSlider() {
	$("span").append("<label for='piehole3'> Donut hole (range 0 - 0.9 of radius): </label>" + 
		"<input id='piehole3' type='range' min ='0' max='0.9' step='0.05' value='0'/>" + 
		"<input type='text' id='holeRange3' size='2' value='0' readonly/>")
};


function exportCode (data) {
	//FIND LOWEST AND HIGHEST NUMBERS FOR VERTICAL AND HORIZ AXES
	var col_a_array = [ parseInt($('input[name=cell_1a]').val()), parseInt($('input[name=cell_2a]').val()), parseInt($('input[name=cell_3a]').val()), parseInt($('input[name=cell_4a]').val())];
	var col_b_array = [ parseInt($('input[name=cell_1b]').val()), parseInt($('input[name=cell_2b]').val()), parseInt($('input[name=cell_3b]').val()), parseInt($('input[name=cell_4b]').val())];
	var max_a = Math.max.apply(Math,col_a_array);
	var min_a = Math.min.apply(Math,col_a_array);
	var max_b = Math.max.apply(Math,col_b_array);
	var min_b = Math.min.apply(Math,col_b_array);

	var col_a_array_nan = [ $('input[name=cell_1a]').val(), $('input[name=cell_2a]').val(), $('input[name=cell_3a]').val(), $('input[name=cell_4a]').val()];
	//EXPORTING CODE ---- experiment -- make this into separate function
	// this sep function should upload on start of program as well
	var yep = 567;
	var title = $('input[name=chart_title]').val();
	if ($('input[name=cell_1a]').val() == NaN) {
		console.log("no num in col a")
		var mess = "no num in col a" //variable is trapped in scope of if statement
	};
	var col_a_label = $('input[name=col_a_label]').val()
	var col_b_label = $('input[name=col_b_label]').val()
	var dataValA = $('select[name=dataType_col_a]').val()
	var dataValB = $('select[name=dataType_col_b]').val()
	var br = '<br>'
	var newline = '&#10;'
	console.log("minimum col a: " + parseInt(min_a)) 
	document.getElementsByName('export_code')[0].value=('STILL IN TEST MODE' +
		' minValue: ' + min_b + ', maxValue: ' + max_b + col_b_array + '\r' + '\r' +
		 "  //Load the Visualization API and the piechart package. " + '\r' +
	" google.load('visualization', '1.0', {'packages':['corechart']}); " +
	  " // Set a callback to run when the Google Visualization API is loaded. " + '\r' +
	 " google.setOnLoadCallback(drawChart); " +  br + newline + '\r' + '\r' + '\r' +
	 "<html>" + '\r' +
	  "	<head>" + '\r' +
	    "	<script type='text/javascript' src='https://www.google.com/jsapi'></script>" +
	    "	<script type='text/javascript'>" + '\r' + '\r' +
	      "	google.load('visualization', '1.1', {packages:['bar']});" + '\r' +
	      "	google.setOnLoadCallback(drawChart);" + '\r' + 
	      "	function drawChart() {" + '\r' +
	        "		var data = google.visualization.arrayToDataTable([" + '\r' +
	          "			['Year', 'Sales', 'Expenses', 'Profit']," + '\r' +
	          "			['2014', 1000, 400, 200]," + '\r' +
	          "			['2015', 1170, 460, 250]," + '\r' +
	          "			['2016', 660, 1120, 300]," + '\r' +
	          "			['2017', 1030, 540, 350]" + '\r' +
	        "		]);" + '\r' + mess + " XXXXXXXX  " + 
			col_a_array + " OR IF NaN: " + col_a_array_nan + " col b array " + col_b_array + " dataval:" + dataValA + " B: " + dataValB + '\r' +

	        "		var options = {" +
	          "			chart: { title: '" + title + "'' ," +
	            " subtitle: 'Sales, Expenses, and Profit: 2014-2017' " +
	          "}" + '\r' + 
	        " };" + '\r' + 

	        "		var chart = new google.charts.Bar(document.getElementById('columnchart_material'));" + '\r' + 

	        "		chart.draw(data, options);" + '\r' + 
	      "		}" + '\r' + 
	    "	</script>" +  '\r' + 
	    "	</head>" + '\r' + '\r' + 
	  "<body>" + '\r' + 
	    "	<div id='columnchart_material' style='width: 900px; height: 500px;''></div>" + '\r' + 
	  "</body>" + '\r' + '\r' + 
	"</html>"   );

};



function drawNewChart(data) {

	var options = {
			'title': ($('input[name=chart_title]').val()),
		    vAxis: {title: ($('input[name=col_a_label]').val())},
		    hAxis: {title: ($('input[name=col_b_label]').val())},
	              	'width':500,
	              	'height':400
	              };

//ASSIGNING METHOD NAMES FOR EACH GOOGLE CHART
    var areachart = new google.visualization.AreaChart(document.getElementById('chart_div0'));
    var barchart = new google.visualization.BarChart(document.getElementById('chart_div0'));
    var stepchart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div0'));
    var columnchart = new google.visualization.ColumnChart(document.getElementById('chart_div0'));
    var linechart = new google.visualization.LineChart(document.getElementById('chart_div0'));
    var histogram = new google.visualization.Histogram(document.getElementById('chart_div0'));
 
    var piechart = new google.visualization.PieChart(document.getElementById('chart_div0'));
 
    var scatterchart = new google.visualization.ScatterChart(document.getElementById('chart_div0'));

//FIND LOWEST AND HIGHEST NUMBERS FOR VERTICAL AND HORIZ AXES
	var col_a_array = [ parseInt($('input[name=cell_1a]').val()), parseInt($('input[name=cell_2a]').val()), parseInt($('input[name=cell_3a]').val()), parseInt($('input[name=cell_4a]').val())];
	var col_b_array = [ parseInt($('input[name=cell_1b]').val()), parseInt($('input[name=cell_2b]').val()), parseInt($('input[name=cell_3b]').val()), parseInt($('input[name=cell_4b]').val())];
	var max_a = Math.max.apply(Math,col_a_array);
	var min_a = Math.min.apply(Math,col_a_array);
	var max_b = Math.max.apply(Math,col_b_array);
	var min_b = Math.min.apply(Math,col_b_array);

	exportCode (data);

	//READ SELECTED RADIO BUTTONS AND REDRAW CHART
	switch($('input[name=chart_type]:radio:checked').val()) {
		case "area":
			console.log("area switch"); areachart.draw(data, options);
			break;
		case "bar":
			console.log("bar switch"); barchart.draw(data, options);
			break;
		case "step":
			console.log("step switch"); stepchart.draw(data, options);
			break;
		case "column":
			console.log("column switch"); columnchart.draw(data, options);
			break;
		case "line":
			console.log("line switch"); linechart.draw(data, options);
			break;

	//NOTE donut covers regular pie chart and donut chart with range sliders
		case "donut":
			addPieRotateSlider();
			addPieHoleSlider();
			console.log("pie / donut switch"); 
			var options = {
	          // legend: 'none',
	          pieSliceText: 'label',
	          // title: 'Swiss Language Use',
	          pieStartAngle: 0, //change to slider variable see rotate_pie.html
	          pieHole: 0, //change to slider variable see rotate_pie.html
			};
			$("#slider3").change(revise);
			$("#piehole3").change(revise);
			//NOTE - piehole does not work in 3d mode
			piechart.draw(data, options);
			break

	//NOTE case pie is 3d pie - only has one range slider
		case "pie":
			addPieRotateSlider();
			console.log("pie switch"); 
			var options = {
	          // legend: 'none',
	          pieSliceText: 'label',
	          // title: 'Swiss Language Use',
	          pieStartAngle: 0, //change to slider variable see rotate_pie.html
	          is3D: true,
			};
			$("#slider3").change(revise);
			piechart.draw(data, options);
			break;


		case "scatter":
			console.log("scatter switch");
			var options = {
				'title': ($('input[name=chart_title]').val()),
		    	vAxis: {title: ($('input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
		    	hAxis: {title: ($('input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
			};
		     scatterchart.draw(data, options);   // str/val ONLY
			break;
		case "trend_lin":
			console.log("trend_lin switch");
			var options = {
				'title': ($('input[name=chart_title]').val()),
			    vAxis: {title: ($('input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
			    trendlines: {
			      0: {
			         type: 'linear',
				     }
				}
				};
		     scatterchart.draw(data, options);   // str/val ONLY
			break;	
		case "trend_exp":
			console.log("trend_exp switch");
			var options = {
				'title': ($('input[name=chart_title]').val()),
			    vAxis: {title: ($('input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
			    trendlines: {
			      0: {
			        type: 'exponential',
			     	 }
				}
				};
		     scatterchart.draw(data, options);   // str/val ONLY
			break;
		case "trend_poly":
			var options = {
				'title': ($('input[name=chart_title]').val()),
			    vAxis: {title: ($('input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
			    trendlines: {
			      0: {
			        type: 'polynomial',
			        degree: 3, // degree is used with polynomial
			      	 }
				}
				};
			     scatterchart.draw(data, options);   // str/val ONLY
			console.log("trend_poly switch");
			break;
		default:
	        console.log('default');
	      	alert("please select a chart");
	      	break;
	}; // END OF SWITCH CASE 
}; //END OF drawNewChart function


function pieRefresh(deg, hole) {
	var data = new google.visualization.DataTable();
		console.log("pie refresh function")
		data.addColumn($('select[name=dataType_col_a]').val(), 
					   $('input[name=col_a_label]').val());
		data.addColumn($('select[name=dataType_col_b]').val(), 
					   $('input[name=col_b_label]').val());

		data.addRows([
			[($('input[name=cell_1a]').val()), 
					parseInt($('input[name=cell_1b]').val())],
			[($('input[name=cell_2a]').val()), 
					parseInt($('input[name=cell_2b]').val())],
			[($('input[name=cell_3a]').val()), 
					parseInt($('input[name=cell_3b]').val())],
			[($('input[name=cell_4a]').val()), 
					parseInt($('input[name=cell_4b]').val())],
	    ]);
	    // drawNewChart(data)

	    var piechart = new google.visualization.PieChart(document.getElementById('chart_div0'));

if ($('input[name=chart_type]:radio:checked').val()=="pie") {
	var three_dee = true
} else {
	var three_dee = false
}
			var options = {
	          // legend: 'none',
	          pieSliceText: 'label',
	          // title: 'Swiss Language Use',
	          pieStartAngle: deg, //change to slider variable see rotate_pie.html
	          pieHole: hole,
	          is3D: three_dee,
			};
			piechart.draw(data, options);
}

function revise(){
  // update the numbers to the right of the sliders
  $("#rangeValue3").val($('#slider3').val())
  $("#holeRange3").val(parseFloat($("#piehole3").val()))

  var deg =  parseInt($( "#slider3" ).val());
  var hole = parseFloat($("#piehole3").val());

  // CHANGE THE SETTINGS and redraw chart
  pieRefresh(deg, hole);
};



$("#refresh").click(function(){
	var data = new google.visualization.DataTable();

	console.log("refresh")

	//REMOVE ANY RANGE SLIDERS
	$("#rot").remove();

	// IF ELSE statements for data-type selection
	if ($('select[name=dataType_col_a]').val() == "string" && 
		$('select[name=dataType_col_b]').val() == "number") {
		console.log("NO SCATTERCHART. COL_A is string COL_B is number");
		data.addColumn($('select[name=dataType_col_a]').val(), 
					   $('input[name=col_a_label]').val());
		data.addColumn($('select[name=dataType_col_b]').val(), 
					   $('input[name=col_b_label]').val());

		data.addRows([
			[($('input[name=cell_1a]').val()), 
					parseInt($('input[name=cell_1b]').val())],
			[($('input[name=cell_2a]').val()), 
					parseInt($('input[name=cell_2b]').val())],
			[($('input[name=cell_3a]').val()), 
					parseInt($('input[name=cell_3b]').val())],
			[($('input[name=cell_4a]').val()), 
					parseInt($('input[name=cell_4b]').val())],
	    ]);
	    drawNewChart(data)
	} else if ($('select[name=dataType_col_a]').val() == "number" && 
		$('select[name=dataType_col_b]').val() == "number") {
		console.log("does NOT work with stepchart or piechart ...number number");
		data.addColumn($('select[name=dataType_col_a]').val(), 
					   $('input[name=col_a_label]').val());
		data.addColumn($('select[name=dataType_col_b]').val(), 
					   $('input[name=col_b_label]').val());
		data.addRows([
			[parseInt($('input[name=cell_1b]').val()), 
					parseInt($('input[name=cell_1a]').val())],
			[parseInt($('input[name=cell_2b]').val()), 
					parseInt($('input[name=cell_2a]').val())],
			[parseInt($('input[name=cell_3b]').val()), 
					parseInt($('input[name=cell_3a]').val())],
			[parseInt($('input[name=cell_4b]').val()), 
					parseInt($('input[name=cell_4a]').val())],
		]);
		drawNewChart(data)
	} else {
		console.log("col a: " + $('select[name=dataType_col_a]').val())
		console.log("col b: " + $('select[name=dataType_col_b]').val())
		alert("please correct data type");
	}

});
	// automate the choice by looking for NaN 

	// is there a way to refactor using variables?

// to show error in HTML
// http://stackoverflow.com/questions/14702190/to-show-error-message-without-alert-box-in-java-script

