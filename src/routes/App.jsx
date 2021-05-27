import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Layout from '../components/Layout';
import NotFound from '../containers/NotFound';
import useInitialState from '../hooks/useInitialState';

const App = () => {
  const initialState = useInitialState(); // Inizializamos useInitialState
  const isEmpty = Object.keys(initialState.products).length; // Si todavia no hay un elemente mandamos llamar un Objeto

  return (
    <>
      {isEmpty > 0 ? ( // Si el compoenente no es vacio, mostramos la informacion
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/checkout" component={Checkout} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      ) : (
        // Si el compoenente es vacio, mostramos un h1 con un texto
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default App;
