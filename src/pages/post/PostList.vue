<template>
  <v-card>
    <v-card-title>
      Post list
      <v-spacer></v-spacer>
      <v-form ref="form">
        <v-row class="filter-bar" v-if="!isLoggedIn">
          <v-col cols="7">
            <v-text-field class="search-txt-field"
              label="Search keyword"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-btn class="post-list-btn mr-4" color="primary">Search</v-btn>
          </v-col>
        </v-row>
        <v-row class="filter-bar" v-else>
          <v-col cols="3">
            <v-text-field class="search-txt-field"
              label="Search keyword"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn class="post-list-btn mr-4" color="primary">Search</v-btn>
          </v-col>
          <v-col cols="7">
              <div>
                   <v-btn class="post-list-btn mr-4" color="primary">Create</v-btn>
            <v-btn class="post-list-btn mr-4" color="primary">Upload</v-btn>
            <v-btn class="post-list-btn mr-4" color="primary">Download</v-btn>
              </div>
           
          </v-col>
        </v-row>
      </v-form>
    </v-card-title>
    <v-container>
      <v-data-table :headers="headers" :items="showList">
        <template v-slot:[`item.title`]="{ item }">
          <a v-if="item.title">{{ item.title }}</a>
        </template>
        <template v-slot:[`item.create_user`]="{ item }">
          {{ item.create_user.name }}
        </template>
        <template v-slot:[`item.operation`]>
          <v-row>
            <div class="operation-btn">
              <v-btn color="primary" class="post-list-btn">Edit</v-btn>
            </div>
            <div class="operation-btn">
              <v-btn color="error" class="post-list-btn">Delete</v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script src="../../services/post/post-list.js"></script>

<style scoped src="../../assets/css/pages/post/post-list.css"></style>
