import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

type RegisterArgs = {
  name: string;
  email: string;
  password: string;
};

type LoginArgs = {
  email: string;
  password: string;
};

// Schema Definition
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;

// In-memory user store
const users: { id: number; name: string; email: string; password: string }[] = [];

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
   register: (_: unknown, { name, email, password }: RegisterArgs) => {
      const newUser = { id: Date.now(), name, email, password };
      users.push(newUser);
      return newUser;
    },
    login: (_: unknown, { email, password }: LoginArgs) => {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const token = Buffer.from(`${email}:${password}`).toString('base64');
      return { token };
    },
  },
};

// Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export Vercel-compatible route handlers
export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
