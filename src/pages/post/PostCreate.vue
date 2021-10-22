<template>
  <v-card class="mx-auto mt-3" max-width="800">
    <v-card-title class="primary white--text">
      Post Create
    </v-card-title>
    <v-container class="px-5">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitPost)">
          <v-row>
            <v-col cols="4" class="text-right pr-5">
              Title <span class="rq">*</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="Title"
                :rules="{
                  required: true,
                  max: 255,
                }"
              >
                <v-text-field
                  :error-messages="errors"
                  v-model="post.title"
                  label="Title here.."
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-right pr-5">
              Description <span class="rq">*</span>
            </v-col>
            <v-col cols="8">
              <ValidationProvider
                v-slot="{ errors }"
                name="Description"
                rules="required"
              >
                <v-textarea
                  name="description"
                  label="Something text here..."
                  :error-messages="errors"
                  v-model="post.description"
                  rows="3"
                  auto-grow
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row v-if="postValidateMsg">
            <v-col>
              <v-alert v-for="(value,index) in postValidateMsg" :key="index" color="red" type="error" elevation="3" text>
              {{ index + " : "+value }}
            </v-alert>
            </v-col>
            
          </v-row>
          <v-row>
            <v-col class="text-right">
              <v-btn @click="resetPostForm" type="reset" class="mr-4 error">
                Reset
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="primary">
                submit
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
      post: {
        title: "",
        description: "",
        status: 1,
        create_user_id: null,
        updated_user_id: null,
      },
    };
  },
  computed: {
    ...mapGetters(["userId", "createPostData", "postValidateMsg"]),
  },
  created() {
    if (this.createPostData) {
      this.post = this.createPostData;
      this.$store.dispatch("cancelCreatePost");
    }
  },
  methods: {
    submitPost() {
      this.$refs.observer.validate();
      this.post.create_user_id = this.userId;
      this.post.updated_user_id = this.userId;
      this.$store.dispatch("validatePost", this.post);
    },
    resetPostForm() {
      this.$store.state.postValidateMsg = null
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
