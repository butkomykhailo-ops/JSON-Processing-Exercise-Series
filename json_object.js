const http = require('http');


const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {

  if (req.method === 'POST' && req.url === '/json-object') {
    let body = '';

  
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
      
        if (!body) {
          res.writeHead(422);
          return res.end();
        }

        const data = JSON.parse(body);
        const { name, age } = data;

        
        if (typeof name !== 'string' || typeof age !== 'number') {
          res.writeHead(422);
          return res.end();
        }

       
        const responseData = {
          greeting: `Hello ${name}`,
          isAdult: age >= 18
        };

    
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));

      } catch (error) {
    
        res.writeHead(422);
        res.end();
      }
    });
  } else {
   
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});