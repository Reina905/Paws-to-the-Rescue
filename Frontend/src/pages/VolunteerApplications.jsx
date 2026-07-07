import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { ApplicationFilters } from "../features/volunteerApplications/ApplicationFilters"
import { ApplicationsList } from "../features/volunteerApplications/ApplicationsList"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { EmptyState } from "../components/EmptyState"
import { useVolunteerApplications } from "../hooks/useVolunteers"

export const VolunteerApplications = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all")
  const { data, loading, error, refetch } = useVolunteerApplications(filter)

  // Redirect on 401
  useEffect(() => {
    if (error && (error.includes?.('401') || error.toLowerCase?.().includes?.('unauthorized'))) {
      navigate('/login')
    }
  }, [error, navigate])

  return (
    <main className="min-h-screen bg-tertiary-light">
      <PaddingLayout>
        <div className="pt-10 pb-6">
          <h1 className="text-4xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-500 mt-2">Track the status of your volunteer opportunities</p>
        </div>

        <ApplicationFilters current={filter} onChange={setFilter} />

        {loading && <LoadingSpinner />}
        {error && !error.includes?.('401') && <ErrorMessage message={error} onRetry={refetch} />}
        {!loading && !error && data?.length === 0 && (
          <EmptyState message="No tienes aplicaciones registradas." />
        )}
        {!loading && !error && data?.length > 0 && (
          <ApplicationsList applications={data} />
        )}
      </PaddingLayout>
    </main>
  )
}
