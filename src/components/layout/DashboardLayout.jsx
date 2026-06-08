import Sidebar from './Sidebar';

export default function DashboardLayout({ userRole, userName, userAvatar, children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      <Sidebar userRole={userRole} userName={userName} userAvatar={userAvatar} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

