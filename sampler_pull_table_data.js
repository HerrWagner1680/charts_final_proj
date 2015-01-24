//DISABLES INACTIVE CHART TYPES
function datatypeConfirm(){	
  if ($('select[name=dataType_col_a]').val() == "string" && 
		$('select[name=dataType_col_b]').val() == "number") {
		$("input[class=no_val_val]").attr('disabled', false);
		$("input[class=no_string]").attr('disabled', true);
  } else if ($('select[name=dataType_col_a]').val() == "number" && 
		$('select[name=dataType_col_b]').val() == "number") {
		$("input[class=no_val_val]").attr('disabled', true);
		$("input[class=no_string]").attr('disabled', false);
  } else {
		$("input[type=radio]").attr('disabled', true);  	
  }
};
// END OF - DISABLES INACTIVE CHART TYPES

$('select').change(function() {
	datatypeConfirm();
});

function addPieRotateSlider() {
		// console.log("running ROTATE SLIDER");
	$("#select_typ").append("<span id='rot'><label for='slider3'> Degrees of rotation: " + 
		"</label><input id='slider3' type ='range' min ='-180' max='180' step ='10' value='0'/>" + 
		"<input type='text' id='rangeValue3' size='4' value='0' readonly/></span>");
};

function addPieHoleSlider() {
	// console.log("RUNNING PIE HOLE SLIDER");
	$("span[ID='rot']").append("<label for='piehole3'> Donut hole (range 0 - 0.9 of radius): </label>" + 
		"<input id='piehole3' type='range' min ='0' max='0.9' step='0.05' value='0'/>" + 
		"<input type='text' id='holeRange3' size='2' value='0' readonly/>")
};

