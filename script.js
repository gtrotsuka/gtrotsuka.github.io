const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobileLayout = () => window.matchMedia("(max-width: 759px)").matches;

const experiences = [
  {
    tone: "systems",
    category: "Systems",
    role: "Software Engineering Intern",
    organization: "Safran Passenger Innovations",
    date: "Recent experience",
    summary:
      "Worked on media and configuration systems in a production environment where UI behavior, integration details, and maintainability all mattered.",
    bullets: [
      "Built and updated features in C++, Qt, and QML for user-facing application flows.",
      "Worked across service communication, configuration behavior, testing, and Linux-based tooling.",
      "Spent time in the kinds of debugging and integration work that make complex systems easier to operate."
    ],
    tags: ["C++", "Qt", "QML", "Linux", "MQTT", "Testing"]
  },
  {
    tone: "teaching",
    category: "Teaching",
    role: "Head TA / Course Redesign",
    organization: "Georgia Tech CS 1100",
    date: "Current leadership",
    summary:
      "Helped shape the systems around a large first-year CS course: the people, processes, resources, and support structures that keep students moving.",
    bullets: [
      "Led TA coordination, onboarding, and day-to-day teaching support.",
      "Helped improve course resources and delivery for newer students finding their footing.",
      "Focused on support systems that make large courses feel more navigable and humane."
    ],
    tags: ["Teaching", "Leadership", "Onboarding", "Curriculum", "Student Support"]
  },
  {
    tone: "robotics",
    category: "Robotics",
    role: "Robotics / Autonomous Systems Projects",
    organization: "Georgia Tech teams and technical work",
    date: "Multi-project experience",
    summary:
      "A lot of my technical work lives in robotics-adjacent problems: sensing, control, simulation, autonomy, and the software glue that makes those pieces usable.",
    bullets: [
      "Worked with LiDAR, IMU, GPS, path planning, control systems, and autonomy exercises.",
      "Contributed across marine robotics, rover software, simulation work, and algorithm-focused projects.",
      "Built intuition for how software changes when it has to answer to real hardware and real operators."
    ],
    tags: ["Python", "ROS", "LiDAR", "IMU", "GPS", "SLAM", "Control Systems"]
  }
];

const projectCategories = [
  {
    id: "robotics",
    label: "Robotics",
    tone: "robotics",
    description: "Perception, autonomy, simulation, and control-heavy work.",
    position: { x: 255, y: 250 },
    stars: [
      [180, 210],
      [220, 170],
      [285, 185],
      [320, 238],
      [285, 300],
      [210, 300]
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [1, 4]
    ]
  },
  {
    id: "systems",
    label: "Systems",
    tone: "systems",
    description: "Qt, C++, embedded-adjacent software, and control layers.",
    position: { x: 760, y: 210 },
    stars: [
      [695, 175],
      [740, 145],
      [805, 158],
      [845, 215],
      [786, 272],
      [720, 252]
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [0, 2]
    ]
  },
  {
    id: "web",
    label: "Web Development",
    tone: "web",
    description: "Collaborative interfaces and multiplayer application flows.",
    position: { x: 925, y: 470 },
    stars: [
      [858, 444],
      [902, 402],
      [968, 420],
      [1008, 476],
      [955, 532],
      [888, 520]
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [2, 5]
    ]
  },
  {
    id: "teaching",
    label: "Teaching",
    tone: "teaching",
    description: "Course systems, student support, and operating large classes.",
    position: { x: 390, y: 540 },
    stars: [
      [330, 505],
      [372, 472],
      [440, 486],
      [468, 540],
      [422, 596],
      [352, 590]
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [1, 4]
    ]
  },
  {
    id: "creative",
    label: "Creative",
    tone: "creative",
    description: "Vision, simulation, and exploratory technical projects.",
    position: { x: 665, y: 610 },
    stars: [
      [604, 572],
      [648, 538],
      [716, 548],
      [754, 606],
      [706, 660],
      [636, 654]
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [0, 3]
    ]
  }
];

const projects = [
  {
    title: "Marine Robotics Data Processing",
    category: "Robotics",
    tone: "robotics",
    description:
      "Worked on perception and data-processing tools for an autonomous marine robotics platform, helping turn raw sensor streams into information useful for navigation tasks like buoy traversal.",
    role: "Software / autonomy contributor",
    status: "Team",
    missionType: "Perception / navigation",
    stack: "Python, LiDAR, IMU, GPS",
    featured: true,
    visualType: "orbit",
    tags: ["Python", "LiDAR", "IMU", "GPS", "Autonomy"],
    details: [
      "Contributed to the software side of a larger robotics stack connected to onboard compute and communications hardware.",
      "Worked with sensor-driven data pipelines relevant to navigation and environmental interpretation."
    ],
    links: [{ label: "Legacy notes", href: "marine.html" }]
  },
  {
    title: "Mars Rover Software Development",
    category: "Robotics",
    tone: "robotics",
    description:
      "Contributed to rover software efforts in Georgia Tech RoboJackets, working in a competition-oriented environment where software had to align with mechanical systems and real integration timelines.",
    role: "Software team member",
    status: "Team",
    missionType: "Rover systems",
    stack: "C++, ROS2, CMake",
    featured: true,
    visualType: "schematic",
    tags: ["C++", "ROS2", "CMake", "Rover Systems"],
    details: [
      "Worked within a multidisciplinary team preparing software for competition-driven rover tasks.",
      "Built familiarity with ROS2, CMake, and cross-team integration work."
    ],
    links: [{ label: "Legacy notes", href: "robonav.html" }]
  },
  {
    title: "Safran Media Systems Work",
    category: "Systems",
    tone: "systems",
    description:
      "Built public-safe pieces of media and configuration software in Qt/QML and C++, with an emphasis on behavior that feels predictable when someone is actually trying to use the system.",
    role: "Software Engineering Intern",
    status: "Professional",
    missionType: "Media + configuration",
    stack: "C++, Qt, QML, Linux",
    featured: true,
    visualType: "terminal",
    tags: ["Qt", "QML", "C++", "Linux", "Testing"],
    details: [
      "Worked on application behavior, configuration workflows, service communication, and debugging.",
      "Focused on software that had to be both maintainable and comfortable to operate."
    ]
  },
  {
    title: "CS 1100 Student Support Systems",
    category: "Teaching",
    tone: "teaching",
    description:
      "Built and improved the student-facing support structure around CS 1100, including TA coordination patterns, onboarding resources, and the systems students actually rely on when they need help.",
    role: "Head TA / support systems lead",
    status: "Ongoing",
    missionType: "Course operations",
    stack: "Teaching, leadership, support design",
    featured: true,
    visualType: "radar",
    tags: ["Teaching", "Leadership", "Onboarding", "Student Support"],
    details: [
      "Focused on making a large introductory course feel more navigable for new students.",
      "Worked on the operational side of teaching so support stayed consistent instead of improvised."
    ]
  },
  {
    title: "Warehouse Simulation",
    category: "Robotics",
    tone: "robotics",
    description:
      "Implemented frontier-based exploration, marker collection, RRT path planning, and a calibrated PID controller in a warehouse robotics simulation.",
    role: "Algorithm implementation and control logic",
    status: "Academic",
    missionType: "Exploration + planning",
    stack: "Python, RRT, PID",
    visualType: "radar",
    tags: ["Python", "RRT", "PID", "Path Planning", "Simulation"],
    details: [
      "Built exploration logic to move through unknown space and discover targets.",
      "Added collection behavior with orientation constraints and obstacle-aware planning."
    ],
    links: [{ label: "Legacy notes", href: "warehouse_sim.html" }]
  },
  {
    title: "Ramen Go",
    category: "Web",
    tone: "web",
    description:
      "Built a multiplayer card-game web app with lobby flows, interface logic, and real-time session handling across frontend and backend collaboration.",
    role: "Frontend and game systems contributor",
    status: "Team",
    missionType: "Multiplayer web app",
    stack: "React, JavaScript, MongoDB",
    visualType: "schematic",
    tags: ["React", "JavaScript", "MongoDB", "Sockets", "UI"],
    details: [
      "Worked on game flow, lobby interactions, and multiplayer session behavior.",
      "Helped build the logic needed for multiple active rooms and distinct game IDs."
    ],
    links: [{ label: "Legacy notes", href: "sushi.html" }]
  },
  {
    title: "Solar Racing Motor Controller Work",
    category: "Systems",
    tone: "systems",
    description:
      "Supported software tied to a motor-controller board for a solar racing system, working at the boundary between software behavior and hardware response.",
    role: "Software contributor",
    status: "Team",
    missionType: "Embedded control",
    stack: "C++, control systems, PCB interfaces",
    visualType: "terminal",
    tags: ["Embedded Systems", "Control Systems", "C++", "PCB Interfaces"],
    details: [
      "Contributed to controller-side software tied to vehicle inputs and outputs.",
      "Worked in a system that had to make sense alongside electrical and vehicle constraints."
    ],
    links: [{ label: "Legacy notes", href: "solar.html" }]
  },
  {
    title: "GT Hyperloop Ground Control",
    category: "Systems",
    tone: "systems",
    description:
      "Worked on communication-oriented tasks related to battery-management and ground-control workflows, including microcontroller-side exploration.",
    role: "Software and communication contributor",
    status: "Prototype",
    missionType: "Ground control",
    stack: "Signals, microcontrollers, systems",
    visualType: "radar",
    tags: ["Signals", "Microcontrollers", "Ground Control", "Systems"],
    details: [
      "Explored communication between control systems and vehicle-side hardware.",
      "Built experience in software that had to work inside a broader electronics stack."
    ],
    links: [{ label: "Legacy notes", href: "hyperloop.html" }]
  },
  {
    title: "Yellow Jacket Space Program Controller",
    category: "Systems",
    tone: "systems",
    description:
      "Worked on bang-bang control logic for propellant tank pressure management, tied to launch preparation and operator visibility.",
    role: "Control software contributor",
    status: "Team",
    missionType: "Pressure control",
    stack: "C++, Rust, control systems",
    visualType: "orbit",
    tags: ["C++", "Rust", "Control Systems", "GUI", "Aerospace"],
    details: [
      "Focused on valve-control logic for maintaining target tank pressure.",
      "Worked in a context where clear operator control mattered as much as core logic."
    ],
    links: [{ label: "Legacy notes", href: "yjsp.html" }]
  },
  {
    title: "MCTS Flight Simulation Research",
    category: "Creative",
    tone: "creative",
    description:
      "Compared Monte Carlo Tree Search against pure-pursuit approaches in simulated aircraft scenarios built around 6DOF and JSBSim workflows.",
    role: "Research-style implementation",
    status: "Academic",
    missionType: "Simulation + search",
    stack: "Python, MCTS, JSBSim",
    visualType: "orbit",
    tags: ["Python", "MCTS", "Simulation", "Autonomy", "JSBSim"],
    details: [
      "Used simulation to compare decision-making strategies under motion constraints.",
      "Explored how search-based planning behaves against more direct control heuristics."
    ],
    links: [{ label: "Legacy notes", href: "mcts.html" }]
  },
  {
    title: "Image Recognition Pipeline",
    category: "Creative",
    tone: "creative",
    description:
      "Built a robot-focused image classification workflow using Canny edge detection and RANSAC-based feature extraction on grayscale imagery.",
    role: "Algorithm implementation",
    status: "Academic",
    missionType: "Vision pipeline",
    stack: "Python, RANSAC, image processing",
    visualType: "schematic",
    tags: ["Python", "Computer Vision", "RANSAC", "Image Processing"],
    details: [
      "Implemented classical feature extraction to distinguish among known visual targets.",
      "Used the project to build intuition for computer-vision pipelines without relying on heavy frameworks."
    ],
    links: [{ label: "Legacy notes", href: "image_rec.html" }]
  }
];

const researchTopics = [
  {
    title: "Robotics autonomy",
    short: "Systems that sense the world, choose actions, and still stay understandable to the people running them.",
    detail: "I keep coming back to autonomy problems where software decisions need to be inspectable instead of mysterious.",
    tags: ["Planning", "Control", "Autonomy"]
  },
  {
    title: "Sensor fusion",
    short: "Turning noisy sensor streams into useful state estimates.",
    detail: "Combining LiDAR, IMU, and GPS signals into something usable for navigation and autonomy workflows is still one of the most interesting software problems to me.",
    tags: ["LiDAR", "IMU", "GPS"]
  },
  {
    title: "LiDAR / IMU / GPS processing",
    short: "Making perception pipelines useful beyond the raw data stage.",
    detail: "I care about where these pipelines meet the rest of the software stack and how their outputs get surfaced to operators.",
    tags: ["Perception", "Navigation", "Data Processing"]
  },
  {
    title: "Human-centered educational tools",
    short: "Software and support systems that help new people learn without feeling lost.",
    detail: "The interesting part is not only the content. It is also the structure around the content: onboarding, clarity, and the moments where people usually get stuck.",
    tags: ["Teaching", "Support Systems", "Onboarding"]
  },
  {
    title: "Interactive media systems",
    short: "Applications that stay calm and obvious on the surface even when the internals are busy.",
    detail: "Media software gets more interesting when it has to balance reliable behavior with interface clarity in real usage.",
    tags: ["Media Systems", "UI", "Interaction"]
  },
  {
    title: "C++ / Qt application architecture",
    short: "Patterns that make complex applications easier to extend and easier to read.",
    detail: "I enjoy the architecture questions behind desktop and embedded-adjacent applications, especially separation of concerns and maintainable UI logic.",
    tags: ["C++", "Qt", "QML"]
  }
];

const projectFilters = ["All", "Robotics", "Systems", "Teaching", "Web", "Creative"];

let activeProjectFilter = "All";
let experienceIndex = 0;
let researchIndex = 0;
let revealObserver;
let constellationTransitionFrame = 0;
let researchLayoutFrame = 0;

const constellationState = {
  selectedCategory: null,
  focusedId: null,
  detailTitle: null,
  tx: 0,
  ty: 0,
  scale: 1
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function visualMarkup(type) {
  return `<div class="visual-${escapeHtml(type)}"></div>`;
}

function tagMarkup(tags) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function linkMarkup(links = []) {
  if (!links.length) {
    return "";
  }

  return `
    <div class="detail-links">
      ${links.map((link) => `<a class="text-link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("")}
    </div>
  `;
}

function projectByTitle(title) {
  return projects.find((project) => project.title === title);
}

function categoryById(categoryId) {
  return projectCategories.find((category) => category.id === categoryId);
}

function toneForCategory(categoryLabel) {
  return {
    Robotics: "robotics",
    Systems: "systems",
    Teaching: "teaching",
    Web: "web",
    Creative: "creative"
  }[categoryLabel] || "systems";
}

function renderExperience() {
  const rail = document.querySelector("#experience-rail");
  if (!rail) {
    return;
  }

  rail.innerHTML = experiences
    .map(
      (entry, index) => `
        <article
          class="orbit-item"
          data-tone="${escapeHtml(entry.tone)}"
          data-index="${index}"
          data-active="${String(index === experienceIndex)}"
          tabindex="0"
        >
          <span class="orbit-item__pill">${escapeHtml(entry.category)}</span>
          <strong class="orbit-item__title">${escapeHtml(entry.role)}</strong>
          <p class="orbit-item__meta">${escapeHtml(entry.organization)} | ${escapeHtml(entry.date)}</p>
          <p class="orbit-item__summary">${escapeHtml(entry.summary)}</p>
          <div class="orbit-item__detail">
            <ul>
              ${entry.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
            </ul>
            <div class="orbit-tags">${tagMarkup(entry.tags)}</div>
          </div>
        </article>
      `
    )
    .join("");
}

function applyOrbitLayout() {
  const rail = document.querySelector("#experience-rail");
  const sun = document.querySelector("#orbit-sun");
  const items = [...document.querySelectorAll(".orbit-item")];

  if (!rail || !items.length) {
    return;
  }

  if (reducedMotion || isMobileLayout()) {
    items.forEach((item, index) => {
      item.style.transform = "";
      item.style.opacity = String(index === experienceIndex ? 1 : 0);
      item.style.zIndex = String(index === experienceIndex ? 2 : 1);
      item.setAttribute("data-active", String(index === experienceIndex));
      item.hidden = index !== experienceIndex;
    });
    if (sun) {
      sun.style.transform = "translate(-50%, -50%)";
    }
    return;
  }

  const centerX = rail.clientWidth / 2;
  const radiusX = Math.min(rail.clientWidth * 0.34, 330);
  const sideY = rail.clientHeight * 0.24;
  const activeY = rail.clientHeight * 0.48;
  const slots = [
    { x: centerX, y: activeY, scale: 1, opacity: 1, zIndex: 8 },
    { x: centerX + radiusX, y: sideY, scale: 0.75, opacity: 0.78, zIndex: 5 },
    { x: centerX - radiusX, y: sideY, scale: 0.75, opacity: 0.78, zIndex: 5 }
  ];

  items.forEach((item, index) => {
    const relative = ((index - experienceIndex) % items.length + items.length) % items.length;
    item.setAttribute("data-active", String(relative === 0));
    item.hidden = false;
  });

  items.forEach((item, index) => {
    const relative = ((index - experienceIndex) % items.length + items.length) % items.length;
    const slot = slots[relative] || slots[0];
    const translateX = slot.x - item.offsetWidth / 2;
    const translateY = slot.y - item.offsetHeight / 2;

    item.style.transform = `translate(${translateX}px, ${translateY}px) scale(${slot.scale})`;
    item.style.opacity = String(slot.opacity);
    item.style.zIndex = String(slot.zIndex);
  });

  if (sun) {
    sun.style.transform = `translate(-50%, -50%) rotate(${experienceIndex * 16}deg) scale(${1 + experienceIndex * 0.015})`;
  }
}

function setActiveExperience(nextIndex) {
  experienceIndex = (nextIndex + experiences.length) % experiences.length;
  applyOrbitLayout();
}

function setupExperienceOrbit() {
  const prev = document.querySelector("#experience-prev");
  const next = document.querySelector("#experience-next");
  const rail = document.querySelector("#experience-rail");

  if (!prev || !next || !rail) {
    return;
  }

  prev.addEventListener("click", () => setActiveExperience(experienceIndex - 1));
  next.addEventListener("click", () => setActiveExperience(experienceIndex + 1));

  rail.addEventListener("click", (event) => {
    const item = event.target.closest(".orbit-item");
    if (!item) {
      return;
    }
    setActiveExperience(Number(item.getAttribute("data-index")));
  });

  rail.addEventListener("keydown", (event) => {
    const item = event.target.closest(".orbit-item");
    if (!item) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveExperience(Number(item.getAttribute("data-index")));
    }
  });
}

function renderFeaturedProjects() {
  const root = document.querySelector("#featured-stack");
  if (!root) {
    return;
  }

  const featured = projects.filter((project) => project.featured);
  root.innerHTML = featured
    .map(
      (project) => `
        <article class="featured-card reveal" data-tone="${escapeHtml(project.tone)}">
          <div class="featured-card__inner">
            <div class="featured-card__content">
              <div class="featured-card__top">
                <div>
                  <p class="mission-id">${escapeHtml(project.category)}</p>
                  <h3>${escapeHtml(project.title)}</h3>
                </div>
                <span class="status-pill">${escapeHtml(project.status)}</span>
              </div>
              <p>${escapeHtml(project.description)}</p>
              <div class="featured-card__metadata">
                <div class="meta-block">
                  <span>Mission Type</span>
                  <strong>${escapeHtml(project.missionType)}</strong>
                </div>
                <div class="meta-block">
                  <span>Role</span>
                  <strong>${escapeHtml(project.role)}</strong>
                </div>
                <div class="meta-block">
                  <span>Stack</span>
                  <strong>${escapeHtml(project.stack)}</strong>
                </div>
                <div class="meta-block">
                  <span>Status</span>
                  <strong>${escapeHtml(project.status)}</strong>
                </div>
              </div>
              <div class="detail-tags">${tagMarkup(project.tags)}</div>
              ${linkMarkup(project.links)}
            </div>
            <div class="featured-card__visual" aria-hidden="true">
              ${visualMarkup(project.visualType)}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function projectNodesForCategory(categoryId) {
  const category = categoryById(categoryId);
  if (!category) {
    return [];
  }

  const categoryProjects = projects.filter((project) => project.category === category.label);
  const count = Math.max(categoryProjects.length, 1);
  return categoryProjects.map((project, index) => {
    const angle = (-Math.PI / 2) + index * ((Math.PI * 2) / count);
    const radius = count <= 3 ? 180 : 205 + (index % 2) * 28;
    return {
      type: "project",
      tone: project.tone,
      title: project.title,
      missionType: project.missionType,
      x: category.position.x + Math.cos(angle) * radius,
      y: category.position.y + Math.sin(angle) * radius
    };
  });
}

function getVisibleConstellationNodes() {
  if (!constellationState.selectedCategory) {
    return projectCategories.map((category) => ({
      type: "category",
      id: category.id,
      label: category.label,
      tone: category.tone,
      description: category.description,
      x: category.position.x,
      y: category.position.y,
      stars: category.stars,
      connections: category.connections
    }));
  }

  const category = categoryById(constellationState.selectedCategory);
  const projectsInCategory = projectNodesForCategory(constellationState.selectedCategory);
  return [
    {
      type: "anchor",
      id: category.id,
      label: category.label,
      tone: category.tone,
      description: category.description,
      x: category.position.x,
      y: category.position.y,
      stars: category.stars,
      connections: category.connections
    },
    ...projectsInCategory
  ];
}

function clampConstellationPan() {
  const board = document.querySelector("#constellation-board");
  if (!board) {
    return { corrected: false };
  }

  const scaledWidth = board.clientWidth * constellationState.scale;
  const scaledHeight = board.clientHeight * constellationState.scale;
  const minTx = Math.min(0, board.clientWidth - scaledWidth) - board.clientWidth * 0.08;
  const maxTx = board.clientWidth * 0.08;
  const minTy = Math.min(0, board.clientHeight - scaledHeight) - board.clientHeight * 0.08;
  const maxTy = board.clientHeight * 0.08;

  const previousTx = constellationState.tx;
  const previousTy = constellationState.ty;
  constellationState.tx = Math.min(maxTx, Math.max(minTx, constellationState.tx));
  constellationState.ty = Math.min(maxTy, Math.max(minTy, constellationState.ty));
  return {
    corrected: previousTx !== constellationState.tx || previousTy !== constellationState.ty
  };
}

function runConstellationTransition() {
  const board = document.querySelector("#constellation-board");
  const detail = document.querySelector("#constellation-detail");
  if (!board || reducedMotion) {
    return;
  }

  board.classList.add("is-transitioning");
  if (detail) {
    detail.classList.add("is-transitioning");
  }
  window.clearTimeout(constellationTransitionFrame);
  constellationTransitionFrame = window.setTimeout(() => {
    board.classList.remove("is-transitioning");
    if (detail) {
      detail.classList.remove("is-transitioning");
    }
  }, 720);
}

function setSelectedCategory(categoryId) {
  constellationState.selectedCategory = categoryId;
  constellationState.focusedId = categoryId;
  constellationState.detailTitle = null;

  if (categoryId) {
    const category = categoryById(categoryId);
    const categoryProjects = projectNodesForCategory(categoryId);
    constellationState.detailTitle = categoryProjects[0]?.title || null;
    constellationState.focusedId = constellationState.detailTitle || categoryId;
    if (category) {
      centerConstellationOnNode(category.position.x, category.position.y, reducedMotion ? 1.04 : 1.08);
    }
  } else {
    constellationState.focusedId = null;
    centerConstellationOnNode(600, 360, 1);
  }

  renderConstellation();
  renderConstellationDetail();
  runConstellationTransition();
}

function renderConstellation() {
  const svg = document.querySelector("#constellation-svg");
  const overlay = document.querySelector("#constellation-overlay");
  const breadcrumb = document.querySelector("#constellation-breadcrumb");
  const backButton = document.querySelector("#constellation-back");
  const board = document.querySelector("#constellation-board");

  if (!svg || !overlay || !breadcrumb || !backButton || !board) {
    return;
  }

  const nodes = getVisibleConstellationNodes();
  const scaleX = board.clientWidth / 1200;
  const scaleY = board.clientHeight / 720;

  const starGroups = [];
  const lines = [];
  const overlayNodes = [];

  nodes.forEach((node) => {
    if (node.stars && node.connections) {
      node.connections.forEach(([from, to]) => {
        const start = node.stars[from];
        const end = node.stars[to];
        const focused = constellationState.focusedId === node.id;
        lines.push(`<line class="constellation-link${focused ? " is-focused" : ""}" x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}" />`);
      });
      node.stars.forEach((star, index) => {
        const focused = constellationState.focusedId === node.id;
        const className = index === 0 ? `constellation-star constellation-star--anchor${focused ? " constellation-star--focus" : ""}` : "constellation-star";
        starGroups.push(`<circle class="${className}" cx="${star[0]}" cy="${star[1]}" r="${index === 0 ? 5 : 2.3}" />`);
      });
    } else {
      const focused = constellationState.focusedId === node.title;
      starGroups.push(`<circle class="constellation-star constellation-star--anchor${focused ? " constellation-star--focus" : ""}" cx="${node.x}" cy="${node.y}" r="${focused ? 5 : 4}" />`);
    }
  });

  svg.innerHTML = `
    <g
      class="constellation-pan"
      style="transform: translate(${constellationState.tx}px, ${constellationState.ty}px) scale(${constellationState.scale}); transform-origin: 0 0;"
    >
      ${lines.join("")}
      ${starGroups.join("")}
    </g>
  `;

  overlayNodes.push('<div class="constellation-node-layer">');
  nodes.forEach((node) => {
    const x = node.x * scaleX * constellationState.scale + constellationState.tx;
    const y = node.y * scaleY * constellationState.scale + constellationState.ty;
    const key = node.type === "project" ? node.title : node.id;
    const focused = constellationState.focusedId === key;
    if (node.type === "anchor") {
      return;
    }
    overlayNodes.push(`
      <button
        class="constellation-node${focused ? " is-focused" : ""}"
        type="button"
        data-kind="${node.type}"
        data-id="${node.id || ""}"
        data-title="${escapeHtml(node.title || "")}"
        data-tone="${escapeHtml(node.tone)}"
        style="left:${x}px; top:${y}px; transform:translate(-50%, -50%);"
        aria-label="${node.type === "project" ? `Open details for ${escapeHtml(node.title)}` : `Open ${escapeHtml(node.label)} projects`}"
      >
        <strong>${escapeHtml(node.type === "project" ? node.title : node.label)}</strong>
        <p class="constellation-preview">${escapeHtml(node.type === "project" ? node.missionType : node.description)}</p>
      </button>
    `);
  });
  overlayNodes.push("</div>");
  overlay.innerHTML = overlayNodes.join("");

  breadcrumb.textContent = !constellationState.selectedCategory
    ? "Projects / Categories"
    : `Projects / ${categoryById(constellationState.selectedCategory)?.label || ""}`;
  backButton.hidden = !constellationState.selectedCategory;
}

function renderConstellationDetail() {
  const detail = document.querySelector("#constellation-detail");
  const body = document.querySelector("#constellation-detail-body");

  if (!detail || !body) {
    return;
  }

  if (!constellationState.detailTitle) {
    detail.hidden = true;
    body.innerHTML = "";
    return;
  }

  const project = projectByTitle(constellationState.detailTitle);
  if (!project) {
    detail.hidden = true;
    body.innerHTML = "";
    return;
  }

  body.innerHTML = `
    <div class="detail-body is-visible">
      <div class="detail-visual" aria-hidden="true">${visualMarkup(project.visualType)}</div>
      <div class="detail-copy">
        <p class="mission-id">${escapeHtml(project.category)}</p>
        <strong class="detail-title">${escapeHtml(project.title)}</strong>
        <div class="detail-metadata">
          <span>${escapeHtml(project.status)}</span>
          <span>${escapeHtml(project.missionType)}</span>
        </div>
        <p>${escapeHtml(project.description)}</p>
        <p><strong>Role:</strong> ${escapeHtml(project.role)}</p>
        <p><strong>Stack:</strong> ${escapeHtml(project.stack)}</p>
        <div class="detail-tags">${tagMarkup(project.tags)}</div>
        <ul>
          ${project.details.map((detailItem) => `<li>${escapeHtml(detailItem)}</li>`).join("")}
        </ul>
        ${linkMarkup(project.links)}
      </div>
    </div>
  `;

  detail.hidden = false;
}

function scrollConstellationDetailIntoView() {
  const detail = document.querySelector("#constellation-detail");
  if (!detail || detail.hidden) {
    return;
  }

  window.requestAnimationFrame(() => {
    detail.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });
}

function scrollConstellationBoardIntoView() {
  const board = document.querySelector("#constellation-board");
  if (!board) {
    return;
  }

  window.requestAnimationFrame(() => {
    board.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });
}

function scrollProjectsGridIntoView() {
  const panel = document.querySelector("#projects-grid-panel");
  if (!panel || panel.hidden) {
    return;
  }

  window.requestAnimationFrame(() => {
    panel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });
}

function centerConstellationOnNode(nodeX, nodeY, scale = constellationState.scale) {
  const board = document.querySelector("#constellation-board");
  if (!board) {
    constellationState.scale = scale;
    return;
  }

  constellationState.scale = scale;
  const centerX = board.clientWidth / 2;
  const centerY = board.clientHeight / 2;
  const scaleX = board.clientWidth / 1200;
  const scaleY = board.clientHeight / 720;
  constellationState.tx = centerX - nodeX * scaleX * scale;
  constellationState.ty = centerY - nodeY * scaleY * scale;
  clampConstellationPan();
}

function setupConstellation() {
  const board = document.querySelector("#constellation-board");
  const overlay = document.querySelector("#constellation-overlay");
  const backButton = document.querySelector("#constellation-back");
  const detailClose = document.querySelector("#detail-close");

  if (!board || !overlay || !backButton || !detailClose) {
    return;
  }

  let dragging = false;
  let dragMoved = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let startTx = 0;
  let startTy = 0;

  overlay.addEventListener("click", (event) => {
    const node = event.target.closest(".constellation-node");
    if (!node || dragging || dragMoved) {
      return;
    }

    const kind = node.getAttribute("data-kind");
    if (kind === "category") {
      setSelectedCategory(node.getAttribute("data-id"));
      return;
    }

    constellationState.detailTitle = node.getAttribute("data-title");
    constellationState.focusedId = constellationState.detailTitle;
    renderConstellationDetail();
    renderConstellation();
    runConstellationTransition();
    scrollConstellationDetailIntoView();
  });

  backButton.addEventListener("click", () => {
    setSelectedCategory(null);
  });

  detailClose.addEventListener("click", () => {
    constellationState.detailTitle = null;
    constellationState.focusedId = constellationState.selectedCategory || null;
    renderConstellationDetail();
    renderConstellation();
    scrollConstellationBoardIntoView();
  });

  board.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".constellation-node")) {
      return;
    }
    dragging = true;
    dragMoved = false;
    board.classList.add("is-dragging");
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    startTx = constellationState.tx;
    startTy = constellationState.ty;
    board.setPointerCapture(event.pointerId);
  });

  board.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }
    if (Math.abs(event.clientX - pointerStartX) > 4 || Math.abs(event.clientY - pointerStartY) > 4) {
      dragMoved = true;
    }
    constellationState.tx = startTx + (event.clientX - pointerStartX);
    constellationState.ty = startTy + (event.clientY - pointerStartY);
    clampConstellationPan();
    renderConstellation();
  });

  const finishDrag = () => {
    if (!dragging) {
      return;
    }
    dragging = false;
    board.classList.remove("is-dragging");
    clampConstellationPan();
    renderConstellation();
    window.setTimeout(() => {
      dragMoved = false;
    }, 120);
  };

  board.addEventListener("pointerup", finishDrag);
  board.addEventListener("pointercancel", finishDrag);
}

function renderProjectFilters() {
  const root = document.querySelector("#project-filters");
  if (!root) {
    return;
  }

  root.innerHTML = projectFilters
    .map(
      (filter) => `
        <button
          class="filter-button"
          type="button"
          data-filter="${escapeHtml(filter)}"
          aria-pressed="${String(filter === activeProjectFilter)}"
        >
          ${escapeHtml(filter)}
        </button>
      `
    )
    .join("");
}

function renderProjectsGrid() {
  const root = document.querySelector("#projects-grid");
  const empty = document.querySelector("#project-empty");

  if (!root || !empty) {
    return;
  }

  const visible = projects.filter((project) => activeProjectFilter === "All" || project.category === activeProjectFilter);
  root.innerHTML = visible
    .map(
      (project) => `
        <article class="grid-card reveal">
          <div class="grid-card__visual" aria-hidden="true">${visualMarkup(project.visualType)}</div>
          <div class="grid-card__top">
            <div>
              <p class="mission-id">${escapeHtml(project.category)}</p>
              <h4>${escapeHtml(project.title)}</h4>
            </div>
            <span class="status-pill">${escapeHtml(project.status)}</span>
          </div>
          <p>${escapeHtml(project.description)}</p>
          <p class="grid-card__meta"><strong>Role:</strong> ${escapeHtml(project.role)}</p>
          <div class="detail-tags">${tagMarkup(project.tags)}</div>
          ${linkMarkup(project.links)}
          <details class="mission-details">
            <summary>Open mission notes</summary>
            <ul>
              ${project.details.map((detailItem) => `<li>${escapeHtml(detailItem)}</li>`).join("")}
            </ul>
          </details>
        </article>
      `
    )
    .join("");

  empty.hidden = visible.length > 0;
  setupReveal();
}

function setupProjectsGrid() {
  const filterRoot = document.querySelector("#project-filters");
  const toggle = document.querySelector("#projects-grid-toggle");
  const panel = document.querySelector("#projects-grid-panel");

  if (!filterRoot || !toggle || !panel) {
    return;
  }

  toggle.addEventListener("click", () => {
    const opening = panel.hidden;
    panel.hidden = !panel.hidden;
    toggle.textContent = panel.hidden ? "View all projects" : "Hide full grid";
    if (opening) {
      scrollProjectsGridIntoView();
    }
  });

  filterRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) {
      return;
    }

    activeProjectFilter = button.getAttribute("data-filter") || "All";
    renderProjectFilters();
    renderProjectsGrid();
  });
}

function renderResearch() {
  const track = document.querySelector("#research-track");
  if (!track) {
    return;
  }

  track.innerHTML = `
    <div class="research-viewport" id="research-viewport">
      <div class="research-cards-track" id="research-track-row" role="list" aria-label="Research topics">
        <div class="research-spacer" id="research-spacer-start" aria-hidden="true"></div>
        ${researchTopics
          .map(
            (topic, index) => `
              <button
                class="research-card"
                type="button"
                data-index="${index}"
                data-active="${String(index === researchIndex)}"
                aria-pressed="${index === researchIndex ? "true" : "false"}"
                aria-label="Focus research topic ${index + 1}: ${escapeHtml(topic.title)}"
              >
                <p class="mission-id">Signal ${index + 1}</p>
                <h4>${escapeHtml(topic.title)}</h4>
                <p class="research-card__short">${escapeHtml(topic.short)}</p>
                <div class="research-card__detail">
                  <p>${escapeHtml(topic.detail)}</p>
                  <div class="research-tags">${tagMarkup(topic.tags)}</div>
                </div>
              </button>
            `
          )
          .join("")}
        <div class="research-spacer" id="research-spacer-end" aria-hidden="true"></div>
      </div>
    </div>
  `;
}

function setActiveResearch(index) {
  const cards = [...document.querySelectorAll(".research-card")];
  const viewport = document.querySelector("#research-viewport");
  const row = document.querySelector("#research-track-row");
  const line = document.querySelector("#rover-track-line");
  const rover = document.querySelector("#rover-progress");
  const spacerStart = document.querySelector("#research-spacer-start");
  const spacerEnd = document.querySelector("#research-spacer-end");

  if (!cards.length) {
    return;
  }

  const normalizedIndex = Number.isFinite(index) ? index : 0;
  researchIndex = Math.max(0, Math.min(normalizedIndex, cards.length - 1));

  cards.forEach((card, cardIndex) => {
    const active = cardIndex === researchIndex;
    card.setAttribute("data-active", String(active));
    card.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (viewport && row) {
    const viewportWidth = viewport.offsetWidth;
    const activeCard = cards[researchIndex];
    const cardWidth = activeCard.offsetWidth;

    if (viewportWidth <= 0 || cardWidth <= 0) {
      row.style.transform = "translate3d(0, 0, 0)";
      if (rover) {
        rover.style.transform = "translate3d(0, 0, 0)";
      }
      window.cancelAnimationFrame(researchLayoutFrame);
      researchLayoutFrame = window.requestAnimationFrame(() => setActiveResearch(researchIndex));
      return;
    }

    const sideSpace = Math.max(0, (viewportWidth / 2) - (cardWidth / 2));
    if (spacerStart && spacerEnd) {
      spacerStart.style.flexBasis = `${sideSpace}px`;
      spacerEnd.style.flexBasis = `${sideSpace}px`;
    }
    window.cancelAnimationFrame(researchLayoutFrame);
    researchLayoutFrame = 0;

    const viewportCenter = viewport.offsetWidth / 2;
    const activeCardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
    const translateX = viewportCenter - activeCardCenter;
    row.style.transform = `translate3d(${translateX}px, 0, 0)`;

    if (rover && line) {
      const progress = cards.length > 1
        ? researchIndex / (cards.length - 1)
        : 0;
      const availableTrackWidth = Math.max(0, line.clientWidth);
      const roverX = Number.isFinite(progress)
        ? progress * availableTrackWidth
        : 0;
      rover.style.transform = `translate3d(${roverX}px, 0, 0)`;
    }
  } else if (rover) {
    rover.style.transform = "translate3d(0, 0, 0)";
  }

  const prev = document.querySelector("#research-prev");
  const next = document.querySelector("#research-next");
  if (prev && next) {
    prev.disabled = researchIndex === 0;
    next.disabled = researchIndex === cards.length - 1;
  }
}

function setupResearchTrack() {
  const prev = document.querySelector("#research-prev");
  const next = document.querySelector("#research-next");
  const track = document.querySelector("#research-track");

  if (!prev || !next || !track) {
    return;
  }

  prev.addEventListener("click", () => goToResearch(researchIndex - 1));
  next.addEventListener("click", () => goToResearch(researchIndex + 1));

  track.addEventListener("click", (event) => {
    const control = event.target.closest(".research-card");
    if (!control) {
      return;
    }
    goToResearch(Number(control.getAttribute("data-index")));
  });

  track.addEventListener("keydown", (event) => {
    const control = event.target.closest(".research-card");
    if (!control) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToResearch(Number(control.getAttribute("data-index")));
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToResearch(researchIndex + 1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToResearch(researchIndex - 1);
    }
  });
}

function goToResearch(index) {
  setActiveResearch(index);
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const links = document.querySelectorAll(".nav-menu a");

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("is-open", !expanded);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });
}

function setupActiveSectionTracking() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) {
        return;
      }

      const activeId = visibleEntries[0].target.id;
      navLinks.forEach((link) => {
        const current = link.getAttribute("href") === `#${activeId}`;
        if (current) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-22% 0px -48% 0px",
      threshold: [0.12, 0.2, 0.35, 0.5, 0.65]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!items.length) {
    return;
  }

  if (reducedMotion) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );
  }

  items.forEach((item) => revealObserver.observe(item));
}

function setupResizeSync() {
  window.addEventListener("resize", () => {
    applyOrbitLayout();
    clampConstellationPan();
    renderConstellation();
    setActiveResearch(researchIndex);
  });

  window.addEventListener("load", () => {
    applyOrbitLayout();
    renderConstellation();
    setActiveResearch(researchIndex);
  });
}

renderExperience();
renderFeaturedProjects();
renderProjectFilters();
renderProjectsGrid();
renderResearch();
centerConstellationOnNode(600, 360, 1);
renderConstellation();
renderConstellationDetail();

setupExperienceOrbit();
setupConstellation();
setupProjectsGrid();
setupResearchTrack();
setupMobileNav();
setupActiveSectionTracking();
setupReveal();
setupResizeSync();

applyOrbitLayout();
setActiveResearch(researchIndex);
