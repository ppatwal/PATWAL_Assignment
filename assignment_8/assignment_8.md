# Date: 13-July-2023
1. Create a Page e.g. Records.htmlwith following Specifications
    - This page will have 2 Tables one each for showing Categories and Products
    - When an end-use clicks on the Row of the Category Table, the Products Table will show all products for the selected category (NO REST API is present for Parent Child filters, do this using JavaScript Array methods)

    - in Header of each column of the table (Category and Product both), show to buttons 'sort' and 'reverse'
        - When the sort is clicked, sort data of the table based on the COlumn of which the sort button is clicked 
        - Similar do revers for reverse button click
        - Use the bootstrap btn class for Sort and reverse icons
        - Do this using sort() and reverse() methods of JavaScript     

2. Modify the logic for Category as Well as Product Create operation based on following rules
    - (NOTE:) Do not use HTML validations e.g. required, pattern, etc, Write JavaScript Code
    - If the CategoryName is already present then show an error message next to the CategorName input  element in Read COlor
    - If the ProductId is already present then show an error message next to the ProductId input  element  in Red Color
    - Make sure that following validation rules are implemented
        - If the BasePrice for Category and Price for Product is -ve then shoew error message next to the input element of price and baseprice  
        - The Price MUST be numeric 
    - FOr Product following entries are mandatory
        - ProductName
        - Manufacturer
        - Description
    - For Category following entries are mandatory
        - CategoryName
    - Show error messages next to each input element. Disable the 'Save' button as well as 'Update' button if the page has invalid values
    - In Product.html page show list of Categories in the 'Select' element or may be using radiobutton list instead of having input element for entring CategoryId                    

