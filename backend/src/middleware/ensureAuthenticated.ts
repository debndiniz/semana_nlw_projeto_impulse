import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  // Bearer 8934565dfffgnfnjmseth (numero do token)
  // [0] Bearer
  // [1] 8934565dfffgnfnjmseth

  const [, token] = authToken.split(" ")


  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayLoad// se token invalido, lança exceçao
    request.user_id = sub;
    return next(); // para repjassar o middleware para frente

  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" })
  }
  //por padrao como usamos o ts, nao entende o user id. por isso vamos sobrescrever as tipagens do express
}