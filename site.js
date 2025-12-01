const vue_app = Vue.createApp({
  async created() {
    const imported = await (await fetch("movies.json")).json();
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
    this.movies = imported.map(
      ({
        title,
        iscore,
        rating,
        runtime,
        released: [day, month, year],
        country,
        posters,
        imdb,
        website,
        likes,
        dislikes,
        posterIndex,
      }) => {
        console.log({
          title,
          iscore,
          rating,
          runtime: `${Math.floor(runtime / 60)} hrs ${runtime % 60} min`,
          released: `${months[month]} ${day}${(() => {
            const num = day.toString().split("").at(-1);
            if (num === "1") return "st";
            else if (num === "2") return "nd";
            else if (num === "3") return "rd";
            else return "th";
          })()}, ${year}`,
          country,
          posters,
          imdb,
          website,
          likes,
          dislikes,
          posterIndex,
        });
        return {
          title,
          iscore,
          rating,
          runtime: `${Math.floor(runtime / 60)} hrs ${runtime % 60} min`,
          released: `${months[month]} ${day}${(() => {
            const num = day.toString().split("").at(-1);
            if (num === "1") return "st";
            else if (num === "2") return "nd";
            else if (num === "3") return "rd";
            else return "th";
          })()}, ${year}`,
          country,
          posters,
          imdb,
          website,
          likes,
          dislikes,
          posterIndex,
        };
      }
    );
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    /* ADD FUNCTIONS/METHODS FOR STEP 7 HERE */
  },
});

vue_app.mount("#vue_app");
