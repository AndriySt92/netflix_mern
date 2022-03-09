import './sidebar.css'
import {
  LineStyle,
  Timeline,
  PlayCircleOutline,
  List,
  AddToQueue,
  QueuePlayNext,
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState<number>(1)

  const handleSetActive = (id: number) => {
    setActiveLink(id)
  }

  const links = useMemo(
    () => [
      { id: 1, to: '/', name: 'Home', icon: <LineStyle className="sidebarIcon" /> },
      { id: 2, to: '/analytics', name: 'Analytics', icon: <Timeline className="sidebarIcon" /> },
      { id: 3, to: '/users', name: 'Users', icon: <LineStyle className="sidebarIcon" /> },
      { id: 4, to: '/movies', name: 'Movies', icon: <PlayCircleOutline className="sidebarIcon" /> },
      { id: 5, to: '/lists', name: 'Lists', icon: <List className="sidebarIcon" /> },
      { id: 6, to: '/newMovie', name: 'Add Movie', icon: <AddToQueue className="sidebarIcon" /> },
      { id: 7, to: '/newList', name: 'Add List', icon: <QueuePlayNext className="sidebarIcon" /> },
    ],
    [],
  )

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {links.map((link) => (
              <Link to={link.to} className="link" onClick={() => handleSetActive(link.id)}>
                <li className={`sidebarListItem ${activeLink === link.id ? 'active' : ''}`}>
                  {link.icon}
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
