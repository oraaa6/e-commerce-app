// import { useQuery, useMutation, useQueryClient } from 'react-query';

// export function useRequestProcessor({queryKey, queryFunction, queryOptions}) {
//   const queryClient = useQueryClient();


//    const query = useQuery({
//       queryKey: key,
//       queryFn: queryFunction,
//       ...options,
//     });
 

//   function mutate(key, mutationFunction, options = {}) {
//     return useMutation({
//       mutationKey: key,
//       mutationFn: mutationFunction,
//       onSettled: () => queryClient.invalidateQueries(key),
//       ...options,
//     });
//   }

//   return { query, mutate };
// }