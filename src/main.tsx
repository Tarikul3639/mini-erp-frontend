import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/providers/theme-provider.tsx"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider>
        <App />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </StrictMode>
  </Provider>
)
