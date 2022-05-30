import { useTheme } from '@mui/material';
import { createMakeStyles } from 'tss-react';

const { makeStyles: _makeStyles } = createMakeStyles({ useTheme: useTheme });

export const makeStyles = _makeStyles;
