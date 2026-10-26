const exampleSpan = document.getElementById('example');
const answerInput = document.getElementById('answer-input');
const checkButton = document.getElementById('check');
const skipButton = document.getElementById('skip');
const skippedSpan = document.getElementById('skipped');
const solvedSpan = document.getElementById('solved');
const mistakesSpan = document.getElementById('mistakes');

const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebar = document.getElementById('sidebar');
const modeButtons = document.getElementById('mode-buttons');

const correctlyOverlay = document.getElementById('correctly-overlay');
const wronglyOverlay = document.getElementById('wrongly-overlay');

let skipped = 0;
let solved = 0;
let mistakes = 0;

let a, b, sign, limit;

const browserLanguage = navigator.language.slice(0, 2);
let t = {};

document.addEventListener('keydown', event => {
	if (event.key === 'Enter') checkExample();
});

document.getElementById('open-sidebar').addEventListener('click', () => {
	sidebarOverlay.hidden = false;
	sidebar.classList.add('open');
});
document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

checkButton.addEventListener('click', checkExample);
skipButton.addEventListener('click', () => {
	skipped++;
	skippedSpan.textContent = skipped;
	nextExample();
});

fetch('translations.json')
	.then(response => response.json())
	.then(data => {
		const translations = data[browserLanguage];

		if (translations) {
			t = translations;

			document.title = t['Math trainer'];

			answerInput.placeholder = t['Enter the answer...'];
			checkButton.textContent = t['CHECK'];
			skipButton.textContent = t['Skip this example'];
			document.getElementById('skipped-text').textContent = t['Skipped examples: '];
			document.getElementById('solved-text').textContent = t['Solved examples: '];
			document.getElementById('mistakes-text').textContent = t['Mistakes: '];

			document.getElementById('correctly').textContent = t['Correctly'];
			document.getElementById('wrongly').textContent = t['Wrongly'];
			document.getElementById('correct-answer-text').textContent = t['Correct answer: '];
		}

		let initialModeButton;
		const modes = [
			['+', 10, 'Addition'],
			['+', 100, 'Addition', true],
			['+', 1000, 'Addition'],
			['-', 10, 'Subtraction'],
			['-', 100, 'Subtraction'],
			['-', 1000, 'Subtraction'],
			['*', 10, 'Multiplication'],
			['/', 10, 'Division']
		];

		modes.forEach(([sign, limit, name, initial = false]) => {
			const modeName = tr(name + ' within') + ` ${limit}`;

			const button = document.createElement('button');
			button.textContent = modeName;
			button.addEventListener('click', () => {
				changeMode(sign, limit, modeName, button)
			})

			if (initial) {
				initialModeButton = button;
			}

			modeButtons.appendChild(button);
		});

		changeMode('+', 100, `${tr('Addition within')} 100`, initialModeButton);
	})
	.catch(error => {
		console.error(error);
	});

function tr(key) {
	return t[key] || key;
}

function closeSidebar() {
	sidebarOverlay.hidden = true;
	sidebar.classList.remove('open');
}

function changeMode(newSign, newLimit, modeName, targetButton) {
	sign = newSign;
	limit = newLimit;

	document.getElementById('mode-name').textContent = modeName;

	generateExample();
	resetCounters();
	closeSidebar();

	modeButtons.querySelectorAll('button').forEach(button => {
		button.disabled = false;
		button.classList.remove('selected');
	});

	targetButton.disabled = true;
	targetButton.classList.toggle('selected');
}

function generateExample() {
	a = Math.floor((Math.random() * 90 + 10) / (100 / limit));
	b = Math.floor((Math.random() * 90 + 10) / (100 / limit));

	if (sign === '-') {
		if (a < b) {
			[a, b] = [b, a];
		}
	} else if (sign === '/') {
		a = a * b;
	}
}

function updateExampleText() {
	exampleSpan.textContent = `${a}${sign}${b}=`;
	answerInput.value = '';
}

function resetCounters() {
	skipped = 0;
	solved = 0;
	mistakes = 0;

	updateExampleText();

	skippedSpan.textContent = skipped;
	solvedSpan.textContent = solved;
	mistakesSpan.textContent = mistakes;
}

function nextExample() {
	generateExample();
	updateExampleText();
}

function checkExample() {
	let correctAnswer;

	if (sign === '+') {
		correctAnswer = a + b;
	} else if (sign === '-') {
		correctAnswer = a - b;
	} else if (sign === '*') {
		correctAnswer = a * b;
	} else if (sign === '/') {
		correctAnswer = a / b;
	}

	if (Number(answerInput.value) === correctAnswer) {
		document.getElementById('correctly-sound').play();
		correctlyOverlay.hidden = false;

		setTimeout(() => {
			correctlyOverlay.hidden = true;
		}, 1000);

		solved++;
		solvedSpan.textContent = solved;

		nextExample();
	} else if (answerInput.value === '') {
	} else {
		document.getElementById('wrongly-sound').play();
		wronglyOverlay.hidden = false;
		document.getElementById('correct-answer').textContent = correctAnswer;

		setTimeout(() => {
			wronglyOverlay.hidden = true;
		}, 1000);

		mistakes++;
		mistakesSpan.textContent = mistakes;

		nextExample();
	}
}
