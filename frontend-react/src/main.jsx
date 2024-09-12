import ReactDOM from 'react-dom/client'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
// import { store } from './redux/app/store.js'
import { persistor, store } from './redux/app/store.js'
import routes from './routes';

import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={routes} />
      </Suspense>
    </PersistGate>
  </Provider>
  ,
)
