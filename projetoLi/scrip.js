document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".dropdown-menu a");
    const infoContainer = document.getElementById("artista-info");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const artistaId = e.target.dataset.id;

            fetch(`http://localhost:3000/artistas/${artistaId}`)
                .then(response => response.json())
                .then(artista => {
                    infoContainer.innerHTML = `
                        <h2>${artista.nome}</h2>
                        <img src="${artista.foto}" alt="${artista.nome}">
                        <p><strong>Biografia:</strong> ${artista.biografia}</p>
                        <h3>Discografia:</h3>
                        <ul>
                            ${artista.discografia.map(album => `<li>${album}</li>`).join('')}
                        </ul>
                    `;
                })
                .catch(error => {
                    console.error("Erro ao buscar informações do artista:", error);
                    infoContainer.innerHTML = `<p>Não foi possível carregar as informações do artista.</p>`;
                });
        });
    });
});
