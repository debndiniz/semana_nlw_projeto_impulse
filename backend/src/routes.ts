import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"; // erro: "../controllers/AuthenticateUserController"
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessagesCotroller";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle); // handle recebe o request e o response mas  como estou usando ele dentro da rota, funciona como um ... e aí nao preciso passar o parametros do request e do response. automat. o express consegue já fazer isso

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last3", new Get3LastMessagesController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
