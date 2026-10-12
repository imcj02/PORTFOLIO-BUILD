// # CROSSROADS FEATURED WORK SETTINGS — Edit titles, descriptions, and placeholder labels here.
const crossroadsFeaturedWork = {
    characters: {
        title: "Character Design",
        description: "Add your detailed Character Design description, process, sketches, and final character sheets here.",
        placeholders: ["Character design image 01", "Character design image 02", "Character design image 03"],
    },
    backgrounds: {
        title: "Backgrounds",
        description: "Add your detailed Backgrounds description, environment studies, layout process, and final artwork here.",
        placeholders: ["Background image 01", "Background image 02", "Background image 03"],
    },
    cgs: {
        title: "CGs",
        description: "Add your detailed CG description, composition process, story context, and final illustrations here.",
        placeholders: ["CG image 01", "CG image 02", "CG image 03"],
    },
}

// # CROSSROADS FEATURED WORK ELEMENTS — These connect the interaction to crossroads.html.
const crossroadsCards = [...document.querySelectorAll("[data-crossroads-category]")]
const crossroadsSlot = document.querySelector("#crossroadsCardSlot")
const crossroadsShowcase = document.querySelector("#crossroadsShowcase")
const crossroadsShowcaseTitle = document.querySelector("#crossroadsShowcaseTitle")
const crossroadsShowcaseDescription = document.querySelector("#crossroadsShowcaseDescription")
const crossroadsShowcaseGallery = document.querySelector("#crossroadsShowcaseGallery")
let selectedCrossroadsCategory = null

// # CROSSROADS SHOWCASE CONTENT — Builds the matching title, text, and image placeholders.
function renderCrossroadsShowcase(category) {
    const content = crossroadsFeaturedWork[category]
    crossroadsShowcaseTitle.textContent = content.title
    crossroadsShowcaseDescription.textContent = content.description
    crossroadsShowcaseGallery.replaceChildren(
        ...content.placeholders.map((label) => {
            const placeholder = document.createElement("div")
            placeholder.className = "crossroads-showcase-placeholder"
            placeholder.textContent = label
            return placeholder
        }),
    )
    crossroadsShowcase.hidden = false
    crossroadsShowcase.classList.remove("is-visible")
    requestAnimationFrame(() => crossroadsShowcase.classList.add("is-visible"))
}

// # SELECTED SLOT CARD — Clicking this black card returns the original card and closes the section.
function renderCrossroadsSlot(category) {
    const slotCard = document.createElement("button")
    slotCard.type = "button"
    slotCard.className = "crossroads-slot-card"
    slotCard.setAttribute("aria-label", `Return ${crossroadsFeaturedWork[category].title} card`)
    slotCard.innerHTML = `<strong>${crossroadsFeaturedWork[category].title}</strong><small>Click to return</small>`
    slotCard.addEventListener("click", clearCrossroadsSelection)
    crossroadsSlot.replaceChildren(slotCard)
}

// # AUTO SCROLL — Opens the chosen section and scrolls it beneath the fixed header.
function scrollToCrossroadsShowcase() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.setTimeout(() => {
        crossroadsShowcase.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start",
        })
    }, 180)
}

// # CARD SELECTION — Moves the chosen category into the slot and reveals its content.
function selectCrossroadsCategory(event) {
    const selectedCard = event.currentTarget
    const category = selectedCard.dataset.crossroadsCategory

    if (selectedCrossroadsCategory === category) {
        scrollToCrossroadsShowcase()
        return
    }

    crossroadsCards.forEach((card) => {
        const isSelected = card === selectedCard
        card.classList.toggle("is-selected", isSelected)
        card.setAttribute("aria-pressed", String(isSelected))
    })

    selectedCrossroadsCategory = category
    renderCrossroadsSlot(category)
    renderCrossroadsShowcase(category)
    scrollToCrossroadsShowcase()
}

// # RETURN CARD — Restores the three-card menu and hides the currently displayed section.
function clearCrossroadsSelection() {
    crossroadsCards.forEach((card) => {
        card.classList.remove("is-selected")
        card.setAttribute("aria-pressed", "false")
    })
    crossroadsSlot.innerHTML = '<span class="crossroads-slot-placeholder">Selected card</span>'
    crossroadsShowcase.hidden = true
    crossroadsShowcase.classList.remove("is-visible")
    selectedCrossroadsCategory = null
}

crossroadsCards.forEach((card) => card.addEventListener("click", selectCrossroadsCategory))
