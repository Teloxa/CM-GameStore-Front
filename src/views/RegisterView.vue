<template>
  <v-container
    fluid 
    style="
      padding-bottom: 0px;
      height: auto;
      justify-content: center;"
  >
    <!-- Header -->
    <div
      class="d-flex"
      style="
        background-color: black;
        width: 100%;
        height: 70px;
        position: sticky;
        justify-content: space-between;
        top: 0"
    >
      <!-- App name -->
      <button
        class="d-flex" 
        @click="GoHome"
        style="
          margin-top: -5px;
          padding-left: 20px;
          padding-right: 20px;"
      >
        <p 
          class="mdi mdi-controller" 
          style="
            margin-top: 0px;
            margin-bottom: 0px;
            font-size: 45px;
            color: #73e900;"
        ></p>
        <p 
          style="
            margin-top: 0px;
            color: white;
            margin-bottom: 0px;
            font-size: 22px;
            padding-top: 20px;
            padding-left: 1px;
            font-weight: 700;"
        >
          Game Store
        </p>
      </button>
      <!-- Iniciar Sesión -->
      <button
        class="underline-hover"
        @click="GoToLogin"
        style="
          padding-right: 20px;
          margin: 0px;
          color: #cecece;
          font-size: 17px;"
      >
        Inicia Sesión
      </button>
    </div>
    <!-- Contenido -->
    <div
      style="
        background-image: url('/imgs/ps4.jpg');
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 130vh;"
    >
      <div 
        class="d-flex" 
        style="
          width: 100%;
          height: fit-content;
          justify-content: center;
          padding-top: 70px;"
      >
        <!-- Label -->
        <div style="padding-top: 100px; margin-right: 34px;">
          <p
            style="
              font-size: 50px;
              color: white;
              font-weight: 600;
              margin: 0px;
              margin-right: 50px;"
          >
            ¡Entra y diviértete!
          </p>
          <p 
            style="
            font-size: 33px;
            width: 800px;
            color: #73e900;
            font-weight: 600;
            font-style: italic;
            font-family: 'Courier New', Courier, monospace;
            margin: 0px;
            margin-top: -10px;
            margin-right: 0px;
            text-shadow: 
              1px -1px 0 #000,  
              1px -1px 0 #000,
              -1px  1px 0 #000,
              1px  1px 0 #000;
            "
          >
            ¿No sabes qué jugar? Tranquil@, de aquí no sales sin resolver ese problema
          </p>
        </div>
        <!-- Formulario -->
        <div
          style="
            width: 500px;
            height: auto;
            padding-bottom: 30px;
            margin-left: 50px;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
            margin: 0px;
            padding-top: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;"
        > 
          <p
            style="
              font-size: 29px;
              font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
              font-weight: 600;"
          >
            Crea una cuenta gratuita
          </p>
          <!-- Google -->
          <button
            class="d-flex"
            style="
              width: 400px;
              border: 2px solid #a7a7a7;
              margin: 0px;
              margin-bottom: 10px;
              height: 50px;
              border-radius: 5px;
              padding-top: 5px;
              justify-content: center;
              transition: box-shadow 0.3s ease, transform 0.2s ease;"
                @mouseover="hoverGoogle = true" @mouseleave="hoverGoogle = false"
                :style="hoverGoogle ? 'border: 3px solid #73e900; transform: translateY(-2px);' : ''"
          >
            <p 
              class="mdi mdi-google" 
              style="
                margin: 0px;
                margin-right: 5px;
                font-size: 23px;
                color: red;"
            ></p>
            <p 
              style="
                margin: 0px;
                padding-top: 3px;
                font-size: 20px;
                font-weight: 500;"
            >
              Continuar con Google
            </p>
          </button>
          <!-- Microsoft -->
          <button
            class="d-flex"
            style="
              width: 400px;
              border: 2px solid #a7a7a7;
              margin: 0px;
              height: 50px;
              margin-bottom: 10px;
              border-radius: 5px;
              padding-top: 5px;
              justify-content: center;
              transition: box-shadow 0.3s ease, transform 0.2s ease;"
                @mouseover="hoverMicrosoft = true" @mouseleave="hoverMicrosoft = false"
                :style="hoverMicrosoft ? 'border: 3px solid #73e900; transform: translateY(-2px);' : ''"
          >
            <p 
              class="mdi mdi-microsoft" 
              style="
                margin: 0px;
                margin-right: 5px;
                font-size: 23px;
                color: grey;"
            ></p>
            <p 
              style="
                margin: 0px;
                padding-top: 3px;
                font-size: 20px;
                font-weight: 500;"
            >
              Continuar con Microsoft
            </p>
          </button>
          <!-- Facebook -->
          <button
            class="d-flex"
            style="
              width: 400px;
              border: 2px solid #a7a7a7;
              margin: 0px;
              margin-bottom: 10px;
              height: 50px;
              border-radius: 5px;
              padding-top: 5px;
              justify-content: center;
              transition: box-shadow 0.3s ease, transform 0.2s ease;"
                @mouseover="hoverFacebook = true" @mouseleave="hoverFacebook = false"
                :style="hoverFacebook ? 'border: 3px solid #73e900; transform: translateY(-2px);' : ''"
          >
            <p 
              class="mdi mdi-facebook" 
              style="
                margin: 0px;
                margin-right: 5px;
                font-size: 25px;
                color: blue;"
            ></p>
            <p 
              style="
                margin: 0px;
                padding-top: 3px;
                font-size: 20px;
                font-weight: 500;"
            >
              Continuar con Facebook
            </p>
          </button>
          <!-- Email -->
          <div
            style="
              width: 100%; 
              padding-left: 48px; 
              padding-right: 48px; 
              margin-top: 20px;"
          >
            <p
              style="
                font-size: 20px;
                font-weight: 500;
                margin: 0px;"
            >
              Correo Electrónico
            </p>
            <input 
              class="input-login"
              v-model="email"
              placeholder="Ejem. holabuenas@gmail.com"
              type="email"
              style="
                border: 2px solid #a7a7a7;
                height: 50px;
                width: 100%;
                border-radius: 5px;
                font-size: 19px;
                padding-inline-start: 10px;
                padding-inline-end: 10px;"
            >
          </div>
          <!-- Usuario y Teléfono -->
          <div class="d-flex">
            <!-- Usuario -->
            <div
              style="
                width: 190px; 
                margin-right: 10px;
                margin-top: 20px;"
            >
              <p
                style="
                  font-size: 20px;
                  font-weight: 500;
                  margin: 0px;"
              >
                Nombre de Usuario
              </p>
              <input 
                class="input-login"
                v-model="username"
                placeholder="elmásperrón"
                type="text"
                style="
                  border: 2px solid #a7a7a7;
                  height: 50px;
                  width: 100%;
                  border-radius: 5px;
                  font-size: 19px;
                  padding-inline-start: 10px;
                  padding-inline-end: 10px;"
              >
            </div>
            <!-- Teléfono -->
            <div
              style="
                width: 190px; 
                margin-left: 10px;
                margin-top: 20px;"
            >
              <p
                style="
                  font-size: 20px;
                  font-weight: 500;
                  margin: 0px;"
              >
                Teléfono
              </p>
              <input 
                class="input-login"
                v-model="phone"
                placeholder="Ejem. 464 589 2054"
                type="text"
                style="
                  border: 2px solid #a7a7a7;
                  height: 50px;
                  width: 100%;
                  border-radius: 5px;
                  font-size: 19px;
                  padding-inline-start: 10px;
                  padding-inline-end: 10px;"
              >
            </div>
          </div>
          <!-- Password -->
          <div
            style="
              width: 100%; 
              padding-left: 48px; 
              padding-right: 48px; 
              margin-top: 20px;"
          >
            <p
              style="
                font-size: 20px;
                font-weight: 500;
                margin: 0px;"
            >
              Contraseña
            </p>
            <input 
              v-model="password"
              class="input-login"
              type="password"
              style="
                border: 2px solid #a7a7a7;
                height: 50px;
                width: 100%;
                border-radius: 5px;
                font-size: 19px;
                padding-inline-start: 10px;
                padding-inline-end: 10px;"
            >
          </div>
          <!-- Botón de registrarse -->
          <button
            class="login"
            @click="Register"
            style="
              background-color: #73e900;
              height: 45px;
              border-radius: 5px;
              border: 0px;
              margin-top: 20px;
              font-weight: 600;
              width: 402px;
              font-size: 17px;
              padding-top: 0px;
              transition: box-shadow 0.3s ease, transform 0.2s ease;"
                @mouseover="hoverLogin = true" @mouseleave="hoverLogin = false"
                :style="hoverLogin ? 'border: 3px solid #73e900; transform: translateY(-2px);' : ''"
          >
            Crear Cuenta
          </button>
          <!-- Botón de inicio de sesión -->
          <div class="d-flex" style="margin-top: 15px; font-size: 17px;">
            <p 
              style="
                margin: 0px;
                margin-right: 5px;
                font-weight: 500;"
            >
              ¿Ya tienes cuenta?
            </p>
            <button 
              @click="GoToLogin"
              class="underline-hover"
              style="
                margin: 0px;"
            >
              Inicia sesión
            </button>
          </div>
          <!-- Política -->
          <div
            style="
              margin-top: 20px;
              border-top: 2px solid #cecece;
              padding-top: 20px;
              color: #a7a7a7;"
          >
            <p style="margin: 0px;">Al continuar, confirmas que tienes 18 años o más, y aceptas</p>
            <p style="margin: 0px;">nuestra Política de Privacidad y Términos de Uso.</p>  
          </div>
        </div>
      </div>
    </div>
  </v-container>

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    timeout="3000"
  >
    {{ snackbarMsg }}
  </v-snackbar>
