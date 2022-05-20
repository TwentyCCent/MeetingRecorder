<template>
    <v-form ref="form" @submit.prevent="register">
      <v-layout fluid fill-height align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-8">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{title}}</v-toolbar-title>
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
                hint="At least 8 characters with one number, one lower case, one upper case, and one special character minimum"
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
              <v-btn type="submit" color="primary" elevation="3">
                {{title}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
</template>

<script>
export default {
  name: "CardAuth",
  data: {
    title: title,
    textfield: [
      {
        id: id,
        prependIcon: prependIcon,
        apendIcon: appendIcon,
        nameText: nameText,
        label: label,
        vModel: vModel,
      },
    ],
    button: [
      {
        label: label,
        type: type,
        function: methods,
      },
    ],
  },
};
</script>

<style>
</style>