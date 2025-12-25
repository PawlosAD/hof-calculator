const presets = {
  lebron: { mvps: 4, allstars: 20, rings: 4, points: 40, retired: 0 },
  jordan: { mvps: 5, allstars: 14, rings: 6, points: 32, retired: 20 }
};

function updateValue(slider, label) {
  document.getElementById(label).innerText =
    document.getElementById(slider).value;
}

function loadPlayer(name) {
  if (name === "custom") return;
  const p = presets[name];
  for (let key in p) {
    document.getElementById(key).value = p[key];
    document.getElementById(key + "Val").innerText = p[key];
  }
  calculate();
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
    Math.min(points, 20);

  score = Math.min(score, 100);

  let verdict =
    score >= 85 ? "LOCK 🔒" :
    score >= 70 ? "LIKELY" :
    score >= 55 ? "BORDERLINE" :
    "NO";

  document.getElementById("percent").innerText = score + "%";
  document.getElementById("verdict").innerText = verdict;

  document.getElementById("eligibility").innerText =
    retired < 3 ? "⚠ Not yet eligible (3 seasons retired required)" : "";

  drawGraph();
}

function toggleGraph() {
  const canvas = document.getElementById("graph");
  canvas.style.display = canvas.style.display === "none" ? "block" : "none";
  if (canvas.style.display === "block") drawGraph();
}

function drawGraph() {
  const canvas = document.getElementById("graph");
  if (canvas.style.display === "none") return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const mvps = +mvpsInput();
  const allstars = +allstarsInput();

  const career = Math.max(allstars, 5);
  const peak = Math.min(90, mvps * 15 + allstars * 3);

  ctx.strokeStyle = "#00ff88";
  ctx.beginPath();

  for (let year = 0; year <= career; year++) {
    const x = (year / career) * canvas.width;
    const peakYear = career / 2;
    const dom =
      peak * Math.exp(-Math.pow(year - peakYear, 2) / (career * 2));
    const y = canvas.height - (dom / 100) * canvas.height;
    year === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }

  ctx.stroke();
}

// input helpers
const mvpsInput = () => document.getElementById("mvps").value;
const allstarsInput = () => document.getElementById("allstars").value;
const ringsInput = () => document.getElementById("rings").value;
const pointsInput = () => document.getElementById("points").value;
const retiredInput = () => document.getElementById("retired").value;
