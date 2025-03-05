import 'dotenv/config'

import { Index as UpstashIndex } from '@upstash/vector'
import { any } from 'zod'

const index = new UpstashIndex()

type MovieMetaData = {
  title?: string
  year?: string
  genre?: string
  director?: string
  actors?: string
  rating?: string
  votes?: string
  revenue?: string
  metascore?: string
}

export const queryMovies = async ({
  query,
  filters,
  topK = 5,
}: {
  query: string
  filters?: Partial<MovieMetaData>
  topK?: number
}) => {
  return index.query({
    data: query,
    topK,
    includeData: true,
    includeMetadata: true,
  })
}
