import {
  Box,
  Button,
  Divider,
  Grid,
  outlinedInputClasses,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  CustomTextFieldProps,
  ToggleButton,
  ToggleButtonInput,
} from '@my-sahab/mui';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React, {
  Fragment,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { storyWrapperDecorator } from 'src/@storybook/decorators';

const LeftInput = styled(TextField)({
  width: '50%',
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
const RightInput = styled(TextField)({
  width: '50%',
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderRight: 0,
    borderRadius: 0,
  },
});

enum Type {
  'ITEM1' = 'ITEM1',
  'ITEM2' = 'ITEM2',
  'ITEM3' = 'ITEM3',
}

const getLabel = (type: Type | null) => {
  let label = 'Default';

  switch (type) {
    case 'ITEM1':
      label = 'ITEM1';
      break;
    case 'ITEM2':
      label = 'ITEM2';
      break;
    case 'ITEM3':
      label = 'ITEM3';
      break;
    default:
      break;
  }

  return label;
};

export default {
  title: 'Toggle Button Input',
  decorators: [storyWrapperDecorator()],
} as Meta;

export const Primary = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  return (
    <Fragment>
      <ToggleButtonInput
        color="primary"
        value={value}
        onChange={setValue}
        label={getLabel(value.type)}
      >
        <ToggleButton title="Item1" value={Type.ITEM1}>
          Item1
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item2" value={Type.ITEM2}>
          Item2
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item3" value={Type.ITEM3}>
          Item3
        </ToggleButton>
        <Divider orientation="vertical" />
      </ToggleButtonInput>
    </Fragment>
  );
};

export const Secondary = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  return (
    <Fragment>
      <ToggleButtonInput
        color="secondary"
        value={value}
        onChange={setValue}
        label={getLabel(value.type)}
      >
        <ToggleButton title="Item1" value={Type.ITEM1}>
          Item1
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item2" value={Type.ITEM2}>
          Item2
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item3" value={Type.ITEM3}>
          Item3
        </ToggleButton>
        <Divider orientation="vertical" />
      </ToggleButtonInput>
    </Fragment>
  );
};

export const Error = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });
  const [error, setError] = useState(false);

  return (
    <Fragment>
      <ToggleButtonInput
        value={value}
        onChange={setValue}
        error={error}
        label={getLabel(value.type)}
        helperText={
          error && 'An unexpected error has occurred. Please try again later.'
        }
      >
        <ToggleButton title="Item1" value={Type.ITEM1}>
          Item1
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item2" value={Type.ITEM2}>
          Item2
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item3" value={Type.ITEM3}>
          Item3
        </ToggleButton>
        <Divider orientation="vertical" />
      </ToggleButtonInput>
      <Typography style={{ marginTop: 24 }}>
        By clicking on the button below, toggle error.
      </Typography>
      <Button
        size="small"
        variant="outlined"
        onClick={() => setError((error) => !error)}
        style={{ marginTop: 8 }}
      >
        Click
      </Button>
    </Fragment>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });
  const [disabled, setDisabled] = useState(false);

  return (
    <Fragment>
      <ToggleButtonInput
        value={value}
        onChange={setValue}
        disabled={disabled}
        label={getLabel(value.type)}
      >
        <ToggleButton title="Item1" value={Type.ITEM1}>
          Item1
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item2" value={Type.ITEM2}>
          Item2
        </ToggleButton>
        <Divider orientation="vertical" />
        <ToggleButton title="Item3" value={Type.ITEM3}>
          Item3
        </ToggleButton>
        <Divider orientation="vertical" />
      </ToggleButtonInput>
      <Typography style={{ marginTop: 24 }}>
        By clicking on the button below, toggle disabled.
      </Typography>
      <Button
        size="small"
        variant="outlined"
        onClick={() => setDisabled((disabled) => !disabled)}
        style={{ marginTop: 8 }}
      >
        Click
      </Button>
    </Fragment>
  );
};

