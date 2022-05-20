<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-form ref="form" @submit="login">
        <v-card class="elevation-8">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              id="email"
              required
              :rules="[rules.mailControl]"
              prepend-icon="mdi-account"
              name="email"
              label="Email"
              type="text"
              v-model="email"
            ></v-text-field>
            <v-text-field
              required
              id="password"
              prepend-icon="mdi-lock"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              v-model="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary" elevation="3">
              Submit
            </v-btn>
          </v-card-actions>
          <p class="forgotPassword text-right mt-2 mb-4">
            <router-link to="/register">Create an account</router-link>
            or
            <router-link to="/forgotPassword">Forgot password ?</router-link>
          </p>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import myAuthService from "../services/AuthService";
import {bus} from '../main';

export default {
  name: "Login",

  data() {
    return {
      email: null,
      password: "Azerty@123",
      show1: false,
      user: undefined,
      connect: 0,
      loginUser: undefined,
      rules: {
        mailControl: (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)+([.])[a-z]{2,3}$/.test(email) ||
          "Your mail is incorrect",
      },
    };
  },

  methods: {
    async login(event) {
      event.preventDefault();
      //const sanitizer = new Sanitizer();
      if (this.password !== null && this.email !== null) {
        var user = await myAuthService.signin(this.email, this.password);
        //console.table(user);
        if (user.response !== undefined) {
          window.alert(
            "Error " +
              user.response.status +
              " : Das ist nich gut! " +
              user.response.data
          );
          localStorage.clear();
          this.email = this.password = null;
        } else {
          localStorage["sub"] = user.sub;
          this.loginUser = localStorage["login"] = user.login;

          localStorage["email"] = user.email;
          localStorage["iat"] = user.iat;
          localStorage["exp"] = user.exp;
          localStorage["connect"] = myAuthService.connect;

          bus.$emit("connect", myAuthService.connect);
          bus.$emit("login", user.login);

          //this.$router.push({ path: "/project" });
          this.$router.push({ path: "/Project3" });
        }
      }
    },
  },
};
</script>

<style>
.v-application p.forgotPassword {
  font-size: 14px;
  padding: 8px;
  /* text-decoration: none;
  text-decoration-line: none; */
}
</style>