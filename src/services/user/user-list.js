import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fromdate: null,
      todate:null,
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
          value: "created_user_id",
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
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    headers() {
      if (!this.isLoggedIn) {
        return this.headerList.slice(0, this.headerList.length - 1);
      } else {
        return this.headerList;
      }
    },
  },
  mounted() {
    this.$axios
      .get("/post")
      .then((response) => {
        this.userList = response.data;
        this.showList = this.userList;
      })
      .catch((err) => {
        console.log(err);
      });
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
  },
};
