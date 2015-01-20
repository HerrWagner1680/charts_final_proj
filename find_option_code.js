
function findOptionCode(data, chartType, check) {
	// optionData = ["var options = {'title': ($('input[name=chart_title]').val())," + 
	// "hAxis: {title: ($('#real-data input[name=label_col_a]').val())},"];
	var col_a_array = [ parseFloat($('#real-data input[name=cell_1_a]').val()), parseFloat($('#real-data input[name=cell_2_a]').val()), parseFloat($('#real-data input[name=cell_3_a]').val()), parseFloat($('#real-data input[name=cell_4_a]').val())];
	var col_b_array = [ parseFloat($('#real-data input[name=cell_1_b]').val()), parseFloat($('#real-data input[name=cell_2_b]').val()), parseFloat($('#real-data input[name=cell_3_b]').val()), parseFloat($('#real-data input[name=cell_4_b]').val())];
	var max_a = Math.max.apply(Math,col_a_array);
	var min_a = Math.min.apply(Math,col_a_array);
	var max_b = Math.max.apply(Math,col_b_array);
	var min_b = Math.min.apply(Math,col_b_array);

	console.log("max_a" + max_a + "  min_a" + min_a + "  max_b" + max_b + "  min_b" + min_b);

	var chartTitle = $('input[name=chart_title]').val();
	              //set default width and height
	var chartWidth = $("#width_chart").val();
	var chartHeight = $("#height_chart").val();

	var label_col_a = $('#real-data input[name=label_col_a]').val()
	var label_col_b = $('#real-data input[name=label_col_b]').val()

	console.log(chartType);

	switch(chartType){
		case "column":		
			if (check == "missing") {
				optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
					["'title': "] + chartTitle + '\r' + ["			"] +
					["hAxis: {title: " + label_col_a + "},"] + '\r' + ["			"] +
					["vAxis: {title: " + label_col_b + "},"] + '\r' + ["			"] +
					["'width': " + chartWidth + ","] + '\r' + ["			"] +
					["'height': " + chartHeight + ","] + '\r' + ["			"] +
					["};"] + '\r' ]);

// 				console.log("column switch - no checkbox"); columnchart.draw(data, options);
 				break;
 			} else {
// 				// stackedCheckboxAppears();
				optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
					["'title': "] + chartTitle + '\r' + ["			"] +
					["hAxis: {title: " + label_col_a + "},"] + '\r' + ["			"] +
					["vAxis: {title: " + label_col_b + "},"] + '\r' + ["			"] +
					["'width': " + chartWidth + ","] + '\r' + ["			"] +
					["'height': " + chartHeight + ","] + '\r' + ["			"] +
					["isStacked: check"] + '\r' + ["			"] +
					["};"] + '\r']);

// 				console.log("column switch - with checkbox"); columnchart.draw(data, options);
 				break;
 			}



// // DONUT
 		case "donut":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["   legend: 'none',"] + '\r' +  ["			"] +
				["   'width': " + chartWidth + ","] + '\r' +  ["			"] +
				["   'height': " + chartHeight + ","] + '\r' +  ["			"] +
				["pieSliceText: 'label',"] + '\r' +  ["			"] +
				["title: "] + chartTitle + '\r' +  ["			"] +
				["pieStartAngle: 0, //change to slider variable see rotate_pie.html"] + '\r' +  ["			"] +
				["pieHole: 0, //change to slider variable see rotate_pie.html"] + '\r' +  ["			"] +
				["};"] + '\r']);
 			break;

// // 3D pie
 		case "pie":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["   legend: 'none',"] + '\r' +  ["			"] +
				["   'width': " + chartWidth + ","] + '\r' +  ["			"] +
				["   'height': " + chartHeight + ","] + '\r' +  ["			"] +
				["pieSliceText: 'label',"] + '\r' +  ["			"] +
				["title: "] + chartTitle + '\r' +  ["			"] +
				["pieStartAngle: 0, //change to slider variable see rotate_pie.html"] + '\r' +  ["			"] +
				["is3D: true,"] + '\r' +  ["			"] +
				["};"] + '\r']);
 			break;

