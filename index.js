require("dotenv").config();
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
app.use(
  express.static(path.join(__dirname, "/client/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/client/build", "index.html")
  );
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
