import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ImperativeHandles, useOverlayScrollbar } from './useOverlayScrollbar';
import { PxOverlayScrollbar } from './px-overlay-scrollbar';

describe('useOverlayScrollbar', () => {
  it('should return px-overlay-scrollbar', () => {
    let instanceRef: React.RefObject<ImperativeHandles>;

    renderHook(() => {
      const ref = React.useRef<HTMLElement>(null);
      instanceRef = React.useRef<ImperativeHandles>(null);
      useOverlayScrollbar(ref, undefined, instanceRef);
    });

    expect(instanceRef!.current).toHaveProperty('getOverlayScrollbar');
  });
});

describe('PxOverlayScrollbar', () => {
  it('should vertical scroll hidden', () => {
    const { container } = render(
      <PxOverlayScrollbar
        options={{ overflowBehavior: { x: 'scroll' } }}
        style={{ maxHeight: 500, maxWidth: 300 }}
      >
        <span style={{ height: 1000, width: 1000 }}>hello</span>
      </PxOverlayScrollbar>,
    );
    expect(container.querySelector('.os-scrollbar-vertical')).toHaveClass(
      'os-scrollbar-unusable',
    );
  });

  it('should horizontal scroll hidden', () => {
    const { container } = render(
      <PxOverlayScrollbar
        options={{ overflowBehavior: { y: 'scroll' } }}
        style={{ maxHeight: 500, maxWidth: 300 }}
      >
        <span style={{ height: 1000, width: 1000 }}>hello</span>
      </PxOverlayScrollbar>,
    );
    expect(container.querySelector('.os-scrollbar-horizontal')).toHaveClass(
      'os-scrollbar-unusable',
    );
  });
});
