/* ============================ 
   Portfolio Chatbot (Front-end)    
   Author: Jayrajsinh Chavda    
   ============================ */

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

/* ---------- Auto-scroll ---------- */
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ---------- Render bubbles ---------- */
function appendMessage(text, who = "user") {
  const bubble = document.createElement("div");
  bubble.className = (who === "user") ? "user-message message" : "bot-message message";
  bubble.innerHTML = text;
  chatMessages.appendChild(bubble);
  scrollToBottom();
}

function showTyping() {
  const t = document.createElement("div");
  t.className = "bot-message message typing";
  t.id = "typing";
  t.textContent = "💭 AI is typing…";
  chatMessages.appendChild(t);
  scrollToBottom();
}
function hideTyping() {
  const t = document.getElementById("typing");
  if (t) t.remove();
}

/* ---------- Knowledge Base ---------- */
const KB = {
  profile: {
    name: "Jayrajsinh Chavda",
    role: "Information Technology student / Web Developer",
    summary:
      "I’m an aspiring IT professional passionate about creating interactive, user-friendly web experiences. Diploma in IT (Govt. Polytechnic Kheda), currently pursuing Degree at JG University. Goal: work for top companies like Microsoft and build technology that improves lives."
  },
  skills: ["HTML", "CSS", "JavaScript", "Python", "C++", "Java", "Content Creation"],
  projects: [
    { title: "Portfolio Website", url: "home.html" },
    { title: "Bond Checker", url: "https://github.com/jayrajsinh33/FRIENDSHIP-BOND-CHEKER/deployments/github-pages" }
  ],
  education: [
    { institute: "Government Polytechnic Kheda", course: "Diploma in Information Technology", period: "2022 – 2025" },
    { institute: "JG University", course: "B.E. / B.Tech in Information Technology", period: "2025 – Present" }
  ],
  navigation: {
    home: "home.html",
    about: "about.html",
    projects: "projects.html",
    education: "education.html",
    contact: "contact.html",
    aichatbox: "aichatbox.html"
  },
  socials: {
    instagram: "https://www.instagram.com/jayrajsinh_03__",
    facebook: "https://www.facebook.com/share/1SPT9Dgh1Q/",
    linkedin: "https://www.linkedin.com/in/chavda-jayrajsinh-a12611333"
  }
};

/* ---------- Text utils ---------- */
function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_+\-=\[\]{};:'",.<>/?\\|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ---------- Levenshtein ---------- */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}
function similarity(a, b) {
  a = norm(a); b = norm(b);
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  return 1 - dist / Math.max(a.length, b.length);
}

/* ---------- Intents ---------- */
const intents = [
  { tag: "greet", keys: ["hi","hello","hey","namaste","good morning","good evening"] },
  { tag: "name",  keys: ["your name","who are you","developer name","portfolio owner"] },
  { tag: "role",  keys: ["what do you do","your role","profession","job","goal","aim"] },
  { tag: "skills", keys: ["skills","tech stack","programming languages","what you know","tools"] },
  { tag: "projects", keys: ["projects","work","portfolio","bond checker","show projects"] },
  { tag: "education", keys: ["education","study","college","degree","diploma","jg university","polytechnic"] },
  { tag: "contact", keys: ["contact","email","reach you","connect","message you"] },
  { tag: "socials", keys: ["instagram","facebook","linkedin","social"] },
  { tag: "navigate", keys: ["open","go to","navigate","visit","take me to"] },
  { tag: "thanks", keys: ["thanks","thank you","great","nice","awesome"] },
  { tag: "help", keys: ["help","commands","abilities","options","what can you do","features"] }
];

/* ---------- Responses with Emojis ---------- */
function respGreet() {
  return `👋 Hey! I’m your AI assistant for <b>${KB.profile.name}</b>.<br>
  🤖 Ask me about <b>skills</b> 💻, <b>projects</b> 🚀, <b>education</b> 🎓, or type <b>help</b> ❓.`;
}

function respName() { 
  return `🙋 This portfolio belongs to <b>${KB.profile.name}</b>.`; 
}

function respRole() { 
  return `👨‍💻 <b>${KB.profile.name}</b> — ${KB.profile.role}.<br>✨ ${KB.profile.summary}`; 
}

function respSkills() { 
  return `💻 Here are my key skills:<br>⚡ ${KB.skills.join("<br>⚡ ")}`; 
}

function respProjects() {
  return `📂 Recent projects:<br>${KB.projects.map(
    p => `🚀 <b>${p.title}</b> — <a href="${p.url}" target="_blank">open 🔗</a>`
  ).join("<br>")}`;
}

