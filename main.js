var app = new Vue({
  el: "#app",
  data: {
    status: 0,
    arrayUser: [],
    arrayLogin: [],
    symbolsP: [],
    img: "",
    from: "",
    to: "",
    amount: "",
    result: {
      result: 0,
    },
    gender: {
      female: "Femenino",
      male: "Masculino",
    }, //
    search: "",
    user: "",
    pass: "",
    passOld: "",
    passNew: "",
    passRep: "",
    editData: {
      gender: "male",
      name: {
        title: "Mr",
        first: "Agustín",
        last: "Zúñiga",
      },
      location: {
        street: {
          number: 6245,
          name: "Prolongación Guinea Ecuatorial",
        },
        city: "Ameca",
        state: "Sonora",
        country: "Mexico",
        postcode: 21820,
        coordinates: {
          latitude: "26.2559",
          longitude: "-118.6642",
        },
        timezone: {
          offset: "+8:00",
          description: "Beijing, Perth, Singapore, Hong Kong",
        },
      },
      email: "agustin.zuniga@example.com",
      login: {
        uuid: "0fd9e0c2-26c1-49e0-85a8-d80b7f3f5a59",
        username: "purpleleopard841",
        password: "facial",
        salt: "kzXeK5as",
        md5: "9117015298ba6cfae61e3fd53c3da164",
        sha1: "e74e8cd1f3713bdfa507236778971ee1ed7ff4ae",
        sha256:
          "7f97340645e2bd1978b7a57ee7d04e49b72cdec5b09c02450dd2a3a9d6ef3b55",
      },
      dob: {
        date: "1973-06-15T06:22:19.380Z",
        age: 49,
      },
      registered: {
        date: "2002-06-27T12:04:38.287Z",
        age: 20,
      },
      phone: "(649) 293 6351",
      cell: "(638) 413 1373",
      id: {
        name: "NSS",
        value: "83 66 13 7547 5",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/74.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/74.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/74.jpg",
      },
      nat: "MX",
    },
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
        username: "",
        password: "",
      },
    },
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
      console.log("Entrando a Symbols");
      const myHeaders = new Headers();
      myHeaders.append("apikey", "V3ggGQF8SIW9GM8WOIdVwl3ERcQq2phk");

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
        .then((result) => (this.symbolsP = result.symbols))
        .catch((error) => console.log("error", error));
      this.updateLocal();
    },
    async convert() {
      const myHeaders = new Headers();
      myHeaders.append("apikey", "V3ggGQF8SIW9GM8WOIdVwl3ERcQq2phk");

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${this.to}&from=${this.from}&amount=${this.amount}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => (this.result = JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    cambio() {
      this.to = "";
      this.amount = "";
      this.from = "";
      this.result = { result: 0 };
    },
    locaDatosStora() {
      if (localStorage.getItem("users") !== null) {
        this.arrayUser = JSON.parse(localStorage.getItem("users"));
      } else {
        this.listUser();
      }
      if (localStorage.getItem("symbols") !== null) {
        this.symbolsP = JSON.parse(localStorage.getItem("symbols"));
      } else {
        this.symbolsConvert();
      }
    },
    updateLocal() {
      localStorage.setItem("users", JSON.stringify(this.arrayUser));
      localStorage.setItem("symbols", JSON.stringify(this.symbolsP));
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
        this.mensajeMixin('Usuario o contraseña no son correctos','error')
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
        if (usernameRep == -1) {
          if (emailRep == -1) {
            // this.imgg();
            this.arrayUser.push(this.date);
            this.updateLocal();
            setTimeout(() => {
              this.date.gender = "";
              this.date.first = "";
              this.date.last = "";
              this.date.email = "";
              this.date.cell = "";
              this.date.location.country = "";
              this.date.location.city = "";
              this.date.dob.age = "";
              this.date.login.username = "";
              this.date.login.password = "";
            }, 3000);
            this.mensajeMixin("Usuario Creado Exitosamente", "success");
          } else {
            this.mensajeMixin("El email ya se encuentra registrado", "error");
          }
        } else {
          this.mensajeMixin("El usuario ya se encuentra registrado", "error");
        }
      }
    },
    del(index) {
      this.arrayUser.splice(index, 1);
      this.updateLocal();
    },
    edit(index) {
      this.editData = JSON.parse(JSON.stringify(this.arrayUser[index]));
    },
    cambio() {
      if (this.status == 0) {
        this.status = 1;
      } else {
        this.status = 0;
      }
    },
    save() {
      let passOld = this.passOld;
      let passNew = this.passNew;
      let passRep = this.passRep;
      let pass = this.editData.login.password;
      if (this.status == 1) {
        if (passOld != '' && passNew != '' && passRep != '') {
          if (passOld == pass) {
            if (passNew.length>4) {
              if (passNew == passRep) {
                this.editData.login.password = passNew;
                let index = this.arrayUser.findIndex(element => {
                  if (element.email == this.editData.email) {
                    return element;
                  }
                });
                console.log(index);
                let borrado = this.arrayUser.splice(index, 1, this.editData)
                this.editData.login.password = this.passRep;
                console.log(borrado);
                this.mensajeMixin('Datos cambiados exitosamente', 'success')
                this.updateLocal();
                this.updateSesion();
                this.passNew = '';
                this.passOld = '';
                this.passRep = '';
              } else {
                this.mensajeMixin('Las contraseñas no coinciden','error')
              }
            } else {
              this.mensajeMixin('La contraseña debe tener minimo 5 caracteres','error')
            }
          } else {
            this.mensajeMixin('La contraseña ingresada no es la actual, verifique','error')
          }
        } else {
          this.mensajeMixin('Rellene los espacios vacios', 'error')
        }
      } else {
        this.mensajeMixin('Datos Guardados Exitosamente','success')
      }
    },
  },
  created() {
    this.locaDatosStora();
    this.sesionDatos();
  },
  mounted() {},
  computed: {},
});

// {
//     "success": true,
//     "query": {
//         "from": "AED",
//         "to": "AFN",
//         "amount": 2000
//     },
//     "info": {
//         "timestamp": 1657043795,
//         "rate": 23.880767
//     },
//     "date": "2022-07-05",
//     "result": 47761.534
// }