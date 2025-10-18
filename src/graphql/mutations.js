import { gql } from '@apollo/client';

export const CREAR_VOTO = gql`
  mutation crearVoto($votacionId: Int!, $usuario: String!, $opcion: String!) {
    crearVoto(votacionId: $votacionId, usuario: $usuario, opcion: $opcion) {
      index
      timestamp
      data { votacionId usuario opcion }
    }
  }
`;
