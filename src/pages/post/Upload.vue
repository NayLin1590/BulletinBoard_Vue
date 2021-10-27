<template>
  <v-card class="mx-auto mt-3" max-width="800">
    <v-card-title class="primary white--text">
      Upload CSV File
    </v-card-title>
    <v-container class="px-5 mt-5">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitPost)">
          <v-row>
            <v-col cols="4" class="text-right pr-5">
              CSV File <span class="rq">*</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="CSV File"
                :rules="{
                  required: true,
                }"
              >
                <v-file-input
                  accept="text/csv"
                  label="upload post with csv file"
                  :error-messages="errors"
                  v-model="postfile"
                ></v-file-input>
              </ValidationProvider>
            </v-col>
          </v-row>
          <div v-if="postValidateMsg">
            <v-row v-if="typeof postValidateMsg === 'string'">
            <v-col>
              <v-alert color="red" type="error" elevation="3" text>
                {{ postValidateMsg }}
              </v-alert>
            </v-col>
          </v-row>
          <v-row v-else-if="typeof postValidateMsg === 'object'">
            <v-col>
              <v-alert v-for="(value,index) in postValidateMsg" :key="index" color="red" type="error" elevation="3" text>
              {{ index + " : "+value }}
            </v-alert>
            </v-col>
          </v-row>
          </div>
          
          <v-row>
            <v-col class="text-right">
              <v-btn @click="resetPostForm" type="reset" class="mr-4 error">
                Clear
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="primary">
                Upload
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { mapGetters } from "vuex";
import router from "../../router";
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      postfile: null,
      postValidateMsg: null,
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  created() {},
  methods: {
    submitPost() {
      this.$refs.observer.validate();

      let formData = new FormData();
      formData.append("csvfile", this.postfile);
      formData.append("create_user_id", this.userId);
      formData.append("updated_user_id", this.userId);
      this.$axios
        .post("post/upload", formData)
        .then((data) => {
          // console.log(data)
          if (data) {
            router.push({
              name: "post-list",
            });
          }
        })
        .catch((err) => {
          this.postValidateMsg = err.response.data;
          setTimeout(() => {
            this.postValidateMsg = null;
          }, 5000);
        });
    },
    resetPostForm() {
      this.postValidateMsg = null;
      this.postfile = null;
      this.$refs.observer.reset();
    },
  },
};
</script>

<style>
.star {
  color: red;
}
</style>
