/**
 * Fade images in once they have loaded, instead of letting them pop into place.
 * CSS (index.css) hides `img:not(.img-ready)` only when motion is allowed, so a
 * broken or never-loading image is still marked ready on `error` and never stays hidden.
 */
const READY = "img-ready";

const markIfDone = (img: HTMLImageElement) => {
  if (img.complete) img.classList.add(READY);
};

const scan = (root: ParentNode) => {
  root.querySelectorAll<HTMLImageElement>("img").forEach(markIfDone);
};

export function installImageFadeIn() {
  // capture phase: `load` and `error` do not bubble
  document.addEventListener("load", (e) => {
    if (e.target instanceof HTMLImageElement) e.target.classList.add(READY);
  }, true);
  document.addEventListener("error", (e) => {
    if (e.target instanceof HTMLImageElement) e.target.classList.add(READY);
  }, true);

  scan(document);

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node instanceof HTMLImageElement) markIfDone(node);
        else if (node instanceof HTMLElement) scan(node);
      });
    }
  }).observe(document.body, { childList: true, subtree: true });
}
