// DEFAULT

function findOptionCode(data, chartType, check) {
	// optionData = ["var options = {'title': ($('input[name=chart_title]').val())," + 
	// "hAxis: {title: ($('#real-data input[name=label_col_a]').val())},"];

	switch(chartType){
		case "column":		
			if (check == "missing") {
				optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
					["'title': ($('input[name=chart_title]').val()),"] + '\r' + ["			"] +
					["hAxis: {title: ($('#real-data input[name=label_col_a]').val())},"] + '\r' + ["			"] +
					["vAxis: {title: ($('#real-data input[name=label_col_b]').val())},"] + '\r' + ["			"] +
					["'width': wid,"] + '\r' + ["			"] +
					["'height': hei,"] + '\r' + ["			"] +
					["]};"] + '\r' ]);

// 				console.log("column switch - no checkbox"); columnchart.draw(data, options);
 				break;
 			} else {
// 				// stackedCheckboxAppears();
// 				// $('input[id=stack]').attr('checked',check);
// 				// //switch labels

				optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
					["'title': ($('input[name=chart_title]').val()),"] + '\r' + ["			"] +
					["hAxis: {title: ($('#real-data input[name=label_col_a]').val())},"] + '\r' + ["			"] +
					["vAxis: {title: ($('#real-data input[name=label_col_b]').val())},"] + '\r' + ["			"] +
					["'width': wid,"] + '\r' + ["			"] +
					["'height': hei,"] + '\r' + ["			"] +
					["isStacked: check"] + '\r' + ["			"] +
					["]};"] + '\r']);

// 				console.log("column switch - with checkbox"); columnchart.draw(data, options);
 				break;
 			}



// // DONUT
 		case "donut":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["   legend: 'none',"] + '\r' +  ["			"] +
				["   'width': wid,"] + '\r' +  ["			"] +
				["   'height': hei,"] + '\r' +  ["			"] +
				["pieSliceText: 'label',"] + '\r' +  ["			"] +
				["title: ($('input[name=chart_title]').val()),"] + '\r' +  ["			"] +
				["pieStartAngle: 0, //change to slider variable see rotate_pie.html"] + '\r' +  ["			"] +
				["pieHole: 0, //change to slider variable see rotate_pie.html"] + '\r' +  ["			"] +
				["]};"] + '\r']);
 			break;

// // 3D pie
 		case "pie":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["   legend: 'none',"] + '\r' +  ["			"] +
				["   'width': wid,"] + '\r' +  ["			"] +
				["   'height': hei,"] + '\r' +  ["			"] +
				["pieSliceText: 'label',"] + '\r' +  ["			"] +
				["title: ($('input[name=chart_title]').val()),"] + '\r' +  ["			"] +
				["pieStartAngle: 0, //change to slider variable see rotate_pie.html"] + '\r' +  ["			"] +
				["is3D: true,"] + '\r' +  ["			"] +
				["]};"] + '\r']);
 			break;

// // SCATTER
 		case "scatter":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["title: ($('input[name=chart_title]').val()),"] + '\r' +  ["			"] +
		    	["vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},"] + '\r' +  ["			"] +
		    	["hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},"] + '\r' +  ["			"] +
	            ["  'width': wid,"] + '\r' +  ["			"] +
	            [" 	'height': hei"] + '\r' +  ["			"] +
				["]};"] + '\r']);
 			break;

 		case "trend_lin":
// 			console.log("trend_lin switch");
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["'title': ($('input[name=chart_title]').val()),"] + '\r' + ["			"] +
			    ["vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},"] + '\r' + ["			"] +
			    ["hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},"] + '\r' + ["			"] +
	            [" 	'width': wid,"] + '\r' + ["			"] +
	            [" 	'height': hei,"] + '\r' + ["			"] +
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
				["'title': ($('input[name=chart_title]').val()),"] + '\r' + ["			"] +
			    ["vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},"] + '\r' + ["			"] +
			    ["hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},"] + '\r' + ["			"] +
	            [" 	'width': wid,"] + '\r' + ["			"] +
	            [" 	'height': hei,"] + '\r' + ["			"] +
			    ["trendlines: {"] + '\r' + ["			"] +
			    ["   0: {"] + '\r' + ["			"] +
			    ["   type: 'exponential',"] + '\r' + ["			"] +
			    ["	 }"] + '\r' + ["			"] +
				["}"] + '\r' + ["			"] +
				["};"] + '\r']);
 			break;

 		case "trend_poly":
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["'title': ($('input[name=chart_title]').val()),"] + '\r' + ["			"] +
			    ["vAxis: {title: ($('#real-data input[name=label_col_a]').val()), minValue: min_a, maxValue: max_a},"] + '\r' + ["			"] +
			    ["hAxis: {title: ($('#real-data input[name=label_col_b]').val()), minValue: min_b, maxValue: max_b},"] + '\r' + ["			"] +
	            [" 	'width': wid,"] + '\r' + ["			"] +
	            [" 	'height': hei,"] + '\r' + ["			"] +
			    ["trendlines: {"] + '\r' + ["			"] +
			    ["   0: {"] + '\r' + ["			"] +
			    ["   type: 'polynomial',"] + '\r' + ["			"] +
			    ["   degree: 3, // degree is used with polynomial"] + '\r' + ["			"] +
			    ["   }"] + '\r' + ["			"] +
				["]}"] + '\r' + ["			"] +
				["]};"] + '\r']); 
 			break;
 		default:
// 	        console.log('default');
 			optionData = ([["		"] + ["var options = {"] + '\r' + ["			"] +
				["'title': ($('input[name=chart_title]').val()),"] + '\r' + ["			"] +
		    	["vAxis: {title: ($('#real-data input[name=label_col_a]').val())},"] + '\r' + ["			"] +
		    	["hAxis: {title: ($('#real-data input[name=label_col_b]').val())},"] + '\r' + ["			"] +
	        	["     	'width':wid,"] + '\r' + ["			"] +
	       		["     	'height':hei"] + '\r' + ["			"] +
	            ["]};"] + '\r']);
	        break;
	}

	exportCode (data, chartType, check, optionData) 
};
			  