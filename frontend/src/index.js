import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< Updated upstream
=======
import { ChakraProvider } from '@chakra-ui/react';
import Wrapper from './context/GlobalWrapper';
import WrapperS from './context/GlobalWrapperSprint';
import WrapperRec from './context/GlobalWrapperRec';
import { WrapperChat } from './context/GlobalWrapperChat';

>>>>>>> Stashed changes

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< Updated upstream
    <App />
=======
    <WrapperS>
    <Wrapper>
      <WrapperRec>
        <WrapperChat>
      
      <ChakraProvider>

    <App />
    </ChakraProvider>
    </WrapperChat>
    </WrapperRec>
    </Wrapper>
    </WrapperS>
    


>>>>>>> Stashed changes
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
