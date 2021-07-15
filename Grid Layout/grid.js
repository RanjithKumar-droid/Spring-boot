// var stkname = document.getElementById("stockname");
var stkname = document.forms['form']['stkname'];
var stkname_err = document.getElementById("lblStk");

var quantity = document.forms['form']['quantity'];
var quantity_err = document.getElementById("lblQty");

var baseprice = document.forms['form']['baseprice'];
var baseprice_err = document.getElementById("lblBp");

var profit = document.forms['form']['profit'];
var profit_err = document.getElementById("lblPft");

var date = document.forms['form']['date'];
var date_err = document.getElementById("lblDate");

var category = document.getElementById("category");
var category_err = document.getElementById("lblcat");



function checking() {
  var name = {
    "stockname": $("#stkname").val(),
  };
  $.ajax({
    dataType: "json",
    contentType: "application/json",
    url: "http://localhost:8080/stockshop/keyup",
    type: "POST",
    data: JSON.stringify(name),
    success: function (e) {
      console.log(e);
    },
    error: function (data) {
      if (data.responseText != "fine") {

        setTimeout(function () {
          if (data.responseText != name) {
            swal({
              title: "Wait",
              text: "stock with this name already exists, do you want to update ?",
              icon: "error",

              button: "Update",
            })
            //.then(function(){
            //   window.location.href = "DashboardUpdate.html";
            // });
          }
        }, 3000)
      }
      console.log(data);
    }
  });
  // console.log(stkname.value);
}

function save(event) {
  event.preventDefault();
  let v = validate();

  if (v == true) {

    var inputs = {
      "category": $("#category").val(),
      "stockname": $("#stkname").val(),
      "quantity": $("#quantity").val(),
      "baseprice": $("#baseprice").val(),
      "profit": $("#profit").val(),
      "expirydate": $("#date").val()
    };
    console.log(typeof (inputs));

    $.ajax({
      dataType: "json",
      contentType: "application/json",
      url: "http://localhost:8080/stockshop/stocks/addexc",
      type: "POST",
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
          // document.getElementById("stkname").value = "";
          // document.getElementById("quantity").value = "";
          // document.getElementById("baseprice").value = "";
          // document.getElementById("profit").value = "";
          // document.getElementById("date").value = "";
          // document.getElementById("category").value = "";
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

  } else {
    console.log("error");

  }
}


// adding event listener
stkname.addEventListener('keyup', stkname_verify);
quantity.addEventListener('keyup', quantity_verify);
baseprice.addEventListener('keyup', baseprice_verify);
profit.addEventListener('keyup', profit_verify);
date.addEventListener('input', date_verify);

//reset form 
function Reset() {
  var input_elements = document.getElementById("formid").querySelectorAll(".in");
  var label_elements = document.getElementById("formid").querySelectorAll(".err-lbl");
  let length = input_elements.length;
  console.log(length);
  for (var i = 0; i < input_elements.length; i++) {
    input_elements[i].style.borderLeft = "1px solid silver";
    label_elements[i].style.visibility = "hidden";
  }
}


function validate() {
  // event.preventDefault();
  if (stkname.value == "") {
    stkname.style.borderLeft = "10px solid red";
    stkname.style.transition = "200ms ease-in-out";
    stkname_err.style.color = "red";
    stkname_err.style.visibility = "visible";
    stkname.focus();
    return false;
  }

  if (quantity.value == 0 || quantity.value < 0) {
    quantity_err.style.color = "red";
    quantity_err.style.visibility = "visible";
    quantity.style.borderLeft = "10px solid red";
    quantity.style.transition = "200ms ease-in-out";
    quantity.focus();
    return false;
  }

  if (baseprice.value == 0 || baseprice.value < 0) {
    baseprice_err.style.color = "red";
    baseprice_err.style.visibility = "visible";
    baseprice.style.borderLeft = "10px solid red";
    baseprice.style.transition = "200ms ease-in-out";
    baseprice.focus();
    return false;
  }

  if (profit.value == 0 || profit.value < 0) {
    profit_err.style.color = "red";
    profit_err.style.visibility = "visible";
    profit.style.borderLeft = "10px solid red";
    profit.style.transition = "200ms ease-in-out";
    profit.focus();
    return false;
  }

  if ((category.value == "Food") || (category.value == "Cosmetics") || (category.value == "Others")) {
    if (date.value == "") {
      date_err.style.color = "red";
      date_err.style.visibility = "visible";
      date.style.borderLeft = "10px solid red";
      date.style.transition = "200ms ease-in-out";
      date.focus();
      return false;
    }
  } else {

    date.value = null;
    return true;
  }

  if (category.value == "") {
    category_err.style.visibility = "visible";
    category_err.style.color = "red";
    category.style.borderLeft = "10px solid red";
    category.style.transition = "200ms ease-in-out";
    return false;
  }
  return true;
}



//error rectifier
function stkname_verify() {

  if (stkname.value != "") {
    stkname.style.borderLeft = "10px solid rgb(31, 182, 31)";
    stkname.style.transition = "400ms ease-in-out";
    //   stkname.style.boxShadow = " 0 0 5px green";
    stkname_err.style.visibility = "hidden";
    return true;
  } else {
    stkname.style.borderLeft = "8px solid red";
    stkname_err.style.visibility = "visible";
  }
}

function quantity_verify() {
  if (quantity.value != "") {
    quantity.style.borderLeft = "10px solid rgb(31, 182, 31)";
    quantity.style.transition = "400ms ease-in-out";
    quantity_err.style.visibility = "hidden";
    return true;
  }
}

function baseprice_verify() {
  if (baseprice.value != "") {
    baseprice.style.borderLeft = "10px solid green";
    baseprice.style.transition = "400ms ease-in-out";
    baseprice_err.style.visibility = "hidden";
    return true;
  }
}


function profit_verify() {
  if (profit.value != "") {
    profit.style.borderLeft = "10px solid green";
    profit.style.transition = "400ms ease-in-out";
    profit_err.style.visibility = "hidden";
    return true;
  }
}


function date_verify() {
  if (date.value != "") {
    date.style.borderLeft = "10px solid green";
    date.style.transition = "400ms ease-in-out";
    date_err.style.visibility = "hidden";
    return true;
  }
}

// $contextMenu = $("#contextMenu");
// $("table").on("click", "tr i", function (e) {
//   $contextMenu.css({

//     display: "block",
//     left: e.pageX,
//     top: e.pageY
//   });
//   return false;
// });
// $("body").on("click", function () {
//   $contextMenu.hide();
// });