<template>
  <div>
    <div style="width: 50%; float: left; display: inline-block">
      <h1>News</h1>

      <div style="display: flex; padding-left: 30px">
        <div style="padding-left: 0px">
          <a-button type="primary" :loading="loading" @click="extractNews()">
            获取新闻
          </a-button>
        </div>
        <div style="padding-left: 30px">
          <a-select
            v-model:value="news_source"
            default-value="aaa"
            style="width: 120px"
            @change="getData"
          >
            <a-select-option value="wallstreetcn"> 华尔街早报 </a-select-option>
            <a-select-option value="jinshi"> 金十财经 </a-select-option>
            <a-select-option value="Reuters"> 路透 </a-select-option>
            <a-select-option value="Bloomberg"> 彭博 </a-select-option>
            <a-select-option value="wind"> wind </a-select-option>
            <a-select-option value="xinhua"> 新华财经 </a-select-option>
          </a-select>
        </div>
        <div style="padding-left: 30px">
          <a-select
            v-model:value="news_topic"
            default-value="推荐新闻"
            style="width: 120px"
            @change="getAutoNews"
          >
            <a-select-option value="domestic"> 境内要闻</a-select-option>
            <a-select-option value="foreign"> 境外要闻</a-select-option>
            <a-select-option value="important_data"> 重要数据</a-select-option>
            <a-select-option value="lab"> 创新实验室</a-select-option>
          </a-select>
        </div>
        <!-- <div style="padding-left:200px;">
          <a-button type="primary" :loading="loading" @click="draw_pic()">
            生成图片
          </a-button>
        </div> -->
      </div>
      <draggable
        class="list-group"
        :list="news_list"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
        @change="log"
        item-key="id"
      >
        <template #item="{ element }">
          <div
            class="list-group-item"
            style="padding: 10px 30px; text-align: left"
          >
            {{ element.content }}
          </div>
        </template>
      </draggable>
    </div>
    <div
      style="
        width: 50%;
        display: inline-block;
        float: left;
        text-align: left;
        padding: 0px 20px;
      "
    >
      <!-- <h1 style="text-align: center">Previews</h1> -->
      <Previews></Previews>
    </div>
  </div>
</template>
<style scoped>
.ant-input[disabled] {
  color: black;
}
</style>
<script>
import draggable from "vuedraggable";
import { ref } from "vue";
import { message } from "ant-design-vue";
import Previews from "./Previews.vue";
import axios from "axios";

export default {
  name: "News",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable,
    Previews,
  },
  setup() {
    // const iconLoading = ref(false);
  },
  data() {
    return {
      news_source: "",
      subTitle: "",
      news_list: [],
      checkedNames: [],
      importantData: [],
      domesticNews: [],
      foreignNews: [],
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      drag: false,
      loading: false,
    };
  },
  methods: {
    removeAtList0(idx) {
      this.list0.splice(idx, 1);
    },
    removeAtList1(idx) {
      this.list1.splice(idx, 1);
    },
    removeAtList2(idx) {
      this.list2.splice(idx, 1);
    },
    removeAtList3(idx) {
      this.list3.splice(idx, 1);
    },
    removeAtList4(idx) {
      this.list4.splice(idx, 1);
    },
    log: function (evt) {
      window.console.log(evt);
    },
    cloneDog({ id, content }) {
      // this.news_list.splice(idx,1)
      return {
        id: id,
        content: content,
      };
    },
    selectOnChange() {
      this.checkedNames = [];
      this.checkedValues = [];
    },
    getData() {
      console.log(this);
      const source_url = "api/news_list" + "/" + this.news_source;
      console.log(source_url);
      axios({
        url: source_url,
        method: "get",
        crossdomain: true,
      }).then((res) => {
        this.news_list = res.data;
        this.news_topic = "";
        console.log(this.news_list);
      });
    },
    // draw_pic() {
    //   axios({
    //     url: /draw_pid,
    //     method: "get",
    //     crossdomain: true,
    //   }).then((res) => {
    //     this.news_list = res.data;
    //     this.news_topic = "";
    //     console.log(this.news_list);
    //   });
    // },
    extractNews() {
      this.loading = true;
      axios({
        url: "api/extract_news",
        method: "get",
        crossdomain: true,
      }).then((res) => {
        if (res.status == 200) {
          this.loading = ref(false);
          message.success("爬取完毕");
        }
      });
    },
    getAutoNews() {
      const topic_url = "api/auto_news" + "/" + this.news_topic;
      axios({
        url: topic_url,
        method: "get",
        crossdomain: true,
      }).then((res) => {
        if (res.status == 200) {
          console.info(res);
          this.news_list = res.data;
          this.news_source = "";
          console.log("123");
        }
      });
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>
