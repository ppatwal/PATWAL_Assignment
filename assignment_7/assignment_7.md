Assignment: 12th July
Submission Date: Participants must complete the same by Friday max but they can start today.

# Date:12-July-2023
1.  Crear product.html and perform GET and POST Operations with product API
    - https://protect-eu.mimecast.com/s/KcC5CA1lxsMjm4zsGQMLn?domain=catprdapi.azurewebsites.net
2. Enhance the Asignment No of of 11-July-2023, where wnen  the Select button is clicked, the Row Details for Category / Product MUST be loaded in the Input elements and then the End-User can update its details. But to save this details Use the same 'Save' button. The seperate Update button is not needed. The same 'Save' button will be used for Update and New record creation
3. Modify the generateTable()  table method as follows

 ````javascript
    function generateTable(dataSource, canDelete){
        .....
    }
````   
 - if the 'canDelete' is true then each row will have a 'Delete' button. When this button is clicked , delete the record by making AJAX call
