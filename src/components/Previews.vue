<template>
  <h1 style="text-align: center">Previews</h1>
  <a-affix :offset-top="10" @change="change">
    <a-tabs>
      <a-tab-pane key="1" tab="市场回顾">
        <draggable
          class="dragArea list-group"
          :list="list0"
          group="people"
          item-key="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item" style="padding: 5px 10px">
              <a-textarea
                v-model:value="element.content"
                showCount
                :maxlength="1000"
                autoSize
              />
              <i
                style="
                  display: flex;
                  float: right;
                  padding-left: 20px;
                  padding-bottom: 5px;
                "
              >
                <DeleteFilled @click="removeAtList0(index)" />
              </i>
              <i style="display: flex; float: right">
                <LockOutlined @click="unlock(index)" />
              </i>
            </div>
          </template>
        </draggable>
      </a-tab-pane>
      <a-tab-pane key="2" tab="重要数据" style="font-size: 10px">
        <draggable
          class="dragArea list-group"
          :list="list1"
          group="people"
          @change="log"
          item-key="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item" style="padding: 5px 10px">
              <a-textarea
                v-model:value="element.content"
                showCount
                :maxlength="300"
                autoSize
              />
              <i
                style="
                  display: flex;
                  float: right;
                  padding-left: 20px;
                  padding-bottom: 5px;
                "
              >
                <DeleteFilled @click="removeAtList1(index)" />
              </i>
              <i style="display: flex; float: right">
                <LockOutlined @click="unlock(index)" />
              </i>
            </div>
          </template>
        </draggable>
      </a-tab-pane>
      <a-tab-pane key="3" tab="境内要闻">
        <draggable
          class="dragArea list-group"
          :list="list2"
          group="people"
          @change="log"
          item-key="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item" style="padding: 5px 10px">
              <a-textarea
                v-model:value="element.content"
                showCount
                :maxlength="300"
                autoSize
              />
              <i
                style="
                  display: flex;
                  float: right;
                  padding-left: 20px;
                  padding-bottom: 5px;
                "
              >
                <DeleteFilled @click="removeAtList2(index)" />
              </i>
              <i style="display: flex; float: right">
                <LockOutlined @click="unlock(index)" />
              </i>
            </div>
          </template>
        </draggable>
      </a-tab-pane>
      <a-tab-pane key="4" tab="境外要闻">
        <draggable
          class="dragArea list-group"
          :list="list3"
          group="people"
          @change="log"
          item-key="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item" style="padding: 5px 10px">
              <a-textarea
                v-model:value="element.content"
                showCount
                :maxlength="300"
                autoSize
              />
              <i
                style="
                  display: flex;
                  float: right;
                  padding-left: 20px;
                  padding-bottom: 5px;
                "
              >
                <DeleteFilled @click="removeAtList3(index)" />
              </i>
              <i style="display: flex; float: right">
                <LockOutlined @click="unlock(index)" />
              </i>
            </div>
          </template>
        </draggable>
      </a-tab-pane>
      <a-tab-pane key="5" tab="重要经济数据和事件">
        <draggable
          class="dragArea list-group"
          :list="list4"
          group="people"
          @change="log"
          item-key="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item" style="padding: 5px 10px">
              <a-textarea
                v-model:value="element.content"
                showCount
                :maxlength="300"
                autoSize
              />
              <i
                style="
                  display: flex;
                  float: right;
                  padding-left: 20px;
                  padding-bottom: 5px;
                "
              >
                <DeleteFilled @click="removeAtList4(index)" />
              </i>
            </div>
          </template>
        </draggable>
      </a-tab-pane>

      <template #tabBarExtraContent>
        <a-button @click="putData()">提交新闻</a-button>
        <a-button @click="download_report()" :loading="loading"
          >下载日报</a-button
        >
      </template>
    </a-tabs>
  </a-affix>
</template>
<style scoped>
.ant-input[disabled] {
  color: black;
}
.dragArea {
  padding: 10px 0px;
    border: 1px solid #b0a9b766;
    height: 85%;
    overflow-y: scroll;
    border-radius: 5px;
}
</style>
<script>
import draggable from "vuedraggable";
import DeleteFilled from "@ant-design/icons-vue/DeleteColumnOutlined";
import LockOutlined from "@ant-design/icons-vue/LockOutlined";
import CaretRightOutlined from "@ant-design/icons-vue/CaretRightOutlined";
import { ref } from "vue";
import { message } from "ant-design-vue";
import fileDownload from "js-file-download";

export default {
  name: "Previews",
  // display: "Custom Clone",
  order: 3,
  components: {
    draggable,
    DeleteFilled,
    LockOutlined,
    CaretRightOutlined,
  },
  props: {
    msg: String,
  },
  setup() {},
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
    putData() {
      const post_data = {
        marketRecall: this.list0,
        importantData: this.list1,
        domesticNews: this.list2,
        foreignNews: this.list3,
        importantEvent: this.list4,
      };
      axios({
        url: "api/put_selected_news",
        method: "post",
        crossdomain: true,
        data: post_data,
      }).then((res) => {
        if (res.status == 200) {
          message.success("提交成功");
          this.generate_label();
        }
      });
    },
    generate_label() {
      axios({
        url: "api/generate_label",
        method: "get",
        crossdomain: true,
      }).then((res) => {
        if (res.status == 200) {
          console.log("训练数据生成完毕");
        }
      });
    },
    download_report() {
      this.loading = ref(true);
      var todayDate = new Date();
      // console.log(todayDate.toISOString().split("T")[0])
      axios({
        url: "api/download",
        method: "get",
        responseType: 'blob',
        crossdomain: true,
      }).then((res) => {
        if (res.status == 200) {
          // console.log(res)
          fileDownload(res.data, "金融市场日报"+todayDate.toISOString().split("T")[0]+".docx");
          this.loading = ref(false);
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
