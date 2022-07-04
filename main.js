var app = new Vue({
  el: "#app",
  data: {
    arrayUser: [],
    arrayLogin: [],
    gender: ["Female", "Male"], //
    date: {
      gender: "",
      picture: {
        medium: "",
      },
      name: {
        first: "",
        last: "",
      },
      email: "",
      cell: "",
      location: {
        country: "",
        city: "",
      },
      dob: {
        age: "",
        date: "",
      },
      login: {
        userName: "",
        password: "",
        passwordRep: "",
      },
    },
    search: "",
    user: "",
    pass: "",
  },
  methods: {
    mensajeMixin(title, icon) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: icon,
        title: title,
      });
    },
    mensajeAfirm() {},
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
    async symbolsConvert() {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "T8uhWDyJJHSdR47zvtal2J50NAlbJR5v");

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      await fetch(
        "https://api.apilayer.com/exchangerates_data/symbols",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    async convert() {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "T8uhWDyJJHSdR47zvtal2J50NAlbJR5v");

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      fetch(
        "https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
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
        this.mensajeMixin("Iniciando Sesión", "success");
        setTimeout(() => {
          this.arrayLogin.push(this.arrayUser[index]);
          location.href = "inicio.html";
          this.updateSesion();
        }, 3000);
      } else {
        alert("Usuario o Contraseña no son correctos");
      }
    },
    logout() {
      this.mensajeMixin("Cerrando Sesión", "success");
      setTimeout(() => {
        location.href = "index.html";
        this.arrayLogin = [];
        this.updateSesion();
      }, 3000);
    },
  },
  created() {
    this.locaDatosStora();
    this.sesionDatos();
  },
  mounted() {},
  computed: {},
});



