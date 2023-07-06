const http = require("http");
const port = 7050;

const server = http.createServer((req, res) => {
  if (req.url === "/hello") {
    res.writeHead(200, 'Gucci', { "Content-Type": "text/plain" });
    res.write("Hello World!");
    res.end();
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
  }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });