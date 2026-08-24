// # PROJECT SETTINGS — Edit titles and short descriptions here; add or remove items inside each projects list.
const projectData = {
    games: {
        title: "Game projects",
        projects: [
            { title: "Eye Candy", note: "Visual Novel / 2026", image: "banner_eyecandy.png", url: "eye-candy.html" },
            { title: "OUT", note: "VR Experience / 2026", image: "banner_out.png", url: "out.html" },
            { title: "CROSSROADS", note: "Visual Novel / 2024", image: "banner_crossroads.png", url: "crossroads.html" },
        ],
    },
    illustration: {
        title: "Illustration projects",
        projects: [
            { title: "TBD", note: "Personal work / 2026" },
            { title: "TBD", note: "Personal work / 2025" },
            { title: "TBD", note: "Digital illustration / 2025" },
        ],
    },
    graphics: {
        title: "Graphic projects",
        projects: [
            { title: "Visual Identity", note: "Brand system / 2026" },
            { title: "Poster Series", note: "Print design / 2025" },
            { title: "Publication", note: "Editorial design / 2025" },
        ],
    },
}

// # PAGE ELEMENT SETTINGS — These connect the interaction code to IDs and classes in index.html.
const intro = document.querySelector("#intro")
const skipIntro = document.querySelector("#skipIntro")
const categoryButtons = [...document.querySelectorAll(".category-card")]
const cardSlot = document.querySelector("#cardSlot")
const projects = document.querySelector("#projects")
const projectsTitle = document.querySelector("#projectsTitle")
const projectTrack = document.querySelector("#projectTrack")
const selectionStatus = document.querySelector("#selectionStatus")

// # INTRO MEMORY SETTING — sessionStorage makes the animation play once per browser tab/session.
const introStorageKey = "portfolioIntroPlayed"
let introAlreadyPlayed = false

try {
    introAlreadyPlayed = sessionStorage.getItem(introStorageKey) === "true"
} catch (error) {
    // Continue without saved memory when browser storage is unavailable.
}

// # INTERACTION STATE — These values remember which category is selected and prevent double-click glitches.
let selectedCategory = null
let isAnimating = false

// # FINISH INTRO — Hides the sequence and remembers that it has played for this browsing session.
function finishIntro() {
    intro.classList.add("is-finished")
    document.body.classList.remove("intro-playing")

    try {
        sessionStorage.setItem(introStorageKey, "true")
    } catch (error) {
        // The page remains usable even if browser storage is unavailable.
    }
}

// # INTRO START SETTING — Returning from About skips immediately; a first visit plays for 2250ms.
if (introAlreadyPlayed) {
    finishIntro()
} else {
    skipIntro.addEventListener("click", finishIntro)
    window.setTimeout(finishIntro, 2250)
}

// # BUILD PROJECT CARD — Customize the generated HTML for every project card here.
function makeProjectCard(project, index) {
    const article = document.createElement("article")
    article.className = "project-card"

    // # PROJECT BANNER LINK — Add an image and page URL above to create a linked hover banner.
    if (project.image) {
        article.innerHTML = `
            <a class="project-button" href="${project.url}" aria-label="Open ${project.title} — ${project.note}">
                <span class="project-button-inner">
                    <img class="project-banner" src="${project.image}" alt="" draggable="false">
                    <span class="project-overlay" aria-hidden="true">
                        <span class="project-overlay-title">${project.title}</span>
                        <span class="project-overlay-note">${project.note}</span>
                    </span>
                </span>
            </a>
        `
        return article
    }

    // # PROJECT PLACEHOLDER — Projects without an image keep the original editable placeholder layout.
    article.innerHTML = `
        <div class="project-image">
            <span>IMAGE PLACEHOLDER ${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div class="project-meta">
            <div>
                <h4>${project.title}</h4>
                <p>${project.note}</p>
            </div>
            <span>${String(index + 1).padStart(2, "0")}</span>
        </div>
    `
    return article
}

// # SHOW PROJECTS — Updates the heading and horizontal list after a category is selected.
function renderProjects(category) {
    const data = projectData[category]
    projectsTitle.textContent = data.title
    projectTrack.replaceChildren(...data.projects.map(makeProjectCard))
    projects.hidden = false
    projects.classList.remove("is-visible")
    requestAnimationFrame(() => projects.classList.add("is-visible"))
}

