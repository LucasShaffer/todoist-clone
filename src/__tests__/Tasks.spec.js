import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
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

jest.mock('../hooks', () => ({
  useTasks: () => ({
    tasks: [
      {
        id: '1',
        archive: false,
        date: '21/07/2019',
        projectId: '1',
        task: 'My task',
        userId: '1',
      },
    ],
  }),
}));

describe('<Tasks />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders <Tasks /> with a project title', () => {
    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('The Office');
  });

  it('renders <Tasks /> with a collated title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelctedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });
});
