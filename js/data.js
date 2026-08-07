/* ==========================================================================
   arabic.ai — shared data
   Plain global objects/arrays (no bundler, so this is intentionally simple —
   open it up, read it, fork it).
   ========================================================================== */

// The 28 letters of the Arabic abjad, in dictionary order.
// forms: [isolated, initial, medial, final]
// group: articulation family used on the phonetics page
const ALPHABET = [
  { ar:"ا", name:"alif", forms:["ا","ا","ـا","ـا"], translit:"ā / a", ipa:"aː / ʔ", connects:false,
    desc:"A pure vowel-carrier, not a consonant in the strict sense. As a long vowel it holds the sound \"aa\". At the start of a word it usually carries a hidden hamza (glottal stop).", example:"باب", exTranslit:"bāb", exGloss:"door" },
  { ar:"ب", name:"bāʾ", forms:["ب","بـ","ـبـ","ـب"], translit:"b", ipa:"b", connects:true,
    desc:"Like English b. One dot underneath distinguishes it from ت and ث, which share the same base shape.", example:"بيت", exTranslit:"bayt", exGloss:"house" },
  { ar:"ت", name:"tāʾ", forms:["ت","تـ","ـتـ","ـت"], translit:"t", ipa:"t", connects:true,
    desc:"Like English t, but dental — tongue touches the back of the upper teeth. Two dots on top.", example:"تفاح", exTranslit:"tuffāḥ", exGloss:"apples" },
  { ar:"ث", name:"thāʾ", forms:["ث","ثـ","ـثـ","ـث"], translit:"th", ipa:"θ", connects:true,
    desc:"Like the \"th\" in English \"think\". Three dots on top — the only letter with three.", example:"ثلج", exTranslit:"thalj", exGloss:"snow / ice" },
  { ar:"ج", name:"jīm", forms:["ج","جـ","ـجـ","ـج"], translit:"j", ipa:"dʒ / ʒ", connects:true,
    desc:"In Modern Standard Arabic, like English \"j\" in \"jam\". One dot underneath. Pronunciation shifts by dialect (e.g. \"g\" in Egyptian Arabic).", example:"جبل", exTranslit:"jabal", exGloss:"mountain" },
  { ar:"ح", name:"ḥāʾ", forms:["ح","حـ","ـحـ","ـح"], translit:"ḥ", ipa:"ħ", connects:true,
    desc:"A voiceless pharyngeal fricative — a strong, breathy \"h\" produced by constricting the throat. No English equivalent; no dot.", example:"حليب", exTranslit:"ḥalīb", exGloss:"milk" },
  { ar:"خ", name:"khāʾ", forms:["خ","خـ","ـخـ","ـخ"], translit:"kh", ipa:"x", connects:true,
    desc:"Like the \"ch\" in Scottish \"loch\" or German \"Bach\". One dot on top — same skeleton as ح and ج.", example:"خبز", exTranslit:"khubz", exGloss:"bread" },
  { ar:"د", name:"dāl", forms:["د","د","ـد","ـد"], translit:"d", ipa:"d", connects:false,
    desc:"Like English d, dental. Does not connect to the letter after it — one of six non-connecting letters.", example:"درس", exTranslit:"dars", exGloss:"lesson" },
  { ar:"ذ", name:"dhāl", forms:["ذ","ذ","ـذ","ـذ"], translit:"dh", ipa:"ð", connects:false,
    desc:"Like \"th\" in English \"this\". One dot on top of د's shape; non-connecting.", example:"ذهب", exTranslit:"dhahab", exGloss:"gold" },
  { ar:"ر", name:"rāʾ", forms:["ر","ر","ـر","ـر"], translit:"r", ipa:"r", connects:false,
    desc:"A rolled/tapped r, as in Spanish \"pero\". Non-connecting.", example:"رجل", exTranslit:"rajul", exGloss:"man" },
  { ar:"ز", name:"zāy", forms:["ز","ز","ـز","ـز"], translit:"z", ipa:"z", connects:false,
    desc:"Like English z. One dot on top of ر's shape; non-connecting.", example:"زهرة", exTranslit:"zahra", exGloss:"flower" },
  { ar:"س", name:"sīn", forms:["س","سـ","ـسـ","ـس"], translit:"s", ipa:"s", connects:true,
    desc:"Like English s. The three little \"teeth\" on the shape are part of the letterform, not dots.", example:"سمك", exTranslit:"samak", exGloss:"fish" },
  { ar:"ش", name:"shīn", forms:["ش","شـ","ـشـ","ـش"], translit:"sh", ipa:"ʃ", connects:true,
    desc:"Like English \"sh\". Same tooth-shape as س with three dots added on top.", example:"شمس", exTranslit:"shams", exGloss:"sun" },
  { ar:"ص", name:"ṣād", forms:["ص","صـ","ـصـ","ـص"], translit:"ṣ", ipa:"sˤ", connects:true,
    desc:"An emphatic (velarized/\"heavy\") s — back of the tongue pulls toward the soft palate, darkening the vowel color around it.", example:"صباح", exTranslit:"ṣabāḥ", exGloss:"morning" },
  { ar:"ض", name:"ḍād", forms:["ض","ضـ","ـضـ","ـض"], translit:"ḍ", ipa:"dˤ", connects:true,
    desc:"An emphatic d. Classical Arabic is nicknamed \"the language of ḍād\" because this sound is considered unique to it.", example:"ضوء", exTranslit:"ḍawʾ", exGloss:"light" },
  { ar:"ط", name:"ṭāʾ", forms:["ط","طـ","ـطـ","ـط"], translit:"ṭ", ipa:"tˤ", connects:true,
    desc:"An emphatic, heavier t — compare to plain ت.", example:"طالب", exTranslit:"ṭālib", exGloss:"student" },
  { ar:"ظ", name:"ẓāʾ", forms:["ظ","ظـ","ـظـ","ـظ"], translit:"ẓ", ipa:"ðˤ", connects:true,
    desc:"An emphatic version of ذ — a heavy \"th\" as in \"this\", darkened.", example:"ظهر", exTranslit:"ẓuhr", exGloss:"noon" },
  { ar:"ع", name:"ʿayn", forms:["ع","عـ","ـعـ","ـع"], translit:"ʿ", ipa:"ʕ", connects:true,
    desc:"A voiced pharyngeal fricative — the single hardest sound for English speakers, made by constricting the throat while voicing. No dot; no English equivalent.", example:"عين", exTranslit:"ʿayn", exGloss:"eye" },
  { ar:"غ", name:"ghayn", forms:["غ","غـ","ـغـ","ـغ"], translit:"gh", ipa:"ɣ", connects:true,
    desc:"Like a French/German uvular r — a soft gargled \"g\". One dot on top of ع's shape.", example:"غرفة", exTranslit:"ghurfa", exGloss:"room" },
  { ar:"ف", name:"fāʾ", forms:["ف","فـ","ـفـ","ـف"], translit:"f", ipa:"f", connects:true,
    desc:"Like English f. One dot on top.", example:"فيل", exTranslit:"fīl", exGloss:"elephant" },
  { ar:"ق", name:"qāf", forms:["ق","قـ","ـقـ","ـق"], translit:"q", ipa:"q", connects:true,
    desc:"A uvular k — produced further back in the throat than ك. Two dots on top in most printed styles.", example:"قلم", exTranslit:"qalam", exGloss:"pen" },
  { ar:"ك", name:"kāf", forms:["ك","كـ","ـكـ","ـك"], translit:"k", ipa:"k", connects:true,
    desc:"Like English k.", example:"كتاب", exTranslit:"kitāb", exGloss:"book" },
  { ar:"ل", name:"lām", forms:["ل","لـ","ـلـ","ـل"], translit:"l", ipa:"l", connects:true,
    desc:"Like English l. Also the letter of the definite article ال (al-).", example:"ليل", exTranslit:"layl", exGloss:"night" },
  { ar:"م", name:"mīm", forms:["م","مـ","ـمـ","ـم"], translit:"m", ipa:"m", connects:true,
    desc:"Like English m.", example:"ماء", exTranslit:"māʾ", exGloss:"water" },
  { ar:"ن", name:"nūn", forms:["ن","نـ","ـنـ","ـن"], translit:"n", ipa:"n", connects:true,
    desc:"Like English n. One dot on top.", example:"نور", exTranslit:"nūr", exGloss:"light" },
  { ar:"هـ", name:"hāʾ", forms:["ه","هـ","ـهـ","ـه"], translit:"h", ipa:"h", connects:true,
    desc:"Like English h. Not to be confused with ة (tāʾ marbūṭa), which looks similar only in final position.", example:"هواء", exTranslit:"hawāʾ", exGloss:"air" },
  { ar:"و", name:"wāw", forms:["و","و","ـو","ـو"], translit:"w / ū", ipa:"w / uː", connects:false,
    desc:"Consonant \"w\" as in \"win\", or the long vowel \"oo\" depending on context. Non-connecting.", example:"وردة", exTranslit:"warda", exGloss:"rose" },
  { ar:"ي", name:"yāʾ", forms:["ي","يـ","ـيـ","ـي"], translit:"y / ī", ipa:"j / iː", connects:true,
    desc:"Consonant \"y\" as in \"yes\", or the long vowel \"ee\" depending on context.", example:"يد", exTranslit:"yad", exGloss:"hand" },
];

