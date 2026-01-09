const content = document.getElementById("content");

const pages = {
    mechanics: `
        <h2>Mechanics</h2>
        <p>Game mechanics description...</p>
    `,
    items: `
        <h2>Items</h2>
        <p>Items list...</p>
    `
};

document.querySelectorAll(".nav button").forEach(btn => {
    btn.addEventListener("click", () => {
        const page = btn.dataset.page;
        content.innerHTML = pages[page];
    });
});