<template>
  <v-card class="mx-auto mt-3" max-width="800">
    <v-card-title class="primary white--text">
      Post Edit
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
          <v-row>
            <v-col cols="4" class="text-right pr-5">
              Status
            </v-col>
            <v-col cols="8">
              <v-switch v-model="post.status"></v-switch>
            </v-col>
          </v-row>
          <v-row v-if="editPostValidateMsg">
            <v-col>
              <v-alert v-for="(value,index) in editPostValidateMsg" :key="index" color="red" type="error" elevation="3" text>
              {{ index + " : "+value }}
            </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-right">
              <v-btn @click="cancelPostEdit" class="mr-4 secondary">
                Cancel
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" class="success">
                Update
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
      post: {
        title: "",
        description: "",
        status: false,
        create_user_id: null,
        updated_user_id: null,
      },
      editId: {
        id: null,
      },
    };
  },
  computed: {
    ...mapGetters(["userId", "postEditId","editPostValidateMsg"]),
  },
  mounted() {
    this.editId.id = this.postEditId;
    if (this.editId.id) {
      this.$axios
        .post("/post/details", this.editId)
        .then((data) => {
          this.post = data.data;
        })
        .catch((err) => console.log(err));
    }
  },
  methods: {
    submitPost() {
      this.$refs.observer.validate();
      this.post.updated_user_id = this.userId;
      if(!this.post.status) {
        this.post.status = 0
      }else{
        this.post.status = 1
      }
      this.$store.dispatch("validateEditPost", this.post);
    },
    cancelPostEdit() {
      // this.$refs.observer.reset();
      this.$store.dispatch("postEditId",null);
      router.push({
        name: "post-list"
      })
    },
  },
};
</script>

<style scoped>
.v-input--selection-controls{
  margin-top: 0;
}
.star {
  color: red;
}
</style>
