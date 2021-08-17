window.addEventListener('load', () => {

    let fromadd = sessionStorage.getItem('STNM');
    let tableid = sessionStorage.getItem('MYID');
    let tbid = parseInt(tableid);
    let stnm = fromadd;
    console.log(stnm);
    console.log(tbid);

    $.ajax({
        dataType: "json",
        contentType: "application/json",
        url: "http://localhost:8080/stockshop/getbystkname/" + stnm,
        type: "GET",
        success: function (f) {
            
            document.getElementById("category").value = f.category;
            document.getElementById("stkname").value = f.stockname;
            document.getElementById("quantity").value = f.quantity;
            document.getElementById("baseprice").value = f.baseprice;
            document.getElementById("profit").value = f.profit;
            document.getElementById("date").value = f.expirydate;
            console.log(f.expirydate);
            console.log(f);
        },
        error: function (e) {
            console.log(e);
        }
    })

    $.ajax({
        dataType: "json",
        contentType: "application/json",
        url: "http://localhost:8080/stockshop/exc/"+tbid,
        type: "GET",
        success: function (f) {
            document.getElementById("category").value = f.category;
            document.getElementById("stkname").value = f.stockname;
            document.getElementById("quantity").value = f.quantity;
            document.getElementById("baseprice").value = f.baseprice;
            document.getElementById("profit").value = f.profit;
            document.getElementById("date").value = f.expirydate;
            console.log(f);
        },
        error : function(e){
            console.log(e);
        }
    })
})


function updatepage(event) {
    let pathvarid = sessionStorage.getItem('MYID');
    console.log("update event id"+pathvarid);
    event.preventDefault();
    var inputs = {
        "category": $("#category").val(),
        "stockname": $("#stkname").val(),
        "quantity": $("#quantity").val(),
        "baseprice": $("#baseprice").val(),
        "profit": $("#profit").val(),
        "expirydate": $("#date").val()
    };
    let cc = validate();
    if (cc == true) {
    

        $.ajax({
            dataType: "json",
            contentType: "application/json",
            url: "http://localhost:8080/stockshop/update/" + pathvarid,
            type: "PUT",
            data: JSON.stringify(inputs),
            success: function (data) {
                swal("saved", "Stock is saved", "success");
                console.log(data);
            },
            error: function (e) {
               
                let message = e.responseText;
                if (e.responseText == "Stock already available") {
                    Swal.fire({
                        title: " Sorry",
                        text: e.responseText,
                        icon: "info",
                        allowOutsideClick:false,
                        confirmButtonText: "Ok",
                    });
            document.getElementById("stkname").value = data.stockname;
                } else if(e.responseText == "stock not found"){

                    Swal.fire({
                        title: "invalid id",
                        text: e.responseText,
                        icon: "error",
                        allowOutsideClick:false,
                        confirmButtonText: "Ok",
                    });
                }else if(e.responseText == "updated"){
                    Swal.fire({
                        
                        title: "Updated",
                        text: message+inputs.stockname,
                        icon: "success",
                        allowOutsideClick:false,
                        confirmButtonText: "Ok",
                    });
                }else{
                    Swal.fire({
                        title: " Wait",
                        text: e.responseText,
                        icon: "info",
                        allowOutsideClick:false,
                        confirmButtonText: "Ok",
                    });
                }

                console.log(e);
                
            }
        });
    }
    sessionStorage.clear();
   
    var inputfield = document.getElementsByClassName("in");
    for(i=0;i<inputfield.length;i++){
        inputfield[i].value == "";
    }
}