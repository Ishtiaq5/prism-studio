(function () {
  "use strict";

  var el = {
    c1: document.getElementById("c1"),
    c2: document.getElementById("c2"),
    c3: document.getElementById("c3"),
    c1out: document.getElementById("c1out"),
    c2out: document.getElementById("c2out"),
    c3out: document.getElementById("c3out"),
    shape: document.getElementById("shape"),
    angle: document.getElementById("angle"),
    angleOut: document.getElementById("angleOut"),
    glow: document.getElementById("glow"),
    glowOut: document.getElementById("glowOut"),
    radius: document.getElementById("radius"),
    radiusOut: document.getElementById("radiusOut"),
    animate: document.getElementById("animate"),
    preview: document.getElementById("preview"),
    cssOut: document.getElementById("cssOut"),
    status: document.getElementById("status"),
    copy: document.getElementById("copy"),
    random: document.getElementById("random"),
    reset: document.getElementById("reset"),
    surprise: document.getElementById("surprise"),
    grid: document.getElementById("presetGrid")
  };

  var DEFAULTS = { c1: "#7c3aed", c2: "#2dd4bf", c3: "#f472b6", shape: "linear", angle: 135, glow: 52, radius: 28, animate: true };

  var PRESETS = [
    { name: "Violet Dusk", c1: "#7c3aed", c2: "#2dd4bf", c3: "#f472b6", shape: "linear", angle: 135, glow: 56, radius: 28 },
    { name: "Solar Flare", c1: "#f97316", c2: "#facc15", c3: "#ef4444", shape: "radial", angle: 200, glow: 68, radius: 22 },
    { name: "Deep Ocean", c1: "#0ea5e9", c2: "#1e3a8a", c3: "#22d3ee", shape: "linear", angle: 160, glow: 44, radius: 32 },
    { name: "Neon Mint", c1: "#22d3ee", c2: "#4ade80", c3: "#a3e635", shape: "conic", angle: 90, glow: 60, radius: 20 },
    { name: "Magenta Haze", c1: "#e11d48", c2: "#a21caf", c3: "#6d28d9", shape: "linear", angle: 25, glow: 72, radius: 26 },
    { name: "Arctic Glass", c1: "#e2e8f0", c2: "#94a3b8", c3: "#38bdf8", shape: "radial", angle: 0, glow: 38, radius: 34 },
    { name: "Ember Night", c1: "#f59e0b", c2: "#b91c1c", c3: "#4c1d95", shape: "linear", angle: 210, glow: 64, radius: 24 },
    { name: "Aurora Veil", c1: "#34d399", c2: "#6366f1", c3: "#f0abfc", shape: "conic", angle: 140, glow: 58, radius: 30 },
    { name: "Chrome Bloom", c1: "#cbd5e1", c2: "#f472b6", c3: "#7c3aed", shape: "linear", angle: 75, glow: 50, radius: 18 },
    { name: "Midnight Lime", c1: "#84cc16", c2: "#0f766e", c3: "#0b1120", shape: "linear", angle: 190, glow: 46, radius: 36 }
  ];

  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    return m
      ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
      : { r: 0, g: 0, b: 0 };
  }

  function up(hex) { return (hex || "#000000").toUpperCase(); }

  function rgba(hex, a) {
    var c = hexToRgb(hex);
    return "rgba(" + c.r + ", " + c.g + ", " + c.b + ", " + a + ")";
  }

  function buildGradient() {
    var s = el.shape.value;
    var angle = el.angle.value;
    var a = el.c1.value, b = el.c2.value, c = el.c3.value;
    if (s === "radial") {
      return "radial-gradient(circle at 30% 20%, " + up(a) + " 0%, " + up(b) + " 48%, " + up(c) + " 100%)";
    }
    if (s === "conic") {
      return "conic-gradient(from " + angle + "deg at 50% 50%, " + up(a) + ", " + up(b) + ", " + up(c) + ", " + up(a) + ")";
    }
    return "linear-gradient(" + angle + "deg, " + up(a) + " 0%, " + up(b) + " 50%, " + up(c) + " 100%)";
  }

  function shadowCss() {
    var g = parseInt(el.glow.value, 10);
    if (!g) return "none";
    return "0 26px 70px -22px " + rgba(el.c1.value, Math.min(0.95, g / 100 + 0.12).toFixed(2));
  }

  function cssText() {
    var lines = [
      ".gradient-card {",
      "  background: " + buildGradient() + ";",
      "  box-shadow: " + shadowCss() + ";",
      "  border-radius: " + el.radius.value + "px;"
    ];
    if (el.animate.checked) {
      lines.push("  background-size: 220% 220%;");
      lines.push("  animation: prism-flow 12s ease-in-out infinite alternate;");
    }
    lines.push("}");
    if (el.animate.checked) {
      lines.push("");
      lines.push("@keyframes prism-flow {");
      lines.push("  0% { background-position: 0% 50%; }");
      lines.push("  100% { background-position: 100% 50%; }");
      lines.push("}");
    }
    return lines.join("\n");
  }

  function render() {
    el.c1out.textContent = up(el.c1.value);
    el.c2out.textContent = up(el.c2.value);
    el.c3out.textContent = up(el.c3.value);
    el.angleOut.textContent = el.angle.value + "\u00B0";
    el.glowOut.textContent = el.glow.value;
    el.radiusOut.textContent = el.radius.value;

    var p = el.preview;
    p.style.background = buildGradient();
    p.style.boxShadow = shadowCss();
    p.style.borderRadius = el.radius.value + "px";
    p.classList.toggle("animated", el.animate.checked);
    el.cssOut.textContent = cssText();
  }

  function apply(values) {
    el.c1.value = values.c1;
    el.c2.value = values.c2;
    el.c3.value = values.c3;
    el.shape.value = values.shape;
    el.angle.value = values.angle;
    el.glow.value = values.glow;
    el.radius.value = values.radius;
    el.animate.checked = !!values.animate;
    render();
  }

  function say(msg) {
    el.status.textContent = msg;
    window.clearTimeout(say.timer);
    say.timer = window.setTimeout(function () { el.status.textContent = ""; }, 2600);
  }

  function currentValues() {
    return {
      c1: el.c1.value, c2: el.c2.value, c3: el.c3.value,
      shape: el.shape.value, angle: el.angle.value, glow: el.glow.value,
      radius: el.radius.value, animate: el.animate.checked
    };
  }

  function randomHex() {
    var h = "";
    var pool = "0123456789abcdef";
    for (var i = 0; i < 6; i++) { h += pool.charAt(Math.floor(Math.random() * 16)); }
    return "#" + h;
  }

  function randomize() {
    var shapes = ["linear", "radial", "conic"];
    apply({
      c1: randomHex(),
      c2: randomHex(),
      c3: randomHex(),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      angle: Math.floor(Math.random() * 361),
      glow: 30 + Math.floor(Math.random() * 80),
      radius: 12 + Math.floor(Math.random() * 40),
      animate: true
    });
    say("Fresh gradient mixed.");
  }

  function copyCss() {
    var text = cssText();
    function ok() { say("CSS copied to clipboard."); }
    function fail() { say("Copy blocked - select the code block instead."); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { legacyCopy(text) ? ok() : fail(); });
    } else {
      legacyCopy(text) ? ok() : fail();
    }
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var done = document.execCommand("copy");
      document.body.removeChild(ta);
      return done;
    } catch (e) {
      return false;
    }
  }

  function buildPresets() {
    PRESETS.forEach(function (p, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "preset";
      btn.setAttribute("role", "listitem");
      btn.setAttribute("aria-label", "Load preset " + p.name);
      var sw = document.createElement("span");
      sw.className = "preset-swatch";
      sw.setAttribute("aria-hidden", "true");
      sw.style.background = "linear-gradient(135deg, " + p.c1 + ", " + p.c2 + " 55%, " + p.c3 + ")";
      var nm = document.createElement("span");
      nm.className = "preset-name";
      nm.textContent = p.name;
      btn.appendChild(sw);
      btn.appendChild(nm);
      btn.addEventListener("click", function () {
        apply(p);
        say("Loaded: " + p.name);
        document.getElementById("studio").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      el.grid.appendChild(btn);
      if (i === 0) { /* first preset stays available as default styling */ }
    });
  }

  ["c1", "c2", "c3", "shape", "angle", "glow", "radius", "animate"].forEach(function (k) {
    el[k].addEventListener("input", render);
    el[k].addEventListener("change", render);
  });

  el.copy.addEventListener("click", copyCss);
  el.random.addEventListener("click", randomize);
  el.reset.addEventListener("click", function () { apply(DEFAULTS); say("Reset to defaults."); });
  el.surprise.addEventListener("click", function () {
    randomize();
    document.getElementById("studio").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  buildPresets();
  render();
})();