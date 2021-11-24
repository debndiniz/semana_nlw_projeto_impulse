import prismaClient from "../prisma";

class ProfileUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      }, //como o usuario ja vai estar autenticado na minha aplicacao, ja vamos ter o user id
    });

    return user;
  }
}

export { ProfileUserService };