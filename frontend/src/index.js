import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { setupWorker } from 'msw/browser'
// import handlers from './mock_handlers';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ProjectsProvider } from './contexts/ProjectsContext';

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_BACKEND_HOST}/graphql`,
    cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
// const worker = setupWorker(...handlers)
// worker.start().then(() =>
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ProjectsProvider>
                <App />
            </ProjectsProvider>
        </ApolloProvider>
    </React.StrictMode>
)
// );
