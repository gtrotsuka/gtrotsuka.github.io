window.initProjectsPage = function initProjectsPage() {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const category = document.body.dataset.listingCategory || "projects";
  const pageValue = Number(document.body.dataset.projectsPage || "1");
  const emptyTitle =
    document.body.dataset.emptyTitle || "Content coming soon";
  const emptyMessage =
    document.body.dataset.emptyMessage || "Check back soon for updates.";
  const categoryProjects = projects.filter(function (project) {
    return project.category === category;
  });
  const featuredContainer = document.getElementById("featured-project");
  const gridContainer = document.getElementById("projects-grid");
  const paginationContainer = document.getElementById("projects-pagination");
  const main = document.getElementById("main");

  if ((!featuredContainer && !gridContainer && !paginationContainer) || !main) {
    return;
  }

  bindListingNavigation();

  if (!categoryProjects.length) {
    renderEmptyState();
    updateListingNavIndicator();
    return;
  }

  const pagedProjects = category === "projects"
    ? categoryProjects.filter(function (project) {
        return project.page === pageValue;
      })
    : categoryProjects;
  const totalPages = getTotalPages(categoryProjects);
  const featuredProject =
    pagedProjects.find(function (project) {
      return project.featured;
    }) || pagedProjects[0];
  const gridProjects = pagedProjects.filter(function (project) {
    return project !== featuredProject;
  });
  const previousPage = pageValue > 1 ? getPageHref(category, pageValue - 1) : null;
  const nextPage =
    category === "projects" && pageValue < totalPages
      ? getPageHref(category, pageValue + 1)
      : null;

  renderPageSummary();
  renderFeaturedProject();
  renderProjectGrid();
  renderPagination();
  updateListingNavIndicator();

  function getProjectUrl(slug) {
    return "project.html?slug=" + encodeURIComponent(slug);
  }

  function getPageHref(currentCategory, pageNumber) {
    if (currentCategory === "work") {
      return "index.html";
    }

    if (currentCategory === "research") {
      return "generic.html";
    }

    return pageNumber === 1 ? "projects.html" : "page" + pageNumber + ".html";
  }

  function getTotalPages(items) {
    const pages = items
      .map(function (project) {
        return project.page;
      })
      .filter(function (page) {
        return Number.isFinite(page);
      });

    return pages.length ? Math.max.apply(null, pages) : 1;
  }

  function createProjectHeading(project) {
    const subtitle = project.subtitle ? ":<br />" + project.subtitle : "";

    return (
      '<h2><a href="' +
      getProjectUrl(project.slug) +
      '">' +
      project.title +
      subtitle +
      "</a></h2>"
    );
  }

  function renderPageSummary() {
    const summary = document.getElementById("projects-page-summary");

    if (!summary) {
      return;
    }

    if (category !== "projects") {
      summary.innerHTML = "";
      return;
    }

    summary.innerHTML =
      '<section class="portfolio-page-banner portfolio-page-banner-compact">' +
      '<div class="portfolio-page-switcher">' +
      (previousPage
        ? '<a class="button small" href="' + previousPage + '">Previous Page</a>'
        : '<span class="button small disabled">Previous Page</span>') +
      '<span class="portfolio-page-count">Page ' +
      pageValue +
      " / " +
      totalPages +
      "</span>" +
      (nextPage
        ? '<a class="button small" href="' + nextPage + '">Next Page</a>'
        : '<span class="button small disabled">Next Page</span>') +
      "</div>" +
      "</section>";
  }

  function renderFeaturedProject() {
    const featured = featuredContainer;
    if (!featured || !featuredProject) {
      return;
    }

    featured.innerHTML =
      '<article class="post featured">' +
      '<header class="major">' +
      '<span class="date">' +
      featuredProject.date +
      "</span>" +
      createProjectHeading(featuredProject) +
      "<p>" +
      featuredProject.summary +
      "</p>" +
      "</header>" +
      '<a href="' +
      getProjectUrl(featuredProject.slug) +
      '" class="image main"><img src="' +
      featuredProject.image +
      '" alt="' +
      featuredProject.imageAlt +
      '" /></a>' +
      '<ul class="actions special"><li><a href="' +
      getProjectUrl(featuredProject.slug) +
      '" class="button large">Full Story</a></li></ul>' +
      "</article>";
  }

  function renderProjectGrid() {
    const grid = gridContainer;
    if (!grid) {
      return;
    }

    grid.innerHTML = gridProjects
      .map(function (project) {
        return (
          "<article>" +
          "<header>" +
          '<span class="date">' +
          project.date +
          "</span>" +
          createProjectHeading(project) +
          "</header>" +
          '<a href="' +
          getProjectUrl(project.slug) +
          '" class="image fit"><img src="' +
          project.image +
          '" alt="' +
          project.imageAlt +
          '" /></a>' +
          "<p>" +
          project.summary +
          "</p>" +
          '<ul class="actions special"><li><a href="' +
          getProjectUrl(project.slug) +
          '" class="button">Full Story</a></li></ul>' +
          "</article>"
        );
      })
      .join("");
  }

  function renderPagination() {
    const pagination = paginationContainer;
    if (!pagination || category !== "projects") {
      return;
    }

    let links = "";

    if (previousPage) {
      links += '<a href="' + previousPage + '" class="previous">Previous</a>';
    }

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      const activeClass = pageNumber === pageValue ? " active" : "";
      links +=
        '<a href="' +
        getPageHref(category, pageNumber) +
        '" class="page' +
        activeClass +
        '">' +
        pageNumber +
        "</a>";
    }

    if (nextPage) {
      links += '<a href="' + nextPage + '" class="next">Next</a>';
    }

    pagination.innerHTML = links;
  }

  function renderEmptyState() {
    const summary = document.getElementById("projects-page-summary");

    if (summary) {
      summary.innerHTML = "";
    }

    if (featuredContainer) {
      featuredContainer.innerHTML =
        '<article class="post featured">' +
        '<header class="major">' +
        "<h2>" +
        emptyTitle +
        "</h2>" +
        "<p>" +
        emptyMessage +
        "</p>" +
        "</header>" +
        "</article>";
    }

    if (gridContainer) {
      gridContainer.innerHTML = "";
    }

    if (paginationContainer) {
      paginationContainer.innerHTML = "";
    }
  }

  function bindListingNavigation() {
    if (document.body.dataset.listingNavigationBound === "true") {
      return;
    }

    document.body.dataset.listingNavigationBound = "true";

    document.addEventListener("click", function (event) {
      const link = event.target.closest(
        '#nav .links a, #projects-pagination a, .portfolio-page-switcher a'
      );

      if (!link) {
        return;
      }

      const route = getListingRoute(link.getAttribute("href"));

      if (!route) {
        return;
      }

      event.preventDefault();
      transitionToRoute(route);
    });

    window.addEventListener("popstate", function () {
      const route = getListingRoute(window.location.pathname.split("/").pop() || "index.html");

      if (!route) {
        return;
      }

      applyRoute(route, false);
    });

    window.addEventListener("resize", function () {
      window.requestAnimationFrame(updateListingNavIndicator);
    });
  }

  function getListingRoute(href) {
    if (!href || href.indexOf("project.html") === 0) {
      return null;
    }

    switch (href) {
      case "index.html":
        return {
          category: "work",
          page: 1,
          url: "index.html",
          title: "Ryan Otsuka"
        };
      case "projects.html":
        return {
          category: "projects",
          page: 1,
          url: "projects.html",
          title: "Ryan Otsuka"
        };
      case "page2.html":
        return {
          category: "projects",
          page: 2,
          url: "page2.html",
          title: "Ryan Otsuka"
        };
      case "generic.html":
        return {
          category: "research",
          page: 1,
          url: "generic.html",
          title: "Ryan Otsuka"
        };
      default:
        return null;
    }
  }

  function transitionToRoute(route) {
    if (document.body.dataset.routeTransitioning === "true") {
      return;
    }

    document.body.dataset.routeTransitioning = "true";
    main.classList.add("is-page-transitioning-out");

    window.setTimeout(function () {
      try {
        applyRoute(route, true);
        main.classList.remove("is-page-transitioning-out");
        main.classList.add("is-page-transitioning-in");

        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            main.classList.remove("is-page-transitioning-in");
            document.body.dataset.routeTransitioning = "false";
          });
        });
      } catch (error) {
        document.body.dataset.routeTransitioning = "false";
        main.classList.remove("is-page-transitioning-out");
        main.classList.remove("is-page-transitioning-in");
      }
    }, 150);
  }

  function applyRoute(route, pushState) {
    document.body.dataset.listingCategory = route.category;
    document.body.dataset.projectsPage = String(route.page);

    if (route.category === "work") {
      document.body.dataset.emptyTitle = "Work Experience";
      document.body.dataset.emptyMessage = "Experience highlights will appear here soon.";
    } else {
      document.body.removeAttribute("data-empty-title");
      document.body.removeAttribute("data-empty-message");
    }

    document.title = route.title;
    updateListingNav(route);
    window.initProjectsPage();

    if (pushState) {
      try {
        window.history.pushState({}, "", route.url);
      } catch (error) {
        // Local file browsing can reject pushState; rendering should still continue.
      }
    }
  }

  function updateListingNav(route) {
    const navLinks = document.querySelectorAll("#nav .links li");

    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    if (route.category === "work" && navLinks[0]) {
      navLinks[0].classList.add("active");
    }

    if (route.category === "projects" && navLinks[1]) {
      navLinks[1].classList.add("active");
    }

    if (route.category === "research" && navLinks[2]) {
      navLinks[2].classList.add("active");
    }

    window.requestAnimationFrame(updateListingNavIndicator);
  }

  function updateListingNavIndicator() {
    const navList = document.querySelector("#nav .links");
    const activeItem = document.querySelector("#nav .links li.active");

    if (!navList || !activeItem) {
      return;
    }

    const listRect = navList.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const left = itemRect.left - listRect.left;

    navList.style.setProperty("--nav-highlight-left", left + "px");
    navList.style.setProperty("--nav-highlight-width", itemRect.width + "px");
  }
};

window.initProjectsPage();
