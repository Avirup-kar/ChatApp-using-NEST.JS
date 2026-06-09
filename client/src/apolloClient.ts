import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws"
import { createUploadLink } from "apollo-upload-client"
import { getMainDefinition } from "@apollo/client/utilities"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
import { useUserStore } from "./stores/userStore"
import { onError } from "@apollo/client/link/error"