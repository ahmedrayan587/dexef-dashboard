import { DataGrid, GridColDef } from '@mui/x-data-grid'
import useApiData from '../hooks/useApiData'
import { LinearProgress, Box, Avatar } from '@mui/material'
import { useState } from 'react'

interface ApiItem {
  id: number
  name: string
  title: string
  isActive: boolean
  shortDescription: string
  longDescription: string
  logo?: {
    fullPath?: string
  }
  // Add other API fields here
}

interface GridRow {
  id: number
  name: string
  description: string
  isActive: boolean
  logoUrl: string | null
}

// Custom Loading Overlay
function CustomLoadingOverlay() {
  return (
    <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
      <LinearProgress />
    </Box>
  )
}

export default function DataGridDemo() {
  const { data, loading, error } = useApiData()
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  if (error) return <div>Error loading data: {error.message}</div>

  // Safely transform API data
  const transformedData: GridRow[] = data?.data?.items?.map((item: ApiItem) => {
    // Safely parse JSON fields with fallbacks
    const name = JSON.parse(item.name)?.default || item.name || 'No name'
    const description = JSON.parse(item.shortDescription)?.default || item.shortDescription || 'No description'
    const logoUrl = item.logo?.fullPath || null
    
    return {
      id: item.id,
      name,
      description,
      isActive: item.isActive || false,
      logoUrl
    }
  }) || []

  const columns: GridColDef<GridRow>[] = [
    { 
      field: 'logoUrl',
      headerName: 'Logo',
      cellClassName: 'flex justify-center items-center',
      width: 80,
      renderCell: (params) => (
        params.value ? (
          <Avatar 
            src={params.value} 
            alt="Logo" 
            sx={{ width: 40, height: 40 }}
          />
        ) : (
          <Avatar sx={{ width: 40, height: 40 }}>
            {params.row.name.charAt(0)}
          </Avatar>
        )
      ),
      sortable: false,
      filterable: false
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { 
      field: 'description', 
      headerName: 'Description', 
      width: 580,
    },
    { field: 'isActive', headerName: 'Active', width: 100, type: 'boolean', cellClassName: 'isActive'},
  ]

  return (
    <div style={{direction:'ltr', width: '100%' }}>
      <DataGrid
        rows={transformedData}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20,30]}
        loading={loading}
        slots={{
          loadingOverlay: CustomLoadingOverlay,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{
          '& .MuiDataGrid-filler':{
            backgroundColor: '#E0ECFF',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#E0ECFF',
            color: '#556681',
            border: '1px solid white',
          },
          '& .isActive svg[data-value=true]': {
            fill: '#2e8b3c',
          },
          '& .isActive svg[data-value=false]': {
            fill: '#c02000',
          },
          '& .MuiDataGrid-cell': {
            border: '1px solid #f0f0f0',
            fill: '#2E8B58',
            color: '#666666',
            fontSize: '16px',
          },
        }}
      />
    </div>
  )
}