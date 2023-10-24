const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;

  // 정적 파일 서빙 로직
  if (!pathName.includes("/upload") && req.method === "GET") {
    const filePath = "./static/index.html";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
