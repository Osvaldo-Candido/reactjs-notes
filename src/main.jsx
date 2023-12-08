import React from 'react'
import { AuthProvider } from './hooks/Auth'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes'
import {ThemeProvider} from 'styled-components'
import theme from './styles/theme'
import GlobalStyles from './styles/global'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <AuthProvider>
      <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
