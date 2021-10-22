<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <!-- <a color="primary" dark v-bind="attrs" v-on="on">
          {{ userdetail.name }}
        </a> -->
        <v-btn color="error" v-bind="attrs" v-on="on">Delete</v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            Delete Confirm
            <v-spacer></v-spacer>
            <v-btn text @click="dialog.value = false"
              ><v-icon>mdi-minus</v-icon></v-btn
            ></v-toolbar
          >
          <v-card-text>
            <p class="delete-txt pt-3 pl-2">Are you sure to delete Post?</p>
            <div class="pl-5 ml-5">
              <v-row>
                <v-col cols="5">
                  ID
                </v-col>
                <v-col cols="7">
                  {{ deletepost.id }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Title
                </v-col>
                <v-col cols="7">
                  {{ deletepost.title }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Description
                </v-col>
                <v-col cols="7">
                  {{ deletepost.description }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="5">
                  Status
                </v-col>
                <v-col cols="7">
                  <div v-if="deletepost.status == 1">
                    Active
                  </div>
                  <div v-else>
                    Inactive
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Cancel</v-btn>
              <v-btn text @click="remove">Delete</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
// import moment  from "moment";
export default {
  props: ["deletepost", "getAllPost"],
  data() {
    return {
      dialog: false,
      deletePostData: {
        id: null,
        deleted_user_id: null,
        deleted_at: null,
      },
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  created() {},
  mounted() {},
  methods: {
    remove() {
      if (confirm("Do you really want to delete?")) {
        this.deletePostData.id = this.deletepost.id;
        this.deletePostData.deleted_user_id = this.userId;
        // this.deletePostData.deleted_at = moment(String(Date())).format(
        //   "MM/DD/YYYY hh:mm"
        // );
        this.deletePostData.deleted_at = Date();

        this.$axios
          .patch("/post/remove", this.deletePostData)
          .then((data) => {
            if (data) {
              this.$store.dispatch("postDeleteMsg", true);
              this.dialog = false;
              this.getAllPost();
            }
          })
          .catch((err) => console.log(err.response.data));
      }
    },
  },
};
</script>

<style>
.delete-txt {
  font-size: 16px;
  color: red;
}
</style>
