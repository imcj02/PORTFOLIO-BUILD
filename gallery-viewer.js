/* # REUSABLE GALLERY VIEWER — Works with every image inside .case-study-gallery. */
(() => {
    const photos = document.querySelectorAll('.case-study-gallery .case-study-image img');
    if (!photos.length) return;

    /* # OVERLAY — Native dialog keeps keyboard focus inside and supports Escape to close. */
    const viewer = document.createElement('dialog');
    viewer.className = 'gallery-viewer';
    viewer.setAttribute('aria-label', 'Full-size artwork');

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'gallery-viewer-close';
    closeButton.setAttribute('aria-label', 'Close full-size image');
    closeButton.textContent = '×';

    const fullImage = document.createElement('img');
    fullImage.className = 'gallery-viewer-image';
    /* # IMAGE WRAPPER — Anchor the close button to the artwork's corner, not the screen. */
    const imageFrame = document.createElement('div');
    imageFrame.className = 'gallery-viewer-frame';
    imageFrame.append(closeButton, fullImage);
    viewer.append(imageFrame);
    document.body.append(viewer);
    let opener = null;

    /* # OPEN IMAGE — Add data-full-src="path/to/original.png" to a thumbnail to use a separate full-resolution file. */
    function openImage(photo, button) {
        opener = button;
        fullImage.src = photo.dataset.fullSrc || photo.currentSrc || photo.src;
        fullImage.alt = photo.alt || 'Full-size artwork';
        viewer.showModal();
        document.documentElement.classList.add('gallery-viewer-open');
        closeButton.focus({ preventScroll: true });
    }

    /* # CLICKABLE PHOTOS — Buttons preserve the existing frame and support Enter/Space as well as touch. */
    photos.forEach((photo) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-image-button';
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-label', `Enlarge ${photo.alt || 'artwork'}`);
        photo.replaceWith(button);
        button.append(photo);
        button.addEventListener('click', () => openImage(photo, button));
    });

    /* # CLOSE ACTIONS — Use the X, Escape, or click the empty area around the image. */
    closeButton.addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', (event) => {
        if (event.target === viewer) viewer.close();
    });
    viewer.addEventListener('close', () => {
        document.documentElement.classList.remove('gallery-viewer-open');
        fullImage.removeAttribute('src');
        opener?.focus({ preventScroll: true });
    });
})();
