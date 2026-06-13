import { createRoot } from 'react-dom/client';
import './index.css';
import "@mantine/core/styles.css";
import { MantineProvider } from '@mantine/core'
import { ApolloProvider } from '@apollo/client/react';
import { client } from './apolloClient.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/chatrooms/:id",
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
      <MantineProvider>
          <RouterProvider router={router} />
      </MantineProvider>
    </ApolloProvider>
)
