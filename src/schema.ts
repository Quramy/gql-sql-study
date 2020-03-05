import joinMonster from "join-monster";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from "graphql";

const User = new GraphQLObjectType({
  name: "User",
  sqlTable: 'public."User"',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
      },
      name: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
    };
  },
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        async resolve() {
          return "world";
        },
      },
      user: {
        type: User,
        args: {
          id: {
            type: GraphQLNonNull(GraphQLInt),
          },
        },
        where: (tbl, args) => {
          return `${tbl}.id = ${args.id}`;
        },
        resolve: (_, args, context, resolveInfo) => {
          console.log(User);
          return joinMonster(resolveInfo, {}, (sql: string) => {
            console.log(sql);
            return null;
          });
        },
      },
    },
  }),
});
