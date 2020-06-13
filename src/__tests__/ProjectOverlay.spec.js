import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useProjectsValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
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

describe('<ProjectOverlay />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the project overlay and call setShowProjectOverlay using click', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.click(queryByTestId('project-overlay-action'));
      expect(setProject).toHaveBeenCalled();
    });

    it('renders the project overlay and call setShowProjectOverlay using key press Enter', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('project-overlay-action'), {
        key: 'a',
        code: 'a',
      });
      expect(setProject).not.toHaveBeenCalled();

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('project-overlay-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(setProject).toHaveBeenCalled();
    });
  });

  describe('Failure', () => {
    it('does not render the project overlay with any projects', () => {
      useProjectsValue.mockImplementation(() => ({
        projects: [],
      }));

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);
      expect(queryByTestId('project-overlay')).toBeTruthy();
      expect(queryByTestId('project-overlay-action')).toBeFalsy();
    });
  });
});
