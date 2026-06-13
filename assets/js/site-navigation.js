(function () {
  const TRANSITION_LINK_SELECTOR = [
    "#nav .links a",
    "#navPanel nav .links a",
    "#projects-pagination a",
    "#project-neighbor-links a",
    "#project-back-link",
    ".portfolio-page-switcher a"
  ].join(", ");

  let isNavigating = false;

  document.addEventListener("click", function (event) {
    const link = event.target.closest(TRANSITION_LINK_SELECTOR);

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

    const url = new URL(link.href, window.location.href);

    if (!shouldHandleNavigation(link, url)) {
      return;
    }

    event.preventDefault();
    navigateTo(url.toString(), true);
  });

  window.addEventListener("popstate", function () {
    navigateTo(window.location.href, false);
  });

  async function navigateTo(url, pushState) {
    if (isNavigating) {
      return;
    }

    const main = document.getElementById("main");

    if (!main) {
      window.location.href = url;
      return;
    }

    isNavigating = true;
    main.classList.add("is-page-transitioning-out");

    try {
      await wait(160);

      const response = await fetch(url, {
        headers: {
          "X-Requested-With": "fetch"
        }
      });

      if (!response.ok) {
        throw new Error("Navigation request failed");
      }

      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      updateDocumentState(doc, url, pushState);
      runPageInitializers();
      animateIn();
    } catch (error) {
      window.location.href = url;
    } finally {
      isNavigating = false;
    }
  }

  function shouldHandleNavigation(link, url) {
    if (
      document.body.dataset.listingCategory &&
      link.closest("#nav .links, #projects-pagination, .portfolio-page-switcher")
    ) {
      return false;
    }

    if (link.target && link.target !== "_self") {
      return false;
    }

    if (url.origin !== window.location.origin) {
      return false;
    }

    if (!url.pathname.endsWith(".html")) {
      return false;
    }

    return true;
  }

  function updateDocumentState(doc, url, pushState) {
    const nextHeader = doc.getElementById("header");
    const nextNav = doc.getElementById("nav");
    const nextMain = doc.getElementById("main");
    const currentHeader = document.getElementById("header");
    const currentNav = document.getElementById("nav");
    const currentMain = document.getElementById("main");
    const navPanelNav = document.querySelector("#navPanel nav");

    if (!nextHeader || !nextNav || !nextMain || !currentHeader || !currentNav || !currentMain) {
      throw new Error("Missing navigation targets");
    }

    document.title = doc.title;
    currentHeader.innerHTML = nextHeader.innerHTML;
    currentNav.innerHTML = nextNav.innerHTML;
    currentMain.innerHTML = nextMain.innerHTML;

    if (navPanelNav) {
      navPanelNav.innerHTML = nextNav.innerHTML;
      navPanelNav.querySelectorAll(".icons, .icon").forEach(function (element) {
        element.classList.add("alt");
      });
    }

    syncBodyAttributes(doc.body);
    document.body.classList.remove("is-navPanel-visible");

    if (pushState) {
      window.history.pushState({}, "", url);
    }
  }

  function syncBodyAttributes(nextBody) {
    const currentBody = document.body;
    const keepClasses = currentBody.className
      .split(/\s+/)
      .filter(function (className) {
        return className && className !== "is-preload" && className !== "is-navPanel-visible";
      });
    const nextClasses = nextBody.className
      .split(/\s+/)
      .filter(function (className) {
        return className && className !== "is-preload" && className !== "is-navPanel-visible";
      });

    currentBody.className = nextClasses.length ? nextClasses.join(" ") : keepClasses.join(" ");

    Array.from(currentBody.attributes).forEach(function (attribute) {
      if (attribute.name.indexOf("data-") === 0) {
        currentBody.removeAttribute(attribute.name);
      }
    });

    Array.from(nextBody.attributes).forEach(function (attribute) {
      if (attribute.name.indexOf("data-") === 0) {
        currentBody.setAttribute(attribute.name, attribute.value);
      }
    });
  }

  function runPageInitializers() {
    if (typeof window.initProjectsPage === "function") {
      window.initProjectsPage();
    }

    if (typeof window.initProjectDetail === "function") {
      window.initProjectDetail();
    }

    if (window.jQuery && typeof window.jQuery.fn.scrolly === "function") {
      window.jQuery(".scrolly").scrolly();
    }
  }

  function animateIn() {
    const main = document.getElementById("main");

    if (!main) {
      return;
    }

    main.classList.remove("is-page-transitioning-out");
    main.classList.add("is-page-transitioning-in");

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        main.classList.remove("is-page-transitioning-in");
      });
    });
  }

  function wait(duration) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, duration);
    });
  }
})();
