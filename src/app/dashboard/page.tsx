export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Welcome</h3>
          <p className="mt-2 text-gray-600">
            Admin dashboard for ThisByte lead management and system oversight.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Compliance Status</h3>
          <p className="mt-2 text-green-600 font-medium">
            Phase 2 Implementation in Progress
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Next Steps</h3>
          <ul className="mt-2 text-gray-600 list-disc list-inside">
            <li>Complete Firebase Auth setup</li>
            <li>Implement lead management</li>
            <li>Add audit logging</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
