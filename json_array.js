const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/json-array') {
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
        const numbers = data.numbers;

        
        if (!Array.isArray(numbers)) {
          res.writeHead(422);
          return res.end();
        }

        
        const allNumeric = numbers.every(n => typeof n === 'number');
        if (!allNumeric) {
          res.writeHead(422);
          return res.end();
        }

       
        const count = numbers.length;
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        const average = count === 0 ? 0 : sum / count;

        const responseData = {
          count,
          sum,
          average
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