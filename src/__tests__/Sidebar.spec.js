import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Sidebar } from '../components/layout/Sidebar';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
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

describe('<Sidebar />', () => {
  describe('Success', () => {
    it('renders the <Sidebar />', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
    });

    it('changes the active project to Inbox in collated tasks using onClick', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.click(queryByTestId('inbox-action'));
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes the active project to Inbox in collated tasks using onKeyDown', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.click(queryByTestId('today-action'));
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('inbox-action'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
      fireEvent.keyDown(queryByTestId('inbox-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes the active project to Today in collated tasks using onClick', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.click(queryByTestId('today-action'));
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes the active project to Today in collated tasks using onKeyDown', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('today-action'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('today-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes the active project to Next 7 in collated tasks using onClick', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.click(queryByTestId('next_7-action'));
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
    });

    it('changes the active project to Next 7 in collated tasks using onKeyDown', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('next_7-action'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('next_7-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
    });

    it('shows and hides sidebar projects using onClick', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.click(getByText('Projects'));
      expect(queryByText('Add Project')).toBeFalsy();

      fireEvent.click(getByText('Projects'));
      expect(queryByText('Add Project')).toBeTruthy();
    });

    it('shows and hides sidebar projects using onKeyDown', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.keyDown(getByText('Projects'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByText('Add Project')).toBeTruthy();

      fireEvent.keyDown(getByText('Projects'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByText('Add Project')).toBeFalsy();
    });
  });
});
