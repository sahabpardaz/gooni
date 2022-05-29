import { Meta, Story } from '@storybook/react';
import React, { useRef } from 'react';
import Lorem from 'react-lorem-component';

import { ImperativeHandles, PxOverlayScrollbar } from '../..';
import { storyWrapperDecorator } from '../decorators';

export default {
  title: 'OverlayScrollbar',
  decorators: [storyWrapperDecorator({ height: 600 })],
} as Meta;

export const Default: Story = (args) => {
  return (
    <PxOverlayScrollbar style={{ maxHeight: 500, maxWidth: 300 }} {...args}>
      <Lorem />
    </PxOverlayScrollbar>
  );
};

export const Scroll: Story = () => {
  const instanceRef = useRef<ImperativeHandles>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <PxOverlayScrollbar
      style={{ maxHeight: 500, maxWidth: 300 }}
      ref={instanceRef}
    >
      <button
        onClick={() => {
          const instance =
            instanceRef &&
            instanceRef.current &&
            instanceRef.current.getOverlayScrollbar();
          instance &&
            targetRef.current &&
            instance.scroll(targetRef.current, 250, 'easeInCubic');
        }}
      >
        Scroll
      </button>
      <div>
        <Lorem />
      </div>
      <div ref={targetRef} style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <Lorem />
      </div>
    </PxOverlayScrollbar>
  );
};
