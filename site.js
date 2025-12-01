const vue_app = Vue.createApp({
  async created() {
    this.movies = await (await fetch("movies.json")).json();
    this.months = [
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
  },
  data() {
    return {
      movies: [],
      months: [],
    };
  },
  methods: {
    runtime: (time) => `${Math.floor(time / 60)} hrs, ${time % 60} min`,
    released: ([day, month, year]) =>
      `${this.months[month]} ${day}${(() => {
        const num = day.toString().split("").at(-1);
        if (num === "1") return "st";
        else if (num === "2") return "nd";
        else if (num === "3") return "rd";
        else return "th";
      })()}, ${year}`,
  },
  computed: {},
});

vue_app.mount("#vue_app");
