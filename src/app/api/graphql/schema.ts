import { createSchema } from "graphql-yoga";
import { type NextRequest } from "next/server";

interface GraphQLContext {
  req: NextRequest;
}

export const schema = createSchema<GraphQLContext>({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
      processNumber(value: Int!): NumberResult!
    }

    type NumberResult {
      squared: Int!
      stringified: String!
    }
  `,
  resolvers: {
    Query: {
      hello: (_parent, _args, ctx) => {
        const ip = ctx.req?.headers.get("x-forwarded-for") ?? "unknown IP";
        return `Hello! Your IP: ${ip}`;
      },
      processNumber: (_parent, args: { value: number }) => {
        const squared = args.value ** 2;
        const stringified = `${args.value}a`;
        return { squared, stringified };
      },
    },
  },
});
