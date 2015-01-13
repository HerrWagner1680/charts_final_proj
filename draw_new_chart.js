
function drawNewChart(data) {

	// if(rotate_slider='undefined'){ var rotate_slider=0 }
	// if(piehole_slider='undefined'){ var piehole_slider=0 }

	var options = {
			'title': ($('#real-data input[name=chart_title]').val()),
		    vAxis: {title: ($('#real-data input[name=col_a_label]').val())},
		    hAxis: {title: ($('#real-data input[name=col_b_label]').val())},
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
					'title': ($('#real-data input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=col_a_label]').val())},
				    vAxis: {title: ($('#real-data input[name=col_b_label]').val())},
	              	'width':500,
	              	'height':400
	              };

			console.log("area switch"); areachart.draw(data, options);
			break;
		case "bar":
			console.log("bar switch"); barchart.draw(data, options);
			break;
		case "step":
			//switch labels
			var options = {
					'title': ($('#real-data input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=col_a_label]').val())},
				    vAxis: {title: ($('#real-data input[name=col_b_label]').val())},
	              	'width':500,
	              	'height':400
	              };
			console.log("step switch"); stepchart.draw(data, options);
			break;
		case "column":
			//switch labels
			var options = {
					'title': ($('#real-data input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=col_a_label]').val())},
				    vAxis: {title: ($('#real-data input[name=col_b_label]').val())},
	              	'width':500,
	              	'height':400
	              };
			console.log("column switch"); columnchart.draw(data, options);
			break;
		case "line":
			//switch labels
			var options = {
					'title': ($('#real-data input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=col_a_label]').val())},
				    vAxis: {title: ($('#real-data input[name=col_b_label]').val())},
	              	'width':500,
	              	'height':400
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
	          title: ($('#real-data input[name=chart_title]').val()),
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
	          title: ($('#real-data input[name=chart_title]').val()),
	          pieStartAngle: 0, //change to slider variable see rotate_pie.html
	          is3D: true,
			};
			$("#slider3").change(revise);
			piechart.draw(data, options);
			break;

		case "scatter":
			console.log("scatter switch");
			var options = {
				'title': ($('#real-data input[name=chart_title]').val()),
		    	vAxis: {title: ($('#real-data input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
		    	hAxis: {title: ($('#real-data input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
			};
		     scatterchart.draw(data, options);   // str/val ONLY
			break;
		case "trend_lin":
			console.log("trend_lin switch");
			var options = {
				'title': ($('#real-data input[name=chart_title]').val()),
			    vAxis: {title: ($('#real-data input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('#real-data input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
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
				'title': ($('#real-data input[name=chart_title]').val()),
			    vAxis: {title: ($('#real-data input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('#real-data input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
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
				'title': ($('#real-data input[name=chart_title]').val()),
			    vAxis: {title: ($('#real-data input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
			    hAxis: {title: ($('#real-data input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
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
