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
    sizer(), (window.onresize = sizer);
  },
  data() {
    return {
      movies: [],
      owner: "Remy Serbinenko",
      github: "https://github.com/James-Ibersteen-Hawker",
    };
  },
  methods: {
    runtime: (time) => `${Math.floor(time / 60)}h ${time % 60}m`,
    released: ([day, month, year]) =>
      `${months[month - 1]} ${day}${(() => {
        const num = day.toString().split("").at(-1);
        if (num === "1") return "st";
        else if (num === "2") return "nd";
        else if (num === "3") return "rd";
        else return "th";
      })()}, ${year}`,
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
