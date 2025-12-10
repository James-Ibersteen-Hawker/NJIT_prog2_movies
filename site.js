"use strict";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const { nextTick } = Vue;
const vue_app = Vue.createApp({
  async created() {
    this.movies = await (await fetch("movies.json")).json();
    await nextTick();
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
    sizer(), (window.onresize = sizer);
  },
  data() {
    return {
      movies: [],
      owner: "Remy Serbinenko",
      github: "https://github.com/James-Ibersteen-Hawker/NJIT_prog2_movies",
    };
  },
  methods: {
    runtime: (time) => `${Math.floor(time / 60)}h ${time % 60}m`,
    released: ([d, m, y]) =>
      `${months[m - 1]} ${d}${(() => {
        const lastTwo = d.toString().slice(-2);
        const num = lastTwo.slice(-1);
        if (["11", "12", "13"].includes(lastTwo)) return "th";
        else if (num === "1") return "st";
        else if (num === "2") return "nd";
        else if (num === "3") return "rd";
        else return "th";
      })()}, ${y}`,
    // released: ([d, m, y]) => {
    //   `${months[m - 1]} ${d}${(() => {
    //     return ["11", "12", "13"].includes((d + "").slice(-2))
    //       ? "th"
    //       : { 1: "st", 2: "nd", 3: "rd" }[(d + "").slice(-1)] || "th";
    //   })()}, ${y}`;
    // }, chatGPT suggestion for extreme compactness that I thought was quite cute and clever
    up: function (i, which) {
      this.active(
        document.getElementsByClassName(which)[i],
        ++this.movies[i][which]
      );
    },
    switchImg: function (i) {
      this.movies[i].posterIndex =
        (this.movies[i].posterIndex + 1) % this.movies[i].posters.length;
    },
    active: (e, num) =>
      num > 0 ? e.classList.add("active") : e.classList.remove("active"),
    toTop: () => (window.location = "#vue_app"),
  },
  computed: {
    title: function () {
      return `Imdb + Remy's Top ${this.movies.length} Movies`;
    },
  },
});
vue_app.mount("#vue_app");
function sizer() {
  const height = new Set();
  const headers = Array.from(document.querySelectorAll(".film-header"));
  headers.forEach((e) => {
    e.removeAttribute("style");
    height.add(e.offsetHeight);
  });
  if (height.size > 0) {
    const mH = Array.from(height).sort().at(-1);
    headers.forEach((e) => e.setAttribute("style", `height: ${mH}px`));
  }
}
