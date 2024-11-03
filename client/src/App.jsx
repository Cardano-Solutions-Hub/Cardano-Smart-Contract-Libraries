import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ContractLibrary from "./pages/ContractLibrary"
import Documentation from "./pages/Documentation"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/contract-library" element={<ContractLibrary />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
