import { PaddingLayout } from "../layouts/PaddingLayout"
import { DashboardSidebar } from "../features/volunteerDashboard/DashboardSidebar"
import { DashboardHeader } from "../features/volunteerDashboard/DashboardHeader"
import { DashboardProfile } from "../features/volunteerDashboard/DashboardProfile"
import { DashboardHistory } from "../features/volunteerDashboard/DashboardHistory"
import { DashboardRecommendations } from "../features/volunteerDashboard/DashboardRecommendations"

const MOCK_VOLUNTEER = {
  name: "Sarah Jenkins",
  role: "Kitten Guardian",
  since: "Oct 2023",
  totalHours: 128,
  sheltersAssisted: 12,
}

const MOCK_HISTORY = [
  {
    title: "Socialization Session",
    location: "Cat Haven",
    time: "2 days ago",
    hours: "3 hours",
    note: "Helped Luna gain confidence and get adopted!",
  },
  {
    title: "Medical Record Updates",
    location: "Northside Rescue",
    time: "Last week",
    hours: "5 hours",
    note: "Digitized 50+ records for vet team.",
  },
]

const MOCK_RECOMMENDATIONS = [
  {
    title: "Kitten Nursery Night Shift",
    location: "Whiskers Way",
    description: "High-need shift for experienced kitten volunteers.",
    tag: "New",
  },
  {
    title: "Pet Portrait Session",
    location: "Valley Rescue",
    description: "Help take photos of 15 new cats.",
    simple: true,
  },
]

export const VolunteerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#FFF8F6]">
      <DashboardSidebar userName={MOCK_VOLUNTEER.name} userRole={MOCK_VOLUNTEER.role} />

      <main className="flex-1 md:ml-64">
        <DashboardHeader userName={MOCK_VOLUNTEER.name} />

        <PaddingLayout>
          <DashboardProfile volunteer={MOCK_VOLUNTEER} />

          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2">
              <DashboardHistory history={MOCK_HISTORY} />
            </div>
            <DashboardRecommendations recommendations={MOCK_RECOMMENDATIONS} />
          </div>
        </PaddingLayout>
      </main>
    </div>
  )
}
