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

document.querySelector(".quick-search").addEventListener("submit", async function (e) {
    e.preventDefault();

    const query = this.querySelector("input[name='q']").value.trim();
    if (!query) return;

    const container = document.querySelector("#conjugation-mode > div.container");
    container.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(`https://verb-app-api.vercel.app/api/v1/search-word?l=anglais&q=${encodeURIComponent(query)}`);
        const json = await res.json();
        renderConjugation(json, container);
    } catch (err) {
        container.innerHTML = "<p>Error loading data.</p>";
    }
});

function renderConjugation(result, container) {
    container.innerHTML = "";

    const titleHtml = `
        <div class="row justify-content-center" data-aos="zoom-out">
            <div class="col-xl-12 col-lg-12">
                <h2 class="mode">
                    <span>${result.word}</span>
                </h2>
            </div>
        </div>
    `;
    container.insertAdjacentHTML("beforeend", titleHtml);

    result.data
        .filter(e => e.children.length != 0)
        .forEach(section => {
            // Create the main wrapper for this section (e.g., Indicative)
            const sectionWrapper = document.createElement('div');
            sectionWrapper.className = 'indicative-wrapper'; // Using indicative-wrapper as generic class based on index.html example, or could be dynamic

            // Section Title
            const sectionTitle = `
                <h2 class="mode"><span>${section.root}</span></h2>
            `;
            sectionWrapper.insertAdjacentHTML('beforeend', sectionTitle);

            // Content Wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'indicative-content'; // Matching index.html structure

            // Row for columns
            const row = document.createElement('div');
            row.className = 'row justify-content-center';
            row.setAttribute('data-aos', 'zoom-out');

            section.children.forEach(item => {
                let blockContent = "";

                if (item.type === "lines") {
                    item.data.forEach(line => {
                        blockContent += `<p>${line}</p>`;
                    });
                }

                if (item.type === "table") {
                    blockContent += `<table class="table table-bordered"><tbody>`;
                    item.rows.forEach(row => {
                        blockContent += "<tr>" + row.map(col => `<td>${col}</td>`).join("") + "</tr>";
                    });
                    blockContent += "</tbody></table>";
                }

                const colHtml = `
                    <div class="tempstab col-xl-3 col-lg-3">
                        <h3 class="tempsheader">${item.title}</h3>
                        <div class="tempscorps">
                            ${blockContent}
                        </div>
                    </div>
                `;

                row.insertAdjacentHTML('beforeend', colHtml);
            });

            contentWrapper.appendChild(row);
            sectionWrapper.appendChild(contentWrapper);
            container.appendChild(sectionWrapper);
        });
}

renderLanguages();