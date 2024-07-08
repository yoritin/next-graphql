import assert from 'node:assert'
import { ApolloServer } from '@apollo/server'
import { NextResponse } from 'next/server'
import { Plant } from '../../generated/graphql'

const plants: Plant[] = [
  {
    name: 'Plant 1',
    description: 'Description 1',
    image: 'Image 1',
  },
  {
    name: 'Plant 2',
    description: 'Description 2',
    image: 'Image 2',
  },
  {
    name: 'Plant 3',
    description: 'Description 3',
    image: 'Image 3',
  },
  {
    name: 'Plant 4',
    description: 'Description 4',
    image: 'Image 4',
  },
  {
    name: 'Plant 5',
    description: 'Description 5',
    image: 'Image 5',
  },
]

const typeDefs = /* GraphQL */ `
  type Plant {
    name: String
    description: String
    image: String
  }

  type Query {
    plants: [Plant]
  }
`

const resolvers = {
  Query: {
    plants: () => plants,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // TODO 開発環境のみでtrueにする
})

let serverStartPromise: Promise<void> | null = null

export async function POST(request: Request): Promise<NextResponse> {
  if (!serverStartPromise) {
    serverStartPromise = server.start()
  }
  await serverStartPromise

  const json = await request.json()
  const res = await server.executeOperation({ query: json.query })
  assert(res.body.kind === 'single')
  return NextResponse.json(res.body.singleResult)
}

export async function GET(_request: Request) {
  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; overflow-x: hidden; overflow-y: hidden;">
        <div id="sandbox" style="height:100vh; width:100vw;"></div>
        <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
        <script>
          new window.EmbeddedSandbox({
            target: "#sandbox",
            initialEndpoint: "/graphql",
          });
        </script>
      </body>
    </html>
    `,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    },
  )
}
