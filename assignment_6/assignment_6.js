$(document).ready(function() {
    var products = [
        {ProductID:101, ProductName:'Supra', CategoryName: 'Automobile', Description:'Car', Manufacturer:'Toyota', Price:'56000000'},
        {ProductID:102, ProductName:'Cool Water', CategoryName:'Perfume', Description:'Perfumes and cosmetics', Manufacturer:'David Off', Price:'8000'},
        {ProductID:103, ProductName:'Blazer', CategoryName:'Clothing', Description:'Clothes', Manufacturer:'Raymond', Price:'14000'},
        {ProductID:104, ProductName:'Curtains', CategoryName:'Decor', Description:'Decor', Manufacturer:'Housemart', Price:'2500'},
        {ProductID:105, ProductName:'Victus', CategoryName:'Electronics', Description:'Laptop', Manufacturer:'HP', Price:'89000'},
    ];
    var obj = products[0];  
    var properties = Object.keys(obj);  
    function generateTable() {
        var table = `<table class="table table-bordered">`;
        table+=`<thead><tr>`;
        properties.forEach((header,index)=>{
            table+=`<th>${header}</th>`;
            var radioBtn = `<input id=${header} name="filter" class="radio-btn" type="radio" num="${index}" value=${header}><label for=${header}>${header}</label>`
            $('#radio-btns').append(radioBtn);
        });
        table+=`</tr></thead>`;
        table+=`<tbody>`;
        products.forEach((prod,idx)=>{
            table+=`<tr class="table-row">`;
                properties.forEach((header,index)=>{
                    table+=`<td>${prod[header]}</td>`;
                });
                table+=`<td>
                   <button class="selected-record"">Select</button>
                </td>`
            table+=`</tr>`;
        });
    
        table+=`</tbody>`;
    
        table+=`</table>`;
        return table;
    };

    var table = generateTable();
    $("#newTable").html(table);
    $("#search").on('keyup',function() {
        var search = $(this).val().toLowerCase();
        $("#newTable tr").filter(function() {
        if($('input[name="filter"]:checked')){
            var radioChecked = $('input[name="filter"]:checked');
            var checkedIndex = 0;
            checkedIndex = radioChecked.attr('num');
            if(!checkedIndex || !radioChecked) {
                $(this).toggle($(this).text().toLowerCase().indexOf(search) > -1);
            }else {
                $(this).toggle($(this).find('td').eq(checkedIndex).text().toLowerCase().indexOf(search) > -1);
            }
        }
        });
    });
});

$(document).on('click',".selected-record", function() {
    var parentDiv = $(this).closest('tr');
    alert(parentDiv.text());
});
