import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X, Terminal, Shield, Server, BookOpen, Wrench, User, Mail, PenSquare, Network } from 'lucide-react'
import '../styles.css'

export const Route = createRootRoute({
  component: RootLayout,
})

const navItems = [
  { to: '/', label: 'Home', icon: Terminal },
  { to: '/solutions', label: 'Solutions', icon: Server },
  { to: '/projects', label: 'Projects', icon: Shield },
  { to: '/network-diagram', label: 'Infra Map', icon: Network },
  { to: '/blog/', label: 'Blog', icon: PenSquare },
  { to: '/docs', label: 'Docs', icon: BookOpen },
  { to: '/tools', label: 'Tools', icon: Wrench },
  { to: '/about', label: 'About', icon: User },
  { to: '/contact', label: 'Contact', icon: Mail },
]

function NavBar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm font-bold text-primary hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Automata Engineer" className="h-8 w-8 object-contain" />
          <span>AUTOMATA ENGINEER</span>
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.slice(1).map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors font-mono"
              activeProps={{ className: 'px-3 py-1.5 text-sm text-primary bg-muted rounded font-mono' }}
            >
              {label}
            </Link>
          ))}
        </div>
        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors font-mono"
              activeProps={{ className: 'flex items-center gap-3 px-3 py-2 text-sm text-primary bg-muted rounded font-mono' }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

function RootLayout() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-border mt-24 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Automata Engineer" className="h-10 w-10 object-contain opacity-80" />
            <span className="font-mono text-xs text-muted-foreground">© {year} AUTOMATA ENGINEER — Network, Security & Cloud</span>
          </div>
          <span className="font-mono text-xs text-muted-foreground">Zero Trust · CIS Controls · NIST Framework</span>
        </div>
      </footer>
    </div>
  )
}
