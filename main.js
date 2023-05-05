
// Import the required modules
const http = require('http');
const fs = require('fs');

// Create a file stream to write the requests
const file = fs.createWriteStream('requests.txt');

// Create a proxy server
const proxy = http.createServer((req, res) => {
  // Write the request method, url and headers to the file
  file.write(`${req.method} ${req.url}\n`);
  file.write(JSON.stringify(req.headers) + '\n\n');

  // Create an options object for the target server
  const options = {
    hostname: 'example.com', // Replace with your target server hostname
    port: 80, // Replace with your target server port
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  // Create a request to the target server
  const proxyReq = http.request(options, (proxyRes) => {
    // Write the response status code and headers to the file
    file.write(`HTTP/${proxyRes.httpVersion} ${proxyRes.statusCode} ${proxyRes.statusMessage}\n`);
    file.write(JSON.stringify(proxyRes.headers) + '\n\n');

    // Pipe the response from the target server to the client
    proxyRes.pipe(res);
  });

  // Handle errors
  proxyReq.on('error', (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end('Something went wrong');
  });

  // Pipe the request from the client to the target server
  req.pipe(proxyReq);
});

// Listen on port 3000
proxy.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});
