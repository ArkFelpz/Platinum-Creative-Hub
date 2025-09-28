const buttons = document.querySelectorAll('.hero-menu button');
const heroText = document.getElementById('hero-text');
const heroImage = document.querySelector('.hero-image img');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    heroText.textContent = button.getAttribute('data-text');
    const newSrc = button.getAttribute('data-img');
    if (heroImage.src !== newSrc) {
      heroImage.style.opacity = 0;
      heroImage.onload = () => {
        heroImage.style.opacity = 1;
      };
      heroImage.src = newSrc;
    }
  });
});
    fetch("partners/footer.html")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar o footer");
        return response.text();
      })
      .then(data => {
        document.getElementById("footer").innerHTML = data;
      })

    fetch("partners/header.html")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar o header");
        return response.text();
      })
      .then(data => {
        document.getElementById("header").innerHTML = data;
      })
      .catch(error => console.error(error));
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    heroText.classList.remove("animate");
    void heroText.offsetWidth;
    heroText.classList.add("animate");
    heroText.textContent = button.getAttribute('data-text');
    heroImage.classList.remove("animate");
    void heroImage.offsetWidth;
    heroImage.classList.add("animate");
    heroImage.src = button.getAttribute('data-img');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.logos-track');
  const trackWidth = track.scrollWidth / 2;
  const randomStart = Math.random() * trackWidth;
  track.style.transform = `translateX(-${randomStart}px)`;
});
/* seletor de linguagem */
const languageSelect = document.getElementById("language-select");
languageSelect.addEventListener("change", () => {
  const lang = languageSelect.value;
  document.getElementById("hero-title").innerText = translations[lang].title;
  document.getElementById("hero-text").innerText = translations[lang].text;
  document.getElementById("subscribe-btn").innerText = translations[lang].btn;
});