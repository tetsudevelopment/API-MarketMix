var app = new Vue({
  el: "#app",
  data: {
    arrayUser: [],
    arrayLogin: [],
    img: "",
    from: "",
    to: "",
    amount: "",
    gender: {
      female: "Femenino",
      male: "Masculino",
    }, //
    date: {
      gender: "female",
      picture: {
        medium: "",
      },
      name: {
        first: "s",
        last: "s",
      },
      email: "maxime.ma@example.com",
      cell: "2",
      location: {
        country: "sa",
        city: "as",
      },
      dob: {
        age: "sa",
        date: "",
      },
      login: {
        username: "",
        password: "ssa",
      },
    },
    search: "",
    user: "",
    pass: "",
  },
  methods: {
    async imgg() {
      console.log(this.date.gender);
      const url = `https://randomuser.me/api/?gender=${this.date.gender}`;
      await fetch(url)
        .then((response) => response.json())
        .then((json) => (this.img = json.results));
      // this.date.picture.medium = this.img;
      this.img.forEach((element) => {
        this.date.picture.medium = element.picture.medium;
      });
    },
    saveForm() {
      const gender = this.date.gender;
      const first = this.date.first;
      const last = this.date.last;
      const email = this.date.email;
      const cell = this.date.cell;
      const country = this.date.location.country;
      const city = this.date.location.city;
      const age = this.date.dob.age;
      const username = this.date.login.username;
      const password = this.date.login.password;
      if (
        gender == "" ||
        first == "" ||
        last == "" ||
        email == "" ||
        cell == "" ||
        country == "" ||
        city == "" ||
        age == "" ||
        username == "" ||
        password == ""
      ) {
        console.log("If");
        this.mensajeMixin("Rellene los Espacios en blanco", "error");
      } else {
        const usernameRep = this.arrayUser.findIndex((element) => {
          if (this.date.login.username == element.login.username) {
            return element;
          }
        });
        console.log(usernameRep);
        const emailRep = this.arrayUser.findIndex((element) => {
          if (this.date.email == element.email) {
            return element;
         }
        });
        console.log(usernameRep);
        if (usernameRep ==-1) {
          if (emailRep == -1) {
            // this.imgg();
            this.arrayUser.push(this.date);
            this.updateLocal();
            setTimeout(() => {
              this.date.gender='';
              this.date.first='';
              this.date.last='';
              this.date.email='';
              this.date.cell='';
              this.date.location.country='';
              this.date.location.city='';
              this.date.dob.age='';
              this.date.login.username='';
              this.date.login.password='';
             }, 3000);
            this.mensajeMixin("Usuario Creado Exitosamente", "success")

          } else {
            this.mensajeMixin("El email ya se encuentra registrado","error")
          }
        } else {
          this.mensajeMixin(
            "El usuario ya se encuentra registrado","error");
        }


      }
    },
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
        .then((result) => console.log(result.symbols))
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