export const ArrayOfInputs = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const handleKeyDown =
    (
      prevRef?: React.RefObject<HTMLInputElement>,
      nextRef?: React.RefObject<HTMLInputElement>,
    ) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowDown') {
        nextRef?.current?.focus();
      }

      if (event.key === 'ArrowUp') {
        prevRef?.current?.focus();
      }
    };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <ToggleButtonInput
          color="primary"
          value={value}
          onChange={setValue}
          label={getLabel(value.type)}
          inputRef={ref1}
          onKeyDown={handleKeyDown(undefined, ref2)}
        >
          <ToggleButton title="Item1" value={Type.ITEM1}>
            Item1
          </ToggleButton>
          <ToggleButton title="Item2" value={Type.ITEM2}>
            Item2
          </ToggleButton>
          <ToggleButton title="Item3" value={Type.ITEM3}>
            Item3
          </ToggleButton>
        </ToggleButtonInput>
      </Grid>
      <Grid item>
        <ToggleButtonInput
          color="primary"
          value={value}
          onChange={setValue}
          label={getLabel(value.type)}
          inputRef={ref2}
          onKeyDown={handleKeyDown(ref1, ref3)}
        >
          <ToggleButton title="Item1" value={Type.ITEM1}>
            Item1
          </ToggleButton>
          <ToggleButton title="Item2" value={Type.ITEM2}>
            Item2
          </ToggleButton>
          <ToggleButton title="Item3" value={Type.ITEM3}>
            Item3
          </ToggleButton>
        </ToggleButtonInput>
      </Grid>
      <Grid item>
        <ToggleButtonInput
          color="primary"
          value={value}
          onChange={setValue}
          label={getLabel(value.type)}
          inputRef={ref3}
          onKeyDown={handleKeyDown(ref2, ref4)}
        >
          <ToggleButton title="Item1" value={Type.ITEM1}>
            Item1
          </ToggleButton>
          <ToggleButton title="Item2" value={Type.ITEM2}>
            Item2
          </ToggleButton>
          <ToggleButton title="Item3" value={Type.ITEM3}>
            Item3
          </ToggleButton>
        </ToggleButtonInput>
      </Grid>
      <Grid item>
        <ToggleButtonInput
          color="primary"
          value={value}
          onChange={setValue}
          label={getLabel(value.type)}
          inputRef={ref4}
          onKeyDown={handleKeyDown(ref3, undefined)}
        >
          <ToggleButton title="Item1" value={Type.ITEM1}>
            Item1
          </ToggleButton>
          <ToggleButton title="Item2" value={Type.ITEM2}>
            Item2
          </ToggleButton>
          <ToggleButton title="Item3" value={Type.ITEM3}>
            Item3
          </ToggleButton>
        </ToggleButtonInput>
      </Grid>
    </Grid>
  );
};

export const MarginNormal = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  return (
    <Fragment>
      <ToggleButtonInput
        value={value}
        onChange={setValue}
        label={getLabel(value.type)}
        margin="normal"
      >
        <ToggleButton
          onClick={action('Item1 Selected')}
          title="Item1"
          value={Type.ITEM1}
        >
          Item1
        </ToggleButton>
        <ToggleButton
          onClick={action('Item2 Selected')}
          title="Item2"
          value={Type.ITEM2}
        >
          Item2
        </ToggleButton>
        <ToggleButton
          onClick={action('Item3 Selected')}
          title="Item3"
          value={Type.ITEM3}
        >
          Item3
        </ToggleButton>
      </ToggleButtonInput>
    </Fragment>
  );
};

export const MarginDense = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  return (
    <Fragment>
      <ToggleButtonInput
        value={value}
        onChange={setValue}
        label={getLabel(value.type)}
        margin="dense"
      >
        <ToggleButton
          onClick={action('Item1 Selected')}
          title="Item1"
          value={Type.ITEM1}
        >
          Item1
        </ToggleButton>
        <ToggleButton
          onClick={action('Item2 Selected')}
          title="Item2"
          value={Type.ITEM2}
        >
          Item2
        </ToggleButton>
        <ToggleButton
          onClick={action('Item3 Selected')}
          title="Item3"
          value={Type.ITEM3}
        >
          Item3
        </ToggleButton>
      </ToggleButtonInput>
    </Fragment>
  );
};

export const SizeSmall = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  return (
    <Fragment>
      <ToggleButtonInput
        value={value}
        onChange={setValue}
        label={getLabel(value.type)}
        size="small"
      >
        <ToggleButton
          onClick={action('Item1 Selected')}
          title="Item1"
          value={Type.ITEM1}
        >
          Item1
        </ToggleButton>
        <ToggleButton
          onClick={action('Item2 Selected')}
          title="Item2"
          value={Type.ITEM2}
        >
          Item2
        </ToggleButton>
        <ToggleButton
          onClick={action('Item3 Selected')}
          title="Item3"
          value={Type.ITEM3}
        >
          Item3
        </ToggleButton>
      </ToggleButtonInput>
    </Fragment>
  );
};

