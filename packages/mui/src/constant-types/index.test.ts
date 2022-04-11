import { defaultLocale } from './px-constant-types';

describe('activeLocale', () => {
  it('should have all property', () => {
    expect(defaultLocale).toHaveProperty('calendar');
    expect(defaultLocale).toHaveProperty('language');
  });
});
