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
	var col_a_label = $('#real-data input[name=col_a_label]').val()
	var col_b_label = $('#real-data input[name=col_b_label]').val()
	var dataValA = $('#real-data select[name=dataType_col_a]').val()
	var dataValB = $('#real-data select[name=dataType_col_b]').val()
	var br = '<br>'
	var newline = '&#10;'
	console.log("minimum col a: " + parseInt(min_a)) 
	document.getElementsByName('export_code')[0].value=('STILL IN TEST MODE' +
		' minValue: ' + min_b + ', maxValue: ' + max_b + col_b_array + '\r' + '\r' +
		 "  //Load the Visualization API and the piechart package. " + '\r' +
		 "   XXXXXXX CHART TYPE:  " + radio + "  XXXXXXXX" + '\r' +
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



function pieRefresh(deg, hole) {
	var data = new google.visualization.DataTable();
		console.log("pie refresh function")

		data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
					   $('#real-data input[name=col_a_label]').val());
		data.addColumn($('#real-data select[name=dataType_col_b]').val(), 
					   $('#real-data input[name=col_b_label]').val());

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


$("#refresh").click(function(){
	var data = new google.visualization.DataTable();

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


		// data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
		// 			   $('#real-data input[name=col_a_label]').val());
		data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
			   $('#real-data input[name=col_a_label]').val());
		console.log("string line 187")
    var last_row = parseInt($('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];

    var last_col_int = last_col.charCodeAt(0);
		  var pf_num = 1
		  while(col_a_int +1 <= last_col_int){
		      var col_letter = String.fromCharCode(col_a_int);
		      console.log(col_a_int);
		      console.log(pf_num);
		      console.log(data.Pf[0].type)
		      console.log(data.Pf[1].type)
		      var lab = $("#real-data #dataType_col_" + col_letter).val(data.Pf[pf_num].type);
		      data.addColumn("number", lab);
		      console.log("var label: " + lab)
		      col_a_int++;
		      pf_num++;
		  };
		// data.addColumn($('#real-data select[name=dataType_col_b]').val(), 
		// 			   $('#real-data input[name=col_b_label]').val());
		// data.addColumn('column c');

		// var columnArray= ['string','col1', 'number','col2', 'number','col3']
		console.log("hit line 196")
//XXXXXXXXXXX
		// data.addColumn('number','col1')
		// data.addColumn('number','col2')
		// data.addColumn('number','col3')

//XXXXXXXXXXX
		console.log("hit line 203")

		var rowArray1 = [] // array for row 1
		var rowArray2 = [] // array for row 2
		var rowArray3 = [] // array for row 3

		var rowArray = [] // array of arrays - rem end each array var with comma





    var last_row = parseInt($('#real-data tr:last-of-type').attr('id').split('_')[1]);


	var col_a_int = 97; //reset var
	var col_b_num = 98;
    while(col_b_num <= last_col_int){
        var col_letter = String.fromCharCode(col_a_int);
        var c_num = col_b_num; //rem first col is string

        // console.log("LINE238 col_b_num " + col_b_num);
        // console.log("LINE239 last_col_int " + last_col_int);


        // window["wind_rowArray" + (c_num)] = [];
        // global["glob_rowArray" + (c_num + 1)] = [];
				var str_col_array = [];
				for(var i=1;i<=last_row;i++) {
					var valu = $("#real-data #cell_" + i + "_a").val();
					str_col_array.push(valu);
				}
				console.log(str_col_array);
				console.log("the above is first column - string")
				        
		// $("#real-data #cell_4_"+col_letter).attr("value",data.Nf[0].c[0].v)
        // $("#real-data #cell_4_"+col_letter).attr("value",data.Nf[1].c[1].v)
        // $("#real-data #cell_3_"+col_letter).attr("value",data.Nf[2].c[0].v)
        // $("#real-data #cell_3_"+col_letter).attr("value",data.Nf[3].c[1].v)

        var col_letter = String.fromCharCode(col_b_num);
        var c_num = col_b_num - 97; //rem first col is string
        console.log("LINE 254 col b num:" + col_b_num);
                var somekind_of_array = [];
                var somekind_of_array_float = [];
            for(var i=1;i<=last_row;i++) {
            	console.log("i " +i)
            	console.log("last row " + last_row)
            	console.log("c_num " + c_num)
                // $("#real-data #cell_" + i + "_" + col_letter).attr("value", data.Nf[i-1].c[c_num].v);
                //getting data for each cell
                var valu = $("#real-data #cell_" + i + "_" + col_letter).val()
                console.log($("#real-data #cell_" + i + "_" + col_letter).val());
                console.log(valu);
                console.log(col_letter);

                // var somekind_of_array = [];
                somekind_of_array.push(valu);
                somekind_of_array_float.push(parseFloat(valu));
                var c_str = (c_num).toString(); 
                console.log("c_str " + c_str);
                // window["colArray_" + c_str] = somekind_of_array
                window["colArrayFloat_" + c_str] = somekind_of_array_float;
        		// (global["glob_rowArray" + (c_num + 1)]).push(valu);
        		// console.log(somekind_of_array);
            };
	console.log(somekind_of_array);
	console.log(somekind_of_array_float);
	console.log("LINE 281 " + col_b_num);
	// console.log(colArrayFloat_0);
	console.log("LINE 283 " + colArrayFloat_1);

        col_b_num++;
        
    };

    // console.log("LINE 268 window " + colArray_1);
    // console.log(colArray_1)
    // console.log(colArray_2)
    // colArray_1
    // var yada = [colArray_1]
    // console.log(yada);
    // console.log("global " + glob_rowArray1);
		// var last_col = $('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
  //   	var last_col_int = last_col.charCodeAt(0);
  //   	var col_a_int = 97;
		// var current_col_int = 99 // 99 is value for letter "c"

		//*****************
		//this while loop assigns type number to any additional columns
		// while(current_col_int <= last_col_int){
		// 	var current_col = String.fromCharCode(current_col_int);
		// 	console.log("curr_column in type: " +current_col);
		// 	data.addColumn("number","column: " + current_col);
		// 	current_col_int++;
  //   	}  //NOTE - both datatype and label are string values
  	//************************

	  //   var last_row = parseInt($('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
	  //   var dataArray = []
	  //   for(var i=1;i<=last_row;i++) {
	  //       var first_cell = $('#real-data input[name=cell_' + i + '_a]').val();
	  //       var second_cell = $('#real-data input[name=cell_' + i + '_b]').val();

	  //       // var rowArray = [(first_cell), parseInt(second_cell)];
	  //       var rowArray = []
	  //       console.log("i:" + i)
	  //       console.log(current_col_int)
	  //       console.log(current_col)
	  //       console.log(last_col_int)
	  //       while(col_a_int <= last_col_int){
	  //       	var current_col = String.fromCharCode(col_a_int);
	  //       	var num = $('#real-data input[name=cell_' + i + '_' + current_col + ']').val();
	  //       	console.log(num);
	  //       	rowArray.push(num);
	  //       	console.log("rowArray: " + rowArray)
	  //       	col_a_int++;
	  //       }
	  //       // data.addRows([
	  //       // 	rowArray
	  //       // ]);
			// dataArray.push(rowArray);
	  //   }
  //XXXXXXXXXXXXXX
  //XXXXXXXXXXXXXXXXX
	  	// data.addRows([
	  	// 	['asdf', 23, 56],
	  	// 	['aswef', 3, 62],
	  	// 	['qwdf', 29, 563],
	  	// 	['aszz', 33, 526],
	  	// 	]);
	//	stackedCheckbox()
	//  	drawChartTest()
  	//XXXXXXXXXXXXXXXXXX
	    // data.addColumn(dataArray);


	    // drawNewChart(data, rotate_slider, piehole_slider); // adds the rows
	    
	     drawNewChart(data);
	} else if ($('#real-data select[name=dataType_col_a]').val() == "number" && 
		$('#real-data select[name=dataType_col_b]').val() == "number") {
		console.log("does NOT work with stepchart or piechart ...number number");
		data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
					   $('#real-data input[name=col_a_label]').val());
		data.addColumn($('#real-data select[name=dataType_col_b]').val(), 
					   $('#real-data input[name=col_b_label]').val());

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

});
	// automate the choice by looking for NaN 

// to show error in HTML
// http://stackoverflow.com/questions/14702190/to-show-error-message-without-alert-box-in-java-script

