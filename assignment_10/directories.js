import http from 'http';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

let __fileName1 = fileURLToPath(import.meta.url);
let dirPath = path.join(__fileName1, './../file');

function readFilesInDirectory (dir) {
    var files = fs.readdirSync(dir);
    for(var file of files) {
        var filePath = path.join(dir, file);
        var stat = fs.statSync(filePath);
        if(stat.isDirectory()) {
            readFilesInDirectory(filePath);
        }else {
            console.log('File Path:-', filePath);
            console.log('File content:-', fs.readFileSync(filePath,'utf8'));
        }
    }
}

fs.mkdir(dirPath, (error)=>{
    if(error) {
       return;
    }
    console.log(`Directory is created successfully`);
});

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

fs.readdir(dirPath, (error, dirContents)=>{
    if(error) {
        console.log(`Reading directory failed ${error.message}`);
        return;
     }
     dirContents.forEach((content)=>{
         fs.stat(`${dirPath}/${content}`, (err,stat)=>{
            if(err) {
                console.log(`Reading the resource is failed ${err.message}`);
                return;
            }
            if(stat.isDirectory()){
                readFilesInDirectory(dirPath);
            }   
        });  
    });
});

let server = http.createServer((req,resp)=>{
    // check the url value and based on that return the html
    if(req.url === "/api/get" && req.method === "GET") {
        resp.writeHead(200, {'Content-Type': 'application/json'});
        resp.write(JSON.stringify(employees));
        resp.end();
    }
    if(req.url === "/api/post" && req.method === "POST") {
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
    if(req.url === "/home"){
        readFileAndReturn(resp, 'home');
    } else {
        if(req.url === "/about"){
            readFileAndReturn(resp, 'about');
        } else {
            if(req.url === "/contact"){
                readFileAndReturn(resp, 'contact');
            } else {
                resp.writeHead(404, {'Content-Type':'text/html'});
                resp.write("The Resource You are looking for is not found");
                resp.end();
            }
        }
    }
});

let pagePath = path.join(__fileName1, './../views');
function readFileAndReturn(resp,url){
    fs.readFile(`${pagePath}/${url}.html`,{encoding:'ascii'},(error,file)=>{
        if(error) {
            resp.write(error);
            resp.writeHead(404, {'Content-Type':'text/html'});
            resp.write("The Resource file You are looking for is not found");
            resp.end();
        }
        resp.writeHead(200, {'Content-Type':'text/html'});
        resp.write(file);
        resp.end();
    });
}


server.listen(6070);
console.log('server starts on port 6070');



