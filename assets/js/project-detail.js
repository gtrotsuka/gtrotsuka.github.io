window.initProjectDetail = function initProjectDetail() {
  const projects = getOrderedProjects(window.PORTFOLIO_PROJECTS || []);
  const params = new URLSearchParams(window.location.search);
  const slug = document.body.dataset.projectSlug || params.get("slug");
  const project = projects.find(function (item) {
    return item.slug === slug;
  });
  const detail = document.getElementById("project-detail");
  const backLink = document.getElementById("project-back-link");
  const navWork = document.getElementById("nav-link-work");
  const navProjects = document.getElementById("nav-link-projects");
  const navResearch = document.getElementById("nav-link-research");
  const logo = document.getElementById("header-logo");
  const pagination = document.getElementById("project-neighbor-links");

  if (!detail) {
    return;
  }

  if (!project) {
    document.title = "Project Not Found | Ryan Otsuka";
    detail.innerHTML =
      '<article class="post">' +
      '<header class="major">' +
      "<h1>Project not found</h1>" +
      "<p>The link you opened does not match a project slug in the data file.</p>" +
      "</header>" +
      '<ul class="actions special"><li><a href="projects.html" class="button large">Back to Projects</a></li></ul>' +
      "</article>";
    return;
  }

  const isResearch = project.category === "research";
  const isWork = project.category === "work";
  const categoryHref = getCategoryHref(project);
  const categoryLabel = isResearch ? "Research" : isWork ? "Work Experience" : "Projects";
  const siblings = projects.filter(function (item) {
    return item.category === project.category;
  });
  const currentIndex = siblings.findIndex(function (item) {
    return item.slug === project.slug;
  });
  const previousProject = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextProject = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  document.title = project.title + " | Ryan Otsuka";

  if (backLink) {
    backLink.href = categoryHref;
    backLink.textContent = "Back to " + categoryLabel;
  }

  if (logo) {
    logo.href = categoryHref;
  }

  updateActiveNav();

  detail.innerHTML =
    '<article class="post">' +
    '<header class="major">' +
    '<span class="date">' +
    project.date +
    "</span>" +
    "<h1>" +
    project.title +
    (project.subtitle ? "<br />" + project.subtitle : "") +
    "</h1>" +
    "<p>" +
    project.summary +
    "</p>" +
    "</header>" +
    '<span class="image main"><img src="' +
    project.image +
    '" alt="' +
    project.imageAlt +
    '" /></span>' +
    renderSections(project.sections) +
    renderSkills(project.skills) +
    renderGallery(project.gallery) +
    "</article>";

  if (pagination) {
    pagination.innerHTML =
      (previousProject
        ? '<a href="' + getProjectUrl(previousProject.slug) + '" class="previous">' + previousProject.title + "</a>"
        : "") +
      '<a href="' + categoryHref + '" class="page active">' + categoryLabel + "</a>" +
      (nextProject
        ? '<a href="' + getProjectUrl(nextProject.slug) + '" class="next">' + nextProject.title + "</a>"
        : "");
  }

  function getCategoryHref(item) {
    if (item.category === "work") {
      return "index.html";
    }

    if (item.category === "research") {
      return "generic.html";
    }

    return item.page === 1 ? "projects.html" : "page" + item.page + ".html";
  }

  function getProjectUrl(projectSlug) {
    return "project.html?slug=" + encodeURIComponent(projectSlug);
  }

  function getOrderedProjects(items) {
    const orderMap = window.PORTFOLIO_PROJECT_ORDER || {};
    const slugPosition = {};
    let counter = 0;

    Object.keys(orderMap).forEach(function (key) {
      (orderMap[key] || []).forEach(function (slug) {
        if (slugPosition[slug] === undefined) {
          slugPosition[slug] = counter;
          counter += 1;
        }
      });
    });

    return items
      .map(function (item, index) {
        return { item: item, index: index };
      })
      .sort(function (left, right) {
        const leftRank =
          slugPosition[left.item.slug] === undefined
            ? Number.MAX_SAFE_INTEGER
            : slugPosition[left.item.slug];
        const rightRank =
          slugPosition[right.item.slug] === undefined
            ? Number.MAX_SAFE_INTEGER
            : slugPosition[right.item.slug];

        if (left.item.category !== right.item.category) {
          return left.index - right.index;
        }

        if (leftRank !== rightRank) {
          return leftRank - rightRank;
        }

        return left.index - right.index;
      })
      .map(function (entry) {
        return entry.item;
      });
  }

  function updateActiveNav() {
    if (navWork && navProjects && navResearch) {
      navWork.className = isWork ? "active" : "";
      navProjects.className = !isResearch && !isWork ? "active" : "";
      navResearch.className = isResearch ? "active" : "";
      return;
    }

    const navItems = document.querySelectorAll("#nav .links li");

    navItems.forEach(function (item) {
      item.classList.remove("active");
    });

    if (isWork && navItems[0]) {
      navItems[0].classList.add("active");
    }

    if (!isResearch && !isWork && navItems[1]) {
      navItems[1].classList.add("active");
    }

    if (isResearch && navItems[2]) {
      navItems[2].classList.add("active");
    }
  }

  function renderSections(sections) {
    if (!sections || !sections.length) {
      return "";
    }

    return sections
      .map(function (section) {
        return (
          '<section class="project-content-section">' +
          "<h2>" +
          section.heading +
          "</h2>" +
          (section.paragraphs || [])
            .map(function (paragraph) {
              return "<p>" + paragraph + "</p>";
            })
            .join("") +
          "</section>"
        );
      })
      .join("");
  }

  function renderSkills(skills) {
    if (!skills || !skills.length) {
      return "";
    }

    return (
      '<section class="project-content-section">' +
      "<h2>Skills</h2>" +
      '<ul class="project-skill-list">' +
      skills
        .map(function (skill) {
          return "<li>" + skill + "</li>";
        })
        .join("") +
      "</ul>" +
      "</section>"
    );
  }

  function renderGallery(gallery) {
    if (!gallery || !gallery.length) {
      return "";
    }

    return (
      '<section class="project-content-section">' +
      "<h2>More Visuals</h2>" +
      '<div class="project-gallery">' +
      gallery
        .map(function (image) {
          return (
            '<figure class="project-gallery-item">' +
            '<img src="' +
            image.src +
            '" alt="' +
            image.alt +
            '" />' +
            (image.caption ? "<figcaption>" + image.caption + "</figcaption>" : "") +
            "</figure>"
          );
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }
};

window.initProjectDetail();
