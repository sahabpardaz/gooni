import { Direction } from '@mui/material';

export class DirectionState {
  constructor(private direction: Direction = 'ltr') {}

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  getDirection(): Direction {
    return this.direction;
  }
}

export const directionState = new DirectionState();
