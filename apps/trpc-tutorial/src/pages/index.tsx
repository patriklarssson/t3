import { trpc } from '../utils/trpc';

export function Index() {

  const {data, error, isLoading} = trpc.useQuery(['hello'], {})

  if(isLoading)
    return <p>Loading...</p>

  if(error)
    <p>{JSON.stringify(error)}</p>

  return (
    <p>{JSON.stringify(data)}</p>
  );
}

export default Index;
