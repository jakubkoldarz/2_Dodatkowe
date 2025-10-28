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

function showTable(array, columns = ["title", "body"], headers = ["Tytuł", "Treść"]) {
    const table = document.createElement("table");
    table.className = "posts-table";

    const thead = document.createElement("thead");
    thead.innerHTML = `
                    <tr>
                        <th>ID</th>
                        <th>${headers[0]}</th>
                        <th>${headers[1]}</th>
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
        tdTitle.textContent = item[columns[0]] || "";
        tr.appendChild(tdTitle);

        const tdBody = document.createElement("td");
        tdBody.textContent = item[columns[1]] || "";
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

function loadPosts(answer, start, limit) {
    answer.innerHTML = null;

    const modal = showModal();

    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
        .then((response) => response.json())
        .then((array) => {
            modal.remove();
            console.log(array);
            answer.innerHTML = null;
            const table = showTable(array);
            answer.appendChild(table);
        })
        .catch((error) => {
            modal.remove();
            answer.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
        });
}

(function () {
    const cw4_put = document.getElementById("cw4_put");
    const cw4_patch = document.getElementById("cw4_patch");
    const cw4_delete = document.getElementById("cw4_delete");
    const cw5 = document.getElementById("cw5");
    const cw6 = document.getElementById("cw6");
    const cw7 = document.getElementById("cw7");
    const cw7_next = document.getElementById("cw7_next");
    const cw7_prev = document.getElementById("cw7_prev");
    const answer = document.getElementById("answer");

    let _start = 0;
    let _limit = 10;

    cw4_put.addEventListener("click", function () {
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

    cw4_patch.addEventListener("click", function () {
        answer.innerHTML = null;

        const modal = showModal();

        fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PATCH",
            body: JSON.stringify({ title: "foo" }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then((response) => response.json())
            .then((item) => {
                modal.remove();
                answer.innerHTML = null;

                const pre = document.createElement("pre");
                pre.innerHTML = JSON.stringify(item, null, 2);

                answer.appendChild(pre);
            })
            .catch((error) => {
                modal.remove();
                answer.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
            });
    });

    cw4_delete.addEventListener("click", function () {
        answer.innerHTML = null;

        const modal = showModal();

        fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((item) => {
                modal.remove();
                answer.innerHTML = null;

                const info = createInfo(`Post ID=1 usunięty status: {deleted}`);
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

        const userIdInput = document.getElementById("cw5_id");
        const userId = userIdInput.value;

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((array) => {
                modal.remove();
                answer.innerHTML = null;

                answer.appendChild(showTable(array));
            })
            .catch((error) => {
                modal.remove();
                answer.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
            });
    });

    cw6.addEventListener("click", function () {
        answer.innerHTML = null;

        const modal = showModal();

        fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
            .then((response) => response.json())
            .then((array) => {
                modal.remove();
                console.log(array);
                answer.innerHTML = null;
                const table = showTable(array, ["name", "body"], ["Nazwa", "Treść"]);
                answer.appendChild(table);
            })
            .catch((error) => {
                modal.remove();
                answer.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
            });
    });

    cw7.addEventListener("click", function () {
        loadPosts(answer, _start, _limit);
    });

    cw7_next.addEventListener("click", function () {
        _start = _start >= 99 ? 99 : _start + _limit;
        loadPosts(answer, _start, _limit);
    });

    cw7_prev.addEventListener("click", function () {
        _start = _start <= 0 ? 0 : _start - _limit;
        loadPosts(answer, _start, _limit);
    });
})();
