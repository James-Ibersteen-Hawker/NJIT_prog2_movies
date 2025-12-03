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
const vue_app = Vue.createApp({
  async created() {
    this.movies = await (await fetch("movies.json")).json();
  },
  data() {
    return {
      movies: [],
      owner: "Remy Serbinenko",
      title: "title",
    };
  },
  methods: {
    runtime: (time) => `${Math.floor(time / 60)}h, ${time % 60}m`,
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
    active: (e, num) =>
      num > 0 ? e.classList.add("active") : e.classList.remove("active"),
  },
});

vue_app.mount("#vue_app");
