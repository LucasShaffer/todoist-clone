import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === 'inbox' ? 'active' : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            onClick={() => {
              setActive('inbox');
              setSelectedProject('INBOX');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('inbox');
                setSelectedProject('INBOX');
              }
            }}
            tabIndex={0}
            role="button"
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          data-testid="today"
          className={active === 'today' ? 'active' : undefined}
        >
          <div
            data-testid="today-action"
            aria-label="Show todays tasks"
            onClick={() => {
              setActive('today');
              setSelectedProject('TODAY');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('today');
                setSelectedProject('TODAY');
              }
            }}
            tabIndex={0}
            role="button"
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid="next_7"
          className={active === 'next_7' ? 'active' : undefined}
        >
          <div
            data-testid="next_7-action"
            aria-label="Show tasks for the next 7 days"
            onClick={() => {
              setActive('next_7');
              setSelectedProject('NEXT_7');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActive('next_7');
                setSelectedProject('NEXT_7');
              }
            }}
            tabIndex={0}
            role="button"
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>

      <div
        aria-label="Show/Hide projects"
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowProjects(!showProjects);
        }}
        tabIndex={0}
        role="button"
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
