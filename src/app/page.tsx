'use client'
import styles from './page.module.css'
import { gql, useQuery } from '@apollo/client'

const PLANTS = gql`
  query {
    plants {
      name
      description
    }
  }
`

const Plants = () => {
  const { loading, error, data } = useQuery(PLANTS)
  if (loading) return <>loading</>
  if (error) return <>error</>
  return data.plants.map((plant: any) => {
    return (
      <div key={plant.name}>
        <p>{plant.name}</p>
      </div>
    )
  })
}

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>GraphQL</h1>
      <Plants />
    </main>
  )
}
