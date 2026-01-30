import { FastifyInstance } from 'fastify';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserSchema, CreateUserBody, UpdateUserSchema } from './user.schema';
import { OrganizationService } from '../organizations/organization.service';
import { OrganizationEntity } from '../organizations/organization.entity';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function userRoutes(fastify: FastifyInstance){
    const userRepository = fastify.orm.getRepository(UserEntity);
    const organizationRepository = fastify.orm.getRepository(OrganizationEntity);
    const organizationService = new OrganizationService(organizationRepository);
        
    const userService = new UserService(userRepository, organizationService);

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

    fastify.get(
        '/find-all',
        async (request, reply) => {
            const users = await userService.getAllUsers();
            reply.send(users);
        }
    )

    fastify.get<{ Params: { username: string } }>(
        '/find-one/:username',
        async (request, reply) => {
            const user = await userService.getUserByUsername(request.params.username);
            if (!user) {
                reply.code(404).send({ message: 'User not found' });
                return;
            }
            reply.send(user);
        }
    )

    fastify.put<{ Params: { username: string }; Body: Partial<CreateUserBody> }>(
        '/update/:username',
        {
            schema: UpdateUserSchema,
        },
        async (request, reply) => {
            const user = await userService.updateUser(request.params.username, request.body);
            if (!user) {
                reply.code(404).send({ message: 'User not found' });
                return;
            }
            reply.send(user);
        }
    );
}

export default userRoutes;