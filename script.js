// Functions

function updateLanguage() {
	const t = translations[language];
	document.title = t.title;
	document.getElementById('inputField').placeholder = t.placeholder;
	document.getElementById('checkButton').textContent = t.checkButton;
	document.getElementById('skipButton').textContent = t.skipButton;
	document.getElementById('skippedExamples').textContent = t.skippedExamples;
	document.getElementById('solvedExamples').textContent = t.solvedExamples;
	document.getElementById('mistakes').textContent = t.mistakes;
	document.getElementById('add10').textContent = t.add10;
	document.getElementById('add100').textContent = t.add100;
	document.getElementById('add1000').textContent = t.add1000;
	document.getElementById('subtraction10').textContent = t.subtraction10;
	document.getElementById('subtraction100').textContent = t.subtraction100;
	document.getElementById('subtraction1000').textContent = t.subtraction1000;
	document.getElementById('multiplication10').textContent = t.multiplication10;
	document.getElementById('division10').textContent = t.division10;
	document.getElementById('correctly').textContent = t.correctly;
	document.getElementById('wrongly').textContent = t.wrongly;
	document.getElementById('correctAnswerP').textContent = t.correctAnswerP;
}

function openSidebar() {
	document.getElementById('sidebar').classList.toggle('open');
	document.getElementById('overlay').classList.toggle('open');
}

function closeSidebar() {
	document.getElementById('sidebar').classList.remove('open');
	document.getElementById('overlay').classList.remove('open');
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

function resetCounters() {
	skipped = 0;
	solved = 0;
	mistakes = 0;
	document.getElementById('example').textContent = `${a}${sign}${b}=`;
	document.getElementById('inputField').value = '';
	document.getElementById('skippedExamples').textContent = `${skippedText} ${skipped}`;
	document.getElementById('solvedExamples').textContent = `${solvedText} ${solved}`;
	document.getElementById('mistakes').textContent = `${mistakesText} ${mistakes}`;
}

function nextExample() {
	generateExample();
	document.getElementById('example').textContent = `${a}${sign}${b}=`;
	document.getElementById('inputField').value = '';
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

	if (Number(document.getElementById('inputField').value) === correctAnswer) {
		document.getElementById('correctlySound').play();
		document.getElementById('correctlyDiv').style.visibility = 'visible';
		setTimeout(() => {
			document.getElementById('correctlyDiv').style.visibility = 'hidden';
		}, 1000);
		solved++;
		document.getElementById('solvedExamples').textContent = `${solvedText} ${solved}`;
		nextExample();
	}
	else if (document.getElementById('inputField').value === '') {
	}
	else {
		document.getElementById('wronglySound').play();
		document.getElementById('wronglyDiv').style.visibility = 'visible';
		document.getElementById('correctAnswerP').textContent = `${correctAnswerPText} ${correctAnswer}`;
		setTimeout(() => {
			document.getElementById('wronglyDiv').style.visibility = 'hidden';
		}, 1000);
		mistakes++;
		document.getElementById('mistakes').textContent = `${mistakesText} ${mistakes}`;
		nextExample();
	}
}

function skipExample() {
	skipped++;
	document.getElementById('skippedExamples').textContent = `${skippedText} ${skipped}`;
	nextExample();
}

function changeMode(newSign, newVariable, optionName) {
	sign = newSign;
	variable = newVariable;

	document.getElementById('modeName').textContent = translations[language][optionName];

	generateExample();
	resetCounters();
	closeSidebar();

	document.querySelectorAll('.sidebarOption').forEach(option => {
		option.disabled = false;
		option.classList.remove('open');
	});

	document.getElementById(optionName).disabled = true;
	document.getElementById(optionName).classList.toggle('open');
}

document.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		checkExample();
	}
})

// App logic

let skipped = 0;
let solved = 0;
let mistakes = 0;

let a, b, sign, variable;
let skippedText, solvedText, mistakesText, correctAnswerPText;

const browserLanguage = navigator.language.slice(0, 2);
let translations;
let language;

fetch('translations.json')
	.then(response => response.json())
	.then(data => {
		translations = data; 
		if (translations[browserLanguage] && browserLanguage != 'en') {
			language = browserLanguage;
			updateLanguage();
		} else {
			language = 'en';
		}

		skippedText = document.getElementById('skippedExamples').textContent;
		solvedText = document.getElementById('solvedExamples').textContent;
		mistakesText = document.getElementById('mistakes').textContent;
		correctAnswerPText = document.getElementById('correctAnswerP').textContent;

		changeMode('+', 1, 'add100');
	})
	.catch(error => {
		console.error(error);
	})