export const FullWidth = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  const [fullWidth, setFullWidth] = useState(false);

  const handleClick = useCallback(() => {
    setFullWidth((fullWidth) => !fullWidth);
  }, []);
  return (
    <>
      <Box width={680}>
        <ToggleButtonInput
          value={value}
          onChange={setValue}
          label={getLabel(value.type)}
          fullWidth={fullWidth}
        >
          <ToggleButton title="Item1" value={Type.ITEM1}>
            Item1
          </ToggleButton>
          <ToggleButton title="Item2" value={Type.ITEM2}>
            Item2
          </ToggleButton>
          <ToggleButton title="Item3" value={Type.ITEM3}>
            Item3
          </ToggleButton>
        </ToggleButtonInput>
      </Box>
      <Box marginTop={1}>
        <Button onClick={handleClick}> Toggle fullWidth</Button>
      </Box>
    </>
  );
};

FullWidth.decorators = [storyWrapperDecorator({ width: 680 })];

export const CustomTextField = () => {
  const [value, setValue] = useState<{ value: string; type: Type | null }>({
    value: '',
    type: null,
  });

  return (
    <Fragment>
      <ToggleButtonInput
        value={value}
        onChange={setValue}
        label={getLabel(value.type)}
        TextFieldComponent={value.type === Type.ITEM1 ? CustomInput : undefined}
        color="primary"
      >
        <ToggleButton
          onClick={action('Item1 Selected')}
          title="Item1"
          value={Type.ITEM1}
        >
          Item1
        </ToggleButton>
        <ToggleButton
          onClick={action('Item2 Selected')}
          title="Item2"
          value={Type.ITEM2}
        >
          Item2
        </ToggleButton>
        <ToggleButton
          onClick={action('Item3 Selected')}
          title="Item3"
          value={Type.ITEM3}
        >
          Item3
        </ToggleButton>
      </ToggleButtonInput>
    </Fragment>
  );
};
enum Inputs {
  RIGHT = 'right',
  LEFT = 'left',
}
const CustomInput = (props: CustomTextFieldProps) => {
  const {
    inputRef,
    classes,
    InputProps,
    InputLabelProps,
    onFocus,
    onBlur,
    onChange,
    value,
    ...others
  } = props;
  const { root, ...otherClasses } = classes ?? {};
  const [focused, setFocused] = React.useState<Inputs | null>(null);
  const inputs = (value as string).split(':');
  const [rightValue, leftValue]: string[] =
    inputs.length === 2 ? inputs : ['', ''];
  const handleFocus = React.useCallback(
    (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      which: Inputs,
    ) => {
      setFocused(which);
      onFocus?.(e);
    },
    [onFocus],
  );
  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(null);
      onBlur?.(event);
    },
    [onBlur],
  );
  const handleChange = React.useCallback(
    ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = `${focused === Inputs.RIGHT ? value : rightValue}:${
        focused === Inputs.LEFT ? value : leftValue
      }`;
      onChange?.(newValue === ':' ? '' : newValue);
    },
    [onChange, rightValue, leftValue, focused],
  );
  return (
    <Box position="relative" className={root}>
      <RightInput
        inputRef={inputRef}
        {...others}
        variant="outlined"
        classes={{ ...otherClasses }}
        onFocus={(
          e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleFocus(e, Inputs.RIGHT)}
        onBlur={handleBlur}
        onChange={handleChange}
        InputProps={{
          ...InputProps,
          notched:
            !!rightValue || (focused === Inputs.RIGHT && InputProps?.notched),
        }}
        InputLabelProps={{
          ...InputLabelProps,
          focused:
            !!rightValue ||
            (focused === Inputs.RIGHT && InputLabelProps?.focused),
          shrink:
            !!rightValue ||
            (focused === Inputs.RIGHT && InputLabelProps?.shrink),
        }}
        value={rightValue}
      />
      <Divider
        orientation="vertical"
        absolute
        sx={{
          height: '50%',
          left: '50%',
          backgroundColor: '#000000',
          transform: 'translate(-50%, 50%)',
          bottom: '50%',
          width: '2px',
        }}
      />
      <LeftInput
        {...others}
        variant="outlined"
        classes={{ ...otherClasses }}
        onFocus={(
          e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleFocus(e, Inputs.LEFT)}
        onBlur={handleBlur}
        onChange={handleChange}
        InputProps={{
          ...InputProps,
          notched:
            !!leftValue || (focused === Inputs.LEFT && InputProps?.notched),
        }}
        InputLabelProps={{
          ...InputLabelProps,
          focused:
            !!leftValue ||
            (focused === Inputs.LEFT && InputLabelProps?.focused),
          shrink:
            !!leftValue || (focused === Inputs.LEFT && InputLabelProps?.shrink),
        }}
        value={leftValue}
      />
    </Box>
  );
};
