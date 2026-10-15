// # PROJECT SETTINGS — Edit titles and short descriptions here; add or remove items inside each projects list.
const projectData = {
    games: {
        title: "Games",
        projects: [
            { title: "Eye Candy", note: "Visual Novel / 2026", image: "banner_eyecandy.png", url: "eye-candy.html" },
            { title: "CROSSROADS", note: "Visual Novel / 2024", image: "banner_crossroads.png", url: "crossroads.html" },
            { title: "OUT", note: "VR Experience / 2026", image: "banner_out.png", url: "out.html" },
        ],
    },
    prototype: {
        title: "Prototype (WIP)",
        projects: [
            { title: "IDENTITY", note: "Visual Novel / 2025", image: "banner_identity.png", url: "identity.html" },
            { title: "Simply Attraction", note: "RPG / 2025", image: "banner_simplyattraction.png", url: "simply-attraction.html" },
            { title: "In The Moment", note: "Point-n-click / 2025", image: "banner_inthemoment.PNG", url: "in-the-moment.html" },
            { title: "A Candy A Day (Original)", note: "Visual Novel / 2025", image: "banner_acadoriginal.png", url: "a-candy-a-day.html" },
        ],
    },
    illustration: {
        title: "Illustration",
        layout: "gallery",
        // # ILLUSTRATION SUBSECTIONS — Rename these headings and explanations.
        // imageIndexes selects images from the projects list below, starting at 0; each image can be reused.
        sections: [
            {title: "FROM NOW ON - Social Comic Package for AIP Foundation", description: "AIP Foundation has always aiming for  a world without road injuries and injustices. Through comics, AIP aims to engage younger audiences in the concept of mobility and beyond: the problems in mobility that related to injustices and their impact on the world’s environment. Out of 5 proposals provided by my teammates and I, AIP chose my brief, that was why I became the Art Director of this project. The package includes 5 comic strips for social posts, 4 character designs and 4 infographics.", imageIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            // # DETAIL BOXES — Edit the text inside the quotation marks.
            facts: {
            type: "Social Comic",
            year: "2023",
            duration: "2 months",
            team: "Group Project",
            tools: "Photoshop, Procreate, InDesign",
            roles: "Art Director, Character Designer, Storyboarder, Illustrator"} },

            {title: "Single Works", description: "Experimental with different styles", imageIndexes: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
            // # DETAIL BOXES — Edit the text inside the quotation marks.
            facts: {
            type: "Illustration",
            year: "2026",
            duration: "2 months",
            team: "Solo Project",
            tools: "Photoshop, Procreate",
            roles: "Illustration, Character Design"} },

        ],
        projects: [
            { title: "", note: "", image: "illus/AIPconcept1.png" }, // #0
            { title: "", note: "", image: "illus/AIPconcept2.png" },
            { title: "", note: "", image: "illus/AIP1.png" },
            { title: "", note: "", image: "illus/AIPblue2.png" },
            { title: "", note: "", image: "illus/AIPblue.png" },
            { title: "", note: "", image: "illus/AIP3.png" }, // #5
            { title: "", note: "", image: "illus/AIPgreen2.png" }, 
            { title: "", note: "", image: "illus/AIPgreen.png" },
            { title: "", note: "", image: "illus/AIP5.png" },
            { title: "", note: "", image: "illus/AIPyellow2.png" },
            { title: "", note: "", image: "illus/AIPyellow.png" }, // #10
            { title: "", note: "", image: "illus/AIP2.png" }, 
            { title: "", note: "", image: "illus/AIPred2.png" }, 
            { title: "", note: "", image: "illus/AIPred.png" }, 
            { title: "", note: "", image: "illus/AIP4.png" },
            { title: "", note: "", image: "illus/AIPcomic1.png" }, // #15
            { title: "", note: "", image: "illus/AIPcomic2.png" },
            { title: "", note: "", image: "illus/AIPcomic3.png" }, 
            { title: "", note: "", image: "illus/AIPcomic4.png" }, 
            { title: "", note: "", image: "illus/AIPcomic5.png" }, 
            { title: "", note: "", image: "illus/AIPinitial.png" }, // #20 (END of AIP)
            { title: "Anh Thu", note: "crossroads extension", image: "illus/crossroadspin1.png" }, 
            { title: "Linh Dan", note: "crossroads extension", image: "illus/crossroadspin2.png" },
            { title: "Thai Duong", note: "crossroads extension", image: "illus/crossroadspin3.png" }, 
            { title: "Pin Design", note: "crossroads extension", image: "illus/crossroadspin4.png" }, 
            { title: "Crossroads Girls", note: "crossroads extension", image: "illus/crossroadsduo.jpeg" }, // #25
            { title: "Experimental", note: "illustration", image: "illus/exp1.jpeg" }, 
            { title: "Experimental", note: "storyboard", image: "illus/storyboard1.jpeg" },
            { title: "Experimental", note: "illustration", image: "illus/exp2.jpeg" }, 
            { title: "Experimental", note: "storyboard", image: "illus/storyboard2.jpeg" },
            { title: "Experimental", note: "for @_jenny_art_", image: "illus/jennyart1.jpeg" }, // #30
            { title: "Experimental", note: "for @_jenny_art_", image: "illus/jennyart2.jpeg" },
            { title: "Experimental", note: "for @sketchycaulfield", image: "illus/springspider.jpeg" },
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
const projectsHint = document.querySelector("#projectsHint")
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

// # INTRO START SETTING
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

// # BUILD ILLUSTRATION GALLERY ITEM — Add an image filename to an illustration above to replace its placeholder.
function makeGalleryItem(item, index) {
    const figure = document.createElement("figure")
    figure.className = "gallery-item"
    const artwork = item.image
        ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
        : `<span class="gallery-placeholder">IMAGE PLACEHOLDER ${String(index + 1).padStart(2, "0")}</span>`

    figure.innerHTML = `
        <div class="gallery-image">${artwork}</div>
        <figcaption class="gallery-caption">
            <h4>${item.title}</h4>
            <p>${item.note}</p>
        </figcaption>
    `
    return figure
}

// # ILLUSTRATION SECTION — Reuses the project-page layout: numbered title, explanation, then three-column images.
function makeIllustrationSection(section, index, images) {
    const element = document.createElement("section")
    element.className = "case-study-section"
    const titleId = "illustration-section-" + (index + 1)
    element.setAttribute("aria-labelledby", titleId)
    element.innerHTML = `
        <div class="case-study-heading">
            <header class="case-study-title">
                <p class="case-study-number">${String(index + 1).padStart(2, "0")}</p>
                <h2 id="${titleId}"></h2>
            </header>
            <div class="case-study-copy">
                <div class="illustration-facts" aria-label="Collection details"></div>
                <p></p>
            </div>
        </div>
        <div class="case-study-gallery" role="region"></div>
    `
    element.querySelector("h2").textContent = section.title
    element.querySelector(".case-study-copy p").textContent = section.description
    // # COLLECTION BOXES — Add facts: { type: "...", year: "...", duration: "...", team: "...",
    // tools: "...", roles: "..." } to a section above. Missing values display editable placeholders.
    const facts = section.facts || {}
    const rows = [
        [["type", "[Type]"], ["year", "[Year]"], ["duration", "[Duration]"], ["team", "[Solo / Team]"]],
        [["tools", "[Tools]"], ["roles", "[Roles]"]],
    ]
    rows.forEach((fields, rowIndex) => {
        const row = document.createElement("ul")
        row.className = "illustration-facts-row"
        row.setAttribute("aria-label", rowIndex === 0 ? "Type, year, duration and team" : "Tools and roles")
        fields.forEach(([key, fallback]) => {
            const box = document.createElement("li")
            box.textContent = facts[key] || fallback
            row.append(box)
        })
        element.querySelector(".illustration-facts").append(row)
    })
    const gallery = element.querySelector(".case-study-gallery")
    gallery.setAttribute("aria-label", section.title + " artwork")
    section.imageIndexes.forEach((imageIndex) => {
        const item = images[imageIndex]
        if (!item) return
        const figure = document.createElement("figure")
        figure.className = "gallery-item"
        const frame = document.createElement("div")
        frame.className = "case-study-image"
        if (item.image) {
            const image = document.createElement("img")
            image.src = item.image
            image.alt = item.title + " — " + item.note
            image.loading = "lazy"
            frame.append(image)
        } else {
            const placeholder = document.createElement("span")
            placeholder.textContent = "Image placeholder " + (imageIndex + 1)
            frame.append(placeholder)
        }
        // # IMAGE CAPTIONS — Edit each illustration's title and note in projectData above.
        const caption = document.createElement("figcaption")
        caption.className = "gallery-caption"
        const title = document.createElement("h4")
        title.textContent = item.title
        const note = document.createElement("p")
        note.textContent = item.note
        caption.append(title, note)
        figure.append(frame, caption)
        gallery.append(figure)
    })
    return element
}

// # SHOW PROJECTS — Illustration uses stacked subsections; other categories keep the horizontal list.
function renderProjects(category) {
    const data = projectData[category]
    const isGallery = data.layout === "gallery"
    projectsTitle.textContent = data.title
    projectsHint.textContent = isGallery ? "Gallery view" : "Scroll sideways for more projects →"
    projectTrack.classList.toggle("is-gallery", isGallery)
    projectTrack.classList.toggle("is-illustration-sections", isGallery)
    if (isGallery) {
        projectTrack.replaceChildren(...data.sections.map((section, index) =>
            makeIllustrationSection(section, index, data.projects)))
        window.initializeGalleryViewer?.(projectTrack)
    } else {
        projectTrack.replaceChildren(...data.projects.map(makeProjectCard))
    }
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
