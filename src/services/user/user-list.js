import { mapGetters } from "vuex"
import detail from "../../pages/user/detail"
import deleteUser from "../../pages/user/delete"
import Msg from "../../pages/user/Msg"
import moment from "moment"
export default {
  components: {
    detail,
    deleteUser,
    Msg,
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
          width: '100px'
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Created User",
          value: "create_user_id",
          width: "150px",
        },
        {
          text: "Type",
          value: "role",
          width: "100px",
        },
        {
          text: "Phone Number",
          value: "phone",
          width: "140px",
        },
        {
          text: "Date of Birth",
          value: "dob",
          width: "120px",
        },
        {
          text: "Address",
          value: "address",
          width: "100px",
        },
        {
          text: "Created_Date",
          value: "created_at",
          width: "11em",
        },
        {
          text: "Updated_Date",
          value: "updated_at",
          width: "11em",
        },
        {
          text: "Operation",
          value: "operation",
          width: "10em",
        },
      ],
      userList: [],
      showList: [],
      removeUser: {
        id: null,
        deleted_at:null,
        deleted_user_id: null,
      },
      createAlertTxt:"New user creation is success...",
      deleteAlertTxt:"User delete is success",
      create:"create",
      dele:"delete",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userId","userSuccessMsg","userDeleteMsg"]),
    headers() {
      if (!this.isLoggedIn) {
        return this.headerList.slice(0, this.headerList.length - 1);
      } else {
        return this.headerList;
      }
    },
  },
  beforeCreate() {
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
  },
  
  mounted() {
    // this.getAllUser()
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
