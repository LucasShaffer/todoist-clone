import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';
import { useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useProjectsValue: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: 'The Office',
        projectId: '1',
        userId: '1',
        docId: '1',
      },
    ],
  })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('resolved')),
      })),
    })),
  },
}));

describe('<AddProject />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('success', () => {
    it('renders <AddProject />', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('renders <AddProject /> and adds a project using onClick', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project ever' },
      });

      expect(queryByTestId('project-name').value).toBe('Best project ever');
      fireEvent.click(queryByTestId('add-project-submit'));
    });

    it('renders <AddProject /> and adds a project using onKeyDown', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project ever' },
      });
      expect(queryByTestId('project-name').value).toBe('Best project ever');

      fireEvent.keyDown(queryByTestId('add-project-submit'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('add-project-submit'), {
        key: 'Enter',
        code: 'Enter',
      });
    });

    it('renders <AddProject /> and cancels using onClick', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project ever' },
      });
      expect(queryByTestId('project-name').value).toBe('Best project ever');

      fireEvent.click(queryByTestId('hide-project-overlay'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('renders <AddProject /> and cancels using onKeyDown', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project ever' },
      });
      expect(queryByTestId('project-name').value).toBe('Best project ever');

      fireEvent.keyDown(queryByTestId('hide-project-overlay'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('hide-project-overlay'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hide the add project overlay using onClick singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();

      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();
    });

    it('hide the add project overlay using onKeyDown singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });
  });
});
