import { Static, Type } from '@sinclair/typebox';

export const OrganizationBaseSchema = {
    orgCode: Type.String({ minLength: 1, maxLength: 100 }),
    name: Type.String({ minLength: 1, maxLength: 150 }),
    description: Type.Optional(Type.String({ maxLength: 255 })),
    address: Type.Optional(Type.String({ minLength: 1, maxLength: 200 })),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
};

export const CreateOrganizationBodySchema = Type.Object({
    orgCode: Type.String({ minLength: 1, maxLength: 100 }),
    name: Type.String({ minLength: 1, maxLength: 150 }),
    description: Type.Optional(Type.String({ maxLength: 255 })),
    address: Type.String({ minLength: 1, maxLength: 200 }),
});

export type CreateOrganizationBody = Static<typeof CreateOrganizationBodySchema>;

export const CreateOrganizationSchema = {
    body: CreateOrganizationBodySchema,
    response: {
        201: Type.Object({
            orgCode: Type.String(),
            name: Type.String(),
            description: Type.Optional(Type.String()),
            address: Type.String()
        }),
    },
};

export const UpdateOrganizationParamsSchema = Type.Object({
    orgCode: Type.String({ minLength: 1, maxLength: 100 }),
});

export const UpdateOrganizationBodySchema = Type.Partial(
    Type.Object({
        name: Type.String({ minLength: 1, maxLength: 150 }),
        description: Type.Optional(Type.String({ maxLength: 255 })),
        address: Type.String({ minLength: 1, maxLength: 200 }),
    })
);

export type UpdateOrganizationParams = Static<typeof UpdateOrganizationParamsSchema>;
export type UpdateOrganizationBody = Static<typeof UpdateOrganizationBodySchema>;

export const UpdateOrganizationSchema = {
    params: UpdateOrganizationParamsSchema,
    body: UpdateOrganizationBodySchema,
    response: {
        200: OrganizationBaseSchema,
    },
};

export const OrganizationListResponseSchema = {
    response: {
        200: Type.Array(Type.Object(OrganizationBaseSchema)),
    },
};