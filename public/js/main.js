var row;
var rowCount;
$(document).ready(function() {

     $('#myButton').on('click', function (event) {
        event.preventDefault();
         $("#myButton").slideDown();
        $("#tableData").append('<tr ><th style ="text-align: center;">Rank</th><th style ="text-align: center;">Stadium</th><th style ="text-align: center;">Capacity</th><th style ="text-align: center;">City</th><th style ="text-align: center;">State</th><th style ="text-align: center;">Year Opened</th></tr>');
        $('#myButton').hide();
        $.each(new Array(101),function (i) {
            requestRows(i)
        })
        });

function requestRows(i) {
    //console.log(i);
    setTimeout(function () {
        $.get("/db/"+i, function (d) {
                row = "<tr>";
            $.each(d, function (index, value) {
				row = row + "<td>"+value +"</td>";
            });
            row = row + "</tr>";
            $("#tableData").append(row);
            rowCount = $("#tableData tr").length-1;
                        $("#tableData tr:eq("+rowCount+")").animate({fontSize: '2em'}, {duration:50, easing:"linear",start: function(){
                $("#tableData tr").animate({fontSize: '1em'});
            }});
            // $("#tableData tr:eq("+rowCount+")").hide();
            // $("#tableData tr:eq("+rowCount+")").fadeToggle();
            row="";
                if ($('#tableData tr').length > 20)
                $("#tableData tr").eq(1).remove();
        })

    }, 500 * i);
}

});

