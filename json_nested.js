const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/json-nested') {
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

     
        if (!data.user || !Array.isArray(data.user.roles)) {
          res.writeHead(422);
          return res.end();
        }

        const { name, roles } = data.user;

       
        const responseData = {
          name: name,
          roleCount: roles.length,
          isAdmin: roles.includes('admin')
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
  console.log(`Nested JSON server listening on port ${port}`);
});