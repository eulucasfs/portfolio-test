const portfolioData = {
  personal: {
    name: "Lucas Ferreira",
    role: "Interesse em desenvolvimento Back-end, Python, JavaScript, SQL e cibersegurança, com foco em soluções tecnológicas, aprendizado contínuo e resolução de problemas.",
    intro:
      "Desenvolvedor em formação, com interesse em Back-end, Python, JavaScript e SQL, focado em criar soluções eficientes e evoluir profissionalmente na área de tecnologia.",
    aboutPrimary:
      "Minha jornada na tecnologia começou com a curiosidade de entender como as coisas funcionam e transformar ideias em soluções digitais. Desde então, venho aprendendo sobre programação, desenvolvendo projetos e aprimorando minhas habilidades, sempre buscando novos desafios e oportunidades para crescer profissionalmente.",
    aboutSecondary:
      "Gosto de aprender novas tecnologias, desenvolver projetos e encontrar soluções práticas por meio da programação. Busco evoluir minhas habilidades, enfrentar novos desafios e conquistar oportunidades para crescer profissionalmente na área de tecnologia.",
  },
  skills: [
    { name: "Linguagens", number: "01", items: ["Python", "JavaScript", "SQL", "Java", "C++", "TypeScript", "PHP"] },
    { name: "Front-end", number: "02", items: ["CSS"] },
    { name: "Back-end", number: "03", items: ["Node.js", "Django", "Flask"] },
    { name: "Dados", number: "04", items: ["MySQL", "PostgreSQL"] },
    { name: "Ferramentas", number: "05", items: ["Git", "Docker", "AWS"] },
    { name: "Outras tecnologias", number: "06", items: ["Kubernetes", "TensorFlow", "React"] },
  ],
  projects: [
    {
      id: "slot-01",
      group: "featured",
      number: "01",
      label: "Projeto em destaque",
      title: "Meu Projeto de Bartender",
      image: "img/previa/Bartender.png",
      imageAlt: "Captura do site Carioca Eventos, projeto de bartender",
      description: "Site desenvolvido para divulgar serviços de bartender, apresentar o trabalho profissional e facilitar o contato com clientes interessados em contratar os serviços para eventos.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],

      demoUrl: "https://angelo-bartender.vercel.app/",
      sourceUrl: "https://github.com/eulucasfs/bartender-site",
    },
    {
      id: "slot-02",
      group: "featured",
      number: "02",
      label: "Projeto em destaque",
      title: "Bio do Instagram",
      image: "img/previa/bio.png",
      imageAlt: "Captura da página Bio do Instagram de Lucas Ferreira",
      description: "Réplica do Instagram criada para praticar desenvolvimento web, interface responsiva e interatividade.",
      technologies: ["HTML", "CSS", "TypeScript"],
      demoUrl: "https://insta-dun-nu.vercel.app/",
      sourceUrl: "https://github.com/eulucasfs/Bio-Insta",
    },
  ],
  contacts: [
    { label: "E-mail", value: "contatoeulucasf@gmail.com", href: "gmail:contatoeulucasf@gmail.com" },
    { label: "GitHub", value: "eulucasfs", href: "https://github.com/eulucasfs" },
    { label: "LinkedIn", value: "Lucas Ferreira", href: "https://www.linkedin.com/in/eulucasfs/?isSelfProfile=true" },
  ],
};

const iconArrow = '<span class="card-arrow" aria-hidden="true">↗</span>';

function renderPersonalDetails() {
  document.querySelectorAll("[data-personal]").forEach((element) => {
    const key = element.dataset.personal;
    if (portfolioData.personal[key]) element.textContent = portfolioData.personal[key];
  });

  document.title = `Portfólio | ${portfolioData.personal.name}`;
  const description = document.querySelector('meta[name="description"]');
  if (description && portfolioData.personal.name !== "Lucas Ferreira") {
    description.content = `Portfólio de ${portfolioData.personal.name}: trajetória, habilidades e projetos na área de tecnologia.`;
  }
  const socialTitle = document.querySelector('meta[property="og:title"]');
  if (socialTitle) socialTitle.content = `Portfólio | ${portfolioData.personal.name}`;
}

