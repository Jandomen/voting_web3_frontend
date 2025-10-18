import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAIN } from '../graphql/queries';
import PollList from '../components/PollList';

export default function ChainPage() {
  const { data, loading, error } = useQuery(GET_CHAIN);

  if (loading)
    return <p className="text-center mt-6 text-gray-600 dark:text-gray-300">Cargando blockchain...</p>;
  if (error)
    return <p className="text-center text-red-600 dark:text-red-400 mt-6">Error: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition-all duration-500">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Cadena Blockchain
      </h1>
      <PollList chain={data.getChain} />
    </div>
  );
}
