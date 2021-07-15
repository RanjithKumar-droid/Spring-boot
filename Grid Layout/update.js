window.addEventListener('load', () => {

    const category = sessionStorage.getItem('CATEGORY');
    document.getElementById("category").value = category;

    const stockname = sessionStorage.getItem('STOCKNAME');
    document.getElementById("stkname").value = stockname;

    const quantity = sessionStorage.getItem('QUANTITY');
    document.getElementById("quantity").value = quantity;

    const baseprice = sessionStorage.getItem('BASEPRICE');
    document.getElementById("baseprice").value = baseprice;

    const profit = sessionStorage.getItem('PROFIT');
    document.getElementById("profit").value = profit;

    const date = sessionStorage.getItem('DATE');
    document.getElementById("date").value = date;
    console.log(category);
    console.log(stockname);
    console.log(quantity);
    console.log(baseprice);
    console.log(profit);
    console.log(date);


    function updatepage(){
    
        var inputs = {
            "category": $("#category").val(),
            "stockname": $("#stkname").val(),
            "quantity": $("#quantity").val(),
            "baseprice": $("#baseprice").val(),
            "profit": $("#profit").val(),
            "expirydate": $("#date").val()
        };
    
        $.ajax({
            dataType: "json",
            contentType: "application/json",
            url: "http://localhost:8080/stockshop/update" + pathvarid,
            type: "PUT",
            data: JSON.stringify(inputs),
            success: function (data) {
                swal("saved", "Stock is saved", "success");
                console.log(data);
            },
            error: function (e) {
                if (e.responseText == "Stock is already in database") {
                    swal({
                        title: " Sorry!",
                        text: e.responseText,
                        icon: "error",
                        button: "OK",
                    });
                } else {
                    
                    swal({
                        title: "Saved",
                        text: e.responseText,
                        icon: "success",
                        button: Reset(),
                    });
                }
    
                console.log(e);
            }
        });
    }
})