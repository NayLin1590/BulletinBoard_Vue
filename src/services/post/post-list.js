import { mapGetters } from "vuex";
import moment from "moment"
import Detail from "../../pages/post/Details"
import Delete from "../../pages/post/Delete"
import router from "../../router";
// import detail from "../../pages/user/detail"
export default {
    components:{
        Detail,
        Delete
    },
    data() {
        return {
            postInfo: null,
            dialogTitle: "",
            dialog: false,
            isDeleteDialog: false,
            headerList: [
                {
                    text: "Post Title",
                    align: "start",
                    value: "title",
                },
                {
                    text: "Post Desciption",
                    value: "description",
                },
                {
                    text: "Posted User",
                    value: "create_user",
                },
                {
                    text: "Posted Date",
                    value: "created_at",
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            postList: [],
            showList: [],
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn","postSuccessMsg","postDeleteMsg","editPostMsg"]),
        headers() {
            if (!this.isLoggedIn) {
                return this.headerList.slice(0, this.headerList.length - 1);
            } else {
                return this.headerList;
            }
        },
    },
    mounted() {
        this.getAllPost()
    },
    methods: {
        /**
         * This is to filter posts of datatable.
         * @returns void
         */
        filterPosts() {
            this.showList = this.postList.filter((post) => {
                return (
                    post.title.includes(this.keyword) ||
                    post.description.includes(this.keyword) ||
                    post.created_user.includes(this.keyword)
                );
            });
        },
        getAllPost(){
            this.$axios
            .get("/post")
            .then((response) => {
                response.data.filter((value,index)=>{
                    response.data[index].created_at =  moment(String(response.data[index].created_at)).format(
                        "MM/DD/YYYY"
                      );
                      response.data[index].updated_at =  moment(String(response.data[index].updated_at)).format(
                        "MM/DD/YYYY"
                      );
                })
                this.postList = response.data;
                this.showList = this.postList;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        edit(id){
            this.$store.dispatch("postEditId",id);
            router.push({
                name: "post-edit"
              })
        }
    },
};
