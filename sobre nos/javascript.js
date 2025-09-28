    fetch("../partners/footer.html")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar o footer");
        return response.text();
      })
      .then(data => {
        document.getElementById("footer").innerHTML = data;
      })

    fetch("../partners/header.html")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar o header");
        return response.text();
      })
      .then(data => {
        document.getElementById("header").innerHTML = data;
      })
      .catch(error => console.error(error));
/* seletor de linguagem */
const languageSelect = document.getElementById("language-select");
languageSelect.addEventListener("change", () => {
  const lang = languageSelect.value;
  document.getElementById("hero-title").innerText = translations[lang].title;
  document.getElementById("hero-text").innerText = translations[lang].text;
  document.getElementById("subscribe-btn").innerText = translations[lang].btn;
});