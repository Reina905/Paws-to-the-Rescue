import { useState } from "react"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { ApplicationFilters } from "../features/volunteerApplications/ApplicationFilters"
import { ApplicationsList } from "../features/volunteerApplications/ApplicationsList"

const MOCK_APPLICATIONS = [
  { id: 1, title: "Kitten Socialization Session", shelter: "Happy Paws Shelter", location: "Barcelona", date: "2026-01-10", hours: 3, status: "pending" },
  { id: 2, title: "Cleaning Shift", shelter: "Casa Felina BCN", location: "Barcelona", date: "2026-01-05", hours: 4, status: "approved" },
  { id: 3, title: "Medical Support Assistance", shelter: "Northside Rescue", location: "Madrid", date: "2025-12-28", hours: 5, status: "rejected" },
  { id: 4, title: "Feeding & Care Morning Shift", shelter: "Happy Paws Shelter", location: "Barcelona", date: "2025-12-20", hours: 2, status: "approved" },
]

export const VolunteerApplications = () => {
  const [filter, setFilter] = useState("all")

  const filtered =
    filter === "all"
      ? MOCK_APPLICATIONS
      : MOCK_APPLICATIONS.filter((a) => a.status === filter)

  return (
    <main className="min-h-screen bg-tertiary-light">
      <PaddingLayout>
        <div className="pt-10 pb-6">
          <h1 className="text-4xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-500 mt-2">Track the status of your volunteer opportunities</p>
        </div>

        <ApplicationFilters current={filter} onChange={setFilter} />
        <ApplicationsList applications={filtered} />
      </PaddingLayout>
    </main>
  )
}