function respEducation() {
  return `🎓 My education journey:<br><br>` +
    KB.education.map(e =>
      `🏫 <b>${e.institute}</b><br>📘 ${e.course}<br>📅 ${e.period}`
    ).join("<br><br>");
}

function respContact() { 
  return `📞 You can reach me on the <a href="${KB.navigation.contact}">Contact page</a> 💌 or via my socials 🌐 (type <b>socials</b>).`; 
}

function respSocials() {
  return `🌐 My social links:<br>
   📸 <a href="${KB.socials.instagram}" target="_blank">Instagram</a><br>
   👥 <a href="${KB.socials.facebook}" target="_blank">Facebook</a><br>
   💼 <a href="${KB.socials.linkedin}" target="_blank">LinkedIn</a>`;
}

function respHelp() {
  return `🛠️ Here’s what I can do:<br>
   👉 "Show your <b>skills</b> 💻"<br>
   👉 "Tell me about your <b>projects</b> 🚀"<br>
   👉 "What is your <b>education</b>? 🎓"<br>
   👉 "Open <b>projects</b> page" 🌐<br>
   👉 "Your <b>social links</b>? 🌍"`;
}

/* ---------- Navigation ---------- */
function handleNavigation(q) {
  const words = norm(q).split(" ");
  const candidates = Object.keys(KB.navigation);
  let best = null, bestScore = 0;
  for (const page of candidates) {
    for (const w of words) {
      const score = similarity(w, page);
      if (score > bestScore) { bestScore = score; best = page; }
    }
  }
  if (best && bestScore >= 0.5) {
    const url = KB.navigation[best];
    window.location.href = url;
    return `🔗 Opening <b>${best}</b> page…`;
  }
  return null;
}

/* ---------- Intent detection ---------- */
function detectIntent(q) {
  const nq = norm(q);
  let best = { tag: null, score: 0 };

  for (const intent of intents) {
    for (const key of intent.keys) {
      const s = similarity(nq, key);
      if (s > best.score) best = { tag: intent.tag, score: s };

      if (nq.includes(norm(key))) {
        if (0.7 > best.score) best = { tag: intent.tag, score: 0.7 };
      }
    }
  }
  return best.tag;
}

/* ---------- Fuzzy KB ---------- */
const searchableKB = [
  ["name", respName()],
  ["role", respRole()],
  ["skills", respSkills()],
  ["projects", respProjects()],
  ["education", respEducation()],
  ["contact", respContact()],
  ["socials", respSocials()],
  ["help", respHelp()]
];
function fuzzyAnswer(q) {
  const nq = norm(q);

  if (/bond|checker/.test(nq)) return respProjects();
  if (/polytechnic|kheda|diploma|jg university|degree|btech/.test(nq)) return respEducation();
  if (/skill|stack|language|tech/.test(nq)) return respSkills();

  let best = null, score = 0;
  for (const [k, v] of searchableKB) {
    const s = similarity(nq, k);
    if (s > score) { score = s; best = v; }
  }
  if (score >= 0.4) return best;

  return null;
}

/* ---------- Brain ---------- */
function answerQuestion(q) {
  const intent = detectIntent(q);

  switch (intent) {
    case "greet": return respGreet();
    case "name": return respName();
    case "role": return respRole();
    case "skills": return respSkills();
    case "projects": return respProjects();
    case "education": return respEducation();
    case "contact": return respContact();
    case "socials": return respSocials();
    case "help": return respHelp();
    case "navigate": {
      const nav = handleNavigation(q);
      if (nav) return nav;
      break;
    }
    case "thanks": return "🙌 Glad I could help! 🚀";
    default: break;
  }

  const fuzz = fuzzyAnswer(q);
  if (fuzz) return fuzz;

  return `🤔 I didn’t catch that… 😅<br>
  💡 Try asking about my <b>skills</b> 💻, <b>projects</b> 📂, or <b>education</b> 🎓.<br>
  Type <b>help</b> ❓ anytime.`;
}

/* ---------- Public send ---------- */
async function sendMessage() {
  const text = (userInput.value || "").trim();
  if (!text) return;

  appendMessage(text, "user");
  userInput.value = "";
  showTyping();

  await new Promise(r => setTimeout(r, 250));

  const reply = answerQuestion(text);
  hideTyping();
  appendMessage(reply, "bot");
}

/* ---------- ENTER to send ---------- */
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

/* ---------- Initial tip ---------- */
appendMessage(`💡 Tip: Try “show projects 🚀”, “open education 🎓”, or “your skills 💻?”.<br>
Type <b>help</b> ❓ anytime.`, "bot");