// Points of articulation (makhārij), ordered from the deepest point in the
// throat to the lips — a real physical sequence, not a decorative one.
const MAKHARIJ = [
  { zone:"Throat (deepest)", letters:["ء","ه"], note:"Glottal stop and plain h — produced at the very back, in the throat itself." },
  { zone:"Throat (middle)", letters:["ع","ح"], note:"ʿayn and ḥāʾ — the pharyngeal pair. Constrict the throat as if gently gagging, then either voice it (ع) or leave it voiceless (ح)." },
  { zone:"Throat (nearest the mouth)", letters:["غ","خ"], note:"ghayn and khāʾ — a uvular pair, produced where the back of the tongue meets the soft palate, further forward than ع/ح." },
  { zone:"Back of tongue / soft palate", letters:["ق"], note:"qāf — the uvular k, deeper than ك." },
  { zone:"Back of tongue / hard palate", letters:["ك"], note:"kāf — the familiar k sound, shallower than ق." },
  { zone:"Middle of tongue", letters:["ج","ش","ي"], note:"jīm, shīn and consonant yāʾ share this zone, the middle of the tongue against the hard palate." },
  { zone:"Side of tongue", letters:["ض"], note:"ḍād — tongue edge presses the upper molars; famously singled out as the hardest sound to master." },
  { zone:"Tip of tongue, against gum ridge", letters:["ل","ن","ر"], note:"lām, nūn and rāʾ — the tongue tip approaches the ridge behind the upper teeth." },
  { zone:"Tip of tongue, against upper teeth", letters:["ط","د","ت"], note:"The plain/emphatic t-d set: ṭāʾ, dāl, tāʾ." },
  { zone:"Tip of tongue, between teeth", letters:["ظ","ذ","ث"], note:"The interdental set: ẓāʾ, dhāl, thāʾ — tongue tip lightly between the teeth." },
  { zone:"Tongue against upper molars/gums (sibilants)", letters:["ص","س","ز"], note:"The hissing set: ṣād, sīn, zāy." },
  { zone:"Lips", letters:["ف"], note:"fāʾ — lower lip against upper teeth." },
  { zone:"Lips (both)", letters:["ب","م","و"], note:"bāʾ, mīm and consonant wāw — both lips together or rounded." },
];

