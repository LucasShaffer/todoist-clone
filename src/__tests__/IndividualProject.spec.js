import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IndividualProject } from '../components/IndividualProject';

beforeEach(cleanup);

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve('Never Mock Firebase')),
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

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

describe('<IndividualProject />', () => {
  const project = {
    name: 'The Office',
    projectId: '1',
    userId: '1',
    docId: '1',
  };

  describe('Success', () => {
    it('renders our project', () => {
      const { getByText } = render(<IndividualProject project={project} />);
      expect(getByText('The Office')).toBeTruthy();
    });

    it('renders the delete overlay and then deletes a project using onClick', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId('delete-project'));
      expect(
        getByText('Are you sure you want to delete this project?')
      ).toBeTruthy();

      fireEvent.click(getByText('Delete'));
    });

    it('renders the delete overlay and then deletes a project using onKeyDown', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('project-delete-modal')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('project-delete-modal')).toBeTruthy();

      fireEvent.keyDown(getByText('Delete'), {
        key: 'a',
        code: 'a',
      });

      fireEvent.keyDown(getByText('Delete'), {
        key: 'Enter',
        code: 'Enter',
      });
    });

    it('renders the delete overlay and then cancels using onClick', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId('delete-project'));
      expect(
        getByText('Are you sure you want to delete this project?')
      ).toBeTruthy();

      fireEvent.click(getByText('Cancel'));
    });

    it('renders the delete overlay and then cancels using onKeyDown', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('project-delete-modal')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('delete-project'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('project-delete-modal')).toBeTruthy();

      fireEvent.keyDown(getByText('Cancel'), {
        key: 'a',
        code: 'a',
      });

      fireEvent.keyDown(getByText('Cancel'), {
        key: 'Enter',
        code: 'Enter',
      });
    });
  });
});
