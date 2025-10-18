import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VOTACIONES } from '../graphql/queries';
import { CREAR_VOTO } from '../graphql/mutations';

export default function VoteForm({ onVoted }) {
  const { data: votacionesData, loading, error } = useQuery(GET_VOTACIONES);
  const [votacionId, setVotacionId] = useState('');
  const [opcion, setOpcion] = useState('');
  const [usuario, setUsuario] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState('');

  const [crearVoto, { loading: votando }] = useMutation(CREAR_VOTO, {
    onCompleted: () => {
      setMensaje('✅ Voto registrado con éxito');
      setTipoMensaje('success');
      setUsuario('');
      onVoted();
      setTimeout(() => setMensaje(null), 3000);
    },
    onError: (err) => {
      setMensaje(`⚠️ ${err.message}`);
      setTipoMensaje('error');
      setTimeout(() => setMensaje(null), 4000);
    },
  });

  useEffect(() => {
    if (votacionesData?.getVotaciones.length > 0) {
      setVotacionId(votacionesData.getVotaciones[0].id);
      setOpcion(votacionesData.getVotaciones[0].opciones[0]);
    }
  }, [votacionesData]);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-300">Cargando votaciones...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const votacionSeleccionada = votacionesData.getVotaciones.find(v => v.id === parseInt(votacionId));

  const handleVote = async () => {
    if (!usuario.trim()) {
      setMensaje('⚠️ Ingresa tu matrícula antes de votar.');
      setTipoMensaje('error');
      setTimeout(() => setMensaje(null), 3000);
      return;
    }

    await crearVoto({
      variables: { votacionId: parseInt(votacionId), usuario, opcion },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl mb-8 transition">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-200">
        🗳️ Emitir tu voto
      </h2>

      <input
        placeholder="Tu matrícula"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <div className="mb-4">
        <p className="font-medium text-gray-600 dark:text-gray-300 mb-2">Selecciona una votación:</p>
        {votacionesData.getVotaciones.map((v) => (
          <label key={v.id} className="flex items-center mb-2 text-gray-700 dark:text-gray-200">
            <input
              type="radio"
              name="votacion"
              value={v.id}
              checked={parseInt(votacionId) === v.id}
              onChange={() => {
                setVotacionId(v.id);
                setOpcion(v.opciones[0]);
              }}
              className="mr-2"
            />
            {v.titulo}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <p className="font-medium text-gray-600 dark:text-gray-300 mb-2">Selecciona una opción:</p>
        {votacionSeleccionada?.opciones.map((o) => (
          <label key={o} className="flex items-center mb-2 text-gray-700 dark:text-gray-200">
            <input
              type="radio"
              name="opcion"
              value={o}
              checked={opcion === o}
              onChange={() => setOpcion(o)}
              className="mr-2"
            />
            {o}
          </label>
        ))}
      </div>

      <button
        onClick={handleVote}
        disabled={votando}
        className={`w-full ${
          votando ? 'bg-gray-400 dark:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white p-2 rounded transition`}
      >
        {votando ? 'Enviando voto...' : 'Votar'}
      </button>

      {mensaje && (
        <div
          className={`mt-4 text-center p-2 rounded ${
            tipoMensaje === 'error'
              ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200'
              : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200'
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
}
