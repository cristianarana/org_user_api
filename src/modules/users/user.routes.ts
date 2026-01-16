import { FastifyInstance } from 'fastify';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserSchema, CreateUserBody } from './user.schema';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function userRoutes(fastify: FastifyInstance){
    const userRepository = fastify.orm.getRepository(UserEntity);
    const userService = new UserService(userRepository);

    fastify.post<{ Body: CreateUserBody }>(
        '/',
        {
            schema: CreateUserSchema,
        },
        async (request, reply) => {
            const user = await userService.createUser(request.body);
            reply.code(201).send(user);
        }
    )
}

export default userRoutes;