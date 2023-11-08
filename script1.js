document.addEventListener("DOMContentLoaded", function () {
    const lettersInput = document.getElementById("letters");
    const generateButton = document.getElementById("generate-button");
    const wordList = document.getElementById("word-list");

    let russianWordsArray = []; // Массив для хранения русских слов


// Путь к общедоступной ссылке на файл в OneDrive
const fileURL = 'https://1drv.ms/t/s!AufyTGtu1JD9bBN_InyZx1-agCA?e=6b9zuF'; // Вставьте скопированную ссылку сюда

// Используем fetch для загрузки файла
fetch(fileURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки файла');
        }
        return response.text(); // Прочитать содержимое файла как текст
    })
    .then(data => {
        const russianWordsArray = data.split('\n').map(word => word.trim());
        console.log('Массив русских слов загружен:');
        console.log(russianWordsArray);

        // Здесь вы можете выполнять дополнительные действия с массивом
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });


    

    // Генерация слов из заданного набора букв
    function generateWords() {
        const inputLetters = lettersInput.value.toLowerCase();
        const validWords = russianWordsArray.filter(word => canCreateWordFromLetters(word, inputLetters));
        displayWords(validWords);
    }

    // Проверка, можно ли создать слово из заданного набора букв
    function canCreateWordFromLetters(word, letters) {
        for (let i = 0; i < word.length; i++) {
            for (let j = i + 2; j <= word.length; j++) {
                const subword = word.substring(i, j);
                if (letters.includes(subword)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Отображение сгенерированных слов
    function displayWords(words) {
        wordList.innerHTML = "";
        words.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            wordList.appendChild(li);
        });
    }

    // Обработчик клика по кнопке "Генерировать"
    generateButton.addEventListener("click", generateWords);

    // Загрузка списка русских слов при загрузке страницы
    loadRussianWords();
});
