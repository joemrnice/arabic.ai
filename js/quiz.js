/* ==========================================================================
   arabic.ai — quiz.js
   Renders a self-contained multiple-choice quiz into #quiz-root using
   QUIZ_QUESTIONS from data.js. Score is kept in memory for the session.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("quiz-root");
  if(!root || typeof QUIZ_QUESTIONS === "undefined") return;

  let i = 0;
  let score = 0;
  let answered = false;

  // shuffle a shallow copy so repeat visits don't feel identical
  const order = shuffle(QUIZ_QUESTIONS.map((_, idx) => idx));

  render();

  function render(){
    if(i >= order.length){
      root.innerHTML = `
        <div class="quiz-box" style="text-align:center;">
          <div class="quiz-q">Quiz complete</div>
          <p class="muted">You scored <strong>${score} / ${order.length}</strong>.</p>
          <button class="btn btn-gold" id="quiz-restart">Try again</button>
        </div>`;
      document.getElementById("quiz-restart").addEventListener("click", () => {
        i = 0; score = 0; answered = false; render();
      });
      return;
    }

    const item = QUIZ_QUESTIONS[order[i]];
    const opts = shuffle([...item.opts]);
    answered = false;

    root.innerHTML = `
      <div class="quiz-box">
        <div class="quiz-q">Question ${i+1} of ${order.length} — ${escapeHtml(item.q)}</div>
        <div class="quiz-opts">
          ${opts.map(o => `<button class="quiz-opt" data-opt="${escapeAttr(o)}">${escapeHtml(o)}</button>`).join("")}
        </div>
        <div class="quiz-status" aria-live="polite"></div>
        <div class="quiz-footer">
          <span class="quiz-score">Score: ${score}/${i}</span>
          <button class="btn btn-ghost" id="quiz-next" disabled>Next →</button>
        </div>
      </div>`;

    root.querySelectorAll(".quiz-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        if(answered) return;
        answered = true;
        const chosen = btn.getAttribute("data-opt");
        const status = root.querySelector(".quiz-status");
        root.querySelectorAll(".quiz-opt").forEach(b => {
          if(b.getAttribute("data-opt") === item.answer) b.classList.add("correct");
          else if(b === btn) b.classList.add("wrong");
        });
        if(chosen === item.answer){
          score++;
          status.textContent = "Correct.";
        } else {
          status.textContent = `Not quite — the answer is "${item.answer}".`;
        }
        document.getElementById("quiz-next").disabled = false;
      });
    });

    document.getElementById("quiz-next").addEventListener("click", () => { i++; render(); });
  }

  function shuffle(arr){
    for(let k = arr.length - 1; k > 0; k--){
      const j = Math.floor(Math.random() * (k+1));
      [arr[k], arr[j]] = [arr[j], arr[k]];
    }
    return arr;
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
  function escapeAttr(s){ return escapeHtml(s).replace(/'/g, "&#39;"); }
});
