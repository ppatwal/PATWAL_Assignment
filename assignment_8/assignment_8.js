$(document).ready(function() {
    var urlProduct = "https://catprdapi.azurewebsites.net/api/product";
    var urlCategory = "https://catprdapi.azurewebsites.net/api/Category";
    loadCategoryData();
    loadProductdata();
    $("#btnnew").on('click',function(){
        $('.form-control').val('');
    });

    $("#btnsave").on('click', function(){
        save();
    });
    $("#btnupdate").on('click', function(){
        update();
    });
    $("#btndelete").on('click', function(){
      remove();
    });

    $("#cat-id").on('change',function(){
        loadDataById($(this).val());
    });

    function loadDataById(id){
        $.ajax({
            url:`${urlProduct}/${id}`,
            method: 'GET'
        }).done(function(response){
            $("#cat-id").val(response.CategoryId);
            $("#cat-name").val(response.CategoryName);
            $("#cat-base").val(response.BasePrice);


            $("#statusMessage").html('Call is successful');
        }).fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
        });
        
    };

    function save(){
        var category = {
            "CategoryId": parseInt($("#txtcatid").val()),
            "CategoryName": $("#txtcatname").val(),
            "BasePrice":  parseInt($("#txtbaseprice").val())
        };

       $.ajax({
            url:urlCategory,
            method: "POST",
            data: JSON.stringify(category),
            contentType: 'application/json'
        }).done(function(response){
            $("#statusMessage").html('Category creation is successful');
            loadData();
        }).fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
        });
    }

    function update(){
        var category = {
            "CategoryId": parseInt($("#txtcatid").val()),
            "CategoryName": $("#txtcatname").val(),
            "BasePrice":  parseInt($("#txtbaseprice").val())
        };

       $.ajax({
            url:`${urlProduct}/${product.ProductId}`,
            method: "PUT",
            data: JSON.stringify(category),
            contentType: 'application/json'
        }).done(function(response){
            $("#statusMessage").html('Category is updated successfully');
            loadData();
        }).fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
        });
    }

     function remove(){
       $.ajax({
            url:`${url}/${$("#cat-id").val()}`,
            method: "DELETE"
        }).done(function(response){
            $("#statusMessage").html('Category is deleted successfully');
            loadData();
        }).fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
        });
    }

    function loadCategoryData() {
        $.ajax({
            url:urlCategory,
            method: 'GET',
        })
         .done(function(response){
            var table = generateTable(response);
            $("#categoryTable").html(table);
            $("#statusMessage").html('Call is successful');
            var optionProp = Object.keys(response[0]);
            var options;
            response.forEach((choice,idx)=>{
                optionProp.forEach((header,index)=>{
                    options += `<option>${choice[header]}</option>`
                });
            });
            $('#cat-id').html(options);
        })
       .fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
            alert(JSON.stringify(error));
        }); 
    };
    function loadProductdata() {
        $.ajax({
            url:urlProduct,
            method: 'GET',
        })
         .done(function(response){
            var table = generateTable(response);
            $("#productTable").html(table);
            $("#statusMessage").html('Call is successful');
        })
       .fail(function(error){
            $("#statusMessage").html(`Call Failed ${error}`);
            alert(JSON.stringify(error));
        }); 
    };
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
            table+=`<th index=${index}><p>${header}</p>
            <button class="sort-table">Sort</button>
            <button class="rev-table">Reverse</button>
            </th>`;
        });
        table+=`</tr></thead>`;
        table+=`<tbody>`;
        dataSource.forEach((emp,idx)=>{
            table+=`<tr>`;
                properties.forEach((header,index)=>{
                    table+=`<td>${emp[header]}</td>`;
                });
            table+=`</tr>`;
        });
        table+=`</tbody>`;
        table+=`</table>`;  
        return table;
    };
    $(document).on('blur','.text',function() {
        if($(this).val().trim() == '') {
            $(this).addClass('error');
        }else {
            $(this).removeClass('error');
        }
        checkErrors();
    });
    $(document).on('input','.num',function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    function checkErrors() {
        var checkedField = 0;
        var emptyField = 0;
        var emptyNum = 0;
        var spanElem = document.getElementsByTagName('span');
        for (let i =0; i < spanElem.length; i++) {
            console.log(spanElem[i].offsetParent);
            if(!spanElem[i].offsetParent === null) {
                checkedField++;
            }
        }
        var submitFields = document.getElementsByClassName('text');
        for(let i = 0; i < submitFields.length; i++) {
            var submitfield = submitFields[i];
            if(submitfield.value.trim() ===''){
                emptyField++;
                submitfield.classList.add('error');
            }else {
                submitfield.classList.remove('error');
            }
        }
        if(checkedField == 0 && emptyNum == 0 && emptyField == 0) {
            $('.btn').attr('disabled', false);
        } else {
            $('.btn').attr('disabled', true);
        }
    }
});

$(document).on('click', '#categoryTable tbody tr', function() {
    var categoryId = $(this).find('td:first-child').text();
    var productTable = $('#productTable tr');
    productTable.each(function(id) {
       var productCol = $(productTable[id].cells);
       if(categoryId != productCol[5].innerText) {
            $(productTable[id]).hide();
       }else {
            $(productTable[id]).show();
       }
    });
});

$(document).on('click','.sort-table', function() {
    var tableId = $(this).closest('table').parent().attr('id');
    var table = document.getElementById(tableId);
    var rows = Array.from(table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
    var columnIndex = $(this).parent().attr('index');
    rows.sort((rowA, rowB) => {
        var cellA = rowA.getElementsByTagName('td')[columnIndex].textContent;
        console.log(cellA);
        var cellB = rowB.getElementsByTagName('td')[columnIndex].textContent;
        console.log(cellB);
        return cellA.localeCompare(cellB);
    });
    var tbody = table.getElementsByTagName('tbody')[0];
    rows.forEach(row => tbody.appendChild(row));
});

$(document).on('click','.rev-table', function() {
    var tableId = $(this).closest('table').parent().attr('id');
    var table = document.getElementById(tableId);
    var columnIndex = $(this).parent().attr('index');
    var columnCells = Array.from(table.querySelectorAll(`tbody tr td:nth-child(${columnIndex})`));
    columnCells.reverse();
    columnCells.forEach((cell, index) => {
        var rowIndex = Math.floor(index / table.rows[0].cells.length);
        var cellIndex = index % table.rows[1].cells.length;
        table.rows[rowIndex + 1].cells[cellIndex].textContent = cell.textContent;
    });
});
