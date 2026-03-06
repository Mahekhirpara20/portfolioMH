interface NavbarProps {
  active: string
  onNavigate: (section: string) => void
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'achievements', label: 'Achieve' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ active, onNavigate }: NavbarProps) {
  return (
    <nav className="nav-sidebar">
      {navItems.map((item) => (
        <a
          key={item.id}
          className={active === item.id ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault()
            onNavigate(item.id)
          }}
          href={`#${item.id}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