// A handful of trilateral roots and a few of their derived words, used for
// the "root card" signature component across the site.
const ROOTS = [
  { root:["ك","ت","ب"], gloss:"the idea of writing", words:[
      {ar:"كَتَبَ", translit:"kataba", en:"he wrote"},
      {ar:"كِتَاب", translit:"kitāb", en:"book"},
      {ar:"مَكْتَب", translit:"maktab", en:"desk / office"},
      {ar:"كَاتِب", translit:"kātib", en:"writer"},
      {ar:"مَكْتَبَة", translit:"maktaba", en:"library"},
  ]},
  { root:["د","ر","س"], gloss:"the idea of studying", words:[
      {ar:"دَرَسَ", translit:"darasa", en:"he studied"},
      {ar:"دَرْس", translit:"dars", en:"lesson"},
      {ar:"مُدَرِّس", translit:"mudarris", en:"teacher"},
      {ar:"مَدْرَسَة", translit:"madrasa", en:"school"},
      {ar:"دِرَاسَة", translit:"dirāsa", en:"study (n.)"},
  ]},
  { root:["ع","ل","م"], gloss:"the idea of knowing", words:[
      {ar:"عَلِمَ", translit:"ʿalima", en:"he knew"},
      {ar:"عِلْم", translit:"ʿilm", en:"knowledge / science"},
      {ar:"مُعَلِّم", translit:"muʿallim", en:"teacher"},
      {ar:"عَالِم", translit:"ʿālim", en:"scholar"},
      {ar:"مَعْلُومَات", translit:"maʿlūmāt", en:"information"},
  ]},
  { root:["س","ل","م"], gloss:"the idea of safety / peace", words:[
      {ar:"سَلِمَ", translit:"salima", en:"he was safe"},
      {ar:"سَلَام", translit:"salām", en:"peace"},
      {ar:"إِسْلَام", translit:"islām", en:"submission (to God)"},
      {ar:"مُسْلِم", translit:"muslim", en:"one who submits"},
      {ar:"سَلَّمَ", translit:"sallama", en:"he greeted / handed over"},
  ]},
];

