import { createMakeStyles } from 'tss-react';
import { useTheme } from '@mui/material';

const { makeStyles: _makeStyles } = createMakeStyles({ useTheme: useTheme });

export const makeStyles = _makeStyles;
