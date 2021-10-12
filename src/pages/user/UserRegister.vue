<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="primary white--text">
        Register
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submitUser">
          <v-row>
            <v-col class="text-right">
              <v-btn @click="resetApplicantForm" class="mr-4">
                Reset
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" :disabled="invalid">
                submit
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
      <v-row>
        <v-col cols="4" class="text-right">
          Name <span class="rq">*</span>
        </v-col>
        <v-col cols="6">
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            :rules="{
              required: true,
              max: 255,
            }"
          >
            <v-text-field
              v-model="user.name"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="text-right">
          E-Mail Address <span class="rq">*</span>
        </v-col>
        <v-col cols="6">
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            :rules="{
              required: true,
              max: 255,
              email: true,
            }"
          >
            <v-text-field v-model="user.email" :error-messages="errors">
            </v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="text-right">
          Password <span class="rq">*</span>
        </v-col>
        <v-col cols="6">
          <validation-provider
            v-slot="{ errors }"
            name="Password"
            :rules="{
              required: true,
              max: 255,
              min: 6,
            }"
          >
            <v-text-field
              v-model="user.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              :type="show ? 'text' : 'password'"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="text-right">
          Password Confirmation <span class="rq">*</span>
        </v-col>
        <v-col cols="6">
          <validation-provider
            v-slot="{ errors }"
            name="Confirm Password"
            :rules="{
              required: true,
              is: user.password
            }"
          >
          <v-text-field v-model="hh" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              :error-messages="errors"></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="text-right">
          Type
        </v-col>
        <v-col cols="6">
          <v-select v-model="user.type" :items="items"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="text-right">
          Phone
        </v-col>
        <v-col cols="6">
          <v-text-field></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="text-right">
          Date Of Birth
        </v-col>
        <v-col cols="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="user.dob"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="user.dob"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1990-01-01"
              @change="$refs.menu.save(user.dob)"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="text-right">
          Address
        </v-col>
        <v-col cols="6">
          <v-text-field></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="text-right">
          Profile <span class="rq">*</span>
        </v-col>
        <v-col cols="6">
          <v-text-field></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import {
  required,
  // digits,
  email,
  max,
  min,
  is,
  // regex,
  // numeric,
  // image,
  // size
} from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("is", {
  ...is,
  message: "Password and Password Confirmantion is not match",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("min", {
  ...min,
  message: "{_field_} may not be greater than {length} characters",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      items: ["admin", "user"],
      
      show: false,
      show1: false,
      user: {
        name : '',
        email: '',
        password: '',
        type: "admin",
        dob: null,
      },
      menu: false,
    };
  },
};
</script>

<style scoped>
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}
.v-text-field input {
  padding: 0;
}
.rq {
  color: red;
}
</style>
