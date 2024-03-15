import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import Wrapper from './context/GlobalWrapper';
import WrapperS from './context/GlobalWrapperSprint';
import WrapperRec from './context/GlobalWrapperRec';
import { WrapperChat } from './context/GlobalWrapperChat';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <WrapperS>
        <Wrapper>
          <WrapperRec>
            <WrapperChat>
              <App />
            </WrapperChat>
          </WrapperRec>
        </Wrapper>
      </WrapperS>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Si vous souhaitez mesurer les performances de votre application, passez une fonction
// pour enregistrer les résultats (par exemple: reportWebVitals(console.log))
// ou envoyez-les à un point de terminaison d'analyse. Apprenez-en plus: https://bit.ly/CRA-vitals
reportWebVitals();
