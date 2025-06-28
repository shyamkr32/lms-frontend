import { NextRequest, NextResponse } from "next/server";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

// Disable caching (Vercel)
export const dynamic = "force-dynamic";

// TypeScript Types
type RegisterArgs = {
  name: string;
  email: string;
  password: string;
};

type LoginArgs = {
  email: string;
  password: string;
};

// In-memory data
const users: { id: number; name: string; email: string; password: string }[] = [];

// Schema
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
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const token = Buffer.from(`${email}:${password}`).toString("base64");
      return { token };
    },
  },
};

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Server start promise (cached)
const startServerPromise = server.start();

// Handler: POST only
export async function POST(req: NextRequest) {
  await startServerPromise;

  const body = await req.json(); // Parse body manually
  const response = await server.executeOperation({
    query: body.query,
    variables: body.variables,
    operationName: body.operationName,
  });

  return NextResponse.json(response);
}

// Optional GET route for testing
export async function GET() {
  return NextResponse.json({ message: "Send POST requests to use GraphQL." });
}
