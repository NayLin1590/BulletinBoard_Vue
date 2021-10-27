<template>
  <v-card class="mx-auto mt-3" max-width="800">
    <v-card-title class="primary white--text">
      Profile Edit
    </v-card-title>
    <v-container class="px-5">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitEditUser)">
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
                  v-model="userData.name"
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
                <v-text-field v-model="userData.email" :error-messages="errors">
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Type
            </v-col>
            <v-col cols="6">
              <v-select v-model="userData.role" :items="items"></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Phone
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="phone number"
                :rules="{
                  digits: 11,
                  regex: '^(09)\\d{9}$',
                }"
              >
                <v-text-field
                  v-model="userData.phone"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
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
                    v-model="userData.dob"
                    readonly
                    v-bind="attrs"
                    prepend-icon="mdi-calendar"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="userData.dob"
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1990-01-01"
                  @change="$refs.menu.save(userData.dob)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Address
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Address"
                :rules="{
                  max: 255,
                }"
              >
                <v-text-field
                  v-model="userData.address"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              Old Profile
            </v-col>
            <v-col cols="6">
              <img width="150px" :src="oldProfile" alt="" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-right">
              New Profile
            </v-col>
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Profile Photo"
                :rules="{
                  image: true,
                  size: 2048,
                }"
              >
                <v-file-input
                  v-model="newProfile"
                  :error-messages="errors"
                  prepend-icon="mdi-camera"
                  accept="image/*"
                ></v-file-input>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row v-if="userValidateMsg">
            <v-col>
              <v-alert
                v-for="(value, index) in userValidateMsg"
                :key="index"
                color="red"
                type="error"
                elevation="3"
                text
              >
                {{ index + " : " + value }}
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-right">
              <v-btn type="submit" class="primary">
                Edit
              </v-btn>
              <v-btn @click="cancelUserEdit" class="ml-4 secondary">
                Cancel
              </v-btn>
            </v-col>
            <v-col class="pt-5">
              <router-link :to="{ name: 'change-password' }"
                >Change Password
              </router-link>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import {
  required,
  digits,
  email,
  max,
  min,
  regex,
  image,
  size,
} from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
import router from "../../router";
// import router from "../../router";
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match 09*********",
});
extend("min", {
  ...min,
  message: "{_field_} may not be greater than {length} characters",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});
extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});
extend("image", {
  ...image,
  message: "{_field_} please select img type",
});
extend("size", {
  ...size,
  message: `file size is grater than {size} kb`,
});
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      items: ["admin", "user"],
      menu: false,
      userData: {
        name: "",
        email: "",
        role: "admin",
        phone: "",
        dob: null,
        address: "",
        profile: null,
        create_user_id: null,
        updated_user_id: null,
      },
      oldProfile: null,
      newProfile: null,
    };
  },
  computed: {
    ...mapGetters(["userId", "userValidateMsg"]),
  },
  created() {
    this.$axios.get(`user/details?id=${this.userId}`).then((data) => {
      this.userData = data.data.user;
      if (data.data.role == 1) {
        this.userData.role = "user";
      } else {
        this.userData.role = "admin";
      }
      this.oldProfile = data.data.profileImg;
    });
  },
  mounted() {},
  methods: {
    submitEditUser() {
      this.$refs.observer.validate();
      let formData = new FormData();

      if (this.userData.role == "admin") {
        this.userData.role = 0;
      } else {
        this.userData.role = 1;
      }
      Object.entries(this.userData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (this.newProfile) {
        formData.append("profile", this.userData.name + this.newProfile.name);
        formData.append("image", this.newProfile);
      }
      this.$store.dispatch("editUser", formData);
    },
    cancelUserEdit() {
      router.push({
        name: "user-profile",
      });
    },
  },
};
</script>

<style scoped>
.v-input--selection-controls {
  margin-top: 0;
}
.star {
  color: red;
}
a {
  text-decoration: none;
  font-weight: 700;
}
</style>
