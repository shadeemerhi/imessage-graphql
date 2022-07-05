import Cors from "micro-cors";
import resolvers from "../../graphql/resolvers";
import typeDefs from "../../graphql/typeDefs";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { NextApiRequest, NextApiResponse } from "next";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

const cors = Cors();

const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // return apolloServer.createHandler({
  //   path: "/api/graphql",
  // })(req, res);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
