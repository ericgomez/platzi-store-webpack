import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '@containers/Home';
// import Checkout from '@containers/Checkout';
import Layout from '@components/Layout';
import NotFound from '@containers/NotFound';
import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import { hot } from 'react-hot-loader/root';

// 👈 Implementando Lazy Loading
const AsyncCheckoutContainer = React.lazy(() => import('@containers/Checkout'));

const App = () => {
  const initialState = useInitialState(); // Inizializamos useInitialState
  const isEmpty = Object.keys(initialState.products).length; // Si todavia no hay un elemente mandamos llamar un Objeto

  return (
    <>
      {isEmpty > 0 ? ( // Si el compoenente no es vacio, mostramos la informacion
        // Implementamos Suspense de React
        <Suspense fallback={<div>Loading...</div>}>
          <AppContext.Provider value={initialState}>
            <BrowserRouter>
              <Layout>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/checkout" component={AsyncCheckoutContainer} />
                  <Route component={NotFound} />
                </Switch>
              </Layout>
            </BrowserRouter>
          </AppContext.Provider>
        </Suspense>
      ) : (
        // Si el compoenente es vacio, mostramos un h1 con un texto
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default hot(App); // 👈 Exportando con el metodo Hot Reload
