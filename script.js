const presets = {
  lebron: { mvps: 4, allstars: 20, rings: 4, points: 40, retired: 0 },
  jordan: { mvps: 5, allstars: 14, rings: 6, points: 32, retired: 20 }
};

function updateValue(sliderId, spanId) {
  document.getElementById(spanId).innerText =
    document.getElementById(sliderId).value;
}

function loadPlayer(name) {
  if (name === "custom") return;
  const p = presets[name];
  for (let key in p) {
    document.getElementById(key).value = p[key];
    document.getElementById(key + "Val").innerText = p[key];
  }
}

function calculate() {
  const mvps = +mvpsInput();
  const allstars = +allstarsInput();
  const rings = +ringsInput();
  const points = +pointsInput();
  const retired = +retiredInput();

  let score =
    mvps * 10 +
    allstars * 2 +
    rings * 5 +
    (points >= 20 ? 10 : points / 2);

  score = Math.min(score, 100);

  let verdict =
    score >= 85 ? "LOCK 🔒" :
    score >= 70 ? "LIKELY" :
    score >= 55 ? "BORDERLINE" :
    "NO";

  document.getElementById("percent").innerText = score + "%";
  document.getElementById("verdict").innerText = verdict;

  document.getElementById("eligibility").innerText =
    retired < 3 ? "⚠️ Not yet eligible (must be retired 3 seasons)" : "";
}

const mvpsInput = () => document.getElementById("mvps").value;
const allstarsInput = () => document.getElementById("allstars").value;
const ringsInput = () => document.getElementById("rings").value;
const pointsInput = () => document.getElementById("points").value;
const retiredInput = () => document.getElementById("retired").value;
