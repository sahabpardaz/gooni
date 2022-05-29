import { default as Moment, default as moment } from 'moment';

import { CalendarTypes } from '../constant-types';
import { formatDate } from './date-time-utils';
import {
  formatDateRange,
  formatDateTimeRange,
  formatTime,
  getRangeInputValue,
} from './index';
import { localizeFormat } from './moment-utils';
import { RangeInputLabels } from './range-input-utils';
import { TimeRange } from './time-range-type';

describe('DateTimeUtils', () => {
  describe('date-time-utils', () => {
    it('formatDateTimeRange should return object with from and to property when input is null', () => {
      const result = formatDateTimeRange({ from: null, to: null });
      expect(result).toHaveProperty('from');
      expect(result).toHaveProperty('to');
    });
    it('formatDateTimeRange should return object with from and to property', () => {
      const result = formatDateTimeRange({
        from: Moment('2019/1/1'),
        to: Moment('2019/1/1'),
      });
      expect(result).toHaveProperty('from');
      expect(result).toHaveProperty('to');
      expect(result.from).toBe('1397/10/11 00:00');
      expect(result.to).toBe('1397/10/11 00:00');
    });
    it('formatDateRange should return object with from and to property when input is null', () => {
      const result = formatDateRange({ from: null, to: null });
      expect(result).toHaveProperty('from');
      expect(result).toHaveProperty('to');
    });
    it('formatDateRange should return object with from and to property', () => {
      const result = formatDateRange({
        from: Moment('2019/1/1'),
        to: Moment('2019/1/1'),
      });
      expect(result).toHaveProperty('from');
      expect(result).toHaveProperty('to');
      expect(result.from).toBe('1397/10/11');
      expect(result.to).toBe('1397/10/11');
    });
    it('formatTime should return object with from and to property when input is null', () => {
      const result = formatTime('2019/1/1 21:59');
      expect(result).toBe('21:59');
    });
    it('formatTime should return object with from and to property', () => {
      const result = formatTime('2019/1/1');
      expect(result).toBe('00:00');
    });
  });

  describe('moment-utils', () => {
    it('should return correct format (jalali)', () => {
      const result = localizeFormat('YYYY/MM/DD HH:mm');
      expect(result).toBe('jYYYY/jMM/jDD HH:mm');
    });
    it('should return correct format (gregorian)', () => {
      const result = localizeFormat(
        'YYYY/MM/DD HH:mm',
        CalendarTypes.gregorian,
      );
      expect(result).toBe('YYYY/MM/DD HH:mm');
    });
  });

  describe('range-input-utils', () => {
    it('should return empty string when "from and to dates" are null', () => {
      const timeRange: TimeRange = {
        from: null,
        to: null,
      };

      const labels: RangeInputLabels = {
        to: 'to date',
        from: 'from date',
      };
      const inputRangeValue = getRangeInputValue(timeRange, labels);

      expect(inputRangeValue).toBe('');
    });

    it('should return data range input value from "to date" when "from date" is null', () => {
      const timeRange: TimeRange = {
        from: null,
        to: moment('2021/04/01'),
      };

      const labels: RangeInputLabels = {
        to: 'to date',
        from: 'from date',
      };
      const inputRangeValue = getRangeInputValue(timeRange, labels);

      expect(inputRangeValue).toBe('to date 1400/01/12');
    });

    it('should return data range input value from "from date" when "to date" is null', () => {
      const timeRange: TimeRange = {
        from: moment('2020/01/01'),
        to: null,
      };

      const labels: RangeInputLabels = {
        to: 'to date',
        from: 'from date',
      };
      const inputRangeValue = getRangeInputValue(timeRange, labels);

      expect(inputRangeValue).toBe('from date 1398/10/11');
    });

    it('should return data range input value', () => {
      const timeRange: TimeRange = {
        from: moment('2020/01/01'),
        to: moment('2021/04/01'),
      };

      const labels: RangeInputLabels = {
        to: 'to date',
        from: 'from date',
      };
      const inputRangeValue = getRangeInputValue(timeRange, labels);

      expect(inputRangeValue).toBe('from date 1398/10/11 to date 1400/01/12');
    });

    it('should return custom text when customText has been provided as string', () => {
      const timeRange: TimeRange = {
        from: moment('2020/01/01'),
        to: moment('2021/04/01'),
      };

      const labels: RangeInputLabels = {
        to: 'to date',
        from: 'from date',
        customText: 'cancel',
      };

      const inputRangeValue = getRangeInputValue(
        timeRange,
        labels,
        (timeRange) =>
          formatDateRange(timeRange, 'YYYY', CalendarTypes.gregorian),
      );

      expect(inputRangeValue).toBe('cancel');
    });

    it('should return custom text when customText has been provided as function', () => {
      const timeRange: TimeRange = {
        from: moment('2020/01/01'),
        to: moment('2021/04/01'),
      };

      const labels: RangeInputLabels = {
        to: 'to date',
        from: 'from date',
        customText: (timeRange) => {
          const { from, to } = timeRange;
          return `${formatDate(
            to!,
            'YY/M',
            CalendarTypes.gregorian,
          )} is greater than ${formatDate(
            from!,
            'YY/M',
            CalendarTypes.gregorian,
          )}`;
        },
      };

      const inputRangeValue = getRangeInputValue(
        timeRange,
        labels,
        (timeRange) =>
          formatDateRange(timeRange, 'YYYY', CalendarTypes.gregorian),
      );

      expect(inputRangeValue).toBe('21/4 is greater than 20/1');
    });
  });
});
