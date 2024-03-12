export function formatToCurrency(wholeNumber: number): string {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2,
	});

	const decimalValue = wholeNumber / 100;

	return formatter.format(decimalValue);
}

export function formatFromCurrency(currencyString: string): number {
	const sanitizedInput = currencyString.replace(/[^0-9.]/g, '');
	const decimalValue = parseFloat(sanitizedInput);
	const wholeNumber = Math.round(decimalValue * 100);

	return wholeNumber;
}
