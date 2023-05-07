<template>
  <div class="theme-main">
    <h1>{{title}}</h1>
    <ul class="cata-ul">
      <li v-for="(item, index) in catalogueList">
        <router-link
            class="cata-item"
            :key="item._id"
            :to="'/article01/'+item._id">
          {{`【${String(index).padStart(2,'0')}】` + item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String
  },
  catalogueList: {
    type: Array
  }
})
</script>
<style scoped>
.theme-main{
  margin: 0 auto;
  max-width: 500px;
}
.theme-main h1{
  margin: 25px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  color: #2c3e50;
}
.cata-ul{
  padding-left: 10px;
  line-height: 1.7;
  list-style-type: disc;
}
cata-ul li{
  display: list-item;
}
cata-ul li::marker{
  unicode-bidi: isolate;
  font-variant-numeric: tabular-nums;
  text-transform: none;
  text-indent: 0px !important;
  text-align: start !important;
  text-align-last: start !important;
}
.cata-item{
  font-weight: 500;
  color: #3eaf7c
}
.cata-item:hover{
  text-decoration: underline;
}
</style>
