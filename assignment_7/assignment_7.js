$(document).ready(function() {
    var url = "https://catprdapi.azurewebsites.net/api/product";
    $(document).ready(function(){
        loadData();
        $("#btnsave").on('click', function(){
            save();
        });
        $("#txtprodunqid").on('change',function(){
            loadDataById($(this).val());
        });
        $(document).on('click','#btndelete', function(){
            remove();
        });

    });

    function loadDataById(id){
        $.ajax({
            url:`${url}/${id}`,
            method: 'GET'
        }).done(function(response){
            $('#txtprodunqid').val(response.ProductUniqueId);
            $('#txtprodid').val(response.ProductId);
            $('#txtproductname').val(response.BasePrice);
            $('#txtproductdesc').val(response.Description);
            $('#txtproductprice').val(response.Price);
            $('#textcatid').val(response.CategoryId);
            $('#manufacturer').val(response.Manufacturer);
            $('#category').val(response.Category);
            $("#statusMessage").html('Call is successful');
        }).fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
        });
    }

    function loadData(){
        $.ajax({
            url:url,
            method: 'GET',
        })
         .done(function(response){
            var table = generateTable(response);
            $("#dvTable").html(table);
            $("#statusMessage").html('Call is successful');
        })
       .fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
            alert(JSON.stringify(error));
        }); 
    }

    function save() {
        var category = {
            "ProductUniqueId": parseInt($("#txtprodunqid").val()),
            "ProductId": parseInt($("#txtprodid").val()),
            "ProductName": $("#txtproductname").val(),
            "Description": $('#txtproductdesc').val(),
            "Price": parseInt($("#txtproductprice").val()),
            "CategoryId": parseInt($('#textcatid').val()),
            "Manufacturer": $("#manufacturer").val(),
            "Category": $("#category").val()
        };
       $.ajax({
            url:url,
            method: "POST",
            data: JSON.stringify(category),
            contentType: 'application/json',
        }).done(function(response){
            $("#statusMessage").html('Product creation is successful');
            loadData();
        }).fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
        });
    }
    function remove(){
        $.ajax({
            url:`${url}/${$("#txtprodunqid").val()}`,
            method: "DELETE"
        }).done(function(response){
            $("#statusMessage").html('Product is deleted successfully');
            loadData();
        }).fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
            console.log(error)
        });
    }
});

function loadData(){
    $.ajax({
        url:url,
        method: 'GET',
    })
     .done(function(response){
        var table = generateTable(response);
    })
   .fail(function(error){
        $("#statusMessage").html(`Call Failed ${error}`);
    }); 
}

function generateTable(dataSource) {
    if(dataSource === undefined || dataSource.length === 0){
        return `<div class="alert alerrt-danger">
          <strong>
             No Data Present
          </strong>
        </div> `;
    }
    var properties = Object.keys(dataSource[0]);
    if(properties === undefined || properties.length === 0) {
        return `<div class="alert alerrt-danger">
        <strong>
          The dataSource is not in corrct shape
        </strong>
      </div> `;
    }
    var table = `<table class="table table-bordered table-striped">`;
    table+=`<thead><tr>`;
    properties.forEach((header,index)=>{
        table+=`<th>${header}</th>`;
    });
    table+=`</tr></thead>`;
    table+=`<tbody>`;
    dataSource.forEach((emp,idx)=>{
        table+=`<tr>`;
            properties.forEach((header,index)=>{
                table+=`<td>${emp[header]}</td>`;
            });
            table+=`<td>
               <button class="select-record">Select</button>
            </td>`;
            if(canDelete) {
                table+= `<td>
                <button id="btndelete">Delete</button>
                </td>`
            }
        table+=`</tr>`;
    });
    table+=`</tbody>`;
    table+=`</table>`;
    return table;
}
$(document).on('click',".select-record", function() {
    var tableRow = $(this).closest('tr');
    var tableCells = tableRow.find('td');
    $('#txtprodunqid').val(tableCells[0].innerHTML);
    $('#txtprodid').val(tableCells[1].innerHTML);
    $('#txtproductname').val(tableCells[2].innerHTML);
    $('#txtproductdesc').val(tableCells[3].innerHTML);
    $('#txtproductprice').val(tableCells[4].innerHTML);
    $('#textcatid').val(tableCells[5].innerHTML);
    $('#manufacturer').val(tableCells[6].innerHTML);
    $('#category').val(tableCells[7].innerHTML);
});
