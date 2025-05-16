// Functions

function updateLanguage(language) {
	const t = translations[language];
	document.title = t.title;
	document.getElementById("inputField").placeholder = t.placeholder;
	document.getElementById("checkButton").textContent = t.checkButton;
	document.getElementById("skipButton").textContent = t.skipButton;
	document.getElementById("skippedExamples").textContent = t.skippedExamples;
	document.getElementById("solvedExamples").textContent = t.solvedExamples;
	document.getElementById("mistakes").textContent = t.mistakes;
	document.getElementById("add100").textContent = t.add100;
	document.getElementById("multiplication10").textContent = t.multiplication10;
	document.getElementById("add1000").textContent = t.add1000;
	document.getElementById("correctlyh1").textContent = t.correctly;
	document.getElementById("wronglyh1").textContent = t.wrongly;
}

function resetCounters() {
	skipped = 0;
	solved = 0;
	mistakes = 0;
	document.getElementById("example").textContent = a + sign + b + "=";
	document.getElementById("inputField").value = "";
	document.getElementById("skippedExamples").textContent = skippedText + " " + skipped
	document.getElementById("solvedExamples").textContent = solvedText + " " + solved
	document.getElementById("mistakes").textContent = mistakesText + " " + mistakes
};

function nextExample() {
	a = Math.floor((Math.random() * 90 + 10) / variable);
	b = Math.floor((Math.random() * 90 + 10) / variable);

	document.getElementById("example").textContent = a + sign + b + "=";
	document.getElementById("inputField").value = "";
}

function checkExample() {
	let correctAnswer;
	if (sign === "+") {
		correctAnswer = a + b;
	} else {
		correctAnswer = a * b;
	};

	if (Number(document.getElementById("inputField").value) === correctAnswer) {
		document.getElementById("correctlySound").play();
		document.getElementById("correctly").style.visibility = "visible";
		setTimeout(() => {
			document.getElementById("correctly").style.visibility = "hidden";
		}, 1000);
		solved++;
		document.getElementById("solvedExamples").textContent = solvedText + " " + solved;
		nextExample();
	} else if (document.getElementById("inputField").value === "") {
	} else {
		document.getElementById("wronglySound").play();
		document.getElementById("wrongly").style.visibility = "visible";
		setTimeout(() => {
			document.getElementById("wrongly").style.visibility = "hidden";
		}, 1000);
		mistakes++;
		document.getElementById("mistakes").textContent = mistakesText + " " + mistakes;
		nextExample();
	};
};

document.getElementById("select").addEventListener("change", function(event) {
	const value = Number(event.target.value);
	if (value === 0) {
		sign = "+";
		variable = 1;
	} else if (value === 1) {
		sign = "*";
		variable = 10;
	} else {
		sign = "+";
		variable = 0.1;
	};

	a = Math.floor((Math.random() * 90 + 10) / variable);
	b = Math.floor((Math.random() * 90 + 10) / variable);

	resetCounters();
});

document.getElementById("checkButton").addEventListener("click", function() {
	checkExample();
});

document.getElementById("skipButton").addEventListener("click", function() {
	skipped++;
	document.getElementById("skippedExamples").textContent = skippedText + " " + skipped;
	nextExample();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkExample();
    };
});

// App logic

const translations = {
	ru: {
		title: "Математический тренажёр",
		placeholder: "Введите тут, сколько будет...",
		checkButton: "ПРОВЕРИТЬ",
		skipButton: "Пропустить этот пример",
		skippedExamples: "Пропущено примеров:",
		solvedExamples: "Решено примеров:",
		mistakes: "Ошибок:",
		add100: "Сложение в пределах 100",
		multiplication10: "Умножение в пределах 10",
		add1000: "Сложение в пределах 1000",
		correctly: "Правильно",
		wrongly: "Неправильно",
	},
	uk: {
		title: "Математичний тренажер",
		placeholder: "Введіть тут, скільки буде...",
		checkButton: "ПЕРЕВІРИТИ",
		skipButton: "Пропустити цей приклад",
		skippedExamples: "Пропущено прикладів:",
		solvedExamples: "Розв'язано прикладів:",
		mistakes: "Помилок:",
		add100: "Додавання в межах 100",
		multiplication10: "Множення в межах 10",
		add1000: "Додавання в межах 1000",
		correctly: "Правильно",
		wrongly: "Неправильно",
	}
}

const languageSelect = document.getElementById("languageSelect");

const browserLanguage = navigator.language.slice(0, 2);

if (translations[browserLanguage]) {
	updateLanguage(browserLanguage);
};

let a = Math.floor(Math.random() * 90) + 10;
let b = Math.floor(Math.random() * 90) + 10;
let sign = "+";
let variable = 1;

let skipped = 0;
let solved = 0;
let mistakes = 0;

const skippedText = document.getElementById("skippedExamples").textContent
const solvedText = document.getElementById("solvedExamples").textContent
const mistakesText = document.getElementById("mistakes").textContent

resetCounters();
