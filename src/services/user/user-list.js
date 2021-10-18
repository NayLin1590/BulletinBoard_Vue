import { mapGetters } from "vuex"
import detail from "../../pages/user/detail"
import deleteUser from "../../pages/user/delete"
import moment from "moment"
export default {
  components: {
    detail,
    deleteUser,
  },
  data() {
    return {
      fromdate: null,
      todate: null,
      menu: false,
      menu1: false,
      headerList: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Created User",
          value: "create_user_id",
        },
        {
          text: "Type",
          value: "role",
        },
        {
          text: "Phone Number",
          value: "phone",
        },
        {
          text: "Date of Birth",
          value: "dob",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Created_Date",
          value: "created_at",
        },
        {
          text: "Updated_Date",
          value: "updated_at",
        },
        {
          text: "Operation",
          value: "operation",
        },
      ],
      userList: [],
      showList: [],
      i: 0,
      removeUser: {
        id: null,
        deleted_at:null,
        deleted_user_id: null,
      },
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userId"]),
    headers() {
      if (!this.isLoggedIn) {
        return this.headerList.slice(0, this.headerList.length - 1);
      } else {
        return this.headerList;
      }
    },
  },
  beforeCreate() {
    
  },
  mounted() {
    this.getAllUser()
  },
  methods: {
    /**
     * This is to filter posts of datatable.
     * @returns void
     */
    filterPosts() {
      this.showList = this.userList.filter((post) => {
        return (
          post.title.includes(this.keyword) ||
          post.description.includes(this.keyword) ||
          post.created_user.includes(this.keyword)
        );
      });
    },

    remove(user) {
      if (confirm("Do you really want to delete?")) {
        console.log(user)
        this.removeUser.id = user.id;
        this.removeUser.deleted_user_id = this.userId;
        this.removeUser.deleted_at = moment(String(Date())).format(
          "MM/DD/YYYY"
        );
        console.log(this.removeUser);
        this.$axios
          .patch("/user/remove", this.removeUser)
          .then((data) => {
            if(data){
              this.getAllUser()
            }
          })
          .catch((err) => console.log(err.response.data));
      }
    },


    getAllUser(){
      this.$axios
      .get("/user")
      .then((response) => {
        this.userList = response.data;        
        response.data.filter((value, index) => {
          this.userList[index].created_at = moment(String(this.userList[index].created_at)).format(
            "MM/DD/YYYY"
          );
          this.userList[index].updated_at = moment(String(this.userList[index].updated_at)).format(
            "MM/DD/YYYY"
          );
        });
        this.showList = this.userList;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
};