// # FILL CARD SLOT — Controls the appearance and wording of the selected card inside the slot.
function renderSlot(category) {
    const data = projectData[category]
    const slotButton = document.createElement("button")
    slotButton.type = "button"
    slotButton.className = "slot-card"
    slotButton.dataset.category = category
    slotButton.setAttribute("aria-label", `Remove ${category} from the category slot`)
    slotButton.innerHTML = `
        <span class="slot-card-title">${category}</span>
        <small>Click to return</small>
    `
    slotButton.addEventListener("click", removeSelection)
    cardSlot.replaceChildren(slotButton)
}

// # CREATE MOVING COPY — Makes a temporary visual copy so the clicked card can animate smoothly.
function createFlyingCopy(element) {
    const rect = element.getBoundingClientRect()
    const clone = element.cloneNode(true)
    clone.classList.remove("is-selected")
    clone.classList.add("flying-card")
    clone.style.left = `${rect.left}px`
    clone.style.top = `${rect.top}px`
    clone.style.width = `${rect.width}px`
    clone.style.height = `${rect.height}px`
    clone.style.transform = "none"
    document.body.appendChild(clone)
    return { clone, rect }
}

// # SELECT CATEGORY — Moves a clicked card into the slot and reveals its matching projects.
async function selectCategory(event) {
    if (isAnimating) return

    const button = event.currentTarget
    const category = button.dataset.category
    if (category === selectedCategory) return

    isAnimating = true
    const previousButton = categoryButtons.find(item => item.dataset.category === selectedCategory)
    const { clone, rect } = createFlyingCopy(button)
    const slotRect = cardSlot.getBoundingClientRect()
    const targetScale = Math.min(slotRect.width / rect.width, slotRect.height / rect.height) * 0.88
    const x = slotRect.left + slotRect.width / 2 - (rect.left + rect.width / 2)
    const y = slotRect.top + slotRect.height / 2 - (rect.top + rect.height / 2)

    button.classList.add("is-selected")
    button.setAttribute("aria-pressed", "true")
    previousButton?.classList.remove("is-selected")
    previousButton?.setAttribute("aria-pressed", "false")

    const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (motionAllowed) {
        await clone.animate(
            [
                { transform: "translate(0, 0) scale(1) rotate(0deg)", offset: 0 },
                { transform: `translate(${x * 0.45}px, ${y * 0.25}px) scale(0.92) rotate(7deg)`, offset: 0.42 },
                { transform: `translate(${x}px, ${y}px) scale(${targetScale}) rotate(-2deg)`, offset: 1 },
            ],
            { duration: 720, easing: "cubic-bezier(.2,.78,.18,1)", fill: "forwards" }
        ).finished
    }

    selectedCategory = category
    renderSlot(category)
    renderProjects(category)
    selectionStatus.textContent = `${category} selected. ${projectData[category].projects.length} projects revealed.`

    // # AUTO-SCROLL TO PROJECTS — After the list appears, move it below the fixed header on desktop and mobile.
    requestAnimationFrame(() => {
        projects.scrollIntoView({
            behavior: motionAllowed ? "smooth" : "auto",
            block: "start",
        })
    })

    clone.remove()
    isAnimating = false
}

// # REMOVE CATEGORY — Returns the selected card to its original position and hides the projects.
async function removeSelection() {
    if (!selectedCategory || isAnimating) return

    isAnimating = true
    const category = selectedCategory
    const source = cardSlot.querySelector(".slot-card")
    const destination = categoryButtons.find(item => item.dataset.category === category)
    const { clone, rect } = createFlyingCopy(source)
    const destinationRect = destination.getBoundingClientRect()
    const x = destinationRect.left + destinationRect.width / 2 - (rect.left + rect.width / 2)
    const y = destinationRect.top + destinationRect.height / 2 - (rect.top + rect.height / 2)
    const scale = Math.min(destinationRect.width / rect.width, destinationRect.height / rect.height)

    source.style.opacity = "0"
    const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (motionAllowed) {
        await clone.animate(
            [
                { transform: "translate(0, 0) scale(1) rotate(0deg)" },
                { transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(3deg)` },
            ],
            { duration: 560, easing: "cubic-bezier(.3,.1,.2,1)", fill: "forwards" }
        ).finished
    }

    destination.classList.remove("is-selected")
    destination.setAttribute("aria-pressed", "false")
    cardSlot.innerHTML = `
        <div class="slot-empty" id="slotEmpty">
            <p>SELECTED CARD<br>LANDS HERE</p>
        </div>
    `
    projects.hidden = true
    projects.classList.remove("is-visible")
    selectedCategory = null
    selectionStatus.textContent = `${category} returned. Choose another category.`
    clone.remove()
    isAnimating = false
    destination.focus({ preventScroll: true })
}

// # CLICK CONTROLS — Connects each category card to the automatic drop animation.
categoryButtons.forEach(button => button.addEventListener("click", selectCategory))
