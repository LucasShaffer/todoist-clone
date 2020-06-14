import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

describe('<Header />', () => {
  describe('Success', () => {
    it('renders the <Header /> component', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('header')).toBeTruthy();
    });

    it('renders the <Header /> component and activates darkMode using onClick', () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);
      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );
      expect(queryByTestId('header')).toBeTruthy();

      fireEvent.click(queryByTestId('dark-mode-action'));
      expect(setDarkMode).toHaveBeenCalledWith(true);
    });

    it('renders the <Header /> component and activates darkMode using onKeyDown', () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);
      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );
      expect(queryByTestId('header')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('dark-mode-action'), {
        key: 'a',
        code: 'a',
      });
      expect(setDarkMode).not.toHaveBeenCalled();

      fireEvent.keyDown(queryByTestId('dark-mode-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(setDarkMode).toHaveBeenCalledWith(true);
    });

    it('renders the <Header /> component and sets quick add task to true using onClick', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('header')).toBeTruthy();

      fireEvent.click(queryByTestId('quick-add-task-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <Header /> component and sets quick add task to true using onKeyDown', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('header')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('quick-add-task-action'), {
        key: 'a',
        code: 'a',
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('quick-add-task-action'), {
        key: 'Enter',
        code: 'Enter',
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <Header /> component and sets quick add task to true then false', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('header')).toBeTruthy();

      fireEvent.click(queryByTestId('quick-add-task-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });
  });
});
