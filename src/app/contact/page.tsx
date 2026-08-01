'use client'

import { SectionWrapper } from '@/components/layout/section-wrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { useToast } from '@/components/ui/toast'
import { socials } from '@/data/socials'
import { Mail, Phone, MapPin, CheckCircle2, Send, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const { showToast, ToastContainer } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  // 1. Submit via Email (FormSubmit Secure Token AJAX)
  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSubmitted(false)

    try {
      const res = await fetch('https://formsubmit.co/ajax/0143364bbe73b42121566ff669947935', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `[Portofolio Yogi] ${formData.subject || 'Pesan Baru'}`,
          message: formData.message,
          _template: 'table',
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        showToast('Pesan berhasil dikirim! Saya akan segera membalas.', 'success')
      } else {
        setError('Gagal mengirim pesan. Coba lagi atau hubungi lewat WhatsApp.')
        showToast('Gagal mengirim pesan. Coba lagi atau hubungi lewat WhatsApp.', 'error')
      }
    } catch {
      setError('Jaringan bermasalah. Coba lagi atau kirim via WhatsApp.')
      showToast('Jaringan bermasalah. Coba lagi atau kirim via WhatsApp.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 2. Direct Submit via WhatsApp
  const handleSendWhatsApp = () => {
    if (!formData.name || !formData.message) {
      showToast('Mohon isi Nama dan Pesan terlebih dahulu sebelum mengirim via WhatsApp.', 'error')
      return
    }

    const text = encodeURIComponent(
      `Halo Yogi! 👋\n\n` +
      `*Nama:* ${formData.name}\n` +
      `*Email:* ${formData.email || '-'}\n` +
      `*Subjek:* ${formData.subject || '-'}\n\n` +
      `*Pesan:* \n${formData.message}`
    )

    window.open(`https://wa.me/6288294877272?text=${text}`, '_blank')
    showToast('Membuka WhatsApp...', 'success')
  }

  return (
    <>
      <ToastContainer />
      <SectionWrapper>
      {/* Header */}
      <div className="mb-12 border-b-4 border-primary pb-6">
        <h1 className="text-5xl font-bold mb-4">Hubungi Saya</h1>
        <p className="text-xl text-fg/80 max-w-2xl font-medium">
          Saya siap mendiskusikan ide proyek Anda, peluang kerja sama, atau sekadar bertukar ide!
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-surface border-2 shadow-brutal hover-lift hover-glow">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <Mail className="text-primary hover-bounce" size={36} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Email</h3>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yogimaul551@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary font-bold hover:underline block mb-2"
              >
                yogimaul551@gmail.com
              </a>
              <CopyButton text="yogimaul551@gmail.com" label="Salin Email" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface border-2 shadow-brutal hover-lift hover-glow">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <Phone className="text-primary hover-bounce" size={36} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Telepon / WhatsApp</h3>
              <a href="https://wa.me/6288294877272" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline block mb-2">
                +62 (882) 9487-7272
              </a>
              <CopyButton text="+6288294877272" label="Salin Nomor" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface border-2 shadow-brutal hover-lift hover-glow">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <MapPin className="text-primary hover-bounce" size={36} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Lokasi</h3>
              <p className="text-fg/80 font-bold">Palembang, Indonesia</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form & Sidebar Grid */}
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="bg-surface border-2 shadow-brutal">
          <CardHeader className="border-b-2">
            <CardTitle className="text-2xl flex items-center justify-between">
              <span>Kirim Pesan</span>
              <span className="text-xs font-normal px-2.5 py-1 bg-secondary border border-fg shadow-brutal">
                Dual-Mode (Email & WA)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {submitted && (
              <div className="mb-6 p-4 border-2 border-fg bg-secondary text-fg font-bold flex items-center gap-3 shadow-brutal animate-slide-up">
                <CheckCircle2 size={24} className="text-fg shrink-0" />
                <span>Pesan Anda telah terkirim! Terima kasih, saya akan merespons secepatnya.</span>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-6 p-4 border-2 border-fg bg-red-100 text-fg font-bold flex items-center gap-3 shadow-brutal animate-slide-up dark:bg-red-950"
              >
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-fg bg-bg px-4 py-3 font-medium focus:outline-none focus:bg-white focus:shadow-brutal transition-all"
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Alamat Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-fg bg-bg px-4 py-3 font-medium focus:outline-none focus:bg-white focus:shadow-brutal transition-all"
                  placeholder="email@domain.com"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Subjek Pesan</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border-2 border-fg bg-bg px-4 py-3 font-medium focus:outline-none focus:bg-white focus:shadow-brutal transition-all"
                  placeholder="Proyek Web / Mobile App"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Isi Pesan *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border-2 border-fg bg-bg px-4 py-3 font-medium focus:outline-none focus:bg-white focus:shadow-brutal resize-none transition-all"
                  placeholder="Tuliskan detail proyek atau pertanyaan Anda di sini..."
                />
              </div>

              {/* Action Buttons: Dual Mode */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="font-bold py-3 text-base flex items-center justify-center gap-2 hover-ripple"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim via Email'}</span>
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSendWhatsApp}
                  className="font-bold py-3 text-base flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] border-2 border-fg shadow-brutal hover-ripple"
                >
                  <MessageSquare size={18} />
                  <span>Kirim via WhatsApp</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Media Sosial</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="font-bold border-2 shadow-brutal hover-lift hover-bounce">
                    {social.name}
                  </Button>
                </a>
              ))}
            </div>
          </div>

          <Card className="bg-secondary/15 border-2 shadow-brutal hover-glow">
            <CardContent className="pt-6 space-y-3">
              <h3 className="text-xl font-bold text-fg">Waktu Respons</h3>
              <p className="text-fg/85 font-medium leading-relaxed">
                Saya berusaha merespons semua pertanyaan masuk dalam 24-48 jam pada hari kerja. Untuk hal mendesak, silakan langsung hubungi via WhatsApp atau Email.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
    </>
  )
}
