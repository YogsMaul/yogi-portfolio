import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Smartphone, Monitor, Mail, Briefcase, GraduationCap, Building2 } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-bg">
      <SectionWrapper className="py-10 md:py-14">
        {/* Header Section */}
        <div className="mb-10 border-b-4 border-primary pb-4">
          <h1 className="text-4xl font-bold mb-3">Tentang Saya</h1>
          <p className="text-lg text-fg/80 max-w-3xl font-semibold leading-relaxed">
            <strong>Achmad Yogi Maulana</strong> — Mobile Developer lulusan D3 Teknik Komputer Polsri &amp; mahasiswa S1 Sistem Informasi Universitas Terbuka Palembang. Saat ini aktif di Magang Karya IT Bank Sumsel Babel.
          </p>
        </div>

        {/* Main Grid: Left (4 cols) & Right (8 cols) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Photo & Quick Info Card */}
          <div className="lg:col-span-4 space-y-6">

            {/* Rounded squircle Photo frame */}
            <div className="relative max-w-[280px] sm:max-w-xs mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-primary border-4 border-fg translate-x-2.5 translate-y-2.5 rounded-2xl shadow-brutal"></div>
              <div className="relative border-4 border-fg bg-surface p-2 shadow-brutal overflow-hidden rounded-2xl">
                <Image
                  src="/yogi_porto.jpg"
                  alt="Achmad Yogi Maulana - Mobile Developer"
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover object-center rounded-xl"
                  priority
                />
              </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Card className="bg-secondary/15 border-2 shadow-brutal text-center p-3.5">
                <div className="text-base font-bold text-fg mb-0.5">Magang IT</div>
                <div className="text-xs font-bold text-fg/85">Bank Sumsel Babel</div>
              </Card>
              <Card className="bg-primary/10 border-2 shadow-brutal text-center p-3.5">
                <div className="text-base font-bold text-primary mb-0.5">S1 SI (UT)</div>
                <div className="text-xs font-bold text-fg/85">& D3 Polsri</div>
              </Card>
            </div>

            {/* Profile Info Details */}
            <Card className="bg-surface border-2 shadow-brutal p-5">
              <h4 className="font-bold text-base border-b-2 border-fg pb-2 mb-3">Informasi Profil</h4>
              <div className="space-y-2.5 text-xs font-semibold">
                <div className="flex justify-between gap-2">
                  <span className="text-fg/70">Pendidikan S1:</span>
                  <span className="text-right font-bold text-primary">S1 Sistem Informasi (UT)</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-fg/70">Pendidikan D3:</span>
                  <span className="text-right">D3 Teknik Komputer (Polsri)</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-fg/70">Pengalaman:</span>
                  <span className="text-right font-bold text-primary">Magang Karya IT (BSB)</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-fg/70">Status Karir:</span>
                  <span className="text-primary font-bold">Siap Kerja / Full-Time</span>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t-2 border-fg flex flex-col gap-2.5">
                <Link href="/contact" className="w-full">
                  <Button variant="primary" className="w-full font-bold gap-2 text-sm py-2.5 shadow-brutal hover-lift">
                    <Mail size={16} />
                    Hubungi Saya Sekarang
                  </Button>
                </Link>
                <a href="/CV_ATS_Achmad_Yogi_Maulana.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="secondary" className="w-full font-bold gap-2 text-sm py-2.5 border-2 shadow-brutal hover-lift">
                    Unduh CV / Resume
                  </Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Right Column: Bio, Experience, & Education */}
          <div className="lg:col-span-8 space-y-6">

            {/* Bio text block */}
            <div className="space-y-3.5 text-base font-semibold leading-relaxed text-fg/90">
              <p className="border-l-4 border-primary pl-3.5 py-0.5">
                Halo! Saya <strong>Achmad Yogi Maulana</strong>, Mobile Developer lulusan <strong>D3 Teknik Komputer Politeknik Negeri Sriwijaya (Polsri)</strong> yang sedang melanjutkan studi <strong>S1 Sistem Informasi di Universitas Terbuka Palembang</strong> sekaligus aktif di program <strong>Magang Karya IT Bank Sumsel Babel</strong>.
              </p>
              <p className="border-l-4 border-secondary pl-3.5 py-0.5">
                Spesialisasi saya di aplikasi mobile: sistem parkir digital <strong>SiParkGo</strong> (kolaborasi Pemda Bangka Belitung &amp; Bank Sumsel Babel — QRIS + printer thermal Bluetooth), sistem sinkronisasi BBM <strong>FuelIn (Flutter + Ed25519)</strong>, serta eksplorasi UI native perbankan dengan <strong>Kotlin &amp; Jetpack Compose</strong>.
              </p>
              <p className="border-l-4 border-primary pl-3.5 py-0.5">
                Latar belakang rekayasa dari Polsri, wawasan sistem informasi dari UT, serta pengalaman industri perbankan &amp; pemerintahan membuat saya siap berkontribusi penuh sebagai <strong>Mobile Developer Full-Time</strong>.
              </p>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold border-b-2 border-fg pb-1.5 flex items-center gap-2">
                <Briefcase className="text-primary" size={20} />
                <span>Pengalaman Kerja Saat Ini</span>
              </h3>

              <Card className="bg-surface border-2 shadow-brutal p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-fg pb-2.5 mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                      <Building2 size={18} />
                      Bank Sumsel Babel
                    </h4>
                    <p className="font-bold text-sm text-fg/80">Magang Karya IT — Mobile Developer</p>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 border-2 border-fg bg-secondary shadow-brutal whitespace-nowrap self-start sm:self-auto">
                    Program Aktif
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs font-semibold text-fg/85 list-disc pl-4 leading-relaxed">
                  <li>Mengembangkan aplikasi manajemen parkir <strong>SiParkGo</strong> (Flutter) — printer thermal Bluetooth ESC/POS &amp; transaksi QRIS, kolaborasi Pemda Babel &amp; BSB.</li>
                  <li>Membangun modul sinkronisasi harga &amp; kuota BBM <strong>FuelIn</strong> berbasis Flutter dengan enkripsi signature <code>Ed25519</code>.</li>
                  <li>Mengeksplorasi UI native Android (Kotlin + Jetpack Compose) untuk referensi aplikasi perbankan internal.</li>
                </ul>
              </Card>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold border-b-2 border-fg pb-1.5 flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} />
                <span>Pendidikan Formal</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {/* S1 UT */}
                <Card className="bg-surface border-2 shadow-brutal p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 border-b-2 border-fg pb-2 mb-2">
                      <div>
                        <h4 className="font-bold text-sm text-fg leading-tight">Universitas Terbuka Palembang</h4>
                        <p className="font-bold text-xs text-primary mt-0.5">S1 Sistem Informasi</p>
                      </div>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 border border-fg bg-secondary shadow-brutal whitespace-nowrap">
                        Ongoing
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-fg/80 leading-relaxed">
                      Pendalaman Tata Kelola Sistem Informasi, Manajemen Proyek TI, Analisis Bisnis & Perancangan Arsitektur Perangkat Lunak.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-fg/60 mt-3">2025 - Sekarang</div>
                </Card>

                {/* D3 Polsri */}
                <Card className="bg-surface border-2 shadow-brutal p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 border-b-2 border-fg pb-2 mb-2">
                      <div>
                        <h4 className="font-bold text-sm text-fg leading-tight">Politeknik Negeri Sriwijaya</h4>
                        <p className="font-bold text-xs text-primary mt-0.5">D3 Teknik Komputer</p>
                      </div>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 border border-fg bg-bg shadow-brutal whitespace-nowrap">
                        IPK: 3.43
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-fg/80 leading-relaxed">
                      Fokus pada Rekayasa Perangkat Lunak, Pemrograman Aplikasi Mobile & Web, Jaringan Komputer, serta Arsitektur Sistem Komputer.
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-fg/60 mt-3">2021 - 2024</div>
                </Card>
              </div>
            </div>

            {/* Core Expertise Cards */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold border-b-2 border-fg pb-1.5">Keahlian Utama</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-surface border-2 shadow-brutal p-4 md:col-span-2">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="p-1.5 border-2 border-fg bg-secondary text-fg font-bold shadow-brutal">
                      <Smartphone size={20} />
                    </div>
                    <h4 className="font-bold text-base">Mobile Development — Fokus Utama</h4>
                  </div>
                  <p className="text-xs text-fg/80 leading-relaxed font-semibold mb-2.5">
                    Membangun aplikasi mobile untuk operasional lapangan &amp; layanan digital: Flutter (cross-platform) dan Native Android (Kotlin + Jetpack Compose).
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">Flutter &amp; Dart</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">Kotlin &amp; Compose</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">BLoC</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">QRIS</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">Bluetooth ESC/POS</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">Ed25519 Crypto</span>
                  </div>
                </Card>

                <Card className="bg-surface border-2 shadow-brutal p-4 md:col-span-2">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="p-1.5 border-2 border-fg bg-primary text-on-primary font-bold shadow-brutal">
                      <Monitor size={20} />
                    </div>
                    <h4 className="font-bold text-base">Web Development — Pendukung</h4>
                  </div>
                  <p className="text-xs text-fg/80 leading-relaxed font-semibold mb-2.5">
                    Mampu mengerjakan web app modern bila dibutuhkan — dashboard CMS, helpdesk, dan admin panel.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">Next.js</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">React</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">TypeScript</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-fg bg-bg">Tailwind CSS</span>
                  </div>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