function renderSkills() {
  const grid = document.querySelector("#skills-grid");
  grid.innerHTML = portfolioData.skills
    .map((category) => {
      const items = category.items.length
        ? `<ul class="skill-tags">${category.items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`
        : '<p class="skill-empty">Adicione suas tecnologias</p>';
      return `
        <article class="skill-card">
          <span class="skill-number">${category.number} <span aria-hidden="true">/</span></span>
          <div><h3>${escapeHTML(category.name)}</h3>${items}</div>
          <span class="skill-marker" aria-hidden="true">+</span>
        </article>`;
    })
    .join("");
}

function renderProjects(filter = "all") {
  const grid = document.querySelector("#project-grid");
  const projects = portfolioData.projects.filter((project) => filter === "all" || project.group === filter);
  const count = document.querySelector('[data-filter="all"] span');
  if (count) count.textContent = String(portfolioData.projects.length).padStart(2, "0");

  grid.innerHTML = projects
    .map((project) => {
      const technologyList = project.technologies.length
        ? project.technologies.map((technology) => escapeHTML(technology)).join(" · ")
        : "Adicione tecnologias";
      const projectLinks = [
        project.demoUrl
          ? `<a href="${escapeAttribute(project.demoUrl)}" target="_blank" rel="noreferrer">Demonstração ${iconArrow}</a>`
          : "",
        project.sourceUrl
          ? `<a href="${escapeAttribute(project.sourceUrl)}" target="_blank" rel="noreferrer">Código-fonte ${iconArrow}</a>`
          : "",
      ].filter(Boolean);

      return `
        <article class="project-card" data-group="${project.group}">
          <div class="project-preview">
            <img class="project-image" src="${escapeAttribute(project.image)}" alt="${escapeAttribute(project.imageAlt)}" />
          </div>
          <div class="project-meta"><span>${project.label}</span><span>PRÉVIA DO PROJETO</span></div>
          <div class="project-title-row"><h3>${escapeHTML(project.title)}</h3></div>
          <p class="project-description">${escapeHTML(project.description)}</p>
          <div class="project-bottom"><span>${technologyList}</span><span>Projeto publicado</span></div>
          ${projectLinks.length ? `<div class="project-links">${projectLinks.join("")}</div>` : ""}
        </article>`;
    })
    .join("");
}

function renderContacts() {
  const container = document.querySelector("#contact-links");
  const availableContacts = portfolioData.contacts.filter((contact) => contact.value && contact.href);

  if (!availableContacts.length) {
    container.innerHTML = `
      <p class="contact-empty-title">Adicione seus canais de contato</p>
      <p class="contact-empty-copy">Preencha e-mail, GitHub ou LinkedIn nos dados do arquivo <code>app.js</code>. Nenhum endereço ou perfil foi inventado.</p>`;
    return;
  }

  container.innerHTML = availableContacts
    .map(
      (contact) => `
        <a class="contact-link" href="${escapeAttribute(contact.href)}" ${contact.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>
          <span><small>${escapeHTML(contact.label)}</small><strong>${escapeHTML(contact.value)}</strong></span>${iconArrow}
        </a>`,
    )
    .join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character];
  });
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

function setupNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");
  const links = [...navigation.querySelectorAll('a[href^="#"]')];

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      navigation.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    },
    { passive: true },
  );

  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }
}

function setupProjectFilters() {
  const buttons = document.querySelectorAll(".filter-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderProjects(button.dataset.filter);
    });
  });
}

function setupRevealAnimations() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  targets.forEach((element) => observer.observe(element));
}

renderPersonalDetails();
renderSkills();
renderProjects();
renderContacts();
setupNavigation();
setupProjectFilters();
setupRevealAnimations();
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#hero-year").textContent = new Date().getFullYear();
