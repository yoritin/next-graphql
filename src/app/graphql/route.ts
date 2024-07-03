import assert from 'node:assert'
import { ApolloServer } from '@apollo/server'
import { NextResponse } from 'next/server'
import { Plant } from '@/generated/graphql'

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
})

export async function POST(request: Request): Promise<NextResponse> {
  const json = await request.json()
  const res = await server.executeOperation({ query: json.query })
  assert(res.body.kind === 'single')
  return NextResponse.json(res.body.singleResult)
}
