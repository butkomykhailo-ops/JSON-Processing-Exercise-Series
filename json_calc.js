const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/json-calc') {
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
        const { a, b, operation } = data;

        
        if (a === undefined || b === undefined || !operation) {
          res.writeHead(422);
          return res.end();
        }

        
        if (typeof a !== 'number' || typeof b !== 'number') {
          res.writeHead(422);
          return res.end();
        }

        let result;

        switch (operation) {
          case 'add':
            result = a + b;
            break;
          case 'subtract':
            result = a - b;
            break;
          case 'multiply':
            result = a * b;
            break;
          case 'divide':
            
            if (b === 0) {
              res.writeHead(400);
              return res.end('Division by zero');
            }
            result = a / b;
            break;
          default:
           
            res.writeHead(400);
            return res.end('Invalid operation');
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));

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
  console.log(`Calculator server listening on port ${port}`);
});