import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never Mock Firebase')),
      })),
    })),
  },
}));

describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful', () => {
    it('renders the <AddTask /> component', () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId('add-task-comp')).toBeTruthy();
    });

    it('renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn();

      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
      expect(queryByTestId('add-task-comp')).toBeTruthy();
    });

    it('renders the <AddTask /> main showable when clicked', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay when clicked', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-project-overlay'));
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> date overlay when clicked', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    it('hides the <AddTask /> main when cancel is clicked', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-main-cancel'));
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('renders <AddTask /> for quick add task and then clicks cancel', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

      const { queryByTestId } = render(
        <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask /> and adds a task to TODAY', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'New Value' },
      });
      expect(queryByTestId('add-task-content').value).toBe('New Value');

      fireEvent.click(queryByTestId('add-task'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask /> and adds a task to NEXT_7', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7',
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'New Value' },
      });
      expect(queryByTestId('add-task-content').value).toBe('New Value');

      fireEvent.click(queryByTestId('add-task'));
      // expect(queryByTestId('add-task-main')).toBeFalsy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask /> and adds a task with a task date of Today', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<AddTask showMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'Another New Value' },
      });
      expect(queryByTestId('add-task-content').value).toBe('Another New Value');

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-today'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-today'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-today'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('add-task'));
    });

    it('renders <AddTask /> and adds a task with a task date of Tomorrow', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<AddTask showMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'Another New Value' },
      });
      expect(queryByTestId('add-task-content').value).toBe('Another New Value');

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-tomorrow'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-tomorrow'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-tomorrow'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('add-task'));
    });

    it('renders <AddTask /> and adds a task with a task date of Next Week', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<AddTask showMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'Another New Value' },
      });
      expect(queryByTestId('add-task-content').value).toBe('Another New Value');

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-next-week'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-next-week'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('task-date-next-week'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('add-task'));
    });

    it('renders <AddTask /> showable with press of Enter', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay with press of Enter', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('show-project-overlay'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('project-overlay')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-project-overlay'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> date overlay with press of Enter', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('show-task-date-overlay'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-task-date-overlay'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    it('hides the <AddTask /> main with the press of Enter', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('renders <AddTask /> for quick add task and then press enter on cancel', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

      const { queryByTestId } = render(
        <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), {
        key: 'a',
        code: 'a',
      });
      expect(setShowQuickAddTask).not.toHaveBeenCalled();

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask /> and adds a quick add task with the press of Enter', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'Other New Value' },
      });
      expect(queryByTestId('add-task-content').value).toBe('Other New Value');

      fireEvent.keyDown(queryByTestId('add-task'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
      expect(setShowQuickAddTask).not.toHaveBeenCalled();

      fireEvent.keyDown(queryByTestId('add-task'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask /> and adds a task with the press of Enter', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }));

      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={false}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-content')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'Yet Another New Value' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'Yet Another New Value'
      );

      fireEvent.keyDown(queryByTestId('add-task'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
      expect(setShowQuickAddTask).not.toHaveBeenCalled();

      fireEvent.keyDown(queryByTestId('add-task'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
      expect(setShowQuickAddTask).not.toHaveBeenCalled();
    });
  });
});
