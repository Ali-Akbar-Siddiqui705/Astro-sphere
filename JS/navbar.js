document.addEventListener("DOMContentLoaded", function () {
  fetch("./componeets/nav.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const navLinks = document.querySelectorAll(".nav-link");

      navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // ✅ Scroll effect (after navbar is loaded)
      const navEl = document.querySelector(".navbar");
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 56) {
          navEl.classList.add("navbar-scrolled");
        } else {
          navEl.classList.remove("navbar-scrolled");
        }
      });
    });
});


// Footer

document.addEventListener("DOMContentLoaded", function () {
  fetch("./componeets/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});
