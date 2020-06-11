import React, { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { AddTask } from '../AddTask';

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQucikAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li data-testid="quick-add-task-action" className="settings__add">
              <button
                onClick={() => {
                  setShowQucikAddTask(true);
                  setShouldShowMain(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowQucikAddTask(true);
                    setShouldShowMain(true);
                  }
                }}
                type="button"
              >
                +
              </button>
            </li>
            <li data-testid="dark-mode-action" className="settings__darkmode">
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setDarkMode(!darkMode);
                }}
                tabIndex={0}
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQucikAddTask}
      />
    </header>
  );
};
