import { error } from 'console';
import http from 'http';

/* Data Storage */
let employees = [
    {EmpNo:1, EmpName: 'A', DeptName: 'D1'},
    {EmpNo:2, EmpName: 'B', DeptName: 'D2'},
    {EmpNo:3, EmpName: 'C', DeptName: 'D3'},
    {EmpNo:4, EmpName: 'D', DeptName: 'D1'},
    {EmpNo:5, EmpName: 'E', DeptName: 'D2'},
    {EmpNo:6, EmpName: 'F', DeptName: 'D3'},
    {EmpNo:7, EmpName: 'G', DeptName: 'D1'},
    {EmpNo:8, EmpName: 'H', DeptName: 'D2'},
    {EmpNo:9, EmpName: 'I', DeptName: 'D3'},
];

/*create server*/

const server = http.createServer((req,resp)=>{
    if(req.method === "GET"){
        let id = parseInt(req.headers.id);

        if(id === undefined || id === 0){
            resp.writeHead(200, {'Content-Type': 'application/json'});
            resp.write(JSON.stringify(employees));
            resp.end();
        } else {
            resp.writeHead(200, {'Content-Type': 'application/json'});
            resp.write(JSON.stringify(employees));
            resp.end(); 
        }
    }
    if(req.method === "POST") {
        resp.setHeader('Access-Control-Allow-Origin',"*"); 
        resp.setHeader('Access-Control-Allow-Methods',"*");
        let receivedData;
        req.on('data', (chunk)=>{
            receivedData =  JSON.parse(chunk);
        });
        req.on('end', ()=>{
            employees.push(receivedData);
            resp.writeHead(200, {'Content-Type': 'application/json'});
            resp.write(JSON.stringify(employees));
            resp.end();
        });
    }

    /* The PUT Request */
    if(req.method === "PUT") {
        let updatedData;
        req.on('data', (chunk)=>{
            updatedData =  JSON.parse(chunk);
        });
        req.on('end', ()=> {
            for(let i = 0; i < employees.length; i++) {
                if(updatedData.EmpNo == employees[i].EmpNo) {
                    if(updatedData.EmpName != employees[i].EmpName || updatedData.DeptName != employees[i].DeptName) {
                        employees[i].EmpName = updatedData.EmpName;
                        employees[i].DeptName = updatedData.DeptName;
                    }
                }
            }
            resp.writeHead(200, {'Content-Type': 'application/json'});
            resp.write(JSON.stringify(employees));
            resp.end();
        });
        resp.write('Received PUT Request');
        resp.end();
    }

    /* The DELETE Request */
    if(req.method === "DELETE") {
        let deleteId;
        req.on('data', (chunk)=>{
            deleteId =  JSON.parse(chunk);
        });
        req.on('end', ()=> {
            var count = 0;
            for(let i = 0; i < employees.length; i++) {
                if(deleteId.EmpNo == employees[i].EmpNo) {
                    count++
                    delete employees[i];
                    employees = employees.filter(x => x !== null);  
                }
            }
            resp.writeHead(200, {'Content-Type': 'application/json'});
            resp.write(JSON.stringify(employees));
            resp.end();
        });
        resp.write('Received PUT Request');
        resp.end();
    }

});
server.listen(5006);
console.log('Server started on 5006');