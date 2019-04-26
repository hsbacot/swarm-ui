import React from 'react';

import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import getScreenRenderer from './testUtils/screenRenderer';
import Checkbox from './Checkbox';
import { getTestMarkup } from './testUtils/testUtils.js';

describe('Checkbox', () => {
	let renderer;

	// This is ran when the suite starts up.
	beforeAll(async () => {
		renderer = await getScreenRenderer({
			viewport: { width: 200, height: 1000 },
			// verbose: true,
		});
	});

	// This is ran when the suite is done - stop the renderer.
	afterAll(() => {
		// comment next line out if you want to open it in your browser for debugging
		return renderer.stop();
	});

	const testCases = [
		['Default', <Checkbox key="default">Check me</Checkbox>],
		[
			'Checked',
			<Checkbox key="checked" checked>
				Uncheck me
			</Checkbox>,
		],
		[
			'Disbled unchecked',
			<Checkbox key="disabled" disabled>
				Can&apos;t check me
			</Checkbox>,
		],
		[
			'Disbled checked',
			<Checkbox key="disabled-checked" disabled checked>
				Can&apos;t uncheck me
			</Checkbox>,
		],
	];

	it('Visually matches snapshot', async () => {
		expect(
			await renderer.screenshot(getTestMarkup(testCases))
		).toMatchImageSnapshot();
	});
});
