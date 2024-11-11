document.addEventListener('DOMContentLoaded', () => {
    const targetWord = "apple"; // TEMP WORD, need to add a list
    const maxAttempts = 5;
    let currentAttempt = 0;

    const letterBox = document.getElementById('box');
    const checkWordButton = document.getElementById('check-word');
    const messageElement = document.getElementById('message');

    // Create 5 rows for input (one for each attempt)
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const row = document.createElement('div');
        row.className = 'letter-row';

        for (let i = 0; i < 5; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'letter';
            input.maxLength = 1;
            input.setAttribute('data-row', attempt);
            input.setAttribute('data-index', i);
            
            input.disabled = attempt !== 0; // Only enable the first row initially

            row.appendChild(input);
        }
        letterBox.appendChild(row);
    }

    // Event listener: checking word
    checkWordButton.addEventListener('click', () => {
        if (currentAttempt < maxAttempts) {
            const rowInputs = document.querySelectorAll(`.letter[data-row="${currentAttempt}"]`);
            const guessedWord = Array.from(rowInputs).map(input => input.value.toLowerCase()).join('');

            if (guessedWord.length !== 5) {
                messageElement.textContent = "Please enter a 5-letter word.";
                return;
            }

            // Check guessed word against the target word
            rowInputs.forEach((input, index) => {
                if (input.value.toLowerCase() === targetWord[index]) {
                    input.style.backgroundColor = 'green';
                } else if (targetWord.includes(input.value.toLowerCase())) {
                    input.style.backgroundColor = 'yellow';
                } else {
                    input.style.backgroundColor = 'grey';
                }
            });

            if (guessedWord === targetWord) {
                messageElement.textContent = "Congratulations! You guessed the word!";
                disableAllInputs();
                return;
            }

            currentAttempt++;

            if (currentAttempt < maxAttempts) {
                // Enable the next row of inputs
                const nextRowInputs = document.querySelectorAll(`.letter[data-row="${currentAttempt}"]`);
                nextRowInputs.forEach(input => input.disabled = false);
            } else {
                messageElement.textContent = "Sorry, you've used all your attempts. The word was " + targetWord;
            }
        }
    });

    // Function to disable all inputs
    function disableAllInputs() {
        const allInputs = document.querySelectorAll('.letter');
        allInputs.forEach(input => input.disabled = true);
    }
});
