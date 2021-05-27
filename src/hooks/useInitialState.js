import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://us-central1-gndx-fake-api.cloudfunctions.net/api';

// Creamos una funcion por convension
const useInitialState = () => {
  // Utilizamos useState para poder trabajar con los estados en las funcioines dentro de componenetes de React
  const [products, setProducts] = useState([]);

  // useEffect es el encargado de hacer las peticiones a nuestra API por medio del recurso de Axios
  useEffect(async () => {
    // habilitamos el async para poder ejecutar funciones asincronas
    const response = await axios(API); // Esperamos por Axios con la API
    setProducts(response.data); // Obtenemos la repuesta con la data
  }, []); // Al segundo Valor, le colocamos un arreglo vacio por que no estamos escuchando ningnun elemento para que se vuelva a desencadenar

  return {
    products, // Retornamos
  };
};

export default useInitialState; // Exportamos