function pieRefresh(deg, hole) {
	var data = new google.visualization.DataTable();
		// console.log("pie refresh function")

		//NOTE - PIE ONLY TAKES TWO COLUMNS OF DATA
		data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
					   $('#real-data input[name=label_col_a]').val());
		data.addColumn($('#real-data select[name=dataType_col_b]').val(), 
					   $('#real-data input[name=label_col_b]').val());

		var last_row = parseInt($('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);

			for(var i=1;i<=last_row;i++) {
				var neg = /^\-/
				var bbb = $('#real-data input[name=cell_' + i + '_b').val();

				if (neg.test(bbb) == true){
					$('#real-data input[name=cell_' + i + '_b').css({"border":"2px solid red", "color":"red"});
					$('#rot').remove();
					alert("negative numbers are invalid for a pie chart");
					return false
				} else {
					$('#real-data input[name=cell_' + i + '_b').css({"border":"2px inset", "color":"initial"});
				}

				data.addRows([
				[($('#real-data input[name=cell_' + i + '_a').val()),
					parseFloat($('#real-data input[name=cell_' + i + '_b').val())]
				]);
			}

		var wid = $("#width_chart").val();
		var hei = $("#height_chart").val();
	    var piechart = new google.visualization.PieChart(document.getElementById('chart_div0'));

	if ($('input[name=chart_type]:radio:checked').val()=="pie") {
		var three_dee = true;
		chartType = "pie";
	} else {
		var three_dee = false;
		chartType = "donut";
	}
			var options = {
	          // legend: 'none',
	           'width':wid,
	           'height':hei,
	          pieSliceText: 'label',
	          title: ($('input[name=chart_title]').val()),
	          pieStartAngle: deg, //change to slider variable see rotate_pie.html
	          pieHole: hole,
	          is3D: three_dee,
			};
	piechart.draw(data, options);

	// if(typeof(bigArrayForExport=='undefined')){ bigArrayForExport=[]}

	findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
}

function revise(){
	console.log("running REVISE - sampler9jan2")

	datatypeConfirm();

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

function stackedCheckboxAppears() {
    $("#height_chart").after("<input id='stack' type='checkbox' name='stacked_column' value='true'></input><label id='stack2'for='stack'>stacked columns</label>");

    $("#stack, #stack2").bind('click', function(){
      console.log("stackclick");
      check = true
      // drawChartTest();
      //note - i did try reviseColumn() - but said it was undefined
    });
};

function refreshing(){
	var data = new google.visualization.DataTable();

    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
    var last_col_integer = last_col.charCodeAt(0) + 1;
	var col_a_int = 97;

	var deg = 0;
	var hole = 0;

	// var TOT_COL = last_col_integer - col_a_int;

	var number_of_columns = $('#row_1 td').length;

	if(number_of_columns <= 2){
		check = "missing"
	} else if ($('input[id=stack]:checkbox:checked').val()=='true'){
		check = true
	} else {
		check = false
	};

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

		if($('input[class=no_val_val]:radio:checked').val()==undefined){
			alert("Please select an available chart type");
			return false;
		}

		var column_a_label = $('#real-data input[name=label_col_a]').val();

		grandLabel = [];
			grandLabel.push(column_a_label);
		strLabel = [];
			strLabel.push("'"+column_a_label+"'")

		var col_b_num = 98;
	    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
	    // console.log("line 193 last_col " + last_col);
	    var last_col_int = last_col.charCodeAt(0);

	  	console.log("line 197 last_col_int " + last_col_int)

		var chType = $('input[name=chart_type]:radio:checked').val();
	  	if (chType=="donut"|chType=="pie"|chType=="scatter"|chType=="trend_lin"|chType=="trend_exp"|chType=="trend_poly"){
	  		last_col_int = 98;
	  	}

  		//WHILE LOOP - ASSIGNS LABELS (FROM NUMBER COLUMNS) TO THE CHART FROM THE GRID
		// var pf_num = 1
		while(col_b_num <= last_col_int){
			var col_letter = String.fromCharCode(col_b_num);
			var labelll = $("#real-data input[name=label_col_" + col_letter + "]").val();
			grandLabel.push(labelll);
			strLabel.push("'"+labelll+"'");
			// var lab = $("#real-data select[name=dataType_col_" + col_letter + "]").val(data.Pf[pf_num].type);
			var lab = $("#real-data select[name=dataType_col_" + col_letter + "]").val();
			console.log("var label: " + lab); //result should be number
			col_b_num++;
			// pf_num++;
		};

		console.log("line 238 grandLabel " + grandLabel); // ARRAY OF LABELS

	    var last_row = parseInt($('#real-data tr:last-of-type').attr('id').split('_')[1]);
		var num_of_rows = last_row;
		var col_a_int = 97; //reset var
		var col_b_num = 98;

		var str_col_a = [];
		var stringy_string_array = [];

		for(var i=1;i<=last_row;i++) { //LOOP GATHERS COL A DATA - STRING
			var valu = $("#real-data #cell_" + i + "_a").val();
			str_col_a.push(valu);
			stringy_string_array.push("'" + valu + "'");
		}

		str_col_array = [str_col_a]; // STRING ARRAY FROM COLUMN A


		var chType = $('input[name=chart_type]:radio:checked').val();
	  	if (chType=="donut"|chType=="pie"|chType=="scatter"|chType=="trend_lin"|chType=="trend_exp"|chType=="trend_poly"){
	  		last_col_int = 98;
	  	}



	    while(col_b_num <= last_col_int){ //LOOP GATHERS COL B, C, etc. DATA
	        var col_letter = String.fromCharCode(col_a_int);
	        var col_letter = String.fromCharCode(col_b_num);
	        var c_num = col_b_num - 97; //rem col b onwards are number types
	        var somekind_of_array_float = []; 

	            for(var i=1;i<=last_row;i++) {
	                var valu = $("#real-data #cell_" + i + "_" + col_letter).val();
	                //RESET ANY ALERT COLORING  //
	                $("#real-data #cell_" + i + "_" + col_letter).css({"border":"2px inset", "color":"initial"});

	                if(isNaN(valu)==false){ //will only add numbers to array
		            	somekind_of_array_float.push(parseFloat(valu));
		  			} else {
		  				$("#real-data #cell_" + i + "_" + col_letter).css({"border":"2px solid red", "color":"red"});
		  				alert("Data in number column must begin with a number," + '\r' + "or a minus sign followed by a number.");
						return false;
		  			}
	            };//END OF FOR LOOP

	    	console.log("str_col_array " + str_col_array);	//THE WINNER
			str_col_array.push(somekind_of_array_float);

	        col_b_num++;

	    };//END OF WHILE LOOP

		var num_of_cols = (str_col_array.length);

		console.log("num_of_rows: " + num_of_rows);
		console.log("num_of_cols: " + num_of_cols);
		console.log("LINE 302 - check: " + check);
		console.log("OUT OF LOOP str_col_array " + str_col_array);
		console.log("stringy_string_array " + stringy_string_array);

		var kitchenSink = [] // CREATING THE ARRAY OF ARRAYS
		var bigArrayForExport = []
	 	kitchenSink.push(grandLabel);
	 	bigArrayForExport.push("\r			["+strLabel+"]");
	    for(var k=0; k<= num_of_rows -1; k++){
	    		var no_string_stuff = []
				var stuff=[]
	     	for(var i=0; i<= num_of_cols -1; i++){
	     		no_string_stuff.push(str_col_array[i][k]);
	     		if(i!=0){ 
		     		stuff.push(str_col_array[i][k]);
		     	} else {
		     		stuff.push("'" + str_col_array[i][k] + "'"); //first col stringified
		     	}
	     	}
	     	 kitchenSink.push(no_string_stuff); // large array for chart draw
	     	 // console.log(kitchenSink);
	     	 bigArrayForExport.push("\r			["+stuff+"]");
	     }

	    // $("#refresh").css({"border":"2px outset buttonface", "color":"initial"})

	    var chartType = $('input[name=chart_type]:radio:checked').val();
		var data = google.visualization.arrayToDataTable( kitchenSink );
		// shoving all arrays (kitchenSink) into google vis DataTable

		console.log("KITCHENSINK " + kitchenSink);
		console.log("bigArrayForExport " + bigArrayForExport);
		console.log("data " + data);
		console.log("check " + check);
		console.log("deg " + deg);
		console.log("hole " + hole);

		drawNewChart(data, check, deg, hole, bigArrayForExport); 
		bigArrayForExport.push(drawNewChart);

	  //END of col a = string && col b = number IF statement   
	} else if ($('#real-data select[name=dataType_col_a]').val() == "number" && 
		$('#real-data select[name=dataType_col_b]').val() == "number") {
		console.log("does NOT work with stepchart or piechart ...number number");

		if($('input[class=no_string]:radio:checked').val()==undefined){
			alert("Please select an available chart type");
			return false;
		}

		data.addColumn($('#real-data select[name=dataType_col_a]').val(), 
					   $('#real-data input[name=label_col_a]').val());
		data.addColumn($('#real-data select[name=dataType_col_b]').val(), 
					   $('#real-data input[name=label_col_b]').val());

		label_array = ["\r			['" + $('#real-data input[name=label_col_a]').val() + "', '" + $('#real-data input[name=label_col_b]').val() + "']" ]

		bigArrayForExport = [];
		bigArrayForExport.push(label_array);

		var last_row = parseInt($('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
		
		for(var i=1;i<=last_row;i++) {
			var aaa = parseFloat($('#real-data input[name=cell_' + i + '_a').val());
			var bbb = parseFloat($('#real-data input[name=cell_' + i + '_b').val());

			console.log("aaa " + aaa);
			console.log("bbb " + bbb);
			if (isNaN(aaa)==true) {
				$('#real-data input[name=cell_' + i + '_a').css({"border":"2px solid red", "color":"red"});
					alert("Data in first column must begin with a number," + '\r' + "or a minus sign followed by a number.");
					return false
				} else if (isNaN(bbb)==true) {
				$('#real-data input[name=cell_' + i + '_b').css({"border":"2px solid red", "color":"red"});
					alert("Data in second column must begin with a number," + '\r' + "or a minus sign followed by a number.");
					return false
				} else {
					$('#real-data input[name=cell_' + i + '_a').css({"border":"2px inset", "color":"initial"});
					$('#real-data input[name=cell_' + i + '_b').css({"border":"2px inset", "color":"initial"});
			}
			

			data.addRows([
				[aaa, bbb]
			]);

					bigArrayForExport.push("\r			[" + aaa + "," + bbb + "]");
					console.log("bigArrayForExport " + bigArrayForExport);
			a_val = $('#real-data input[name=cell_' + i + '_a').val();
			console.log(a_val);
			console.log(typeof a_val);
			acceptable_number = rest = /^\+|^\-|^\d/;
			letters = /[A-Za-z]/;
			dot = /^\./;
			//space = /^\s+/;
			//starts_with_space = space.test(a_val);
			//if (starts_with_space == true) { alert (" WARNING: You have a space in front of a number, that number will not be rendered.")}
			starts_with_dot = dot.test(a_val);
			if (starts_with_dot == true) { a_val = parseFloat(a_val);}
			console.log(">>>>>>>>>>> a_val line 261: " + a_val);
			contains_letters = letters.test(a_val);
			console.log(">>>>>>>>> contains letters " + contains_letters);
			if (contains_letters == true){ 
				$('#real-data input[name=cell_' + i + '_a').css({"border":"2px solid red", "color":"red"});
				alert("Make sure there are no letters or symbols in the number column");
			 	return false;
			 };
			if (acceptable_number == false) { alert ("CHART CAN NOT BE DRAWN" + '\r' + " Numbers must start with a number, + or - sign."); return false;}
            console.log("line 244 col b" + parseInt($('#real-data input[name=cell_' + i + '_b').val()));
		}
		// findOptionCode(data, chartType, check, deg, hole);
		drawNewChart(data, check, deg, hole, bigArrayForExport); 

	} else {
		console.log("col a: " + $('#real-data select[name=dataType_col_a]').val())
		console.log("col b: " + $('#real-data select[name=dataType_col_b]').val())
		alert("please correct data type");
		return false;
	}
};

//TICKS https://developers.google.com/chart/interactive/docs/gallery/columnchart
//see h.axis or v.axis ticks
