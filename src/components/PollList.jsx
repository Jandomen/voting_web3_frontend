import React from 'react';

export default function PollList({ chain }) {
  if (!chain || chain.length === 0)
    return <p className="text-center text-gray-500 dark:text-gray-300 mt-4">No hay bloques aún.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
        🔗 Blockchain - Cadena de Bloques
      </h2>

      {chain.map(block => (
        <div
          key={block.index}
          className="border border-gray-200 dark:border-gray-700 p-4 mb-3 rounded-lg shadow bg-gray-50 dark:bg-gray-800 transition"
        >
          <p className="text-sm text-gray-700 dark:text-gray-200"><strong>Bloque #:</strong> {block.index}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200"><strong>Timestamp:</strong> {new Date(parseInt(block.timestamp)).toLocaleString()}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200"><strong>Votación ID:</strong> {block.data.votacionId}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200"><strong>Opción:</strong> {block.data.opcion}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 break-all mt-2"><strong>Hash anterior:</strong> {block.previousHash}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 break-all"><strong>Hash actual:</strong> {block.hash}</p>
        </div>
      ))}
    </div>
  );
}
