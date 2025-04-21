import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import './index.css'
import App from './App.jsx'
import store from './store/index.js';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense>
          <App />
          <Toaster
          toastOptions={{
            position : 'top-right',
            style : {
              background : '#00000051',
              color : 'white',
              backdropFilter: "blur(5px)", // Blur effect
              WebkitBackdropFilter: "blur(5px)"
            }
          }}
          
          />
        <ToastContainer/>
      </Suspense>      
    </Provider>
  </StrictMode>,
)
