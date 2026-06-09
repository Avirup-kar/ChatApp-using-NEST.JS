import {
  ApolloClient,
  InMemoryCache,
  gql,
  Observable,
  ApolloLink,
  split,
  type TypedDocumentNode,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useUserStore } from "./stores/userStore";
import { onError } from "@apollo/client/link/error";

loadErrorMessages();
loadDevMessages();

async function refreshToken(client: ApolloClient) {
  try {
    const REFRESH_TOKEN_MUTATION: TypedDocumentNode<{ refreshToken: string }> = gql`
      mutation RefreshToken {
        refreshToken
      }
    `;

    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
    });

    const newAccessToken = data?.refreshToken;
    if (!newAccessToken) {
      throw new Error("New access token not received.");
    }
    return `Bearer ${newAccessToken}`;
  } catch (err) {
    throw new Error("Error getting new access token.", { cause: err });
  }
}

