# arabic.ai

A practical, open-source Arabic-to-English grammar, phonetics, and transliteration
learning reference — built as a static, multi-page site with no framework and no
build step. Read the code, fork the repo, fix a fact, add a project.

**Live structure:**

| Page | Covers |
|---|---|
| `index.html` | Overview, site map, the root-and-pattern idea |
| `alphabet.html` | All 28 letters, positional forms, dot placement, sun/moon letters |
| `phonetics.html` | Articulation points (throat → lips), emphatics, vowel marks, hamza |
| `grammar.html` | Gender, number, the case system (iʿrāb), iḍāfa, pronouns, adjectives |
| `verbs.html` | Root-and-pattern morphology, the ten verb forms, full conjugation tables |
| `sentences.html` | Nominal vs. verbal sentences, word order, questions, negation |
| `vocabulary.html` | Greetings, numbers (+ gender polarity), family, everyday phrases |
| `practice.html` | 25-question FAQ + an interactive multiple-choice quiz |
| `projects.html` | Three live, forkable JS projects (transliterator, root expander, drill) |
| `resources.html` | Reference sources and contribution guide |

## Why this exists

Most Arabic learning material online is either a single static grammar reference
or a paid app. `arabic.ai` is meant to sit in between: thorough enough to actually
teach from, plain-text enough to read the source and learn from *that* too, and
open enough that anyone can correct a mistake or add a missing topic with a pull
request.

## Tech

Plain HTML, CSS, and vanilla JavaScript. No npm install, no bundler, no
framework — every file can be opened and understood top to bottom. A single
shared dataset (`js/data.js`) drives the alphabet table, flashcards, verb
conjugation tables, root cards, and quiz bank, so most content-level
contributions only require editing data, not markup.

## Getting started

```bash
git clone https://github.com/joemrnice/arabic.ai.git
cd arabic.ai
npx serve .   # or any static file server
```

Then open the printed local URL. A local server is recommended over opening
`index.html` directly so relative script loading behaves consistently across
browsers.

## Contributing

See [`resources.html`](resources.html#contributing) for full guidelines. Short
version:

1. Grammar claims should be checkable against a real source or a native
   speaker — cite it in the PR description.
2. Keep transliteration consistent with `TRANSLIT_MAP` in `js/data.js`.
3. No build step, on purpose — please discuss before introducing one.
4. Copy the existing topbar/sidebar markup exactly when adding a new page, so
   site navigation stays consistent.

Good first issues: audio pronunciation on the alphabet flashcards, a
handwriting-tracing practice page, a spaced-repetition vocabulary mode, or
more roots in `js/data.js`.

## License

MIT — see [`LICENSE`](LICENSE).
