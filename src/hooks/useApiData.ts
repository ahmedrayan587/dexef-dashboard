import { useState, useEffect } from 'react'
import axios from 'axios'

interface ApiResponse {
  isSuccess: boolean
  errors: any[]
  data: {
    totalCount: number
    items: Array<{
      id: number
      name: string
      title: string
      isActive: boolean
      shortDescription: string
      longDescription: string
      missingPricesCount: number
      // Add other fields as needed
    }>
  }
}

export default function useApiData() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://mydexefapi.azurewebsites.net/api/Addon/GetPagedList'
        )
        setData(response.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}