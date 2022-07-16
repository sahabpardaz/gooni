import { Popper, PopperProps } from '@mui/material';
import type { Instance as PopperJs } from '@popperjs/core';
import clsx from 'clsx';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Styles } from 'src/react-types';
import { makeStyles } from 'src/tss-mui';
import { useMergedClasses } from 'tss-react';
import { PopoverInputContextProvider } from './px-popover-input-context';

interface RendererParams {
  onOpen: () => void;
}
interface OwnProps {
  fixWidth?: boolean;
  placement?: PopperProps['placement'];
  fullWidth?: boolean;
  renderer: (params: RendererParams) => React.ReactNode;
  popperProps?: Omit<PopperProps, 'placement' | 'open' | 'children'>;
}

/**
 * Definition of Popover Props type.
 */
export type Props = React.PropsWithChildren<OwnProps> & StyleProps;

/**
 *
 * render a popover
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 *
 * @example
 * Here's an example:
 *
 * ```ts
 * import { PxPopover } from '@my-sahab/mui'
 *
 * export function MyComponent() {
 *     return <PxPopover />;
 * }
 * ```
 */
export function PxPopover(props: Props) {
  const {
    children,
    fixWidth = false,
    placement = 'bottom-start',
    fullWidth = false,
    renderer,
    popperProps,
  } = props;

  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);

  const [open, setOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const popperRef = useRef<PopperJs>(null);

  const anchorRef = useCallback((e) => {
    setAnchor(e);
  }, []);

  const handelOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // update popper position after the first render to fix RTL bug
  useEffect(() => {
    if (open) {
      setTimeout(() => popperRef.current?.update(), 0);
    }
  }, [open]);

  const onResize = useCallback((width) => {
    setWidth(width);
  }, []);

  const contentWrapperStyle = fixWidth ? { width } : { minWidth: width };

  return (
    <Fragment>
      <div
        ref={anchorRef}
        className={clsx(classes.root, {
          [classes.rootFullWidth]: fullWidth,
        })}
      >
        <ReactResizeDetector handleWidth onResize={onResize} />
        {renderer({ onOpen: handelOpen })}
      </div>
      <Popper
        {...popperProps}
        open={open}
        popperRef={popperRef}
        placement={placement}
        anchorEl={anchor}
        className={classes.popper}
      >
        <PopoverInputContextProvider value={setOpen}>
          <div style={contentWrapperStyle}>{children}</div>
        </PopoverInputContextProvider>
      </Popper>
    </Fragment>
  );
}

const useStyles = makeStyles({ name: 'PxPopover' })((theme) => ({
  root: {
    display: 'inline-block',
  },
  rootFullWidth: {
    width: '100%',
  },
  popper: {
    zIndex: theme.zIndex.modal - 10,
  },
}));
type StyleProps = Styles<typeof useStyles>;
