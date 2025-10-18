import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';
import { groupVotes } from '../utils/groupVotes';

export default function PollResults({ chain }) {
  if (!chain || chain.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 mt-6 text-lg italic">
        🕓 Aún no se han registrado votos.
      </p>
    );

  const grouped = groupVotes(chain);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100 tracking-wide">
        📊 Resultados de las Votaciones
      </h2>

      {Object.keys(grouped).map((votacionId) => {
        const data = Object.entries(grouped[votacionId]).map(([opcion, votos]) => ({
          opcion,
          votos,
        }));

        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

        return (
          <div
            key={votacionId}
            className="mb-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
          >
            <h3 className="font-semibold text-lg mb-6 text-gray-700 dark:text-gray-200 text-center">
              🗳️ Votación ID: <span className="text-blue-600 dark:text-blue-400">{votacionId}</span>
            </h3>

            <div className="w-full h-[400px]"> {/* Aquí aumentamos el tamaño */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  barSize={80} // ancho de las barras
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.3} />
                  <XAxis
                    dataKey="opcion"
                    tick={{ fill: '#666', fontSize: 13 }}
                    stroke={false}
                    tickMargin={10}
                    className="dark:text-gray-300"
                  />
                  <YAxis
                    tick={{ fill: '#666', fontSize: 12 }}
                    stroke={false}
                    width={40}
                    className="dark:text-gray-300"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      borderRadius: '10px',
                      color: '#fff',
                      border: 'none',
                    }}
                    cursor={{ fill: 'rgba(96,165,250,0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar dataKey="votos" radius={[8, 8, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
