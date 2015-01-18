

function exportCode (data, chartType, check) {

var column = data.Pf
var row = data.Nf;
	console.log("data in exportCode function: " + data);
	console.log("check variable in exportCode function: " + check);
	console.log("EXPORT CODE reverse engineer " + row[0].c[0].v);//shows A - cel 1 col 1
	console.log("EXPORT CODE reverse engineer LABEL " + column[0].label);
	console.log("EXPORT CODE reverse engineer TYPE " + column[0].type);

var row = data.Nf;
            var last_row = parseInt($('#real-data tr:last-of-type').attr('id').split('_')[1]);
            var last_col = $('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
            var last_col_int = last_col.charCodeAt(0);
            var next_col_int = last_col_int + 1;
            var next_col = String.fromCharCode(next_col_int);
            var next_row = last_row + 1;
            var col_a_int = 97;

            console.log("EXPORT CODE last_col line 18: " + last_col);
            console.log("EXPORT CODE next_col line 29: " + next_col);

          //pull from URL datatype string or number for first column
            // $("#dataType_col_a").val(data.Pf[0].type)
            var dataType_col_a = column[0].type;
            console.log("EXPORT CODE dataType_col_a "+ dataType_col_a)

          //assign rest of column types as number
          var column_num = 0
          while(col_a_int +1 <= last_col_int){
              var col_letter = String.fromCharCode(col_a_int);
              $("#real-data #data_types #dataType_col_" + col_letter).attr("value", "number");
              col_a_int++;
              column_num++;
          };
var row = data.Nf;
var column = data.Pf
            //resetting variables
            var column_num = 0
            var col_a_int = 97;
            //ASSIGN column label names

            //NOTE - COLUMN NAME USED TO READ
            //    $("#col_a_label").attr("value", data.Pf[0].label) // column name
            while(col_a_int <= last_col_int){
                var col_letter = String.fromCharCode(col_a_int);
                var label_id = $("#real-data #label_col_" + col_letter);

                  if (typeof(column[column_num]) !== "undefined"){
                      label_id.attr("value", column[column_num].label);
                      console.log("line 261 " + column[column_num].label + "col a int" + col_a_int )
                  } else {
                      console.log("label is undefined");
                      label_id.attr("value", "Column " + (col_letter).toUpperCase())
                  }

                col_a_int++;
                column_num++;
            };
var row = data.Nf;
var column = data.Pf
            //FORMAT:
            //$("#real-data #label_col_" + col_letter).attr("value", data.Pf[pf_num].label);
         
          //uploading cell data from URL
            var col_a_int = 97; //reset var
            while(col_a_int <= last_col_int){
                var col_letter = String.fromCharCode(col_a_int);
                var c_num = col_a_int -97;

                    for(var i=1;i<=last_row;i++) {
                        var col_id = $("#real-data #cell_" + i + "_" + col_letter);
                      //check to see if data exists in corresponding cell in URL
                      //if it does exist, add data, if not, make value null
                          if (typeof(row[i-1]) !== undefined ){
                              console.log(row[i-1].c[c_num].v);

                              acceptable_number = rest = /^\+|^\-|^\d/;
								letters = /[A-Za-z]/;
								dot = /^\./;
                              a_val = row[i-1].c[c_num].v;
                              starts_with_dot = dot.test(a_val);
								if (starts_with_dot == true) { a_val = parseFloat(a_val);}
								console.log(">>>>>>>>>>> a_val line 261: " + a_val);
								contains_letters = letters.test(a_val);
								console.log(">>>>>>>>> contains letters " + contains_letters);


                              col_id.attr("value", row[i-1].c[c_num].v)
                              console.log("line 328 --- Nf is defined")
                          } else {
                              console.log("line 331 ---- Nf is not defined")
                              col_id.val(null)
                          }
                    };

                col_a_int++;
            }; // END OF col_a_int while loop

// Pf[0].type is the data type for column 0
// Pf[0].label is the label for column 0 
// Nf[0] is row 0
// c[0] is column 0
// v is the value
var row = data.Nf;
var column = data.Pf
console.log("line 86 - nf0 c 0:" + row[0].c[0].v)

function dataTypeForCol(column) {
	data.Pf[column].type
}

function columnLabel(column) {
	data.Pf[column].label
}

function rowData(row_number) {
	Nf[row_number];
}

function columnData(column) {
	c[column].v;
}


      // var options = {
var chartTitle = $('input[name=chart_title]').val();
                // hAxis: {title: (data.Pf[0].label)},
                // vAxis: {title: (data.Pf[1].label)},
                          // 'width':500,
                          // 'height':400
                        // };
              // var chart = new google.visualization.ColumnChart(document.getElementById('chart_div0'));
//
              //set default width and height
var chartWidth = $("#width_chart").val();
var chartHeight = $("#height_chart").val();

              // exportCode(); //what ARGUMENTS TO PASS IN?
//chart type
                //RADIO  .attr('checked', 'checked');
console.log("radio button: " + $('input[type="radio"]:checked').val())
console.log("chart type " + chartType);
console.log("checkbutton status: " + check);
var selectedChartType = $('input[name=chart_type]:radio:checked').val();
var indeed = $('input[name=chart_type]:radio:checked').val()

// data.Nf[0].c[0].v
// data.Nf[1].c[1].v
// data.Nf[2].c[0].v
var theBigARRAY =[[" 'TITLE': "] + [chartTitle], [" 'WIDTH': "] + [chartWidth], [" HEIGHT: "] + 
[chartHeight], " 'CHART TYPE': " + [selectedChartType]]


///NOTE - you might not need to pull datatype for each column -
//MAYBE ONLY FOR COL A -- since all the rest will be number
//(UNLESS OF COURSE YOU DO IGNORE)
var i = [column[0].type, " " + column[1].type, " " + data.Pf[0].type, " " + data.Pf[1].type]


	//FIND LOWEST AND HIGHEST NUMBERS FOR VERTICAL AND HORIZ AXES
	var col_a_array = [ parseInt($('#real-data input[name=cell_1_a]').val()), parseInt($('#real-data input[name=cell_2_a]').val()), parseInt($('#real-data input[name=cell_3_a]').val()), parseInt($('#real-data input[name=cell_4_a]').val())];
	var col_b_array = [ parseInt($('#real-data input[name=cell_1_b]').val()), parseInt($('#real-data input[name=cell_2_b]').val()), parseInt($('#real-data input[name=cell_3_b]').val()), parseInt($('#real-data input[name=cell_4_b]').val())];
	var max_a = Math.max.apply(Math,col_a_array);
	var min_a = Math.min.apply(Math,col_a_array);
	var max_b = Math.max.apply(Math,col_b_array);
	var min_b = Math.min.apply(Math,col_b_array);

	console.log("max_a: " + max_a + "min_a: " + min_a + "max_b: " + max_b + "min_b: " + min_b);

	var radio = ($('input[type=radio]:checked').val())
	var col_a_array_nan = [ $('#real-data input[name=cell_1_a]').val(), $('#real-data input[name=cell_2_a]').val(), $('#real-data input[name=cell_3_a]').val(), $('#real-data input[name=cell_4_a]').val()];
	//EXPORTING CODE ---- experiment -- make this into separate function
	// this sep function should upload on start of program as well
	var yep = 567;
	var title = $('input[name=chart_title]').val();
	n = $('#real-data input[name=cell_1_a]').val()
	if ( isNaN(n) == true) {
		console.log("no num in col a")
		var mess = "no num in col a" //variable is trapped in scope of if statement
	};
	var label_col_a = $('#real-data input[name=label_col_a]').val()
	var label_col_b = $('#real-data input[name=label_col_b]').val()
	var dataValA = $('#real-data select[name=dataType_col_a]').val()
	var dataValB = $('#real-data select[name=dataType_col_b]').val()

	console.log("minimum col a: " + parseInt(min_a)) 
	document.getElementsByName('export_code')[0].value=('STILL IN TEST MODE' +
		' minValue: ' +  ', maxValue: ' + '\r' + '\r' +
		" width: " + " height: " + " num of cols: " + " num of rows " + '\r' +
		 "   XXXXXXX CHART TYPE:  " + //radio + "  XXXXXXXX" + '\r' + '\r' +
	 "<html>" + '\r' + (column[0].type) + (data.Pf[1].type) + (column[0].type) +
	  "	<head>" + '\r' +
	" and the var direct: " + indeed + "return I looppy " + theBigARRAY + 
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
	        "		]);" + '\r' + //mess + " XXXXXXXX  " + 
			//col_a_array + " OR IF NaN: " + col_a_array_nan + " col b array " + col_b_array + " dataval:" + dataValA + " B: " + dataValB + '\r' +

	        "		var options = {" +
	          "			chart: { title: '" + //title + "'' ," +
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