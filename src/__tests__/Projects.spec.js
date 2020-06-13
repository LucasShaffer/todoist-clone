import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Projects } from '../components/Projects';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
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

describe('<Projects />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Success', () => {
    it('renders <Projects />', () => {
      const { queryByTestId } = render(<Projects />);
      expect(queryByTestId('project-action')).toBeTruthy();
    });

    it('renders the projects and selects an active project using onClick', () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);
      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.click(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy();
    });

    it('renders the projects and selects an active project using Enter key press', () => {
      const { queryByTestId } = render(<Projects activeValue={null} />);
      expect(queryByTestId('project-action')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('project-action'), {
        key: 'a',
        code: 'a',
      });
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeFalsy();

      fireEvent.keyDown(queryByTestId('project-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy();
    });
  });
});
