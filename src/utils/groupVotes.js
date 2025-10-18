export function groupVotes(chain) {
  const grouped = {};

  chain.forEach(block => {
    if (block?.data?.votacionId && block?.data?.opcion) {
      const { votacionId, opcion } = block.data;
      if (!grouped[votacionId]) grouped[votacionId] = {};
      if (!grouped[votacionId][opcion]) grouped[votacionId][opcion] = 0;
      grouped[votacionId][opcion]++;
    }
  });

  return grouped;
}
