import React, { useState } from 'react';

export default function TokenPage() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emitirToken = async () => {
    setLoading(true);
    setError(null);
    try {
      // Llamada simulada o real al backend
      const res = await fetch(`${process.env.REACT_APP_API_URL}/emitir-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identificador: 'usuario-demo' }),
      });
      const data = await res.json();
      if (data.token) setToken(data.token);
      else setError('No se pudo generar el token.');
    } catch (err) {
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Solicitar Token de Votación</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Este token te permitirá emitir tu voto de manera anónima y única.
      </p>

      {token ? (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-3 rounded">
          <p><strong>Tu token:</strong></p>
          <p className="break-all text-sm mt-2">{token}</p>
          <p className="mt-3 text-xs text-gray-500">
            ⚠️ Guárdalo, solo podrás usarlo una vez.
          </p>
        </div>
      ) : (
        <button
          onClick={emitirToken}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {loading ? 'Generando...' : 'Generar Token'}
        </button>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
