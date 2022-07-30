import { Box, Button, Paper } from '@mui/material';
import {
  ClickAwayClose,
  PopoverButton as PxPopoverButton,
  PopoverInput as PxPopoverInput,
  usePopoverInputContext,
} from '@my-sahab/mui';
import { Meta } from '@storybook/react';
import { useCallback, useState } from 'react';

const Sample = () => {
  const setOpen = usePopoverInputContext();
  return (
    <div>
      <Button onClick={() => setOpen(false)}>close</Button>
    </div>
  );
};

export default {
  title: 'Components/Popover Input',
} as Meta;

export const PopoverInput = () => {
  return (
    <PxPopoverInput variant="outlined">
      <ClickAwayClose>
        <Paper style={{ padding: 16 }}>
          <Sample />
        </Paper>
      </ClickAwayClose>
    </PxPopoverInput>
  );
};
export const PopoverButton = () => {
  return (
    <PxPopoverButton buttonContent="click me">
      <ClickAwayClose>
        <Paper style={{ padding: 16 }}>
          <Sample />
        </Paper>
      </ClickAwayClose>
    </PxPopoverButton>
  );
};

export const FullWidth = () => {
  const [fullWidth, setFullWidth] = useState(false);

  const handleClick = useCallback(() => {
    setFullWidth((fullWidth) => !fullWidth);
  }, []);
  return (
    <>
      <Box width={300} border="1px solid black">
        <PxPopoverInput variant="outlined" fullWidth={fullWidth}>
          <ClickAwayClose>
            <Paper style={{ padding: 16 }}>
              <Sample />
            </Paper>
          </ClickAwayClose>
        </PxPopoverInput>
      </Box>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ marginTop: 32 }}
      >
        Toggle fullWidth
      </Button>
    </>
  );
};
