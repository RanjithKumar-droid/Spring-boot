// Auto slideshow
/*
window.onload = imagesliders;
var i = 0;
var images = [];

images[0] = "pic/fourth.svg";
images[1] = "pic/first.svg";
images[2] = "pic/second.svg";
images[3] = "pic/third.svg";

function imagesliders() {
  document.sliders.src = images[i];
  if (i < images.length - 1) {
    i++
  } else {
    i = 0;
  }

  setTimeout("imagesliders()", 2000); // here 2000 is 2 sec time

}
*/
// CONTEXT MENU

// RESET FORM


function Reset() {
  var input_elements = document.getElementById("formid").querySelectorAll(".in");
  var label_elements = document.getElementById("formid").querySelectorAll(".labels");
  

  for(var i=0; i<input_elements.length; i++){
    input_elements[i].style.border = "1px solid silver";
    label_elements[i].style.visibility = "hidden";
    input_elements[i].style.margin = "none";
    input_elements[i].style.padding = "none";
    input_elements[i].style.boxShadow = "none";
  
  }
}

// FORM VALIDATION  

var stkname = document.forms['form']['stkname'];
var quantity = document.forms['form']['quantity'];
var baseprice = document.forms['form']['baseprice'];
var profit = document.forms['form']['profit'];
var date = document.forms['form']['date'];
var category = document.forms['form']['categories'];

var stockname = document.getElementById("stockname");
console.log(stockname.value);

// getting values of label
var stkname_err = document.getElementById("lblStk");
var quantity_err = document.getElementById("lblQty");
var baseprice_err = document.getElementById("lblBp");
var profit_err = document.getElementById("lblPft");
var date_err = document.getElementById("lblDate");
var category_err = document.getElementById("lblcat");

// adding event listener
stkname.addEventListener('keyup', stkname_verify);
quantity.addEventListener('textInput', quantity_verify);
baseprice.addEventListener('textInput', baseprice_verify);
profit.addEventListener('textInput', profit_verify);
date.addEventListener('input', date_verify);

function validate() {

  if (stockname.value == "") {                // this will be modified
    stkname.style.border = "1px solid red";
    stkname.style.boxShadow = " 0 0 5px red";
    stkname_err.style.visibility = "visible";
    stkname_err.style.color = "red";
    // stkname.focus();
    return false;
  }


  if (quantity.value == 0 || quantity.value < 0) {
    quantity.style.border = "1px solid red";
    quantity.style.boxShadow = " 0 0 5px red";
    quantity_err.style.visibility = "visible";
    quantity_err.style.color = "red";
    // quantity.focus();
    return false;
  }


  if (baseprice.value == 0 || baseprice.value < 0) {
    baseprice.style.border = "1px solid red";
    baseprice.style.boxShadow = " 0 0 5px red";
    baseprice_err.style.visibility = "visible";
    baseprice_err.style.color = "red";
    // baseprice.focus();
    return false;
  }


  if (profit.value == 0 || profit.value < 0 || profit.value > 100) {
    profit.style.border = "1px solid red";
    profit.style.boxShadow = " 0 0 5px red";
    profit_err.style.visibility = "visible";
    profit_err.style.color = "red";
    // profit.focus();
    return false;
  }


  if (category.value == "Food" || category.value == "Cosmetics") {
    if (date.value == "") {
      date.style.border = "1px solid red";
      date.style.padding = "3px 0px 3px 3px";
      date.style.margin = "5px 1px 3px 0px";
      date.style.boxShadow = " 0 0 5px red";
      date_err.style.visibility = "visible";
      date_err.style.color = "red";
      date.focus();
      return false;
    } 
  }

  if(category.value == ""){
    category.style.border = "1px solid red";
    category.style.padding = "3px 0px 3px 3px";
    category.style.margin = "5px 1px 3px 0px";
    category.style.boxShadow = " 0 0 5px red";
    category_err.style.visibility="visible";
    category_err.style.color="red";
    return false;
  }
}


//error stkname
function stkname_verify() {
  if (stkname.value != "") {
    stkname.style.border = "1px solid green";
    stkname.style.padding = "3px 0px 3px 3px";
    stkname.style.margin = "5px 1px 3px 0px";
    stkname.style.boxShadow = " 0 0 5px green";
    stkname_err.style.visibility = "hidden";
    return true;
  }
}

function quantity_verify() {
  if (quantity.value != "") {
    quantity.style.border = "1px solid green";
    quantity.style.padding = "3px 0px 3px 3px";
    quantity.style.margin = "5px 1px 3px 0px";
    quantity.style.boxShadow = " 0 0 5px green";
    quantity_err.style.visibility = "hidden";
    return true;
  }
}

function baseprice_verify() {
  if (baseprice.value != "") {
    baseprice.style.border = "1px solid green";
    baseprice.style.padding = "3px 0px 3px 3px";
    baseprice.style.margin = "5px 1px 3px 0px";
    baseprice.style.boxShadow = " 0 0 5px green";
    baseprice_err.style.visibility = "hidden";
    return true;
  }
}

function profit_verify() {
  if (profit.value != "") {
    profit.style.border = "1px solid green";
    profit.style.padding = "3px 0px 3px 3px";
    profit.style.margin = "5px 1px 3px 0px";
    profit.style.boxShadow = " 0 0 5px green";
    profit_err.style.visibility = "hidden";
    return true;
  }
}

function date_verify() {
  if (date.value !== "") {
    date.style.border = "1px solid green";
    date.style.padding = "3px 0px 3px 3px";
    date.style.margin = "5px 1px 3px 0px";
    date.style.boxShadow = " 0 0 5px green";
    date_err.style.visibility = "hidden";
    return true;
  }
}




//view html

$(document).ready(function () {
  $('#tablelist').DataTable({
    pagelength: 2
  });
});

$("#category").on("change", function () {
  var value = $(this).val();
  var valueupr = value.toUpperCase();

  $("tbody tr").each(function () {
    var row = $(this);  			      	    // contains all rows
    var id = row.find("td:eq(1)").text(); // all the values of second td
    var IDS = id.toUpperCase();
    if (value == "All") {
      row.show();
    }
    else if (IDS.indexOf(valueupr) !== 0) {
      row.hide();
    } else {
      row.show();
    }
  });
});

// $(".clkk").on('click',function(){
//     var icon = $(this);
//     console.log(icon);
//     var thisclass = icon.siblings(".topc").toggleClass("show");
//     console.log(thisclass);
// })


// search 
// $(document).ready(function () {
//   $("#search").on("keyup", function () {
//     var value = $(this).val().toLowerCase();
//     var rowss = $("tbody tr");
//     console.log(rowss);
//     $("tbody tr").filter(function () {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
//     })
//   });
// });

// context menu
var $contextMenu = $("#contextMenu");

$("table").on("click", "tr i", function (e) {
  $contextMenu.css({
    display: "block",
    left: e.pageX,
    top: e.pageY
  });
  return false;
});
$("body").on("click", function () {
  $contextMenu.hide();
});

function edits(){
  
}