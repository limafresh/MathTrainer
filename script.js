const exampleP = document.getElementById('exampleP');
const answerInput = document.getElementById('answerInput');
const checkButton = document.getElementById('checkButton');
const skipButton = document.getElementById('skipButton');

const skippedExamplesP = document.getElementById('skippedExamplesP');
const solvedExamplesP = document.getElementById('solvedExamplesP');
const mistakesP = document.getElementById('mistakesP');

const add10Btn = document.getElementById('add10Btn');
const add100Btn = document.getElementById('add100Btn');
const add1000Btn = document.getElementById('add1000Btn');

const subtraction10Btn = document.getElementById('subtraction10Btn');
const subtraction100Btn = document.getElementById('subtraction100Btn');
const subtraction1000Btn = document.getElementById('subtraction1000Btn');

const multiplication10Btn = document.getElementById('multiplication10Btn');
const division10Btn = document.getElementById('division10Btn');

const correctlyDiv = document.getElementById('correctlyDiv');
const correctlyP = document.getElementById('correctlyP');
const wronglyDiv = document.getElementById('wronglyDiv');
const wronglyP = document.getElementById('wronglyP');
const correctAnswerP = document.getElementById('correctAnswerP');

const openSidebarButton = document.getElementById('openSidebarButton');
const modeNameP = document.getElementById('modeNameP');

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeSidebarButton = document.getElementById('closeSidebarButton');

const correctlyAudio = document.getElementById('correctlyAudio');
const wronglyAudio = document.getElementById('wronglyAudio');

let skipped = 0;
let solved = 0;
let mistakes = 0;

let a, b, sign, variable;
let skippedText, solvedText, mistakesText, correctAnswerPText;

const browserLanguage = navigator.language.slice(0, 2);
let t = {};

function tr(key) {
	return t[key] || key;
}

function openSidebar() {
	sidebar.classList.toggle('open');
	overlay.classList.toggle('open');
}

function closeSidebar() {
	sidebar.classList.remove('open');
	overlay.classList.remove('open');
}

function generateExample() {
	a = Math.floor((Math.random() * 90 + 10) / variable);
	b = Math.floor((Math.random() * 90 + 10) / variable);

	if (sign === '-') {
		if (a < b) {
			[a, b] = [b, a];
		}
	} else if (sign === '/') {
		a = a * b;
	}
}

function updateExampleText() {
	exampleP.textContent = `${a}${sign}${b}=`;
	answerInput.value = '';
}

function resetCounters() {
	skipped = 0;
	solved = 0;
	mistakes = 0;

	updateExampleText();

	skippedExamplesP.textContent = `${tr('Skipped examples:')} ${skipped}`;
	solvedExamplesP.textContent = `${tr('Solved examples:')} ${solved}`;
	mistakesP.textContent = `${tr('Mistakes:')} ${mistakes}`;
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
		correctlyAudio.play();
		correctlyDiv.style.visibility = 'visible';

		setTimeout(() => {
			correctlyDiv.style.visibility = 'hidden';
		}, 1000);

		solved++;
		solvedExamplesP.textContent = `${tr('Solved examples:')} ${solved}`;

		nextExample();
	} else if (answerInput.value === '') {
	} else {
		wronglyAudio.play();
		wronglyDiv.style.visibility = 'visible';
		correctAnswerP.textContent = `${tr('Correct answer:')} ${correctAnswer}`;

		setTimeout(() => {
			wronglyDiv.style.visibility = 'hidden';
		}, 1000);

		mistakes++;
		mistakesP.textContent = `${tr('Mistakes:')} ${mistakes}`;

		nextExample();
	}
}

function skipExample() {
	skipped++;
	skippedExamplesP.textContent = `${tr('Skipped examples:')} ${skipped}`;
	nextExample();
}

function changeMode(newSign, newVariable, optionName, modeName) {
	sign = newSign;
	variable = newVariable;

	modeNameP.textContent = modeName;

	generateExample();
	resetCounters();
	closeSidebar();

	document.querySelectorAll('.sidebarOption').forEach(option => {
		option.disabled = false;
		option.classList.remove('open');
	});

	optionName.disabled = true;
	optionName.classList.toggle('open');
}

document.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		checkExample();
	}
})

add10Btn.addEventListener('click', () => {
	changeMode('+', 10, add10Btn, tr('Addition within') + ' 10');
});

add100Btn.addEventListener('click', () => {
	changeMode('+', 1, add100Btn, tr('Addition within') + ' 100');
});

add1000Btn.addEventListener('click', () => {
	changeMode('+', 0.1, add1000Btn, tr('Addition within') + ' 1000');
});

subtraction10Btn.addEventListener('click', () => {
	changeMode('-', 10, subtraction10Btn, tr('Subtraction within') + ' 10');
});

subtraction100Btn.addEventListener('click', () => {
	changeMode('-', 1, subtraction100Btn, tr('Subtraction within') + ' 100');
});

subtraction1000Btn.addEventListener('click', () => {
	changeMode('-', 0.1, subtraction1000Btn, tr('Subtraction within') + ' 1000');
});

multiplication10Btn.addEventListener('click', () => {
	changeMode('*', 10, multiplication10Btn, tr('Multiplication within 10'));
});

division10Btn.addEventListener('click', () => {
	changeMode('/', 10, division10Btn, tr('Division within 10'));
});

openSidebarButton.addEventListener('click', openSidebar);
closeSidebarButton.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

checkButton.addEventListener('click', checkExample);
skipButton.addEventListener('click', skipExample);

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

			skippedExamplesP.textContent = t['Skipped examples:'];
			solvedExamplesP.textContent = t['Solved examples:'];
			mistakesP.textContent = t['Mistakes'];

			[10, 100, 1000].forEach(limit => {
				document.getElementById('add' + limit + 'Btn').textContent =
					t['Addition within'] + ' ' + limit;
				document.getElementById('subtraction' + limit + 'Btn').textContent =
					t['Subtraction within'] + ' ' + limit;
			});

			multiplication10Btn.textContent = t['Multiplication within 10'];
			division10Btn.textContent = t['Division within 10'];

			correctlyP.textContent = t['Correctly'];
			wronglyP.textContent = t['Wrongly'];

			correctAnswerP.textContent = t['Correct answer:'];
		}

		changeMode('+', 1, add100Btn, tr('Addition within') + ' 100');
	})
	.catch(error => {
		console.error(error);
	})
