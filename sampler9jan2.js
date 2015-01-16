//DISABLES INACTIVE CHART TYPES
$('select').change(function() {
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



function pieRefresh(deg, hole) {
	var data = new google.visualization.DataTable();
		console.log("pie refresh function")

		//NOTE - PIE ONLY TAKES TWO COLUMNS OF DATA
		data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
					   $('#real-data input[name=label_col_a]').val());
		data.addColumn($('#real-data select[name=dataType_col_b]').val(), 
					   $('#real-data input[name=label_col_b]').val());

		var last_row = parseInt($('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);

			for(var i=1;i<=last_row;i++) {
				data.addRows([
				[($('#real-data input[name=cell_' + i + '_a').val()),
					parseInt($('#real-data input[name=cell_' + i + '_b').val())]
				]);
			}

	    var piechart = new google.visualization.PieChart(document.getElementById('chart_div0'));

	if ($('input[name=chart_type]:radio:checked').val()=="pie") {
		var three_dee = true
	} else {
		var three_dee = false
	}
			var options = {
	          // legend: 'none',
	          pieSliceText: 'label',
	          title: ($('input[name=chart_title]').val()),
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

//revise is a function in sampler9jan2.js
$("#slider3").change(revise);
$("#piehole3").change(revise);
//NOTE - piehole does not work in 3d mode

// $("#refresh").click(function(){
// 	refreshing()
// });

function refreshing(){
	var data = new google.visualization.DataTable();

	// drawChartTest()

	// reviseColumn()

    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
    var last_col_integer = last_col.charCodeAt(0) + 1;
	var col_a_int = 97;

	var TOT_COL = last_col_integer - col_a_int;
	// alert("total # columns " + TOT_COL);

	var number_of_columns = $('#row_1 td').length;

	// if($('input[id=stack]:checkbox:checked').val()=='true'){
	// 	// alert("we have a clicked box we need to keep")
	// 	check = true
	// } else {
	// 	check = false
	// };

	// if($('input[id$="c"]').length == 0) {
	// 	check = "missing";
	// }

	// if(number_of_columns = 2) {
	// 	check = "missing";
	// }


//CHECK FOR "IGNORE" data types and somehow remove them

	console.log("refresh")

	//REMOVE ANY RANGE SLIDERS
	$("#rot").remove();

	//REMOVE COLUMN STACK CHECKBOX
	$("#stack, #stack2").remove();

	// IF ELSE statements for data-type selection
	if ($('#real-data select[name=dataType_col_a]').val() == "string" && 
		$('#real-data select[name=dataType_col_b]').val() == "number") {
		console.log("NO SCATTERCHART. COL_A is string COL_B is number");

//EXAMPLES: https://developers.google.com/chart/interactive/docs/examples

//TICKS https://developers.google.com/chart/interactive/docs/gallery/columnchart
//see h.axis or v.axis ticks
// getImageURI()   printing PNG charts


	//setting the label and data type for column a
		// data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
		// 	   $('#real-data input[name=label_col_a]').val());

	var column_a_label = $('#real-data input[name=label_col_a]').val();
	grandLabel = [];
	grandLabel.push(column_a_label);
	var col_b_num = 98;
    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
    console.log("line 193 last_col " + last_col);
     var last_col_int = last_col.charCodeAt(0);

  console.log("line 197 last_col_int " + last_col_int)
  //THIS LOOP ASSIGNS THE LABELS (FROM NUMBER COLUMNS) TO THE CHART FROM THE GRID
		  var pf_num = 1
		  while(col_b_num <= last_col_int){
		      var col_letter = String.fromCharCode(col_b_num);
		      // console.log("col_b_num " + col_b_num);
		      // console.log("number column count: " + pf_num);
		      // console.log("line 204")
		      // console.log(data.Pf[0].type) // should be string //QQQQQQQQ
		      // console.log(data.Pf[1].type)  should be number
		      var labelll = $("#real-data input[name=label_col_" + col_letter + "]").val();
		      // console.log(labelll);
		      grandLabel.push(labelll);
		      // var lab = $("#real-data select[name=dataType_col_" + col_letter + "]").val(data.Pf[pf_num].type);
		      var lab = $("#real-data select[name=dataType_col_" + col_letter + "]").val();
		      // data.addColumn("number", lab); //QQQQQQQQQQQQQQ
		      console.log("var label: " + lab); //result should be number
		      col_b_num++;
		      pf_num++;
		  };
console.log("line 238 grandLabel " + grandLabel);
    var last_row = parseInt($('#real-data tr:last-of-type').attr('id').split('_')[1]);
	var num_of_rows = last_row;

	var col_a_int = 97; //reset var
	var col_b_num = 98;

					var str_col_a = [];
					// var str_col_array = [];

				for(var i=1;i<=last_row;i++) {
					var valu = $("#real-data #cell_" + i + "_a").val();
					str_col_a.push(valu);
				}

				str_col_array = [str_col_a];
    while(col_b_num <= last_col_int){
        var col_letter = String.fromCharCode(col_a_int);
        var col_letter = String.fromCharCode(col_b_num);
        var c_num = col_b_num - 97; //rem first col is string

                var somekind_of_array_float = [];

            for(var i=1;i<=last_row;i++) {
                var valu = $("#real-data #cell_" + i + "_" + col_letter).val();
                somekind_of_array_float.push(parseFloat(valu));
            };//END OF FOR LOOP

    console.log(str_col_array);	//THE WINNER!!!!!!!********
	str_col_array.push(somekind_of_array_float);

        col_b_num++;

    };//END OF WHILE LOOP

	var num_of_cols = (str_col_array.length);

	console.log("num_of_rows: " + num_of_rows);
	console.log("num_of_cols: " + num_of_cols);

	if(num_of_cols <= 2){
		check = "missing";
	} else if ($('input[id=stack]:checkbox:checked').val()=='true'){
		// alert("we have a clicked box we need to keep")
		check = true
	} else {
		check = false
	};

	console.log("LINE 302 - check: " + check);

	var kitchenSink = []
 	kitchenSink.push(grandLabel);
     for(var k=0; k<= num_of_rows -1; k++){
			var stuff=[]

     	for(var i=0; i<= num_of_cols -1; i++){
	     		stuff.push(str_col_array[i][k]);
				window["row_of_data_" + (k).toString() ] = [stuff];
	     		console.log(stuff);
     	}
     	 kitchenSink.push(stuff);
     }

	 // data.addRows( kitchenSink );
	var data = google.visualization.arrayToDataTable( kitchenSink );
		// var aa = ['asdf', 23]
		// var bb = ['aswe', 3]
		// var cc = ['sdfw', 45]
		// var theLot = [aa, bb, cc]
	    console.log("checkbox marked? " + check);
	    
	    drawNewChart(data,check);
	} else if ($('#real-data select[name=dataType_col_a]').val() == "number" && 
		$('#real-data select[name=dataType_col_b]').val() == "number") {
		console.log("does NOT work with stepchart or piechart ...number number");
		data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
					   $('#real-data input[name=label_col_a]').val());
		data.addColumn($('#real-data select[name=dataType_col_b]').val(), 
					   $('#real-data input[name=label_col_b]').val());

		// drawNewChart(data) //makes the columns
		var last_row = parseInt($('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
		// var nf_num = last_row -1;

		for(var i=1;i<=last_row;i++) {
			data.addRows([
			[parseInt($('#real-data input[name=cell_' + i + '_a').val()),
				parseInt($('#real-data input[name=cell_' + i + '_b').val())]
			]);
            console.log("line 244 col b" + parseInt($('#real-data input[name=cell_' + i + '_b').val()));
		}

		// drawNewChart(data, rotate_slider, piehole_slider); // adds the rows
		drawNewChart(data);
	} else {
		console.log("col a: " + $('#real-data select[name=dataType_col_a]').val())
		console.log("col b: " + $('#real-data select[name=dataType_col_b]').val())
		alert("please correct data type");
	}

};

// //colors on additional columns change color when not being used
// $('select[id$="c"]').css({"border":"2px solid #ddd", "color":"#aaa"})
// $('input[id$="c"]').css({"border":"2px solid #ddd", "color":"#aaa"})



	// automate the choice by looking for NaN 

// to show error in HTML
// http://stackoverflow.com/questions/14702190/to-show-error-message-without-alert-box-in-java-script

