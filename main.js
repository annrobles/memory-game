(function () {
	let timer;
	let secondsElapsed = 0;
	let matchedPairs = 0;
	let tries = 0;
	const totalPairs = 8;
	let leaderboard = [];
	let round = 0;

	document.getElementById("startBtn").addEventListener("click", startGame);
	const tableBody = document.getElementById("tableBody");

	function startGame() {
		secondsElapsed = 0;
		matchedPairs = 0;
		document.getElementById("timer").textContent = "0";

		timer = setInterval(updateTimer, 1000);

		const elements = document.querySelectorAll(".square");
		elements.forEach((element) => {
			element.classList.remove("selected");
			element.classList.remove("match");
		});
	}

	function updateTimer() {
		secondsElapsed++;
		document.getElementById("timer").textContent = secondsElapsed;
	}

	function stopTimer() {
		clearInterval(timer);
		leaderboard.push({ sec: secondsElapsed, tries: tries });
		leaderboard.sort((a, b) => {
			if (a.sec !== b.sec) {
				return a.sec - b.sec;
			} else {
				return a.tries - b.tries;
			}
		});
		console.log("leaderboard ", leaderboard);
		// Clear previous data
		tableBody.innerHTML = "";

		// Populate the table with sorted leaderboard data
		leaderboard.forEach((entry, index) => {
			const row = document.createElement("tr");

			const rankCell = document.createElement("td");
			rankCell.textContent = index + 1; // rank starts at 1

			const secCell = document.createElement("td");
			secCell.textContent = entry.sec;

			const triesCell = document.createElement("td");
			triesCell.textContent = entry.tries;

			row.append(rankCell, secCell, triesCell);
			tableBody.append(row);
		});
		round++;
	}

	document.addEventListener("DOMContentLoaded", () => {
		const board = document.getElementById("board");
		let selectedSquares = [];

		let images = [
			"images/i1.png",
			"images/i2.png",
			"images/i3.png",
			"images/i4.png",
			"images/i5.png",
			"images/i6.png",
			"images/i7.png",
			"images/i8.png",
		];

		images = images.concat(images);
		images = shuffle(images);

		for (let i = 0; i < 16; i++) {
			const square = document.createElement("div");
			square.className = "square";

			const imgElement = document.createElement("img");
			imgElement.src = images[i];
			imgElement.alt = "Image " + (i + 1);

			square.appendChild(imgElement);
			square.addEventListener("click", function () {
				if (
					square.classList.contains("match") ||
					square.classList.contains("selected")
				) {
					return;
				}

				square.classList.add("selected");
				selectedSquares.push(square);

				if (selectedSquares.length === 2) {
					const [firstSquare, secondSquare] = selectedSquares;
					tries++;
					document.getElementById("tries").textContent = `# of tries: ${tries}`;
					if (firstSquare.children[0].src === secondSquare.children[0].src) {
						firstSquare.classList.add("match");
						secondSquare.classList.add("match");
						selectedSquares = [];
						matchedPairs++;
						if (matchedPairs === totalPairs) {
							stopTimer();
						}
					} else {
						const squaresToRevert = [...selectedSquares];
						setTimeout(() => {
							squaresToRevert.forEach((sq) => sq.classList.remove("selected"));
						}, 3000);
						selectedSquares = [];
					}
				}
			});
			board.appendChild(square);
		}
	});

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}
		return array;
	}
})();