// Full past & present-tense paradigm for the sample verb كَتَبَ (kataba, "to write")
const VERB_KATABA = {
  root:"ك ت ب", meaning:"to write",
  past:[
    {person:"هو (huwa)", en:"he", ar:"كَتَبَ", translit:"kataba"},
    {person:"هي (hiya)", en:"she", ar:"كَتَبَتْ", translit:"katabat"},
    {person:"هما (huma, m.)", en:"they two (m.)", ar:"كَتَبَا", translit:"katabā"},
    {person:"هما (huma, f.)", en:"they two (f.)", ar:"كَتَبَتَا", translit:"katabatā"},
    {person:"هم (hum)", en:"they (m. pl.)", ar:"كَتَبُوا", translit:"katabū"},
    {person:"هن (hunna)", en:"they (f. pl.)", ar:"كَتَبْنَ", translit:"katabna"},
    {person:"أنتَ (anta)", en:"you (m.)", ar:"كَتَبْتَ", translit:"katabta"},
    {person:"أنتِ (anti)", en:"you (f.)", ar:"كَتَبْتِ", translit:"katabti"},
    {person:"أنتما (antuma)", en:"you two", ar:"كَتَبْتُمَا", translit:"katabtumā"},
    {person:"أنتم (antum)", en:"you (m. pl.)", ar:"كَتَبْتُمْ", translit:"katabtum"},
    {person:"أنتن (antunna)", en:"you (f. pl.)", ar:"كَتَبْتُنَّ", translit:"katabtunna"},
    {person:"أنا (ana)", en:"I", ar:"كَتَبْتُ", translit:"katabtu"},
    {person:"نحن (naḥnu)", en:"we", ar:"كَتَبْنَا", translit:"katabnā"},
  ],
  present:[
    {person:"هو (huwa)", en:"he", ar:"يَكْتُبُ", translit:"yaktubu"},
    {person:"هي (hiya)", en:"she", ar:"تَكْتُبُ", translit:"taktubu"},
    {person:"هما (huma, m.)", en:"they two (m.)", ar:"يَكْتُبَانِ", translit:"yaktubāni"},
    {person:"هما (huma, f.)", en:"they two (f.)", ar:"تَكْتُبَانِ", translit:"taktubāni"},
    {person:"هم (hum)", en:"they (m. pl.)", ar:"يَكْتُبُونَ", translit:"yaktubūna"},
    {person:"هن (hunna)", en:"they (f. pl.)", ar:"يَكْتُبْنَ", translit:"yaktubna"},
    {person:"أنتَ (anta)", en:"you (m.)", ar:"تَكْتُبُ", translit:"taktubu"},
    {person:"أنتِ (anti)", en:"you (f.)", ar:"تَكْتُبِينَ", translit:"taktubīna"},
    {person:"أنتما (antuma)", en:"you two", ar:"تَكْتُبَانِ", translit:"taktubāni"},
    {person:"أنتم (antum)", en:"you (m. pl.)", ar:"تَكْتُبُونَ", translit:"taktubūna"},
    {person:"أنتن (antunna)", en:"you (f. pl.)", ar:"تَكْتُبْنَ", translit:"taktubna"},
    {person:"أنا (ana)", en:"I", ar:"أَكْتُبُ", translit:"aktubu"},
    {person:"نحن (naḥnu)", en:"we", ar:"نَكْتُبُ", translit:"naktubu"},
  ]
};

