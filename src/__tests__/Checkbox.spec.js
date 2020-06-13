import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

beforeEach(cleanup); // Clean the DOM!

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

describe('<Checkbox />', () => {
  describe('Success', () => {
    it('renders the task checkbox', () => {
      const { queryByTestId } = render(<Checkbox id="1" taskDesc="Desc" />);
      expect(queryByTestId('checkbox-action')).toBeTruthy();
    });

    it('renders the task checkbox and accepts a click', () => {
      const { queryByTestId } = render(<Checkbox id="1" taskDesc="Desc" />);
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.click(queryByTestId('checkbox-action'));
    });

    it('renders the task checkbox and accepts a keydown of enter', () => {
      const { queryByTestId } = render(<Checkbox id="1" taskDesc="Desc" />);
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('checkbox-action'), {
        key: 'Enter',
        code: 'Enter',
      });
    });

    it('renders the task checkbox and does not keydown of non-enter presses', () => {
      const { queryByTestId } = render(<Checkbox id="1" taskDesc="Desc" />);
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('checkbox-action'), {
        key: 'a',
        code: 'a',
      });
    });
  });
});