</template>

<script>
import { useUserStore } from "../stores/userStore";
import { mapActions } from "pinia";

export default {
  name: "RegisterView",

  data() {
    return {
      email: "",
      phone: "",       
      phoneDigits: "",  
      username: "",
      password: "",     

      hoverGoogle: false,
      hoverMicrosoft: false,
      hoverFacebook: false,
      hoverLogin: false,

      snackbar: false,
      snackbarMsg: "",
      snackbarColor: '',
    };
  },
  methods: {
    ...mapActions(useUserStore, ["register"]),

    GoHome() {
      this.$router.push({path: '/'})
      window.scrollTo({ top: 0, behavior: 'auto' });
    },

    GoToLogin() {
      this.$router.push({path: '/Login'})
      window.scrollTo({ top: 0, behavior: 'auto' });
    },

    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    showSnackbar(message, color = "error") {
      this.snackbarMsg = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    formatPhone(digits) {
      if (!digits) return "";
      const p1 = digits.slice(0, 3);
      const p2 = digits.slice(3, 6);
      const p3 = digits.slice(6, 10);

      if (digits.length <= 3) return p1;
      if (digits.length <= 6) return `${p1}-${p2}`;
      return `${p1}-${p2}-${p3}`;
    },

    onPhoneInput(event) {
      let value = event.target.value || "";
      let digits = value.replace(/\D/g, "").slice(0, 10);
      this.phoneDigits = digits;
      this.phone = this.formatPhone(digits);
    },

    async Register() {
      if (!this.email || !this.username || !this.phoneDigits || !this.password) {
        this.showSnackbar("Por favor completa todos los campos", "error");
        return;
      }

      if (!this.isValidEmail(this.email)) {
        this.showSnackbar("Ingresa un correo electrónico válido", "error");
        return;
      }

      if (this.phoneDigits.length !== 10) {
        this.showSnackbar("El teléfono debe tener 10 dígitos", "error");
        return;
      }

      try {
        await this.register({
          email: this.email,
          phone: this.phoneDigits,  
          username: this.username,
          password: this.password,
        });

        this.showSnackbar("Cuenta creada correctamente", "success");
        this.$router.push({ name: "login" });
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          "Error al registrar usuario. Inténtalo de nuevo.";
        this.showSnackbar(msg, "error");
      }
    },
  }
}
</script>

<style scoped>
.v-container {
    width: 100%;
    padding: 0px;
    margin-right: auto;
    margin-left: auto;
}

.input-login:focus {
  border-color: #73e900;
  outline: none;
  box-shadow: 0 0 0 3px #73e900;
}

.input-login::placeholder {
  color: #7a7a7a;
  font-size: 18px;
  font-style: italic;
}

.underline-hover {
  color: #afafaf;
  background: none;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
  transition: text-decoration 0.2s ease;
}

.underline-hover-end {
  color: #afafaf;
  background: none;
  border: none;
  cursor: pointer;
  transition: text-decoration 0.2s ease;
}

.underline-hover:hover {
  text-decoration: underline;
}
</style>