// Simple Arabic → Latin transliteration map used by the projects-page demo.
// Deliberately simplified (no full Buckwalter/IJMES rules) — good enough to
// demonstrate the idea and easy to extend.
const TRANSLIT_MAP = {
  "ا":"ā","ب":"b","ت":"t","ث":"th","ج":"j","ح":"ḥ","خ":"kh","د":"d","ذ":"dh",
  "ر":"r","ز":"z","س":"s","ش":"sh","ص":"ṣ","ض":"ḍ","ط":"ṭ","ظ":"ẓ","ع":"ʿ",
  "غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w",
  "ي":"y","ء":"ʾ","ة":"a","ى":"ā",
  "َ":"a","ِ":"i","ُ":"u","ْ":"","ّ":"","ً":"an","ٍ":"in","ٌ":"un"
};

// Quiz bank for the practice page (mixed alphabet + grammar + phonetics).
const QUIZ_QUESTIONS = [
  { q:"Which letter never connects to the letter that follows it?", opts:["ب","د","ك","س"], answer:"د" },
  { q:"What does the tāʾ marbūṭa (ة) usually mark on a noun?", opts:["Plural","Feminine gender","The definite article","A question"], answer:"Feminine gender" },
  { q:"How many dots does ث (thāʾ) have?", opts:["One","Two","Three","None"], answer:"Three" },
  { q:"Which sound has no equivalent in English and is made by constricting the throat while voicing?", opts:["ح (ḥāʾ)","ع (ʿayn)","ق (qāf)","خ (khāʾ)"], answer:"ع (ʿayn)" },
  { q:"What is the function of a sukūn (ْ)?", opts:["Doubles a consonant","Marks a short 'a'","Marks the absence of a vowel","Marks a long vowel"], answer:"Marks the absence of a vowel" },
  { q:"In يَكْتُبُ (yaktubu, 'he writes'), which part of the word is the root?", opts:["ي","كتب","ُ (ḍamma)","ت"], answer:"كتب" },
  { q:"Which word order is most typical of Classical/formal Arabic verbal sentences?", opts:["Subject–Verb–Object","Verb–Subject–Object","Object–Verb–Subject","Verb–Object–Subject"], answer:"Verb–Subject–Object" },
  { q:"What does shadda (ّ) indicate?", opts:["A long vowel","A doubled (geminated) consonant","A silent letter","A question"], answer:"A doubled (geminated) consonant" },
  { q:"Which of these is a 'moon letter' (does NOT assimilate the ل of the definite article)?", opts:["ش","ن","ر","ب"], answer:"ب" },
  { q:"What is 'iḍāfa'?", opts:["The plural pattern","A possessive construction of two nouns", "A verb tense","A type of question"], answer:"A possessive construction of two nouns" },
  { q:"Which case ending typically marks the subject (nominative) of a verbal sentence?", opts:["-a","-u","-i","-an"], answer:"-u" },
  { q:"How many core letter forms can a connecting letter like ب take?", opts:["One","Two","Three","Four"], answer:"Four" },
  { q:"Which pair of letters is 'emphatic' (velarized) versus 'plain'?", opts:["س vs ص","ب vs م","ل vs ن","ي vs و"], answer:"س vs ص" },
  { q:"What does tanwīn (e.g. ً) add to a word's pronunciation?", opts:["A trailing 'n' sound","Gemination","Silence","A glottal stop"], answer:"A trailing 'n' sound" },
  { q:"Arabic sentences with no verb, just Subject + Predicate (e.g. 'the house [is] big'), are called:", opts:["jumla fiʿliyya (verbal)","jumla ismiyya (nominal)","jumla shartiyya (conditional)","jumla istifhāmiyya (question)"], answer:"jumla ismiyya (nominal)" },
];
