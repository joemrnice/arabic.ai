/* ==========================================================================
   arabic.ai — projects-demo.js
   Three tiny, readable "starter projects" wired up live on projects.html.
   Each one is intentionally small enough to read top-to-bottom in a minute.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTransliterator();
  initRootExpander();
  initConjugationDrill();
});

/* --------------------------------------------------------------------------
   1) Transliteration converter
   Walks the input string character by character and looks each one up in
   TRANSLIT_MAP (see js/data.js). This is a naive, letter-by-letter approach —
   real transliteration also has to handle sun-letter assimilation, hamza
   seats, and long vowels contextually. Good first upgrade if you fork this.
   -------------------------------------------------------------------------- */
function initTransliterator(){
  const input = document.getElementById("translit-input");
  const output = document.getElementById("translit-output");
  if(!input || !output || typeof TRANSLIT_MAP === "undefined") return;

  function convert(text){
    return [...text].map(ch => (ch in TRANSLIT_MAP ? TRANSLIT_MAP[ch] : ch)).join("");
  }
  input.addEventListener("input", () => { output.textContent = convert(input.value) || "—"; });
  output.textContent = convert(input.value);
}

/* --------------------------------------------------------------------------
   2) Root expander
   Given a root selected from ROOTS (data.js), renders its derived word
   family. This is the same renderer used for the root-card signature
   component, exposed here as an explicit, readable "project".
   -------------------------------------------------------------------------- */
function initRootExpander(){
  const select = document.getElementById("root-select");
  const out = document.getElementById("root-expander-output");
  if(!select || !out || typeof ROOTS === "undefined") return;

  ROOTS.forEach((r, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = r.root.join("-") + "  (" + r.gloss + ")";
    select.appendChild(opt);
  });

  function draw(){
    const r = ROOTS[Number(select.value)];
    out.innerHTML = r.words.map(w => `
      <div class="root-word">
        <span class="ar">${w.ar}</span>
        <span class="en"><span class="translit">${w.translit}</span> — ${w.en}</span>
      </div>`).join("");
  }
  select.addEventListener("change", draw);
  draw();
}

/* --------------------------------------------------------------------------
   3) Conjugation drill
   Picks a random pronoun row from VERB_KATABA (data.js) and asks the user
   to type the matching form. Comparison strips Arabic diacritics so the
   drill doesn't fail a correct answer typed without full vowel marks.
   -------------------------------------------------------------------------- */
function initConjugationDrill(){
  const tenseSelect = document.getElementById("drill-tense");
  const promptEl = document.getElementById("drill-prompt");
  const inputEl = document.getElementById("drill-input");
  const checkBtn = document.getElementById("drill-check");
  const statusEl = document.getElementById("drill-status");
  if(!tenseSelect || !promptEl || !inputEl || !checkBtn) return;

  let current = null;

  function stripDiacritics(s){
    return s.normalize("NFC").replace(/[\u064B-\u0652\u0670]/g, "").trim();
  }

  function next(){
    const rows = tenseSelect.value === "past" ? VERB_KATABA.past : VERB_KATABA.present;
    current = rows[Math.floor(Math.random() * rows.length)];
    promptEl.textContent = `Conjugate "to write" for: ${current.person} — ${current.en}`;
    inputEl.value = "";
    statusEl.textContent = "";
    inputEl.focus();
  }

  checkBtn.addEventListener("click", () => {
    if(!current) return;
    const guess = stripDiacritics(inputEl.value);
    const answer = stripDiacritics(current.ar);
    if(guess && guess === answer){
      statusEl.textContent = "✓ Correct — " + current.ar + " (" + current.translit + ")";
      statusEl.style.color = "var(--teal-accent)";
    } else {
      statusEl.textContent = "Answer: " + current.ar + " (" + current.translit + ")";
      statusEl.style.color = "var(--brick-soft)";
    }
    setTimeout(next, 1600);
  });
  inputEl.addEventListener("keydown", (e) => { if(e.key === "Enter") checkBtn.click(); });
  tenseSelect.addEventListener("change", next);

  next();
}
