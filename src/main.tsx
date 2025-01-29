import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './redux/store'
import { Home } from './pages/Home/Home';

import './index.scss'





createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
        <Home/>
        <ToastContainer />
     </Provider>
    
  </StrictMode>,
)
