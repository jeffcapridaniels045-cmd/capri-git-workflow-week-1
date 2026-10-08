/* ---------- Vanilla JavaScript ---------- */
(function () {
  const bar = document.getElementById("progress");

  function onScroll() {
    const total = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (total > 0 ? (scrollY / total) * 100 : 0) + "%";
    document.body.classList.toggle("scrolled", scrollY > 20);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.GitPage = {
    // Fades elements with .reveal in as they enter the viewport.
    initReveal() {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        }),
        { threshold: 0.12 }
      );
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    },

    // Types git commands into the hero terminal, then loops.
    async typeTerminal(el, lines) {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      while (el.isConnected) {
        el.textContent = "";
        for (const [kind, text] of lines) {
          const row = document.createElement("div");
          row.className = "tl " + kind;
          el.appendChild(row);
          if (kind === "cmd" && !reduce) {
            for (const ch of text) { row.textContent += ch; await sleep(38); }
            await sleep(380);
          } else {
            row.textContent = text;
            await sleep(reduce ? 0 : 260);
          }
        }
        if (reduce) return;
        await sleep(3800);
      }
    },
  };
})();
