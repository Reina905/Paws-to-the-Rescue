import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthInitializer } from "./components/AuthInitializer"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { GuestRoute } from "./components/GuestRoute"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { Home } from "./pages/Home"
import { Volunteering } from "./pages/Volunteering"
import { VolunteeringDetails } from "./pages/VolunteeringDetails"
import { Shelters } from "./pages/Shelters"
import { AboutUs } from "./pages/AboutUs"
import { ShelterDetail } from "./pages/ShelterDetail"
import { VolunteerDashboard } from "./pages/VolunteerDashboard"
import { ShelterDashboard } from "./pages/ShelterDashboard"
import { CreateOpportunity } from "./pages/CreateOpportunity"
import { ShelterOpportunityManagement } from "./pages/ShelterOpportunityManagement"
import { VolunteerParticipationHistory } from "./pages/VolunteerParticipationHistory"
import { NotFound } from "./pages/NotFound"

export default function App() {
  return (
    <AuthInitializer>
      <BrowserRouter>
        <Routes>
          {/* Guest-only routes (redirect to home if already logged in) */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/volunteering" element={<Volunteering />} />
          <Route path="/volunteering/:id" element={<VolunteeringDetails />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/shelters/:id" element={<ShelterDetail />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Protected volunteer routes */}
          <Route element={<ProtectedRoute allowedRoles={["volunteer"]} />}>
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
            <Route path="/volunteer-history" element={<VolunteerParticipationHistory />} />
          </Route>

          {/* Protected shelter routes */}
          <Route element={<ProtectedRoute allowedRoles={["shelter"]} />}>
            <Route path="/shelter-dashboard" element={<ShelterDashboard />} />
            <Route path="/create-opportunity" element={<CreateOpportunity />} />
            <Route path="/shelter-opportunities" element={<ShelterOpportunityManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthInitializer>
  )
}
