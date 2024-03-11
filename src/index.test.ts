import { describe, it, expect } from 'vitest';
import { formatToCurrency, formatFromCurrency } from '$lib/casts';

describe('casts whole numbers to and from a currency value', () => {
	it('can create a currency value from a whole number', () => {
		expect(formatToCurrency(123456)).toBe("£1,234.56");
	});

	it('can create a whole number from a currency value', () => {
		expect(formatFromCurrency("£1,234.56")).toBe(123456);
	});
});
