const http = require('http');


const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
 
  if (req.method === 'POST' && req.url === '/json-echo') {
    let body = '';

   
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      
      if (!body) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Invalid JSON');
      }

      try {
       
        const parsedData = JSON.parse(body);

     
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsedData));
      } catch (error) {
       
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
  } else {
   
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});