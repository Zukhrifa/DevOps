# EduCare MERN App
Aplikasi merupakan implementasi penggunaan Devops dalam pengembangan perangkat lunak. Aplikasi memiliki CRUD sederhana dalam pengelolaan tugas, materi, dan monitoring kegiatan belajar mengajar. 

Tools yang digunakan untuk setup CI/CD sebagai berikut:
Vercel: platform hosting dan monitoring penggunaan CPU dan sebagai pada aplikasi berbasi website Educare.
UptimeRobot: monitoring api/health untuk mengetahui apakah aplikasi berbasis website mengalami down atau tidak dan dilakukan pengecekan 5 menit sekali.
Slack: platform untuk berkomunikasi jika project memerlukan kerja sama tim dan diintegrasikan dengan Vercel.
Github: integrasi dengan tools lain dan kode manajemen project.
VSCode: sebagai kode editor integrasi dengan Github
Alur CI/CD:
Continuous Integration: Setiap ada push ke branch main, Github Actions akan menjalankan alur otomatis yaitu checkout code, Install dependencies, dan build process.
Continuous Delivery: Setelah CI sukses, Vercel secara otomatis melakukan deployment ke server produksi.
Rollback Mechanism: Vercel memiliki fitur instant Rollback ketika terjadi kegagalan versi terbaru. 

Detail Monitoring dan Alerting:
Health Check: endpoint khusus pada /api/health yang mengembalikan status {"status": "UP"}
Uptime Monitoring: Dikonfigurasi melalui UptimeRobot dengan interval pengecekan setiap 5 menit
real-time Alerting: Integrasi slack webhook yang memberikan notifikasi instan ketika:
1. proses deployment di vercel berhasil/gagal.
2. uptimerobot mendeteksi aplikasi sedang down

Strategi Skalabilitas. Vercel sudah menggunakan arsitektur serverless dan otomatis menangani lonjakan trafik (auto-scaling) tanpa konfigurasi server manual. Vercel Global Edge Network bertindak sebagai Load Balancer untuk mendistribusikan trafik ke titik terdekat dari pengguna


credit: @ mongodb-developer @ github
source: mongodb-developer/mern-stack-example