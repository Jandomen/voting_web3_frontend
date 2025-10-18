import { gql } from '@apollo/client';

export const GET_CHAIN = gql`
  query { getChain { index timestamp data { votacionId usuario opcion } previousHash hash } }
`;

export const GET_VOTACIONES = gql`
  query { getVotaciones { id titulo opciones } }
`;
