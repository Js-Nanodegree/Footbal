import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from './Loader';

describe('Loader', () => {
  it('рендерит все варианты цветов', () => {
    const variants = ['primary', 'secondary', 'success', 'error', 'info'];
    variants.forEach(variant => {
      const { getByTestId } = render(<Loader variant={variant as any} />);
      expect(getByTestId('loader')).toBeTruthy();
    });
  });

  it('рендерит все размеры', () => {
    const sizes = ['small', 'medium', 'large'];
    sizes.forEach(size => {
      const { getByTestId } = render(<Loader size={size as any} />);
      expect(getByTestId('loader')).toBeTruthy();
    });
  });

  it('рендерит inline и background', () => {
    const { getByTestId } = render(<Loader inline background />);
    expect(getByTestId('loader')).toBeTruthy();
  });
}); 