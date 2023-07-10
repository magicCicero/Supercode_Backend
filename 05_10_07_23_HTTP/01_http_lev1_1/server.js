import http from "http";
import fs from "fs";

const requestHandler = (request, response) => {
  console.log("Unsere Methode: ", request.method, request.url);
  if (request.url === "/") {
    sendFile("./home.html", response, 200);
  } else {
    sendFile("." + request.url, response, 200);
  }
};

const sendFile = (path, response, status) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.writeHead(500);
      response.end();
      return;
    }

    if (path.includes(".png")) {
      response.writeHead(200, { "Content-Type": "image/png" });
      response.end(data);
      return;
    }
    response.write(data);
    response.end();
  });
};
const server = http.createServer(requestHandler);
server.listen(9898, () => console.log("Ich stehe vor der Tür und warte"));
