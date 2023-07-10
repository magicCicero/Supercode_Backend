import http from "http";
import fs from "fs";

const sendFile = (path, response, code) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      response.writeHead(500);
      response.end();
      return;
    }
    response.write(data);
    response.end();
  });
};

const simpleRequestHandler = (request, response) => {
  if (request.url === "/") {
    sendFile("./index.html", response, 200);
  } else if (request.url === "/home") {
    response.end("Hello Home");
  } else if (request.url === "/about") {
    response.end("Hello About");
  } else if (request.url === "/contact") {
    response.end("Hello Contact");
  } else {
    response.writeHead(404);
    response.end("404 Not Found");
  }
};

const ultimateRequestHandler = (request, response) => {
  console.log("Unsere Methode: ", request.method, request.url);
  if (request.url === "/") {
    ultimateSendFile("./index.html", response, 200);
  } else {
    ultimateSendFile("." + request.url, response, 200);
  }
};

const ultimateSendFile = (path, response, code) => {
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

const server = http.createServer(ultimateRequestHandler);

server.listen(9898, () => console.log("Ich stehe vor der Tür und warte"));
