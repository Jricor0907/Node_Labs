const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req);
  if (req.url === "/") {
    res.write(` 
    <html>
      <body>
        <h1>Hello Node!</h1>
        <a href="http://localhost:8000/write-message">Write</a>
        <a href="http://localhost:8000/read-message">Read</a>
      </body>
    </html>
  `);
    res.end();
  }

  if (req.url === "/write-message") {
    res.write(`
    <html>
      <body>
        <form action="/write-message/create" method="POST">
          <input type="text" placeholder="write message" name="message"/>
          <button type="submit">Write</button>
        </form>
      </body>
    </html>
    `);
    res.end();
  }

  if (req.url === "/write-message/create") {
    fs.writeFile("message.txt", "Message", (err) => {
      if (err) throw err;
      res.writeHead(302, {
        location: "http://localhost:8000/read-message",
      });
      res.end();
    });
  }

  if (req.url === "/read-message") {
    fs.readFile("message.txt", (err, message) => {
      if (err) throw err;
      res.write(`
      <html>
        <body>
          <p>${message}</p>
        </body>
      </html>
      `);
      res.end();
    });
  }
});

server.listen(8000, () => {
  console.log("Listening on port 8000");
});
