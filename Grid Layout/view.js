// action button click
var pathvarid;

function getobj(thisinput) {
    var myId = $(thisinput).parent().siblings("td").eq(8).text();

    sessionStorage.setItem('MYID', myId);
    console.log(myId);
    window.location = "DashboardUpdate.html";
    // window.history.pushState('', 'Update stocks', './DashboardUpdate.html');
}

/* ----------------------------------------------------------------------------------------- */
// DISPLAY DATAS IN TABLE
window.addEventListener('load', () => {

    $.ajax({

        url: "http://localhost:8080/stockshop/stocks",
        type: "GET",
        datatype: "json",
        columns: [{
            "id": "id",
            "category": "category",
            "stockname": "stock_name",
            "quantity": "quantity",
            "baseprice": "baseprice",
            "profit": "profit",
            "expirydate": "expirydate",
        }],

        success: function (columns) {

            // console.log(columns);
            let temp = 0;
            let i = 0;
            let len = columns.length;
            while (i < len) {
              
                let id = columns[i].id;
               
                var sp = columns[i].baseprice + columns[i].profit;
                var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];
                // console.log(table);
                var newRow = table.insertRow(-1);

                cell1 = newRow.insertCell(0);
                cell1.innerHTML = ++temp;

                cell2 = newRow.insertCell(1);
                cell2.innerHTML = columns[i].category;

                cell3 = newRow.insertCell(2);
                cell3.innerHTML = columns[i].stockname;

                cell4 = newRow.insertCell(3);
                cell4.innerHTML = columns[i].quantity;

                cell5 = newRow.insertCell(4);
                cell5.innerHTML = columns[i].baseprice;

                cell6 = newRow.insertCell(5);
                cell6.innerHTML = sp;

                cell7 = newRow.insertCell(6);
                cell7.innerHTML = columns[i].profit;

                cell8 = newRow.insertCell(7);
                let expdate = new Date(columns[i].expirydate).toDateString().substring(4);
                cell8.innerHTML = expdate;

                cell9 = newRow.insertCell(8);
                cell9.innerHTML = `<i class = 'fas fa-edit' onclick='getobj(this)'></i>`;

                var cell10 = newRow.insertCell(9);
                cell10.innerHTML = columns[i].id;

                cell10.style.display = "none";

                i++;
            }
            // alert(columns[0]);
          var dtt =  $("#mytable").DataTable({
            "dom": 'lfrtip',
                "searching": true,
                "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                "responsive": true,
                "oLanguage": {
                    "oPaginate": {
                        "sNext": '<span class="pagination-default"></span><span class="pagination-fa"><i class="fa fa-chevron-right" ></i></span>',
                        "sPrevious": '<span class="pagination-default"></span><span class="pagination-fa"><i class="fa fa-chevron-left" ></i></span>'
                    },
                    "sPaginationType": "full_numbers",
                    "iDisplayLength": 3
                },
                
            });
            $("#category").on("change", function (){
                    dtt.columns(1).search( this.value ).draw();
            })
           
        },
        error: function (e) {
           
            console.log(e);
        }
    });
})
