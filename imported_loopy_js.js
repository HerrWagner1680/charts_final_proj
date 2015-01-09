



var jUrl = "https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#";

  //simple column chart - IT WORKS!
      // 'https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#');

// alt url https://docs.google.com/spreadsheet/ccc?key=0AiFfbdok-kQKcENRYmV0ZC1DcHRIbndKRWZvOHRBTEE#gid=0

// 'https://docs.google.com/spreadsheet/tq?key=0AiFfbdok-kQKcENRYmV0ZC1DcHRIbndKRWZvOHRBTEE');  //metals - IT WORKS!

//ccc version of the same
//'https://docs.google.com/spreadsheet/ccc?key=0AiFfbdok-kQKcENRYmV0ZC1DcHRIbndKRWZvOHRBTEE#gid=0'); //the ccc vers works!


//var jUrl = "https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#";



function SheetRefresh() { 
	console.log("jURL: " + jUrl);
	// $("iframe").attr("src", jUrl );
  // $("span").html("aha!");
  		console.log("sheetrefresh function")
    	console.log($('#docs-title-inner')) // title of sheet

  var query = new google.visualization.Query(jUrl);


//////////////////////

  //NOTE - DO NOT SUBMIT WITH EDIT IN URL !!!!!
 // // 'https://docs.google.com/spreadsheets/d/1vonOpz2D-z_I_IZA-sHoHHy4BDesFXbTgLZgw7iIf5s/edit#gid=0');
 // 'https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#');

 query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	console.log("below is in response")
   	console.log($('#docs-title-inner')) // title of sheet
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();

	$("#dataType_col_a").val(data.Pf[0].type)
	$("#dataType_col_b").val(data.Pf[1].type)

	console.log(data.Pf[0].type) //id="dataType_col_a"
	console.log(data.Pf[1].type) //id="dataType_col_b"

	$("#col_a_label").attr("value", data.Pf[0].label)
	$("#col_b_label").attr("value", data.Pf[1].label)
	console.log(data.Pf[0].label) //id="col_a_label"
	console.log(data.Pf[1].label) //id="col_b_label"

	$("#cell_1a").attr("value", data.Nf[1].c[0].v)
	$("#cell_1b").attr("value", data.Nf[1].c[1].v)
	$("#cell_2a").attr("value", data.Nf[2].c[0].v)
	$("#cell_2b").attr("value", data.Nf[2].c[1].v)
	$("#cell_3a").attr("value", data.Nf[3].c[0].v)
	$("#cell_3b").attr("value", data.Nf[3].c[1].v)
	// $("#cell_4a").attr("value", data.Nf[4].c[0].v)
	// $("#cell_4b").attr("value", data.Nf[4].c[1].v)
//need to have ? true or if else in case object null,nil

	// IF ELSE statements for data-type selection


	if ($("#dataType_col_a").val(data.Pf[0].type)) == "number" && 
	   ($("#dataType_col_b").val(data.Pf[1].type)) == "string") {
		console.log("histogram only? COL_A is number COL_B is string");

		data.addRows([
			[parseInt($('input[name=cell_1a]').val()), 
					 ($('input[name=cell_1b]').val())],
			[parseInt($('input[name=cell_2a]').val()), 
					 ($('input[name=cell_2b]').val())],
			[parseInt($('input[name=cell_3a]').val()), 
					 ($('input[name=cell_3b]').val())],
			[parseInt($('input[name=cell_4a]').val()), 
					 ($('input[name=cell_4b]').val())],
	    ]);
	} else if ($("#dataType_col_a").val(data.Pf[0].type)) == "string" && 
		($("#dataType_col_b").val(data.Pf[1].type)) == "number") {
		console.log("NO SCATTERCHART. COL_A is string COL_B is number");

		// document.getElementById("no_val_val").disabled = false;
		// document.getElementById("no_string").disabled = true;

		data.addRows([
			[($('input[name=cell_1a]').val()), 
					parseInt($('input[name=cell_1b]').val())],
			[($('input[name=cell_2a]').val()), 
					parseInt($('input[name=cell_2b]').val())],
			[($('input[name=cell_3a]').val()), 
					parseInt($('input[name=cell_3b]').val())],
			[($('input[name=cell_4a]').val()), 
					parseInt($('input[name=cell_4b]').val())],
	    ]);
	} else if ($("#dataType_col_a").val(data.Pf[0].type)) == "number" && 
		($("#dataType_col_b").val(data.Pf[1].type)) {
		console.log("does NOT work with stepchart or piechart ...number number");


		data.addRows([
			[parseInt($('input[name=cell_1b]').val()), 
					parseInt($('input[name=cell_1a]').val())],
			[parseInt($('input[name=cell_2b]').val()), 
					parseInt($('input[name=cell_2a]').val())],
			[parseInt($('input[name=cell_3b]').val()), 
					parseInt($('input[name=cell_3a]').val())],
			[parseInt($('input[name=cell_4b]').val()), 
					parseInt($('input[name=cell_4a]').val())],
		]);
	} else {
		alert("please correct data type," +
			"at least one column must be NUMBER type");
	}



	// console.log(data.Nf[1].c[0].v) id="cell_1a"
	// console.log(data.Nf[1].c[1].v) id="cell_1b"
	// console.log(data.Nf[2].c[0].v)
	// console.log(data.Nf[2].c[1].v)
	// console.log(data.Nf[3].c[0].v)
	// console.log(data.Nf[3].c[1].v)

	// console.log(data)

  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div0'));

     chart.draw( data, {'width':600, 'height':500});

}

///////////////////////////////////






 // end of SheetRefresh function

function ExampleJS(){
	console.log("exampleJS")
	event.preventDefault();
	jUrl = document.getElementById("spreadsheet_file").value;
    console.log("Grabbing File")
    console.log(jUrl);
    SheetRefresh();
 }


SheetRefresh();
