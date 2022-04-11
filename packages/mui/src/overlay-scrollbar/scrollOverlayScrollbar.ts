import OverlayScrollbars from 'overlayscrollbars';
import { RefObject } from 'react';

import { ImperativeHandles } from './useOverlayScrollbar';

/**
 *
 * @param {RefObject<ImperativeHandles>} overlayScrollbarRef
 * @param {OverlayScrollbars.Coordinates} coordinates
 * @param {number} duration
 * @param {| OverlayScrollbars.Easing| { x?: OverlayScrollbars.Easing; y?: OverlayScrollbars.Easing }| [OverlayScrollbars.Easing, OverlayScrollbars.Easing]} easing
 * @param {(...args: any[]) => any} complete
 */
export function scrollOverlayScrollbar(
  overlayScrollbarRef: RefObject<ImperativeHandles>,
  coordinates: OverlayScrollbars.Coordinates,
  duration?: number,
  easing?:
    | OverlayScrollbars.Easing
    | { x?: OverlayScrollbars.Easing; y?: OverlayScrollbars.Easing }
    | [OverlayScrollbars.Easing, OverlayScrollbars.Easing],
  complete?: (...args: any[]) => any,
) {
  const overlayScrollbarInstance =
    overlayScrollbarRef?.current?.getOverlayScrollbar();

  overlayScrollbarInstance?.scroll(coordinates, duration, easing, complete);
}
