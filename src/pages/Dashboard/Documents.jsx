import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../App';

export default function Documents() {
  const { userData } = useAuth();

  const documents = [
    { id: 1, title: 'Purchase Agreement', status: 'Available', fileSize: '2.4 MB', fileType: 'PDF' },
    { id: 2, title: 'Vehicle Inspection Report', status: 'Available', fileSize: '4.8 MB', fileType: 'PDF' },
    { id: 3, title: 'Insurance Document', status: 'Pending', fileSize: '--', fileType: 'PDF' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        userRole="buyer"
        userName={userData?.name || 'Buyer'}
        userAvatar={userData?.avatar || null}
      />

      <div className="flex-1 pt-20 md:pt-0 overflow-auto">
        <div className="p-4 md:p-8 max-w-4xl w-full mx-auto md:mx-0">

          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Documents</h1>
            <p className="text-sm text-slate-500 mt-1">Access purchase certificates and inspection reports.</p>
          </div>

          <div className="grid gap-4">
            {documents.map((doc) => {
              const isAvailable = doc.status === 'Available';
              return (
                <div key={doc.id} className="bg-white p-4 md:p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs border shrink-0 ${isAvailable ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                      {doc.fileType}
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-base text-slate-900">{doc.title}</h3>
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${isAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                          {doc.status}
                        </span>
                        {isAvailable && <span className="text-xs text-slate-400 font-medium">Size: {doc.fileSize}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex justify-end">
                    <button
                      disabled={!isAvailable}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold transition-all ${isAvailable ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    >
                      {isAvailable ? 'Download' : 'Awaiting'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
