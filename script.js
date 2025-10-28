function showModal() {
    const modal = document.createElement("div");
    modal.className = "loading-modal";

    const modalContent = document.createElement("div");
    modalContent.className = "loading-modal-content";

    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";

    const loadingText = document.createElement("p");
    loadingText.textContent = "Ładowanie danych...";

    modalContent.appendChild(spinner);
    modalContent.appendChild(loadingText);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return modal;
}

function showTable(array) {
    const table = document.createElement("table");
    table.className = "posts-table";

    const thead = document.createElement("thead");
    thead.innerHTML = `
                    <tr>
                        <th>ID</th>
                        <th>Tytuł</th>
                        <th>Treść</th>
                    </tr>
                `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    array.forEach((item) => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = item?.id || "";
        tr.appendChild(tdId);

        const tdTitle = document.createElement("td");
        tdTitle.textContent = item?.title || "";
        tr.appendChild(tdTitle);

        const tdBody = document.createElement("td");
        tdBody.textContent = item?.body || "";
        tr.appendChild(tdBody);

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createInfo(txt) {
    const p = document.createElement("p");
    p.textContent = txt;
    return p;
}

(function () {
    const cw4 = document.getElementById("cw4");
    const cw5 = document.getElementById("cw5");
    const cw6 = document.getElementById("cw6");
    const cw7 = document.getElementById("cw7");
    const cw8 = document.getElementById("cw8");
    const cw9 = document.getElementById("cw9");
    const answer = document.getElementById("answer");

    cw4.addEventListener("click", function () {
        answer.innerHTML = null;

        const modal = showModal();

        fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PUT",
            body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((response) => response.json())
            .then((item) => {
                modal.remove();
                answer.innerHTML = null;

                const info = createInfo(`Zaktualizowano post ID=1: ${item.title}`);

                answer.appendChild(info);
            })
            .catch((error) => {
                modal.remove();
                answer.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
            });
    });

    cw5.addEventListener("click", function () {
        answer.innerHTML = null;

        const modal = showModal();

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((array) => {
                modal.remove();
                answer.innerHTML = null;
                const table = showTable(array);
                answer.appendChild(table);
            })
            .catch((error) => {
                modal.remove();
                answer.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
            });
    });
})();
