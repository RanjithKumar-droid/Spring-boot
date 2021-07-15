// var inventoryDetails = JSON.parse(localStorage.getItem("names"));
// console.log(inventoryDetails);

// function insertNewRecord(data) {
//     var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
//     var newRow = table.insertRow(-1);
//     cell1 = newRow.insertCell(0);
//     cell1.innerHTML = data.iname;
//     cell2 = newRow.insertCell(1);
//     cell2.innerHTML = data.inum;
//     cell3 = newRow.insertCell(2);
//     cell3.innerHTML = data.category;
//     cell4 = newRow.insertCell(3);
//     cell4.innerHTML = data.other;
//     cell5 = newRow.insertCell(4);
//     cell5.innerHTML = data.status;
//     cell5.innerHTML=`<select name="status" title="Please select product status" id="status" required>
//     <option value="" disabled selected hidden>--select status--</option>
//     <option value="working">Working</option>
//     <option value="idle">Idle</option>
//     <option value="outOfService">Out of Service</option>
//     <option value="dispossessed">Dispossessed</option>
//     <option value="missing">Missing</option>
// </select>`
//     cell6= newRow.insertCell(5);
//     cell6.innerHTML = data.pdate;
//     cell7= newRow.insertCell(6);
//     cell7.innerHTML = `<button class="edit" onclick="editRow(this)")>Add</button><br><br><button class="delete" onclick="delRow(this)">Delete</button>`;
   
    
// }

// for(let i = 0;i<inventoryDetails.length;i++){

//     insertNewRecord(inventoryDetails[i]);
// }

// //delete row
// function delRow(r){
//     if(confirm("Are you sure?")){
//         var i = r.parentNode.parentNode.rowIndex;
//         document.getElementById("employeeList").deleteRow(i);
       
//     }
// }
// //pagination
// $(document).ready(function(){
//     $('#employeeList').DataTable({
//             "bProcessing":true,
//             "bPaginate":true,
//             "bServerSide":true,
//             "bServerMethod":"GET",
//             "sAjaxSource":"${pageContext.request.contextPath}/inventories",
//             "sAjaxDataProp":"",
//             "language":{ "zeroRecords":"No matching inventory found"},
//              "dom":'<"search"f><"length"l>rt<"bottom"i><"page"p><"clear">',
//     //  "pageLength":1,
// //      aaSorting:[[0,'desc']]
     
//      });
 
// //     //  $('.dataTables_length').addClass('bs-select');
//  });

// $(document).ready(function(){
    //     $('#employeeList').DataTable({
    //         "bProcessing":true,
    //         "bPaginate":true,
    //         "bServerSide":true,
    //         "bServerMethod":"GET",
    //         "sAjaxSource":"${pageContext.request.contextPath}/inventories",
    //         "sAjaxDataProp":"",
    //         "aocolumns":[{
    //             "mData":null},
    //             {"nData":"iname"},
    //             {"mData":"inum"},
    //             {"mData":"category"},
    //             {"mData":"other"},
    //             {"mData":"status"},
    //             {"mData":"pdate"},
    //             {"mData":"notes"},
    
    //         ]
    // });
 




// //add dropdown data
// $('#status option:selected').val()
// $('.edit').click(function() {
//     var selectedOptionVal = $('#status').find(":selected").text();
//     $(this).parent().parent().children("td:eq(4)").empty();
//     $(this).parent().parent().children("td:eq(4)").append(selectedOptionVal);
    
    
//   });







