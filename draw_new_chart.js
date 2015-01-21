function drawNewChart(data, check, deg, hole, bigArrayForExport) {

	if (deg == undefined){ deg = 0 };
	if (hole == undefined){ hole = 0 };

	// console.log("reverse engineer " + data.Nf[0].c[0].v);//shows A - cel 1 col 1
	// console.log("reverse engineer LABEL " + data.Pf[0].label);
	// console.log("reverse engineer TYPE " + data.Pf[0].type);
	// console.log("drawnewchart var DATA: " + data);
	// console.log("DRAW NEW CHART - check: " + check);

	var wid = $("#width_chart").val();
	var hei = $("#height_chart").val();

	var stack = $('input[id=stack]:checkbox:checked').val()

	var options = {
			'title': ($('input[name=chart_title]').val()),
		    vAxis: {title: ($('#real-data input[name=label_col_a]').val())},
		    hAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width':wid,
	              	'height':hei
	              };

	var chartType = $('input[name=chart_type]:radio:checked').val();
	// exportCode (data, chartType, check);
	console.log("about to run optioncode function");

	// findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);

	console.log("done with option code function");
	var last_row = parseInt($('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);

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
	var max_b = Math.max.apply(Math,col_a_array);
	var min_b = Math.min.apply(Math,col_a_array);
	var max_a = Math.max.apply(Math,col_b_array);
	var min_a = Math.min.apply(Math,col_b_array);

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
			console.log("area switch"); 
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
			areachart.draw(data, options);
			break;
		case "bar":
			console.log("bar switch"); 
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
			barchart.draw(data, options);
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
			console.log("step switch"); 
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
			stepchart.draw(data, options);
			break;
		case "column":
			if (check == "missing") {
				var options = {
					'title': ($('input[name=chart_title]').val()),
					hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
					vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
					'width': wid,
					'height': hei,
					isStacked: false
				};
				console.log("column switch - no checkbox"); 
				findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
				columnchart.draw(data, options);
				break;
			} else {
				stackedCheckboxAppears();
				$('input[id=stack]').attr('checked',check);
				//switch labels
				var options = {
						'title': ($('input[name=chart_title]').val()),
					    hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
					    vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
		              	'width': wid,
		              	'height': hei,
		              	isStacked: check
		              };
				console.log("column switch - with checkbox"); 
				findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
				columnchart.draw(data, options);
				break;
			} 
		case "line":
			//switch labels
			var options = {
					'title': ($('#real-data input[name=chart_title]').val()),
				    hAxis: {title: ($('#real-data input[name=label_col_a]').val())},
				    vAxis: {title: ($('#real-data input[name=label_col_b]').val())},
	              	'width': wid,
	              	'height': hei
	              };
			console.log("line switch"); 
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
			linechart.draw(data, options);
			break;

	//NOTE donut covers regular pie chart and donut chart with range sliders
		case "donut":
			for(var i=1;i<=last_row;i++) {
				var neg = /^\-/
				var bbb = $('#real-data input[name=cell_' + i + '_b').val();
				
				if (neg.test(bbb) == true){
					$('#real-data input[name=cell_' + i + '_b').css({"border":"2px solid red", "color":"red"});
					alert("negative numbers are invalid for a pie chart");
					return false
				} else {
					$('#real-data input[name=cell_' + i + '_b').css({"border":"2px inset", "color":"initial"});
				}
			}
			console.log("about to run addPieRotateSlider");
			addPieRotateSlider();
			console.log("about to run pieHoleSlider");
			addPieHoleSlider();
			console.log("pie / donut switch"); 
			var options = {
	          // legend: 'none', 
				 'width': wid,
	             'height': hei,
	          pieSliceText: 'label',
	          title: ($('input[name=chart_title]').val()),
	          pieStartAngle: 0, //change to slider variable see rotate_pie.html
	          pieHole: 0, //change to slider variable see rotate_pie.html
			};
			$("#slider3").change(revise);
			$("#piehole3").change(revise);

			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
			//NOTE - piehole does not work in 3d mode
			piechart.draw(data, options);
			break

	//NOTE case pie is 3d pie - only has one range slider
		case "pie":
			for(var i=1;i<=last_row;i++) {
				var neg = /^\-/
				var bbb = $('#real-data input[name=cell_' + i + '_b').val();
				
				if (neg.test(bbb) == true){
					$('#real-data input[name=cell_' + i + '_b').css({"border":"2px solid red", "color":"red"});
					alert("negative numbers are invalid for a pie chart");
					return false
				} else {
					$('#real-data input[name=cell_' + i + '_b').css({"border":"2px inset", "color":"initial"});
				}
			}
			addPieRotateSlider();
			console.log("pie switch"); 
			var options = {
	          // legend: 'none',
				   'width': wid,
	               'height': hei,
	          pieSliceText: 'label',
	          title: ($('input[name=chart_title]').val()),
	          pieStartAngle: 0, //change to slider variable see rotate_pie.html
	          is3D: true,
			};
			$("#slider3").change(revise);

			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
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
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
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
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
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
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
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
			findOptionCode(data, chartType, check, deg, hole, bigArrayForExport);
			scatterchart.draw(data, options);   // str/val ONLY
			console.log("trend_poly switch");
			break;
		default:
	        console.log('default');
	      	alert("please select a chart");
	      	break;
	}; // END OF SWITCH CASE 
}; //END OF drawNewChart function
