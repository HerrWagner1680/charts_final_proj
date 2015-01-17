function exportCode (kitchenSink, check) {

	console.log("kitchenSink in exportCode function: " + kitchenSink);
	console.log("check variable in exportCode function: " + check);

	//FIND LOWEST AND HIGHEST NUMBERS FOR VERTICAL AND HORIZ AXES
	var col_a_array = [ parseInt($('#real-data input[name=cell_1_a]').val()), parseInt($('#real-data input[name=cell_2_a]').val()), parseInt($('#real-data input[name=cell_3_a]').val()), parseInt($('#real-data input[name=cell_4_a]').val())];
	var col_b_array = [ parseInt($('#real-data input[name=cell_1_b]').val()), parseInt($('#real-data input[name=cell_2_b]').val()), parseInt($('#real-data input[name=cell_3_b]').val()), parseInt($('#real-data input[name=cell_4_b]').val())];
	var max_a = Math.max.apply(Math,col_a_array);
	var min_a = Math.min.apply(Math,col_a_array);
	var max_b = Math.max.apply(Math,col_b_array);
	var min_b = Math.min.apply(Math,col_b_array);

	var radio = ($('input[type=radio]:checked').val())
	var col_a_array_nan = [ $('#real-data input[name=cell_1_a]').val(), $('#real-data input[name=cell_2_a]').val(), $('#real-data input[name=cell_3_a]').val(), $('#real-data input[name=cell_4_a]').val()];
	//EXPORTING CODE ---- experiment -- make this into separate function
	// this sep function should upload on start of program as well
	var yep = 567;
	var title = $('input[name=chart_title]').val();
	if ($('#real-data input[name=cell_1_a]').val() == NaN) {
		console.log("no num in col a")
		var mess = "no num in col a" //variable is trapped in scope of if statement
	};
	var label_col_a = $('#real-data input[name=label_col_a]').val()
	var label_col_b = $('#real-data input[name=label_col_b]').val()
	var dataValA = $('#real-data select[name=dataType_col_a]').val()
	var dataValB = $('#real-data select[name=dataType_col_b]').val()

	console.log("minimum col a: " + parseInt(min_a)) 
	document.getElementsByName('export_code')[0].value=('STILL IN TEST MODE' +
		' minValue: ' + min_b + ', maxValue: ' + max_b + col_b_array + '\r' + '\r' +
		" width: " + " height: " + " num of cols: " + " num of rows " + '\r' +
		 "   XXXXXXX CHART TYPE:  " + radio + "  XXXXXXXX" + '\r' + '\r' +
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

// VARIABLES
// WIDTH - HEIGHT
// TYPE OF CHART
// TITLE
// LABELS
// array

};