// // SCATTER
 		case "scatter":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["title: "] + chartTitle + '\r' +  ["			"] +
			    ["vAxis: {title: " + label_col_a + ", minValue: " + min_a + ", maxValue: " + max_a + "},"] + '\r' + ["			"] +
			    ["hAxis: {title: " + label_col_b + ", minValue: " + min_b + ", maxValue: " + max_b + "},"] + '\r' + ["			"] +
	            ["  'width': " + chartWidth + ","] + '\r' +  ["			"] +
	            [" 	'height': " + chartHeight + ","] + '\r' +  ["			"] +
				["};"] + '\r']);
 			break;

 		case "trend_lin":
// 			console.log("trend_lin switch");
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["'title': "] + chartTitle + '\r' + ["			"] +
			    ["vAxis: {title: " + label_col_a + ", minValue: " + min_a + ", maxValue: " + max_a + "},"] + '\r' + ["			"] +
			    ["hAxis: {title: " + label_col_b + ", minValue: " + min_b + ", maxValue: " + max_b + "},"] + '\r' + ["			"] +
	            [" 	'width': " + chartWidth + ","] + '\r' + ["			"] +
	            [" 	'height': " + chartHeight + ","] + '\r' + ["			"] +
			    ["trendlines: {"] + '\r' + ["			"] +
			    ["   0: {"] + '\r' + ["			"] +
			    ["     type: 'linear',"] + '\r' + ["			"] +
				["     }"] + '\r' + ["			"] +
				["}"] + '\r' + ["			"] +
				["};"] + '\r']);

 			break;

 		case "trend_exp":
// 			console.log("trend_exp switch");
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["'title': "] + chartTitle + '\r' + ["			"] +
			    ["vAxis: {title: " + label_col_a + ", minValue: " + min_a + ", maxValue: " + max_a + "},"] + '\r' + ["			"] +
			    ["hAxis: {title: " + label_col_b + ", minValue: " + min_b + ", maxValue: " + max_b + "},"] + '\r' + ["			"] +
	            [" 	'width': " + chartWidth + ","] + '\r' + ["			"] +
	            [" 	'height': " + chartHeight + ","] + '\r' + ["			"] +
			    ["trendlines: {"] + '\r' + ["			"] +
			    ["   0: {"] + '\r' + ["			"] +
			    ["   type: 'exponential',"] + '\r' + ["			"] +
			    ["	 }"] + '\r' + ["			"] +
				["}"] + '\r' + ["			"] +
				["};"] + '\r']);
 			break;

 		case "trend_poly":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["'title': "] + chartTitle + '\r' + ["			"] +
			    ["vAxis: {title: " + label_col_a + ", minValue: " + min_a + ", maxValue: " + max_a + "},"] + '\r' + ["			"] +
			    ["hAxis: {title: " + label_col_b + ", minValue: " + min_b + ", maxValue: " + max_b + "},"] + '\r' + ["			"] +
	            [" 	'width': " + chartWidth + ","] + '\r' + ["			"] +
	            [" 	'height': " + chartHeight + ","] + '\r' + ["			"] +
			    ["trendlines: {"] + '\r' + ["			"] +
			    ["   0: {"] + '\r' + ["			"] +
			    ["   type: 'polynomial',"] + '\r' + ["			"] +
			    ["   degree: 3, // degree is used with polynomial"] + '\r' + ["			"] +
			    ["   }"] + '\r' + ["			"] +
				["}"] + '\r' + ["			"] +
				["};"] + '\r']); 
 			break;
 		default:
// 	        console.log('default');
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["'title': "] + chartTitle + '\r' + ["			"] +
		    	["vAxis: {title: " + label_col_a + "},"] + '\r' + ["			"] +
		    	["hAxis: {title: " + label_col_b + "},"] + '\r' + ["			"] +
	        	["     	'width': " + chartWidth + ","] + '\r' + ["			"] +
	       		["     	'height': " + chartHeight + ","] + '\r' + ["			"] +
	            ["};"] + '\r']);
	        break;
	}

	exportCode (data, chartType, check, optionData, min_a, max_a, min_b, max_b) 
};
			  