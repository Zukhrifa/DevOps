# EduCare MERN App<br>
Aplikasi merupakan implementasi penggunaan Devops dalam pengembangan perangkat lunak. Aplikasi memiliki CRUD sederhana dalam pengelolaan tugas, materi, dan monitoring kegiatan belajar mengajar. <br>

Tools yang digunakan untuk setup CI/CD sebagai berikut:<br>
Vercel: platform hosting dan monitoring penggunaan CPU dan sebagai pada aplikasi berbasi website Educare.<br>
UptimeRobot: monitoring api/health untuk mengetahui apakah aplikasi berbasis website mengalami down atau tidak dan dilakukan pengecekan 5 menit sekali.<br>
Slack: platform untuk berkomunikasi jika project memerlukan kerja sama tim dan diintegrasikan dengan Vercel.<br>
Github: integrasi dengan tools lain dan kode manajemen project.<br>
VSCode: sebagai kode editor integrasi dengan Github<br>
Alur CI/CD:<br>
Continuous Integration: Setiap ada push ke branch main, Github Actions akan menjalankan alur otomatis yaitu checkout code, Install dependencies, dan build process.<br>
Continuous Delivery: Setelah CI sukses, Vercel secara otomatis melakukan deployment ke server produksi.<br>
Rollback Mechanism: Vercel memiliki fitur instant Rollback ketika terjadi kegagalan versi terbaru. <br>

Detail Monitoring dan Alerting:<br>
Health Check: endpoint khusus pada /api/health yang mengembalikan status {"status": "UP"}
Uptime Monitoring: Dikonfigurasi melalui UptimeRobot dengan interval pengecekan setiap 5 menit
real-time Alerting: Integrasi slack webhook yang memberikan notifikasi instan ketika:<br>
1. proses deployment di vercel berhasil/gagal.<br>
2. uptimerobot mendeteksi aplikasi sedang down<br>

Strategi Skalabilitas. Vercel sudah menggunakan arsitektur serverless dan otomatis menangani lonjakan trafik (auto-scaling) tanpa konfigurasi server manual. Vercel Global Edge Network bertindak sebagai Load Balancer untuk mendistribusikan trafik ke titik terdekat dari pengguna<br>


credit: @ mongodb-developer @ github <br>
source: mongodb-developer/mern-stack-example