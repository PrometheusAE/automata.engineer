import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, Send, CheckCircle, Terminal } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const serviceTypes = [
  'Network Infrastructure Design',
  'Cybersecurity Assessment',
  'Zero Trust Implementation',
  'Cloud/Hybrid Infrastructure',
  'Identity & Access Management',
  'SIEM/XDR Deployment',
  'CIS Controls Implementation',
  'Automation & DevOps',
  'General Consultation',
  'CV Request',
  'Other',
]

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 border border-primary/30 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="text-primary" size={28} />
          </div>
          <h2 className="text-xl font-bold font-mono text-foreground mb-2">Request Received</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            The request has been logged. Expect a response within 1–2 business days.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2.5 border border-border text-foreground rounded font-mono text-sm hover:border-primary hover:text-primary transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Get in Touch</p>
        <h1 className="text-3xl font-bold font-mono text-foreground mb-3">Contact & Service Requests</h1>
        <p className="text-muted-foreground">
          Submit a service request, ask a technical question, or request a copy of the full CV.
          All fields marked with <span className="text-primary">*</span> are required.
        </p>
      </div>

      <form
        name="service-request"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
          })
            .then(() => setSubmitted(true))
            .catch(() => {
              window.alert('Form submission failed. Please try again in a few moments.')
            })
        }}
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="service-request" />
        <p hidden>
          <label>Don't fill this out: <input name="bot-field" /></label>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
              Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2.5 border border-border rounded bg-card text-foreground text-sm font-mono placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2.5 border border-border rounded bg-card text-foreground text-sm font-mono placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="organization" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            className="w-full px-3 py-2.5 border border-border rounded bg-card text-foreground text-sm font-mono placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="Company or organization (optional)"
          />
        </div>

        <div>
          <label htmlFor="service_type" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Request Type <span className="text-primary">*</span>
          </label>
          <select
            id="service_type"
            name="service_type"
            required
            className="w-full px-3 py-2.5 border border-border rounded bg-card text-foreground text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          >
            <option value="">Select a request type...</option>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="scope" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Scope / Scale
          </label>
          <select
            id="scope"
            name="scope"
            className="w-full px-3 py-2.5 border border-border rounded bg-card text-foreground text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          >
            <option value="">Select approximate scale...</option>
            <option>Small (&lt;50 users / nodes)</option>
            <option>Medium (50–500 users / nodes)</option>
            <option>Large (500+ users / nodes)</option>
            <option>Multi-site / distributed</option>
            <option>Not sure / TBD</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Details <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-3 py-2.5 border border-border rounded bg-card text-foreground text-sm font-mono placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
            placeholder="Describe your requirements, current environment, goals, or questions..."
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Send size={15} />
            Submit Request
          </button>
          <span className="text-xs text-muted-foreground font-mono">Response within 1–2 business days</span>
        </div>
      </form>

      <div className="mt-12 border-t border-border pt-8">
        <div className="flex items-start gap-3">
          <Terminal size={16} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">Alternative Contact</p>
            <p className="text-sm text-muted-foreground">
              For urgent security matters or direct inquiries, reach out via the contact information on the full CV.
              Request it using the form above with request type "CV Request".
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
