const express = require("express");
require("./models/db");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphqlSchema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});
const app = express();

app.listen(3000, () => {
  console.log("server started");
});
