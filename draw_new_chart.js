function drawChartTest() {

	console.log("RUNNING drawChartTest function")

	// stackedCheckboxAppears()	
	var data = google.visualization.arrayToDataTable([
	  ['12342', '1234', '23423', '2342'],
	  [2014, 1000, 400, 200],
	  [2015, 1170, 460, 250],
	  [2016, 660, 1120, 300],
	  [2017, 1030, 540, 350]
	]);

	var wid = $("#width_chart").val()
	var hei = $("#height_chart").val()

	var stack = $('input[id=stack]:checkbox:checked').val()

	var options = {
	  	'height': hei,
	  	'width': wid,
	    isStacked: stack
	};

	console.log(hei);
	console.log(wid);

	$("#stack").click(drawChartTest);

	var chart = new google.visualization.ColumnChart(document.getElementById('chart_div0'));

	chart.draw(data, options);
}

function drawNewChart(data, check) {

	var wid = $("#width_chart").val()
	var hei = $("#height_chart").val()

	var stack = $('input[id=stack]:checkbox:checked').val()

	var options = {
			'title': ($('input[name=chart_title]').val()),
		    vAxis: {title: ($('#real-data input[name=label_col_a]').val())},
		    hAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width':wid,
	              	'height':hei
	              };

//ASSIGNING METHOD NAMES FOR EACH GOOGLE CHART
    var areachart = new google.visualization.AreaChart(document.getElementById('chart_div0'));
    var barchart = new google.visualization.BarChart(document.getElementById('chart_div0'));
    var stepchart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div0'));
    var columnchart = new google.visualization.ColumnChart(document.getElementById('chart_div0'));
    var linechart = new google.visualization.LineChart(document.getElementById('chart_div0'));
    var piechart = new google.visualization.PieChart(document.getElementById('chart_div0'));
    var scatterchart = new google.visualization.ScatterChart(document.getElementById('chart_div0'));

//FIND LOWEST AND HIGHEST NUMBERS FOR VERTICAL AND HORIZ AXES
	var col_a_array = [ parseInt($('#real-data input[name=cell_1_a]').val()), parseInt($('#real-data input[name=cell_2_a]').val()), parseInt($('#real-data input[name=cell_3_a]').val()), parseInt($('#real-data input[name=cell_4_a]').val())];
	var col_b_array = [ parseInt($('#real-data input[name=cell_1_b]').val()), parseInt($('#real-data input[name=cell_2_b]').val()), parseInt($('#real-data input[name=cell_3_b]').val()), parseInt($('#real-data input[name=cell_4_b]').val())];
	var max_a = Math.max.apply(Math,col_a_array);
	var min_a = Math.min.apply(Math,col_a_array);
	var max_b = Math.max.apply(Math,col_b_array);
	var min_b = Math.min.apply(Math,col_b_array);

	exportCode (data);

//READ SELECTED RADIO BUTTONS AND REDRAW CHART
	switch($('input[name=chart_type]:radio:checked').val()) {
		case "area":
			//switch labels
			var options = {
					'title': ($('input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
				    vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width': wid,
	              	'height': hei
	              };

			console.log("area switch"); areachart.draw(data, options);
			break;
		case "bar":
			console.log("bar switch"); barchart.draw(data, options);
			break;
		case "step":
			//switch labels
			var options = {
					'title': ($('input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
				    vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width': wid,
	              	'height': hei
	              };
			console.log("step switch"); stepchart.draw(data, options);
			break;
		case "column":
			stackedCheckboxAppears()
			$('input[id=stack]').attr('checked',check)
			//switch labels
			var options = {
					'title': ($('input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
				    vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width': wid,
	              	'height': hei,
	              	isStacked: check
	              };
			console.log("column switch"); columnchart.draw(data, options);
			break;
		case "line":
			//switch labels
			var options = {
					'title': ($('#real-data input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
				    vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width': wid,
	              	'height': hei
	              };
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
	          title: ($('input[name=chart_title]').val()),
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
	          title: ($('input[name=chart_title]').val()),
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
		    	vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},
		    	hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},
	              	'width': wid,
	              	'height': hei

			};
		     scatterchart.draw(data, options);   // str/val ONLY
			break;
		case "trend_lin":
			console.log("trend_lin switch");
			var options = {
				'title': ($('input[name=chart_title]').val()),
			    vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},
	              	'width': wid,
	              	'height': hei,


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
			    vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},

	              	'width': wid,
	              	'height': hei,


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
			    vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},
	              	'width': wid,
	              	'height': hei,



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

function reviseColumn() {

	console.log("running fake data - to be later inserted with...? function?")
		var data = google.visualization.arrayToDataTable([
	  ['12342', '1234', '23423', '2342'],
	  [2014, 1000, 400, 200],
	  [2015, 1170, 460, 250],
	  [2016, 660, 1120, 300],
	  [2017, 1030, 540, 350]
	]);

		var wid = $("#width_chart").val()
		var hei = $("#height_chart").val()

		var stack = $('input[id=stack]:checkbox:checked').val()

				var options = {
					'title': ($('input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
				    vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width': wid,
	              	'height': hei,
	              	isStacked: stack
	              	// isStacked: true
	              };
			console.log("revise column"); columnchart.draw(data, options);
};
