import Links from "../store/Links";

export default links => `
<nav>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
    ${Links.map(
      link => `<li><a href="/${link.title}" data-navigo>${link.text}</a></li>`
    ).join("")}
  </ul>
  </nav>
  `;
