import express from "express";
import graphqlHttp from "express-graphql";

import { schema } from "./schema";

const app = express();

app.use(
  '/graphql',
  graphqlHttp({
    schema,
    graphiql: true,
  }),
);

app.listen(process.env.PORT || 4000, () => {
  console.log("app start");
});
