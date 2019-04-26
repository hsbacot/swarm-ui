import React from 'react';

import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import getScreenRenderer from './testUtils/screenRenderer';
import FieldHelper from './FieldHelper';
import { getTestMarkup } from './testUtils/testUtils.js'

describe('FieldHelper', () => {
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
		['Default', <FieldHelper key="1" >Help me!</FieldHelper>],
		['Custom Styling', <FieldHelper style={{color: 'red'}} key="2" >Help me, I&apos;m red!</FieldHelper>]
	];

	it('Default', async () => {
		expect(
			await renderer.screenshot(getTestMarkup(testCases))
		).toMatchImageSnapshot();
	});
});
