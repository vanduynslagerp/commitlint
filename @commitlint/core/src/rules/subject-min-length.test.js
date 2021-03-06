import test from 'ava';
import parse from '../library/parse';
import check from './subject-min-length';

const short = 'a';
const long = 'ab';

const value = long.length;

const messages = {
	empty: 'chore:\n',
	short: `chore: ${short}\n`,
	long: `chore: ${long}\n`
};

const parsed = {
	empty: parse(messages.empty),
	short: parse(messages.short),
	long: parse(messages.long)
};

test('with empty should succeed', async t => {
	const [actual] = check(await parsed.empty, '', value);
	const expected = true;
	t.is(actual, expected);
});

test('with short should fail', async t => {
	const [actual] = check(await parsed.short, '', value);
	const expected = false;
	t.is(actual, expected);
});

test('with long should succeed', async t => {
	const [actual] = check(await parsed.long, '', value);
	const expected = true;
	t.is(actual, expected);
});
