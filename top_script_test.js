
 google.load("visualization", '1', {packages:['corechart']});
 google.setOnLoadCallback(drawChart);

function drawChart() {
  var query = new google.visualization.Query(
  //NOTE - DO NOT SUBMIT WITH EDIT IN URL !!!!!
 // 'https://docs.google.com/spreadsheets/d/1vonOpz2D-z_I_IZA-sHoHHy4BDesFXbTgLZgw7iIf5s/edit#gid=0');
 'https://docs.google.com/spreadsheet/ccc?key=0Atw2BTU52lOCdEZpUlVIdmxGOWZBR2tuLXhYN2dQTWc&usp=drive_web&gid=0#');

 query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
      console.log(data.Pf[0].type)
      console.log(data.Pf[1].type)

      console.log(data.Nf[1].c[0].v)
      console.log(data.Nf[1].c[1].v)
      console.log(data.Nf[2].c[0].v)
      console.log(data.Nf[2].c[1].v)
      console.log(data.Nf[3].c[0].v)
      console.log(data.Nf[3].c[1].v)



  var chart = new google.visualization.ColumnChart(document.getElementById('columnchart'));

     chart.draw( data, {'width':600, 'height':500});

}

