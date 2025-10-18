import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAIN } from '../graphql/queries';
import VoteForm from '../components/VoteForm';

export default function VotePage() {
  const { refetch } = useQuery(GET_CHAIN);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition-all duration-500">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Emitir Voto
      </h1>
      <VoteForm onVoted={refetch} />
    </div>
  );
}
