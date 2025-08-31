// Functions

function updateOptionLanguage(id, textCont, value) {
	document.getElementById(id).textContent = textCont;
	document.getElementById("select").querySelector(`option[value="${value}"]`).textContent = textCont;
};

function updateLanguage(language) {
	const t = translations[language];
	document.title = translations[language].title;
	document.getElementById("inputField").placeholder = t.placeholder;
	document.getElementById("checkButton").textContent = t.checkButton;
	document.getElementById("skipButton").textContent = t.skipButton;
	document.getElementById("skippedExamples").textContent = t.skippedExamples;
	document.getElementById("solvedExamples").textContent = t.solvedExamples;
	document.getElementById("mistakes").textContent = t.mistakes;
	updateOptionLanguage("add10", t.add10, "0");
	updateOptionLanguage("add100", t.add100, "1");
	updateOptionLanguage("add1000", t.add1000, "2");
	updateOptionLanguage("subtraction10", t.subtraction10, "3");
	updateOptionLanguage("subtraction100", t.subtraction100, "4");
	updateOptionLanguage("subtraction1000", t.subtraction1000, "5");
	updateOptionLanguage("multiplication10", t.multiplication10, "6");
	updateOptionLanguage("division10", t.division10, "7");
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

changeMode("+", 1, "1", "add100");
