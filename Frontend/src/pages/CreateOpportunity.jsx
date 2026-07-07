import { PaddingLayout } from '../layouts/PaddingLayout'
import { CreateOpportunityForm } from '../features/shelterDashboard/CreateOpportunityForm'

export const CreateOpportunity = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F6] py-12">
      <PaddingLayout>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Volunteer Opportunity
          </h1>
          <p className="text-gray-600 mb-8">
            Fill out the form to publish a new opportunity and connect with volunteers.
          </p>
          <CreateOpportunityForm />
        </div>
      </PaddingLayout>
    </div>
  )
}
