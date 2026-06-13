(function () {
  const APP_LINK_SELECTOR = [
    "#nav .links a",
    "#navPanel nav .links a",
    "#projects-pagination a",
    "#project-neighbor-links a",
    "#project-back-link",
    ".portfolio-page-switcher a",
    'a[href^="project.html?slug="]'
  ].join(", ");
  const LISTING_TEMPLATE =
    '<section id="projects-page-summary"></section>' +
    '<div id="featured-project"></div>' +
    '<section class="posts" id="projects-grid"></section>' +
    '<footer><div class="pagination" id="projects-pagination"></div></footer>';
  const SIMPLE_LISTING_TEMPLATE =
    '<section id="projects-page-summary"></section>' +
    '<div id="featured-project"></div>' +
    '<section class="posts" id="projects-grid"></section>';
  const DETAIL_TEMPLATE =
    '<section class="project-back-row">' +
    '<a href="projects.html" class="button small" id="project-back-link">Back to Projects</a>' +
    "</section>" +
    '<div id="project-detail"></div>' +
    '<footer><div class="pagination" id="project-neighbor-links"></div></footer>';

  let isNavigating = false;

  window.navigateToAppRoute = function navigateToAppRoute(href) {
    const route = getRouteFromHref(href);

    if (!route || isNavigating) {
      return false;
    }

    transitionToRoute(route, true);
    return true;
  };

  document.addEventListener("click", function (event) {
    const link = event.target.closest(APP_LINK_SELECTOR);

    if (!link || isNavigating) {
      return;
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (!window.navigateToAppRoute(link.getAttribute("href"))) {
      return;
    }

    event.preventDefault();
  });

  window.addEventListener("popstate", function () {
    const route = getRouteFromLocation(window.location);

    if (!route) {
      return;
    }

    renderRoute(route, false);
  });

  function getRouteFromLocation(locationObject) {
    const fileName = locationObject.pathname.split("/").pop() || "index.html";
    const search = locationObject.search || "";

    if (fileName === "project.html") {
      const params = new URLSearchParams(search);
      const slug = params.get("slug");

      if (!slug) {
        return null;
      }

      return {
        type: "project",
        slug: slug,
        url: "project.html?slug=" + encodeURIComponent(slug)
      };
    }

    return getRouteFromHref(fileName);
  }

  function getRouteFromHref(href) {
    if (!href) {
      return null;
    }

    if (href.indexOf("project.html?slug=") === 0) {
      const url = new URL(href, window.location.href);
      const slug = url.searchParams.get("slug");

      if (!slug) {
        return null;
      }

      return {
        type: "project",
        slug: slug,
        url: "project.html?slug=" + encodeURIComponent(slug)
      };
    }

    switch (href) {
      case "index.html":
        return {
          type: "listing",
          category: "work",
          page: 1,
          url: "index.html",
          title: "Ryan Otsuka"
        };
      case "projects.html":
        return {
          type: "listing",
          category: "projects",
          page: 1,
          url: "projects.html",
          title: "Ryan Otsuka"
        };
      case "page2.html":
        return {
          type: "listing",
          category: "projects",
          page: 2,
          url: "page2.html",
          title: "Ryan Otsuka"
        };
      case "generic.html":
        return {
          type: "listing",
          category: "research",
          page: 1,
          url: "generic.html",
          title: "Ryan Otsuka"
        };
      default:
        return null;
    }
  }

  function transitionToRoute(route, pushState) {
    const main = document.getElementById("main");

    if (!main) {
      return;
    }

    isNavigating = true;
    smoothScrollToContent(main);

    main.classList.add("is-page-transitioning-out");

    window.setTimeout(function () {
      try {
        renderRoute(route, pushState);
        smoothScrollToContent(main);
      } finally {
        main.classList.remove("is-page-transitioning-out");
        main.classList.add("is-page-transitioning-in");

        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            main.classList.remove("is-page-transitioning-in");
            isNavigating = false;
          });
        });
      }
    }, 150);
  }

  function renderRoute(route, pushState) {
    const main = document.getElementById("main");

    if (!main) {
      return;
    }

    if (route.type === "project") {
      main.innerHTML = DETAIL_TEMPLATE;
      document.body.removeAttribute("data-empty-title");
      document.body.removeAttribute("data-empty-message");
      updateBodyRouteData("project", 1);
      document.body.dataset.projectSlug = route.slug;
      updateTopNavFromProject(route.slug);

      if (pushState) {
        safePushState(route.url);
      }

      if (typeof window.initProjectDetail === "function") {
        const url = new URL(window.location.href);
        url.searchParams.set("slug", route.slug);
        safeReplaceUrl(route.url);
        window.initProjectDetail();
      }

      return;
    }

    updateBodyRouteData(route.category, route.page);
    document.body.removeAttribute("data-project-slug");
    document.title = route.title;
    updateTopNavFromCategory(route.category);
    main.innerHTML =
      route.category === "projects" ? LISTING_TEMPLATE : SIMPLE_LISTING_TEMPLATE;

    if (route.category === "work") {
      document.body.dataset.emptyTitle = "Work Experience";
      document.body.dataset.emptyMessage = "Experience highlights will appear here soon.";
    } else {
      document.body.removeAttribute("data-empty-title");
      document.body.removeAttribute("data-empty-message");
    }

    if (pushState) {
      safePushState(route.url);
    } else {
      safeReplaceUrl(route.url);
    }

    if (typeof window.initProjectsPage === "function") {
      window.initProjectsPage();
    }
  }

  function updateBodyRouteData(category, page) {
    document.body.dataset.listingCategory = category;
    document.body.dataset.projectsPage = String(page || 1);
  }

  function updateTopNavFromProject(slug) {
    const projects = window.PORTFOLIO_PROJECTS || [];
    const project = projects.find(function (item) {
      return item.slug === slug;
    });
    const category = project ? project.category : "projects";

    updateTopNavFromCategory(category);
  }

  function updateTopNavFromCategory(category) {
    const navItems = document.querySelectorAll("#nav .links li");

    navItems.forEach(function (item) {
      item.classList.remove("active");
    });

    if (category === "work" && navItems[0]) {
      navItems[0].classList.add("active");
    }

    if (category === "projects" && navItems[1]) {
      navItems[1].classList.add("active");
    }

    if (category === "research" && navItems[2]) {
      navItems[2].classList.add("active");
    }
  }

  function safePushState(url) {
    try {
      window.history.pushState({}, "", url);
    } catch (error) {
      safeReplaceUrl(url);
    }
  }

  function safeReplaceUrl(url) {
    try {
      window.history.replaceState({}, "", url);
    } catch (error) {
      // Local file browsing may block state updates.
    }
  }

  function smoothScrollToContent(main) {
    const targetTop = Math.max(
      0,
      Math.round(main.getBoundingClientRect().top + window.pageYOffset - 24)
    );

    try {
      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    } catch (error) {
      window.scrollTo(0, targetTop);
    }
  }
})();
