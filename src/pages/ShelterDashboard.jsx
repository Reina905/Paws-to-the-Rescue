import { PaddingLayout } from "../layouts/PaddingLayout"
import { ShelterDashboardSidebar } from "../features/shelterDashboard/ShelterDashboardSidebar"
import { ShelterDashboardHeader } from "../features/shelterDashboard/ShelterDashboardHeader"
import { ShelterDashboardStats } from "../features/shelterDashboard/ShelterDashboardStats"
import { ShelterDashboardApplications } from "../features/shelterDashboard/ShelterDashboardApplications"
import { ShelterDashboardQuickActions } from "../features/shelterDashboard/ShelterDashboardQuickActions"

const MOCK_SHELTER = {
  name: "Happy Paws Shelter",
  location: "San José, Costa Rica",
  totalAnimals: 78,
  volunteers: 54,
  activeOpportunities: 6,
  pendingApplications: 12,
}

const MOCK_APPLICATIONS = [
  { name: "Laura Martínez", role: "Feeding Volunteer", time: "2 hours ago" },
  { name: "Carlos Gómez", role: "Cleaning Shift", time: "Yesterday" },
  { name: "Ana López", role: "Medical Support", time: "2 days ago" },
]

const MOCK_QUICK_ACTIONS = [
  { title: "Create Opportunity", desc: "Post a new volunteer shift" },
  { title: "Review Applications", desc: "Approve pending volunteers" },
  { title: "View Analytics", desc: "Check shelter performance" },
]

export const ShelterDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#FFF8F6]">
      <ShelterDashboardSidebar shelterName={MOCK_SHELTER.name} />

      <main className="flex-1 md:ml-64">
        <ShelterDashboardHeader />

        <PaddingLayout>
          <ShelterDashboardStats stats={MOCK_SHELTER} />

          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2">
              <ShelterDashboardApplications applications={MOCK_APPLICATIONS} />
            </div>
            <ShelterDashboardQuickActions actions={MOCK_QUICK_ACTIONS} />
          </div>
        </PaddingLayout>
      </main>
    </div>
  )
}
