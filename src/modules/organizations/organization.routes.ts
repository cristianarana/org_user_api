import { FastifyInstance } from 'fastify';
import { OrganizationService } from './organization.service';
import { OrganizationEntity } from './organization.entity';
import { CreateOrganizationBody, CreateOrganizationSchema } from './organization.schema';

async function organizationRoutes(fastify: FastifyInstance) {
    const organizationRepository = fastify.orm.getRepository(OrganizationEntity);
    const organizationService = new OrganizationService(organizationRepository);

    fastify.post<{ Body: CreateOrganizationBody }>(
        '/',
        {
            schema: CreateOrganizationSchema,
        },
        async (request, reply) => {
            const organization = await organizationService.createOrganization(request.body);
            reply.code(201).send(organization);
        }
    );

    fastify.get('/',
        async (request, reply) => {
            const organizations = await organizationService.getAllOrganizations();
            reply.send(organizations);
        }
    );

    fastify.get<{ Params: { orgCode: string } }>(
        '/:orgCode',
        async (request, reply) => {
            const organization = await organizationService.getOrganizationByOrgCode(request.params.orgCode);
            if (!organization) {
                reply.code(404).send({ message: 'Organization not found' });
                return;
            }
            reply.send(organization);
        }
    );

    fastify.put<{ Params: { orgCode: string }; Body: Partial<CreateOrganizationBody> }>(
        '/:orgCode',
        async (request, reply) => {
            const organization = await organizationService.updateOrganization(request.params.orgCode, request.body);
            if (!organization) {
                reply.code(404).send({ message: 'Organization not found' });
                return;
            }
            reply.send(organization);
        }
    );
}