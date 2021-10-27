<template>
  <v-card max-width="800" class="mx-auto">
    <v-toolbar color="primary" dark>
      User Profile
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="4" class="text-center">
          <img width="150px" :src="profileImg" alt="" />
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col cols="5">
              Name
            </v-col>
            <v-col cols="7">
              {{ userdetail.name }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Type
            </v-col>
            <v-col cols="7" v-if="userdetail.role == 1">
              User
            </v-col>
            <v-col cols="7" v-else>
              Admin
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Email
            </v-col>
            <v-col cols="7">
              {{ userdetail.email }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Phone
            </v-col>
            <v-col cols="7">
              {{ userdetail.phone }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Date Of Birth
            </v-col>
            <v-col cols="7">
              {{ userdetail.dob }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              Address
            </v-col>
            <v-col cols="7">
              {{ userdetail.address }}
            </v-col>
          </v-row>
          
          <v-row>
            <v-btn class="primary" @click="editProfile">
              Edit Profile
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import router from '../../router';
export default {
  data() {
    return {
      userdetail: {
        id: 1,
        name: "",
        email: "",
        profile: "",
        role: 0,
        phone: null,
        address: null,
        dob: null,
        create_user_id: null,
        updated_user_id: null,
        deleted_user_id: null,
        deleted_at: null,
        created_at: null,
        updated_at: null,
      },
      profileImg: null,
    };
  },
  created() {
    this.$axios
      .get(`/user/details?id=${this.userId}`)
      .then((data) => {
        this.userdetail = data.data.user
        this.profileImg = data.data.profileImg
      })
      .catch((err) => console.log(err));
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  mounted() {},
  methods:{
    editProfile(){
      router.push({
        name: "profile-edit",
      })
    }
  }
};
</script>

<style></style>
