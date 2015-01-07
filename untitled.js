  minValue - lowest # in column_a(hAxis)
  maxValue - highest # in column_a(hAxis)

var col_a_array = [ cell_1a, cell_2a, cell_3a, cell_4a ];
var col_b_array = [ cell_1b, cell_2b, cell_3b, cell_4b ];

var max_a = Math.max.apply(Math,col_a_array);
var min_a = Math.min.apply(Math,col_a_array);
var max_b = Math.max.apply(Math,col_b_array);
var min_b = Math.min.apply(Math,col_b_array);


	var options = {
				'title': ($('input[name=chart_title]').val()),
	    hAxis: {title: ($('input[name=col_a_label]').val()), minValue: min_a, maxValue: max_a},
	    vAxis: {title: ($('input[name=col_b_label]').val()), minValue: min_b, maxValue: max_b},
	    trendlines: {
	      0: {
	        // type: 'linear',
	        //type: 'exponential',
	        type: 'polynomial',
	        degree: 3, // degree is used with polynomial
	        visibleInLegend: true,
	      }
		}
		};

 var scatterchart = new google.visualization.ScatterChart(document.getElementById('chart_div0'));

    
     scatterchart.draw(data, options);   // str/val ONLY