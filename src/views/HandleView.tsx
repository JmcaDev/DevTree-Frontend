import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getUserByHandle } from '../api/DevTreeAPI'
import SpinnerHandle from '../components/SpinnerHandle'
import HandleData from '../components/HandleData'

function HandleView() {

  const params = useParams()
  //todo refactorizar al terminar el proyecto
  const handle = params.handle!

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle', handle],
    retry: 1
  })

  if (isLoading) return <SpinnerHandle/>
  if (error) return <Navigate to={'/404'}/>

  if(data) return <HandleData data={data}/>
}

export default HandleView