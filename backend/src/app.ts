import "dotenv/config"; // para acessar as variaveis de ambiente
import express from "express";
import http from "http";
import { Server } from "socket.io"

import { router } from "./routes";

const app = express();

const serverHttp = http.createServer(app);

/////////
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
//////////

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
}); // e entao temos acesso à conexao io do cliente
// o cors permite ou barra as requisicoes dentro da aplicacao
io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`);
}); // conseguir escutar evento dentro do websocket

app.use(express.json());
app.use(router);



app.get("/github", (request, response) => {
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    ); //para a app redirecionar para a tela do github
});

app.get("/signin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code);
});

export { serverHttp, io };
