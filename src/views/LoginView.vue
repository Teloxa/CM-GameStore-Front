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
      <!-- Registrar -->
      <button
        class="underline-hover"
        @click="GoToRegister"
        style="
          padding-right: 20px;
          margin: 0px;
          color: #cecece;
          font-size: 17px;"
      >
        Regístrate
      </button>
    </div>
    <!-- Contenido -->
    <div
      style="
        background-image: url('/imgs/login-fondo.jpg');
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 115vh;"
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
        <div style="padding-top: 100px; margin-right: 170px;">
          <p
            style="
              font-size: 45px;
              color: white;
              font-weight: 600;
              margin: 0px;
              margin-right: 50px;"
          >
            ¡Qué gusto verte de nuevo!
          </p>
          <p 
            style="
            font-size: 33px;
            color: #73e900;
            font-weight: 600;
            font-style: italic;
            font-family: 'Courier New', Courier, monospace;
            margin: 0px;
            margin-top: -10px;
            margin-right: 50px;
            text-shadow: 
              1px -1px 0 #000,  
              1px -1px 0 #000,
              -1px  1px 0 #000,
              1px  1px 0 #000;
            "
          >
            ¿Qué aventuras nos esperan hoy?
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
            Iniciar Sesión
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
              Inicia sesión con Google
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
              Inicia sesión con Microsoft
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
              Inicia sesión con Facebook
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
              class="input-login"
              v-model="password"
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
          <!-- Botón de inicio de sesión -->
          <button
            class="login"
            @click="Login"
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
            Iniciar Sesión
          </button>
          <!-- Botón de registro -->
          <div class="d-flex" style="margin-top: 15px; font-size: 17px;">
            <p 
              style="
                margin: 0px;
                margin-right: 5px;
                font-weight: 500;"
            >
              ¿Eres nuevo?
            </p>
            <button 
              @click="GoToRegister"
              class="underline-hover"
              style="
                margin: 0px;"
            >
              Crea una cuenta en Game Store
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
  name: "LoginView",

  data() {
    return {
      email: "",
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
    ...mapActions(useUserStore, ["login"]),
    
    GoHome() {
      this.$router.push({path: '/'})
      window.scrollTo({ top: 0, behavior: 'auto' });
    },

    GoToRegister() {
      this.$router.push({path: '/Register'})
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

    async Login() {
      // Validar campos vacíos
      if (!this.email || !this.password) {
        this.showSnackbar("Por favor completa todos los campos", "error");
        return;
      }

      // Validar formato de correo
      if (!this.isValidEmail(this.email)) {
        this.showSnackbar("Ingresa un correo electrónico válido", "error");
        return;
      }

      try {
        await this.login({ email: this.email, password: this.password });
        this.showSnackbar("Inicio de sesión correcto", "success");
        this.$router.push({ name: "home" });
      } catch (e) {
        const msg =
          e?.response?.data?.message || "Error al iniciar sesión. Inténtalo de nuevo.";
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