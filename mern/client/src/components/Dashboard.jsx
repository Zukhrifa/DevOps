export default function Dashboard() {
    return (
      <div className="p-6 bg-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-800">EduCare Dashboard</h1>
        <p className="mt-2">Selamat datang kembali! Berikut progres belajar Anda.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 shadow rounded">Tugas Selesai: 80%</div>
          <div className="bg-white p-4 shadow rounded">Materi Dibaca: 12</div>
          <div className="bg-white p-4 shadow rounded">Status: Aktif</div>
        </div>
      </div>
    );
  }