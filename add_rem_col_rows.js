
//SUGGESTION - create a maximum number of columns that user may not exceed
$('#add_col').click(function() {
    var last_row = parseInt($('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];

    var last_col_int = last_col.charCodeAt(0);
    var next_col_int = last_col_int +1;
    var next_col = String.fromCharCode(next_col_int);
    var next_row = last_row + 1;
    console.log("next col " + next_col);
    console.log(last_col_int);
    console.log(next_col_int);

    $('#real-data #labels').append("<th><input type='text' id='label_col_" + next_col + 
        "' name='label_col_" + next_col + "' value='Column " + (next_col).toUpperCase() + "'></th>");
    $('#real-data #data_types').append("<th><select id='dataType_col_" + next_col + 
        "' name='dataType_col_" + next_col + "' required><option value = 'number'>number</option>" + 
    "<option value = ''> - select data type - </option>"); //+ 
    // "<option value = 'ignore'>ignore</option></select></th>");

    var current_row = 1
    while(current_row <= last_row){
        // console.log("curr ROW: " + current_row);
        // console.log("last ROW: " + last_row);
    $("#real-data #row_" + current_row).append("<td class='col_" + next_col + 
      "'><input type='text' id='cell_" + current_row + "_" + next_col + "' name='cell_" +
      "current_row" + "_" + next_col + "' value=''>");
         current_row++;
     };

    if($('#stack').size() == 0 && next_col_int >= 99 && document.getElementById('col2').checked==true) {
        stackedCheckboxAppears();
    }
});

$('#col2').click(function(){
    // alert("clicked on column")
    var last_col = $('tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
    var last_col_int = last_col.charCodeAt(0);
    var next_col_int = last_col_int +1;
        if($('#stack').size() == 0 && last_col_int >= 99 && document.getElementById('col2').checked==true) { 
        stackedCheckboxAppears();
        };
});

$('#area2, #bar2, #step2, #line2, #donut2, #pie2, #scatter2, #lin2, #exp, #poly2').click(function(){
    $('#stack, #stack2').remove();
});

$('#donut2, #pie2, #scatter2, #lin2, #exp, #poly2').click(function(){
    // //colors on additional columns change color when not being used
    var last_row = parseInt($('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
    var last_col = $('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];

    var last_col_int = last_col.charCodeAt(0);
    var next_col_int = last_col_int +1;
    var next_col = String.fromCharCode(next_col_int);
    var next_row = last_row + 1;
    var col_c_integer = 99;

    if (last_col_int >= 99) {
        while(col_c_integer <= last_col_int) {
            var X = String.fromCharCode(col_c_integer);
            console.log("in the loop " + X);
            $('select[id$="'+ X +'"]').css({"border":"2px solid #ddd", "color":"#aaa"})
            $('input[id$="'+ X +'"]').css({"border":"2px solid #ddd", "color":"#aaa"})
            col_c_integer++;
        };
    };
});

$('#area2, #bar2, #step2, #line2, #col2').click(function(){
    //SET COLOR OF ADDITIONAL COLUMNS BACK TO DEFAULT
    var last_row = parseInt($('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
    var last_col = $('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];

    var last_col_int = last_col.charCodeAt(0);
    var next_col_int = last_col_int +1;
    var next_col = String.fromCharCode(next_col_int);
    var next_row = last_row + 1;
    var col_c_integer = 98;

    console.log("CLICK COLOR - next_row: " + next_row);
    console.log("CLICK COLOR - last_col_int: " + last_col_int);
    console.log("CLICK COLOR - next_col: " + next_col);
    if (last_col_int >= 99) {
        while(col_c_integer <= last_col_int) {
            var X = String.fromCharCode(col_c_integer);
            console.log("in the loop " + X);
            $('select[id$="'+ X +'"]').css({"border":"1px solid #A6A6A6", "color":"black"});
            $('input[id$="'+ X +'"]').css({"border":"2px inset", "color":"initial"});
            col_c_integer++;
        };
    };
});


$('#remove_col').click(function() {
    var last_col = $('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
    var last_col_int = last_col.charCodeAt(0);
    if (last_col_int <= 98){ 
            alert("you can not delete any more columns");
    } else if (last_col_int <= 99){             
            $('#stack, #stack2').remove();
            $("#real-data tr[id^='row_'] td:last-of-type").remove();
            $("#real-data tr[id='labels'] th:last-of-type").remove();
            $("#real-data tr[id='data_types'] th:last-of-type").remove();
    } else {$("#real-data tr[id^='row_'] td:last-of-type").remove();
            $("#real-data tr[id='labels'] th:last-of-type").remove();
            $("#real-data tr[id='data_types'] th:last-of-type").remove();
    }
});

//SUGGESTION - create a maximum number of rows that user may not exceed
$('#row_add').click(function() {

    var last_row = parseInt($('#real-data tr:last-of-type').attr('id').split('_')[1]);
    var last_col = $('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[2];
    var last_col_int = last_col.charCodeAt(0);
    var next_col_int = last_col_int + 1;
    var next_col = String.fromCharCode(next_col_int);
    var next_row = last_row + 1;

    console.log("next row:" + next_row);

    //create empty new table row
    $("#real-data").append("<tr id='row_" + next_row + "'></td>");

    var col_a_int = 97;

    while(col_a_int <= last_col_int){
        var col_letter = String.fromCharCode(col_a_int);
        console.log("col letter " + col_letter);
        console.log("next_row " + next_row);
        $("#real-data tr:last-of-type").append("<td class='col_" + col_letter + 
          "'><input type='text' id='cell_" + next_row + "_" + col_letter + 
          "' name='cell_" + next_row + "_" + col_letter +"' value=''></td>");
        col_a_int++;
    };
});

$('#row_remove').click(function() {
    var last_row = parseInt($('#real-data tr:last-of-type > td:last-of-type > input').attr('id').split('_')[1]);
    if (last_row <= 1){ alert("you can not delete any more rows");
    } else { $("#real-data tr:last-of-type").remove(); }
});
