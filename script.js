// Functions

function updateLanguage(language) {
	const t = translations[language];
	document.title = translations[language].title;
	document.getElementById("inputField").placeholder = t.placeholder;
	document.getElementById("checkButton").textContent = t.checkButton;
	document.getElementById("skipButton").textContent = t.skipButton;
	document.getElementById("skippedExamples").textContent = t.skippedExamples;
	document.getElementById("solvedExamples").textContent = t.solvedExamples;
	document.getElementById("mistakes").textContent = t.mistakes;
	document.getElementById("add100").textContent = t.add100;
	document.getElementById("select").querySelector('option[value="0"]').textContent = t.add100;
	document.getElementById("add1000").textContent = t.add1000;
	document.getElementById("select").querySelector('option[value="1"]').textContent = t.add1000;
	document.getElementById("subtraction100").textContent = t.subtraction100;
	document.getElementById("select").querySelector('option[value="2"]').textContent = t.subtraction100;
	document.getElementById("multiplication10").textContent = t.multiplication10;
	document.getElementById("select").querySelector('option[value="3"]').textContent = t.multiplication10;
	document.getElementById("division10").textContent = t.division10;
	document.getElementById("select").querySelector('option[value="4"]').textContent = t.division10;
	document.getElementById("correctly").textContent = t.correctly;
	document.getElementById("wrongly").textContent = t.wrongly;
	document.getElementById("correctAnswerP").textContent = t.correctAnswerP;
}

function openSidebar() {
	document.getElementById("sidebar").classList.toggle("open");
	document.getElementById("overlay").classList.toggle("open");
};

function closeSidebar() {
	document.getElementById("sidebar").classList.remove("open");
	document.getElementById("overlay").classList.remove("open");
};

function generateExample() {
	a = Math.floor((Math.random() * 90 + 10) / variable);
	b = Math.floor((Math.random() * 90 + 10) / variable);
	
	if (sign === "-") {
		if (a < b) {
			[a, b] = [b, a];
		};
	} else if (sign === "/") {
		a = a * b;
	};
};

function resetCounters() {
	skipped = 0;
	solved = 0;
	mistakes = 0;
	document.getElementById("example").textContent = `${a}${sign}${b}=`;
	document.getElementById("inputField").value = "";
	document.getElementById("skippedExamples").textContent = `${skippedText} ${skipped}`;
	document.getElementById("solvedExamples").textContent = `${solvedText} ${solved}`;
	document.getElementById("mistakes").textContent = `${mistakesText} ${mistakes}`;
};

function nextExample() {
	generateExample();
	document.getElementById("example").textContent = `${a}${sign}${b}=`;
	document.getElementById("inputField").value = "";
}

function checkExample() {
	let correctAnswer;

	if (sign === "+") {
		correctAnswer = a + b;
	} else if (sign === "-") {
		correctAnswer = a - b;
	} else if (sign === "*") {
		correctAnswer = a * b;
	} else if (sign === "/") {
		correctAnswer = a / b;
	};

	if (Number(document.getElementById("inputField").value) === correctAnswer) {
		document.getElementById("correctlySound").play();
		document.getElementById("correctlyDiv").style.visibility = "visible";
		setTimeout(() => {
			document.getElementById("correctlyDiv").style.visibility = "hidden";
		}, 1000);
		solved++;
		document.getElementById("solvedExamples").textContent = `${solvedText} ${solved}`;
		nextExample();
	}
	else if (document.getElementById("inputField").value === "") {
	}
	else {
		document.getElementById("wronglySound").play();
		document.getElementById("wronglyDiv").style.visibility = "visible";
		document.getElementById("correctAnswerP").textContent = `${correctAnswerPText} ${correctAnswer}`;
		setTimeout(() => {
			document.getElementById("wronglyDiv").style.visibility = "hidden";
		}, 1000);
		mistakes++;
		document.getElementById("mistakes").textContent = `${mistakesText} ${mistakes}`;
		nextExample();
	};
};

function skipExample() {
	skipped++;
	document.getElementById("skippedExamples").textContent = `${skippedText} ${skipped}`;
	nextExample();
};

function changeMode(newSign, newVariable, value, optionName) {
	sign = newSign;
	variable = newVariable;

	document.getElementById("select").value = value;
	
	generateExample();
	resetCounters();
	closeSidebar();

	document.querySelectorAll(".sidebarOption").forEach(option => {
		option.disabled = false;
		option.classList.remove("open");
	});

	document.getElementById(optionName).disabled = true;
	document.getElementById(optionName).classList.toggle("open");
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkExample();
    };
});

// App logic

const translations = {
	fr: {
		title: "Formateur en mathématiques",
		placeholder: "Entrez la réponse...",
		checkButton: "CHÈQUE",
		skipButton: "Passer cet exemple",
		skippedExamples: "Exemples sautés:",
		solvedExamples: "Exemples résolus:",
		mistakes: "Erreurs:",
		add100: "Addition dans les 100",
		add1000: "Addition dans les 1000",
		subtraction100: "Soustraction jusqu'à 100",
		multiplication10: "Multiplication dans les 10",
		division10: "Division dans les 10",
		correctly: "Correctement",
		wrongly: "À tort",
		correctAnswerP: "Réponse correcte:",
	},
	de: {
		title: "Mathematiktrainer",
		placeholder: "Geben Sie hier ein, wie viel...",
		checkButton: "ÜBERPRÜFEN",
		skipButton: "Überspringen Sie dieses Beispiel",
		skippedExamples: "Übersprungene Beispiele:",
		solvedExamples: "Gelöste Beispiele:",
		mistakes: "Fehler:",
		add100: "Addition innerhalb von 100",
		add1000: "Addition innerhalb von 1000",
		subtraction100: "Subtraktion innerhalb von 100",
		multiplication10: "Multiplikation innerhalb von 10",
		division10: "Division innerhalb von 10",
		correctly: "Korrekt",
		wrongly: "Falsch",
		correctAnswerP: "Richtige Antwort:",
	},
	ru: {
		title: "Математический тренажёр",
		placeholder: "Введите тут, сколько будет...",
		checkButton: "ПРОВЕРИТЬ",
		skipButton: "Пропустить этот пример",
		skippedExamples: "Пропущено примеров:",
		solvedExamples: "Решено примеров:",
		mistakes: "Ошибок:",
		add100: "Сложение в пределах 100",
		add1000: "Сложение в пределах 1000",
		subtraction100: "Вычитание в пределах 100",
		multiplication10: "Умножение в пределах 10",
		division10: "Деление в пределах 10",
		correctly: "Правильно",
		wrongly: "Неправильно",
		correctAnswerP: "Правильный ответ:",
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
		add1000: "Додавання в межах 1000",
		subtraction100: "Віднімання в межах 100",
		multiplication10: "Множення в межах 10",
		division10: "Ділення в межах 10",
		correctly: "Правильно",
		wrongly: "Неправильно",
		correctAnswerP: "Правильна відповідь:",
	}
}

const browserLanguage = navigator.language.slice(0, 2);

if (translations[browserLanguage]) {
	updateLanguage(browserLanguage);
};

let skipped = 0;
let solved = 0;
let mistakes = 0;

const skippedText = document.getElementById("skippedExamples").textContent;
const solvedText = document.getElementById("solvedExamples").textContent;
const mistakesText = document.getElementById("mistakes").textContent;
const correctAnswerPText = document.getElementById("correctAnswerP").textContent;

let a, b, sign, variable;

changeMode("+", 1, "0", "add100");
