/* ==========================================================================
   arabic.ai — main.js
   Site-wide behavior shared by every page. No framework, no build step —
   open your devtools and read straight through it.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  markActiveNavLink();
  buildTOC();
  initTranslitToggle();
  initCopyButtons();
  initFAQ();
  initFlashcards();
  renderRootCards();
});

/* ---- mobile sidebar toggle ---- */
function initMobileNav(){
  const toggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  if(!toggle || !sidebar) return;
  toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if(window.innerWidth > 880) return;
    if(!sidebar.contains(e.target) && !toggle.contains(e.target)){
      sidebar.classList.remove("open");
    }
  });
}

/* ---- highlight current page in sidebar ---- */
function markActiveNavLink(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".sidebar a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if(href === path){
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}

/* ---- build a right-hand "on this page" table of contents from h2/h3 ---- */
function buildTOC(){
  const tocEl = document.querySelector(".toc-inner .toc-list");
  if(!tocEl) return;
  const headings = document.querySelectorAll("main.page h2, main.page h3");
  if(headings.length === 0){
    document.querySelector(".toc").style.display = "none";
    return;
  }
  headings.forEach((h, i) => {
    if(!h.id) h.id = "sec-" + i + "-" + h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,40);
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    if(h.tagName === "H3") a.style.paddingLeft = "22px";
    tocEl.appendChild(a);
  });

  const links = [...tocEl.querySelectorAll("a")];
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = tocEl.querySelector(`a[href="#${entry.target.id}"]`);
      if(!link) return;
      if(entry.isIntersecting){
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  headings.forEach(h => obs.observe(h));
}

/* ---- toggle transliteration visibility site-wide (persisted) ---- */
function initTranslitToggle(){
  const btn = document.querySelector("#translit-toggle");
  const KEY = "arabicai_hide_translit";
  if(localStorage.getItem(KEY) === "1"){
    document.body.classList.add("hide-translit");
  }
  if(!btn) return;
  updateTranslitBtn(btn);
  btn.addEventListener("click", () => {
    document.body.classList.toggle("hide-translit");
    localStorage.setItem(KEY, document.body.classList.contains("hide-translit") ? "1" : "0");
    updateTranslitBtn(btn);
  });
}
function updateTranslitBtn(btn){
  const hidden = document.body.classList.contains("hide-translit");
  btn.textContent = hidden ? "Show transliteration" : "Hide transliteration (test yourself)";
}

/* ---- copy-to-clipboard on code blocks ---- */
function initCopyButtons(){
  document.querySelectorAll(".code-block").forEach(block => {
    const btn = block.querySelector(".copy-btn");
    const code = block.querySelector("pre");
    if(!btn || !code) return;
    btn.addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(code.innerText);
        const orig = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => btn.textContent = orig, 1400);
      }catch(e){
        btn.textContent = "Press ⌘/Ctrl+C";
      }
    });
  });
}

/* ---- FAQ accordion ---- */
function initFAQ(){
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    if(!q) return;
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      // allow multiple open at once — this is a reference, not a wizard
      item.classList.toggle("open", !wasOpen);
      q.setAttribute("aria-expanded", String(!wasOpen));
    });
  });
}

/* ---- flip flashcards (alphabet review) ---- */
function initFlashcards(){
  document.querySelectorAll(".flash").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); card.classList.toggle("flipped"); }
    });
  });
}

/* ---- render .root-card-slot elements using ROOTS data from data.js ---- */
function renderRootCards(){
  const slots = document.querySelectorAll("[data-root-card]");
  if(slots.length === 0 || typeof ROOTS === "undefined") return;
  slots.forEach(slot => {
    const idx = parseInt(slot.getAttribute("data-root-card"), 10) || 0;
    const r = ROOTS[idx % ROOTS.length];
    const tiles = r.root.map(l => `<div class="root-tile">${l}</div>`).join("");
    const words = r.words.map(w => `
      <div class="root-word">
        <span class="ar">${w.ar}</span>
        <span class="en"><span class="translit">${w.translit}</span> — ${w.en}</span>
      </div>`).join("");
    slot.innerHTML = `
      <div class="root-letters">${tiles}</div>
      <div class="root-derivations">
        <div style="width:100%; margin-bottom:2px;" class="gloss">Root ${r.root.join("-")} — ${r.gloss}</div>
        ${words}
      </div>`;
  });
}
