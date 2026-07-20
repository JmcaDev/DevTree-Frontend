import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'

import { getUser } from "../api/DevTreeAPI";
import Spinner from "../components/Spinner";
import DevTree from "../components/DevTree";

function AppLayout() {

  const { data, isLoading, error, isError } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <Spinner/>
  if(isError) return <Navigate to={'/auth/login'}/>

  if(data) return <DevTree data={data}/>
}

export default AppLayout;
