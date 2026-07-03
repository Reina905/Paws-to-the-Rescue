import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { Home } from "./pages/Home"
import { Volunteering } from "./pages/Volunteering"
import { VolunteeringDetails } from "./pages/VolunteeringDetails"
import { Shelters } from "./pages/Shelters"
import { AboutUs } from "./pages/AboutUs"
import { ShelterDetail } from "./pages/ShelterDetail"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/volunteering" element={<Volunteering />} />
        <Route path="/volunteering/:id" element={<VolunteeringDetails />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/shelters/:id" element={<ShelterDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  )
}
