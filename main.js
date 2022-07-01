var app = new Vue({
  el: "#app",
  data: {
    arrayUser: [],
    arrayLogin: [],
    search: "",
    user: "",
    pass: "",
  },
  methods: {
    mensaje(title,tex,icon) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    async listUser() {
      const url = "https://randomuser.me/api/?results=10";
      await fetch(url)
        .then((response) => response.json())
        .then((json) => (this.arrayUser = json.results));

      this.arrayUser = this.arrayUser.map((element) => {
        return {
          ...element,
          flag: `https://countryflagsapi.com/png/${element.nat}`,
        };
      });
      this.updateLocal();
    },
    async searchUser() {
      const url = `https://jsonplaceholder.typicode.com/users/${this.search}`;
      await fetch(url)
        .then((response) => response.json())
        .then((json) => (this.arrayData = [json]));
    },
    locaDatosStora() {
      if (localStorage.getItem("users") !== null) {
        this.arrayUser = JSON.parse(localStorage.getItem("users"));
      } else {
        this.listUser();
      }
    },
    updateLocal() {
      localStorage.setItem("users", JSON.stringify(this.arrayUser));
    },
    sesionDatos() {
      if (sessionStorage.getItem("users") !== null) {
        this.arrayLogin = JSON.parse(sessionStorage.getItem("users"));
      } else {
        this.arrayLogin = [];
      }
    },
    updateSesion() {
      sessionStorage.setItem("users", JSON.stringify(this.arrayLogin));
    },
    login() {
      let index = this.arrayUser.findIndex(
        (element) =>
          element.login.username == this.user &&
          element.login.password == this.pass
      );
      if (index !== -1) {
        alert("Inicio de sesion correcto");
        this.arrayLogin.push(this.arrayUser[index]);
        this.updateSesion();
        setTimeout(function () {
          location.href = "inicio.html";
        }, 1500);
      } else {
        alert("Usuario o Contraseña no son correctos");
      }
    },
    logout() {
      setTimeout(function () {
        location.href = "index.html";
      }, 1500);
      this.arrayLogin = [];
      this.updateSesion();

    },
  },
  created() {
    this.locaDatosStora();
    this.sesionDatos();
  },
  mounted() {},
  computed: {},
});
