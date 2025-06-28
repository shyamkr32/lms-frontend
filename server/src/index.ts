import { ApolloServer, gql } from "apollo-server";

// GraphQL Schema Definition
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type AuthPayload {
    token: String!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;

// In-memory user array
const users: { id: number; name: string; email: string; password: string }[] =
  [];

// Resolver functions
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    register: (_: any, { name, email, password }: any) => {
      const newUser = { id: Date.now(), name, email, password };
      users.push(newUser);
      return newUser;
    },
    login: (_: any, { email, password }: any) => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Generate a mock token (in real apps, use JWT)
      const token = Buffer.from(`${email}:${password}`).toString("base64");
      return { token };
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
