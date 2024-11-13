import { Route } from "react-router-dom"

import { Routes } from "react-router-dom"
import Earthquake from "./pages/Earthquake"
import EarthquakeDetails from "./pages/EarthquakeDetails"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Earthquake/>}/>
      <Route path="/earthquake/:id" element={<EarthquakeDetails/>}/>
    </Routes>
  )
}

export default App
