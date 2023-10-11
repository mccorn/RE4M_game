import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import Router from '../../router/router';
import './App.css';

const App = ({ url }: { url: string }) => {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    return (
        <StaticRouter location={url}>
            <Router />
        </StaticRouter>
    );
};

export default App;
