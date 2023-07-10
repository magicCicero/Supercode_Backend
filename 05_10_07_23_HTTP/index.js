import http from "http";

// # denkt an client -----> server
// # was bekommt der Server vom Client?
// # ein Request

// # wir müssen unseren Server sagen, was er eignlich mit einem request machen soll

const requestHandler = (request, response) => {
  response.end("Hello World");
};

// # simpel
const simpleRequestHandler = (request, response) => {
  if (request.url === "/") {
    if (request.method === "POST") {
      response.end("Danke für deine Daten");
    } else {
      response.end("Hello World");
    }
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

// # simpel mit request methoden
//  GET -> liefer mir Daten wir  wollen was haben
//  POST -> nimm diese Daten, wir geben etwas neues
//  PUT -> veränderer diese Daten, wir updaten vorhandenes
//  DELETE -> löschen diese Daten, wir löschen vorhandenes

const server = http.createServer(simpleRequestHandler);

server.listen(9898, () => console.log("Ich stehe vor der Tür und warte"));
