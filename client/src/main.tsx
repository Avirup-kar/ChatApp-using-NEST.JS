import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@mantine/core/styles.css";
import { MantineProvider } from '@mantine/core'
import { ApolloProvider } from '@apollo/client/react';
import { client } from './apolloClient.ts';

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </MantineProvider>
)
