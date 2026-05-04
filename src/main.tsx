import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Providers } from "./providers/index.tsx"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Providers>
      <App />
    </Providers>
  </ThemeProvider>
)
