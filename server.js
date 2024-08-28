
const http = require("http");  //CommonJS that imports http 

const server = http.createServer((req, response) => {
    const { method, url } = req; 
    const chunks = [];

    req.on("error", (error) =>{
        response.statusCode = 400; 
        response.setHeader("Content-Type", "application/json"); 
        response.write(JSON.stringify(error)); 
        response.end(); 
    }).on("data", (chunk) => {
        chunks.push(chunk);

    }).on("end", () => {
        console.log(chunks); 

    const body = Buffer.concat(chunks).toString();
    const responseBody = { method, url, body };

    response.on("error", (error) => {
        response.statusCode = 500; 
        response.setHeader("Content-Type", "application/json"); 
        response.write(JSON.stringify(error)); 
        response.end(); 
    });

      switch(url){
        case "/":
            response.setHeader("Content-Type", "text/html"); 
            response.write("Welcome to the HOME page.");
            break; 
        case "/about":
            const details = {
                name: "Mandi", 
                city: "Clearwater", 
            }; 
            response.setHeader("Content-Type", "application/json"); 
            response.write(JSON.stringify(details));
            break; 
        case "/echo":
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(responseBody));
            break; 
        default:
                response.setHeader("Content-Type", "text/html"); 
                response.write("404 Not Found. Try<a href='http://localhost:3000'> the Home Page</a>."); 
    }

    return response.end(); 
});


});

server.listen(3000, () => console.log("Server running at port 3000..."));
