import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-zdy30girr3fhh833.us.auth0.com"
        clientId="GgYB7G9VKzIH39vafvAB8D5HfmFRMr9E"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>,
)
