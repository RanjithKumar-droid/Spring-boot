// action button click
var pathvarid;

function getobj(thisinput){
    var myId = $(thisinput).parent().parent().siblings("td").eq(8).text();

    $.ajax({
        url: "http://localhost:8080/stockshop/exc/" +myId,
        type: "GET",
        datatype: "json",
        success: function (data) {
         sessionStorage.setItem('CATEGORY',data.category);
         sessionStorage.setItem('STOCKNAME',data.stockname);
         sessionStorage.setItem('QUANTITY',data.quantity);
         sessionStorage.setItem('BASEPRICE',data.baseprice);
         sessionStorage.setItem('PROFIT',data.profit);
         sessionStorage.setItem('DATE',data.expirydate);
         
            console.log(data);
        },
        error: function (e) {
            console.log(e);
        }
    })
    console.log(myId);
}

/* ----------------------------------------------------------------------------------------- */
// DISPLAY DATAS IN TABLE

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

        console.log(columns);
        let temp = 0;
        let i = 0;
        let len = columns.length;
        while (i < len) {
            // alert(i);
            let id = columns[i].id;
            // console.log(id);
            var sp = columns[i].baseprice + columns[i].profit;
            var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];
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
            cell9.innerHTML = `<a onclick = 'window.location= "DashboardUpdate.html";'><i class = 'fas fa-edit' onclick='getobj(this)'></i></a>`;

            var cell10 = newRow.insertCell(9);
            cell10.innerHTML = columns[i].id;

            cell10.style.display = "none";
            // cell10= newRow.insertCell(9);
            // cell10.innerHTML = `<button class="delete" onclick="updateRow(this)")>Delete</button>`;
            i++;
        }
        // alert(columns[0]);

        $("#mytable").DataTable({
            "searching": false,
            "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],

        });

    },
    error: function (e) {
        alert(e);
    }
});

// update function call

