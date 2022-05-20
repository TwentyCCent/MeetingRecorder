<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-form ref="form" @submit="register">
        <v-card class="elevation-8">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              prepend-icon="mdi-account"
              required
              :rules="[rules.login]"
              name="login"
              label="Login"
              type="text"
              v-model="login"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-email"
              required
              :rules="[rules.validateEmail]"
              name="Email"
              label="Email"
              type="mail"
              v-model="email"
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="mdi-lock"
              required
              :rules="[rules.pwd]"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              v-model="password"
            ></v-text-field>
            <v-text-field
              id="confirmPassword"
              prepend-icon="mdi-lock-check"
              required
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :type="show2 ? 'text' : 'password'"
              name="confirmPassword"
              label="Confirm your password"
              v-model="confirmPassword"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              type="button"
              color="primary"
              elevation="3"
              @click="cleanForm()"
            >
              Clear
            </v-btn>
            <v-btn type="submit" color="primary" elevation="3"> Sign Up </v-btn>
            <!-- to="/login" -->
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import myAuthService from "../services/AuthService";

export default {
  name: "Register",
  data() {
    return {
      login: null,
      email: null,
      password: null,
      confirmPassword: null,
      show1: false,
      show2: false,
      rules: {
        login: (login) =>
          /^[\w\d\-_]+$/.test(login) ||
          "Your login name must contain only letters, numbers, _ or -",
        pwd: (pwd) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(pwd) ||
          pwd === null ||
          "At least 8 characters with one number, one lower case, one upper case, and one special character minimum",
        validateEmail: (mail) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)+([.])[a-z]{2,3}$/.test(mail) ||
          mail === null ||
          "The mail entered is not correct",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async register(event) {
      //Neutralise l'envoi du formulaire et on controle le formulaire remplacer dans la balise form par .prevent
      event.preventDefault();
     
      if (this.$refs.form.validate() && this.password === this.confirmPassword) {
        // Test get data
        //console.log("login: " + this.login + ", mail:" + this.email + ", password:" + this.password);
        // Post request new user
        const result = await myAuthService.register(
          this.login,
          this.email,
          this.password
        );
        console.table(result.status)
        console.log("Register req status : "+result.status);
        if (result.status === 403) {
          window.alert("This email is already used");

        } else {
          this.$router.push({ path: "/login" });
        }
      }else{
        window.alert("Passwords are different or the fields are not correct");
      }
    },
    cleanForm() {
      this.login = this.email = this.password = this.confirmPassword = null;
    },
  },
};
</script>

<style>
</style>