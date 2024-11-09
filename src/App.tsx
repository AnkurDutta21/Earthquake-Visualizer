import { Route } from "react-router-dom"

import { Routes } from "react-router-dom"
import EarthquakeDashboard from "./pages/EarthquakeDashboard"
import Layout from "./layout/Layout"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><EarthquakeDashboard /></Layout>} />
    </Routes>
  )
}

export default App
