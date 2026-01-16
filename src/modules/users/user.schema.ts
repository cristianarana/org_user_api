import { Static, Type } from '@sinclair/typebox';

export const UserBaseSchema = {
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 2, maxLength: 100 }),
  email: Type.String({ format: 'email' }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
};

export const CreateUserBodySchema =Type.Object({
  name: Type.String({ minLength: 2, maxLength: 100 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 }),
 
});

export type CreateUserBody = Static<typeof CreateUserBodySchema>;

export const CreateUserSchema = {
  body: CreateUserBodySchema,
  response: {
    201: Type.Object({
      id: Type.String({ format: 'uuid' }),
      name: Type.String(),
      email: Type.String(),
      createdAt: Type.String(),
      updatedAt: Type.String(),
    }),
  }
};

export const UpdateUserParamsSchema = Type.Object({
    id: Type.String({ format: 'uuid' }),
});

export const UpdateUserBodySchema = Type.Partial(
    Type.Object({
  name: Type.String({ minLength: 2, maxLength: 100 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 }),
    })
);

export type UpdateUserParams = Static<typeof UpdateUserParamsSchema>;
export type UpdateUserBody = Static<typeof UpdateUserBodySchema>;


export const UpdateUserSchema = {
  params: UpdateUserParamsSchema,
  body: UpdateUserBodySchema,
  response: {
    200: UserBaseSchema,
  },
};


export const UserResponseSchema = {
  response: {
    200: Type.Object(UserBaseSchema),
  },
};

export const UserListResponseSchema = {
  response: {
    200: Type.Array(Type.Object(UserBaseSchema)),
  },
};