//retrieving data from db and populate the
function getData(event){
    event.preventDefault();
    
    $.ajax({

            url: "http://localhost:8081/inventories",  
            type: "GET",  
            datatype: "json",
            columns: [{
                "id":"id",
                 "iname": "inventoryName" ,  
                 "inum": "serialNumber" ,  
                 "category": "category" ,  
                 "other": "other" ,  
                 "status": "status" ,  
                 "purchaseDate": "purchaseDate" ,
                 "notes": "notes"
            }],
            
            success: function (columns) {
                // alert(columns);
                // alert(columns[0]);
                let i = 0;
                let len = columns.length;
                while(i<len){
                    // alert(i);
                        var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
                        var newRow = table.insertRow(-1);
                        cell1 = newRow.insertCell(0);
                        cell1.innerHTML = columns[i].id;
                        cell2 = newRow.insertCell(1);
                        cell2.innerHTML = columns[i].inventoryName;
                        cell3 = newRow.insertCell(2);
                        cell3.innerHTML = columns[i].serialNumber;
                        cell4 = newRow.insertCell(3);
                        cell4.innerHTML = columns[i].category;
                        cell5 = newRow.insertCell(4);
                        cell5.innerHTML = columns[i].other;
                        cell6 = newRow.insertCell(5);
                        cell6.innerHTML = columns[i].status;
                        cell7= newRow.insertCell(6);
                        cell7.innerHTML = columns[i].purchaseDate;
                        cell8= newRow.insertCell(7);
                        cell8.innerHTML = columns[i].notes;
                        cell9= newRow.insertCell(8);
                        cell9.innerHTML = `<button class="edit" onclick="editRow(this)")>Edit</button>`;
                        cell10= newRow.insertCell(9);
                        cell10.innerHTML = `<button class="update" onclick="updateRow(this)")>Update</button>`;
                        // cell10= newRow.insertCell(9);
                        // cell10.innerHTML = `<button class="delete" onclick="updateRow(this)")>Delete</button>`;
                        
                        i++;
                        
                    }
     // alert(columns[0]);
              
    
            },
            error: function (e) {
                alert(e);
            }
        

        }); 
     
}


 

//edit table (final)
$("body").on("click", ".edit", function(){  
    var iname = $(this).parents("tr").attr('iname');
    var inum = $(this).parents("tr").attr('inum');
    var notes = $(this).parents("tr").attr('notes');  
   
  
    $(this).parents("tr").find("td:eq(1)").html('<input name="edit_name" value="'+iname+'">');  
    $(this).parents("tr").find("td:eq(2)").html('<input name="edit_num" value="'+inum+'">');  
    $(this).parents("tr").find("td:eq(7)").html('<input name="edit_notes" value="'+notes+'">');  
    
    
});  

    
//update edited cell (final)
$("body").on("click", ".update", function(){  
    var name = $(this).parents("tr").find("input[name='edit_name']").val();  
    var num = $(this).parents("tr").find("input[name='edit_num']").val(); 
    var notes = $(this).parents("tr").find("input[name='edit_notes']").val(); 
  
    $(this).parents("tr").find("td:eq(1)").text(name);  
    $(this).parents("tr").find("td:eq(2)").text(num); 
    $(this).parents("tr").find("td:eq(7)").text(notes); 
    
    $(this).parents("tr").attr('iname', name); 
    $(this).parents("tr").attr('iname', num); 
    $(this).parents("tr").attr('notes', notes); 
    
  

});  





//pass table row data to the db
$(document).on("click",".update",function(){
    // localStorage.removeItem("name");
    var row = $(this);
    
    var rowName = row.closest("tr").find("td:eq(1)").text();
    var rowNum = row.closest("tr").find("td:eq(2)").text();
    var rowNotes = row.closest("tr").find("td:eq(7)").text();
    var key = $(this).closest('tr').find("td:eq(0)").text(); 
    // var key = parseInt(key);
    alert(key);
    alert(rowName);
    alert(rowNum)
    alert(rowNotes);
    var dataObject = { 'inventoryName': rowName,'serialNumber':rowNum,'notes':rowNotes};
    alert(JSON.stringify(dataObject));

    $.ajax({
        url:  "http://localhost:8081/inventories/"+key,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(dataObject),
        success: function(data) {
          alert('successfully added');
        },
        error: function (e) {
            alert("error");
        }

      });
 
 
  
    // localStorage.setItem("name", JSON.stringify(rowName));

})
        


