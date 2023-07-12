

# Date: 11-July-2023
Submission Date: 12th July-23
1. Generate Table Dynamically based on JSON Array of Products with the following keys for each product
    - ProductId, ProductName, CategoryName, Description, Manufacturer, Price
2. Each row of the Table MUST be having the 'Select' button dynamically generated. When the Select Button is clicked, show the contents of the Row in Alert

3. Above the Table add a Text Element to search records from table based on the value enetered in it

4. (Mandatory)
- Above the table generate a Radio-Button-List (radio input element having same value for 'name' attribue). This list will be generated based on the Properties of the record in Products array
    - ProductId, ProductName, CategoryName, Description, Manufacturer, Price
- Select any one of the radio button and then based on the value entered in the input element filter data from the table 
    - e.g. if the radio button selected is 'ProductName' then the input element will be entered teh value of the productname and table data will be filtered based on the productname only      
