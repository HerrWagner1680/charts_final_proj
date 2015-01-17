//DISABLES INACTIVE CHART TYPES
$('select').change(function() {
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

		var wid = $("#width_chart").val();
		var hei = $("#height_chart").val();
	    var piechart = new google.visualization.PieChart(document.getElementById('chart_div0'));

	if ($('input[name=chart_type]:radio:checked').val()=="pie") {
		var three_dee = true
	} else {
		var three_dee = false
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
		var col_b_num = 98;
	    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
	    console.log("line 193 last_col " + last_col);
	    var last_col_int = last_col.charCodeAt(0);

	  	console.log("line 197 last_col_int " + last_col_int)

  		//WHILE LOOP - ASSIGNS LABELS (FROM NUMBER COLUMNS) TO THE CHART FROM THE GRID
		  var pf_num = 1
		  while(col_b_num <= last_col_int){
		      var col_letter = String.fromCharCode(col_b_num);
		      var labelll = $("#real-data input[name=label_col_" + col_letter + "]").val();
		      grandLabel.push(labelll);
		      // var lab = $("#real-data select[name=dataType_col_" + col_letter + "]").val(data.Pf[pf_num].type);
		      var lab = $("#real-data select[name=dataType_col_" + col_letter + "]").val();
		      console.log("var label: " + lab); //result should be number
		      col_b_num++;
		      pf_num++;
		  };

	console.log("line 238 grandLabel " + grandLabel); // ARRAY OF LABELS

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

				str_col_array = [str_col_a]; // STRING ARRAY FROM COLUMN A
    while(col_b_num <= last_col_int){
        var col_letter = String.fromCharCode(col_a_int);
        var col_letter = String.fromCharCode(col_b_num);
        var c_num = col_b_num - 97; //rem first col is string

                var somekind_of_array_float = []; 

            for(var i=1;i<=last_row;i++) {
                var valu = $("#real-data #cell_" + i + "_" + col_letter).val();

                space = /^\s+/;
				starts_with_space = space.test(valu);
				if (starts_with_space == true) { alert (" WARNING: You have a space in front of a number, which means that number will not be rendered.")}
    //             dot = /^\./;
				// starts_with_dot = dot.test(valu);
				// if (starts_with_dot == true) { alert (" Decimals must start with a 0, not with a dot."); return false;}
                somekind_of_array_float.push(parseFloat(valu));
            };//END OF FOR LOOP

    	console.log(str_col_array);	//THE WINNER
		str_col_array.push(somekind_of_array_float);

        col_b_num++;

    };//END OF WHILE LOOP

	var num_of_cols = (str_col_array.length);

	console.log("num_of_rows: " + num_of_rows);
	console.log("num_of_cols: " + num_of_cols);
	console.log("LINE 302 - check: " + check);

	var kitchenSink = [] // CREATING THE ARRAY OF ARRAYS
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

    var chartType = $('input[name=chart_type]:radio:checked').val();

	var data = google.visualization.arrayToDataTable( kitchenSink );
	// shoving all arrays (kitchenSink) into google vis DataTable
	    console.log("checkbox marked? " + check);
	    exportCode(data,chartType,check);
	    drawNewChart(data,check); 
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

		var last_row = parseInt($('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
		
		for(var i=1;i<=last_row;i++) {
			data.addRows([
			[parseInt($('#real-data input[name=cell_' + i + '_a').val()),
				parseInt($('#real-data input[name=cell_' + i + '_b').val())]
			]);
			a_val = $('#real-data input[name=cell_' + i + '_a').val();
			console.log(a_val);
			console.log(typeof a_val);
			acceptable_number = rest = /^\+|^\-|^\d/;
			letters = /[A-Za-z]/;
			dot = /^\./;
			space = /^\s+/;
			starts_with_space = space.test(a_val);
			if (starts_with_space == true) { alert (" WARNING: You have a space in front of a number, which means that number will not be rendered.")}
			starts_with_dot = dot.test(a_val);
			if (starts_with_dot == true) { alert (" For scatter and trend charts, decimals must start with a 0, not with a dot."); return false;}
			contains_letters = letters.test(a_val);
			console.log(contains_letters);
			if (acceptable_number == false) { alert ("CHART CAN NOT BE DRAWN" + '\r' + " Numbers must start with a number, + or - sign."); return false;}
            console.log("line 244 col b" + parseInt($('#real-data input[name=cell_' + i + '_b').val()));
		}

		drawNewChart(data);
	} else {
		console.log("col a: " + $('#real-data select[name=dataType_col_a]').val())
		console.log("col b: " + $('#real-data select[name=dataType_col_b]').val())
		alert("please correct data type");
	}
};

//TICKS https://developers.google.com/chart/interactive/docs/gallery/columnchart
//see h.axis or v.axis ticks
