const languages = [
    {
        "name": "English",
        "shortName": "anglais",
        "code": "en",
    },
    {
        "name": "French",
        "shortName": "du",
        "code": "fr",
    },
    {
        "name": "Spanish",
        "shortName": "espagnol",
        "code": "es",

    },
    {
        "name": "German",
        "shortName": "allemand",
        "code": "de",

    },
    {
        "name": "Italian",
        "shortName": "italien",
        "code": "it",
    },
    {
        "name": "Portuguese",
        "shortName": "portugais",
        "code": "pt",
    }
];

const listEl = document.getElementById("select-language-list");

function renderLanguages() {
    listEl.innerHTML = "";

    languages.forEach(lang => {
        const li = document.createElement("li");
        li.dataset.value = lang.code;

        li.innerHTML = `
            <img src="assets/img/country/${lang.code}.png" class="flag-icon" alt="">
            ${lang.name}
        `;

        listEl.appendChild(li);
    });
}

renderLanguages();