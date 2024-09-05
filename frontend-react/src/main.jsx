import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
// import { store } from './redux/app/store.js'
import { persistor, store } from './redux/app/store.js'


import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </PersistGate>

  </Provider>
  ,
)
