<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="primary white--text">
        Reset Password
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(resetPasswordUpdate)">
          <v-row>
            <v-col cols="4" class="text-right">
              New Password <span class="rq">*</span>
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
                  v-model="passwordData.newpassword"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  :type="show ? 'text' : 'password'"
                  :error-messages="errors"
                  autocomplete="false"
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
                  is: passwordData.newpassword,
                }"
              >
                <v-text-field
                  v-model="passwordData.confirmpassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  :type="show1 ? 'text' : 'password'"
                  :error-messages="errors"
                  autocomplete="false"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row v-if="errMsg">
            <v-col>
              <v-alert
                v-for="(value, index) in errMsg"
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
              <v-btn
                @click="cancelResetPassword"
                type="reset"
                class="mr-4 secondary"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="primary">
                Update Password
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script>
import { required, min, is } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { mapGetters } from "vuex";
import router from "../../router";
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("is", {
  ...is,
  message: "Password and Password Confirmantion is not match",
});
extend("min", {
  ...min,
  message: "{_field_} may not be greater than {length} characters",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  beforeCreate() {
    // console.log(this.$route.query.id)
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  mounted() {},
  data() {
    return {
      showCurrent: false,
      show: false,
      show1: false,
      passwordData: {
        token: null,
        newpassword: null,
        confirmpassword: null,
        id:null,
      },
      userData: {
        email: null,
      },
      errMsg: null,
    };
  },
  methods: {
    resetPasswordUpdate() {
      this.$refs.observer.validate();

      this.passwordData.token = this.$route.query.id;

      this.$axios
        .post("user/resetPasswordData", this.passwordData)
        .then((data) => {
          this.userData.email = data.data.email;
          if (this.userData.email != null) {
            this.$axios
              .get(`user/email?email=${this.userData.email}`)
              .then((data) => {
                if(data){
                  this.passwordData.id = data.data.id
                  this.$axios.post("/user/updatePassword",this.passwordData
                  )
                    .then(data=>{
                      if(data){
                        router.push({
                          name:"login"
                        })
                      }
                    })
                    .catch(err=>{
                      console.log(err)
                    })
                }
              })
              .catch((err) => {
                this.errMsg = err.response.data;
                setTimeout(() => {
                  this.errMsg = null;
                }, 5000);
              });
          } else {
            console.log(this.userData.email);
          }
        })
        .catch((err) => {
          this.errMsg = err.response.data;
          setTimeout(() => {
            this.errMsg = null;
          }, 5000);
        });

      // this.$store.dispatch("changePassword", this.passwordData);
    },
    cancelResetPassword() {
      router.push({
        name: "post-list",
      });
    },
  },
};
</script>

<style></style>
