import React from 'react'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { MyProvider } from "./ContextAPI/MyContext.jsx";

import { UserProvider } from './ContextAPI/CurrentUser.jsx'
import { ProductProvider } from './ContextAPI/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
 

  <StrictMode>
     <BrowserRouter>
      
        <UserProvider>
          <MyProvider>
            <ProductProvider>
    <App />
    </ProductProvider>
        </MyProvider>
    </UserProvider>

 
    </BrowserRouter>
     </StrictMode>,
)
