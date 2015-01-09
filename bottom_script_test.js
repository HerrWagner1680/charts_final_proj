
var jUrl = "https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#";

  //simple column chart - IT WORKS!
      // 'https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#');

// alt url https://docs.google.com/spreadsheet/ccc?key=0AiFfbdok-kQKcENRYmV0ZC1DcHRIbndKRWZvOHRBTEE#gid=0


// 'https://docs.google.com/spreadsheet/tq?key=0AiFfbdok-kQKcENRYmV0ZC1DcHRIbndKRWZvOHRBTEE');  //metals - IT WORKS!

//ccc version of the same
//'https://docs.google.com/spreadsheet/ccc?key=0AiFfbdok-kQKcENRYmV0ZC1DcHRIbndKRWZvOHRBTEE#gid=0'); //the ccc vers works!


//var jUrl = "https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#";

// var jUrl = "https://docs.google.com/spreadsheets/d/1vonOpz2D-z_I_IZA-sHoHHy4BDesFXbTgLZgw7iIf5s/edit#gid=0";


//RUNS SUBMITTED URL
function SheetRefresh() { 
	console.log(jUrl);
	$("iframe").attr("src", jUrl );
  // $("span").html("aha!");

  var query = new google.visualization.Query(jUrl);
  query.send(handleQueryResponse);

}

function ExampleJS(){
	event.preventDefault();
	jUrl = document.getElementById("spreadsheet_file").value;
    console.log("Grabbing File")
    console.log(jUrl);
    SheetRefresh();
 }


SheetRefresh();
