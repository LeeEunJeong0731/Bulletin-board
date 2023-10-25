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
        res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(data);
      }
    });
  } else if (pathName === "/subpage") {
    fs.readFile("./static/subpage.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
        res.end("404 Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(data);
      }
    });

    const fakeDatabase = {
      images: [],
    };

    // 데이터베이스 초기화
    function initializeDatabase() {
      const initialData = {
        images: [
          { id: 1, path: "uploads/image1.jpg", comment: "첫 번째 이미지" },
          { id: 2, path: "uploads/image2.jpg", comment: "두 번째 이미지" },
          // 추가 데이터
        ],
      };

      fs.writeFileSync("fakeDatabase.json", JSON.stringify(initialData));
    }

    // 데이터베이스 파일 읽기
    function readDatabase() {
      const data = fs.readFileSync("fakeDatabase.json", "utf8");
      return JSON.parse(data);
    }

    // 가짜 데이터베이스 초기화 및 데이터 읽어오기
    initializeDatabase();
    const database = readDatabase();

    console.log(database);

    // 이제 데이터베이스 변수 `database`를 사용하여 데이터를 읽고 쓸 수 있습니다.
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
