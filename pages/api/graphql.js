import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'

const apolloServer = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: 'http:localhost:1337/graphql' })
