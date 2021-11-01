<template>
  <!-- <h1 style="text-align: center">Option</h1> -->
  <div id="mycharts" style="height: 800px; width: 100%"></div>
  <!-- <a-button type="primary" :loading="loading" @click="test()">获取新闻</a-button> -->
</template>
<style>
</style>
<script>
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import * as echarts from "echarts";
import axios from "axios";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { ScatterChart, EffectScatterChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

export default {
  name: "Option",
  setup() {
    const echartsInit = () => {
      const chartDom = document.getElementById("mycharts");
      const myChart = echarts.init(chartDom);
      var option;
      var data;
      myChart.showLoading();
      axios({
        url: "api/option",
      }).then((res) => {
        option = {
          title: {
            text: "期权询价分布",
            // subtext: "Data from www.census.gov",
            // sublink: "http://www.census.gov/popest/data/datasets.html",
            left: "right",
          },
          tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              const value = (params.value + "").split(".");
              const valueStr = value[0].replace(
                /(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                "$1,"
              );
              return (
                params.seriesName + "<br/>" + params.name + ": " + valueStr
              );
            },
          },
          visualMap: {
            left: "right",
            min: 500000,
            max: 38000000,
            inRange: {
              color: [
                "#313695",
                "#4575b4",
                "#74add1",
                "#abd9e9",
                "#e0f3f8",
                "#ffffbf",
                "#fee090",
                "#fdae61",
                "#f46d43",
                "#d73027",
                "#a50026",
              ],
            },
            text: ["High", "Low"],
            calculable: true,
          },
          toolbox: {
            show: true,
            //orient: 'vertical',
            left: "left",
            top: "top",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          series: [
            {
              name: "Option Query",
              type: "map",
              roam: true,
              map: "china",
              emphasis: {
                label: {
                  show: true,
                },
              },
              data:res.data.statustic,
              // data: [
              //   { name: "青海省", value: 4822023 },
              //   { name: "新疆维吾尔自治区", value: 731449 },
              //   { name: "黑龙江省", value: 6553255 },
              //   { name: "Arkansas", value: 2949131 },
              //   { name: "California", value: 38041430 },
              //   { name: "Colorado", value: 5187582 },
              //   { name: "Connecticut", value: 3590347 },
              //   { name: "Delaware", value: 917092 },
              //   { name: "District of Columbia", value: 632323 },
              //   { name: "Florida", value: 19317568 },
              //   { name: "Georgia", value: 9919945 },
              //   { name: "Hawaii", value: 1392313 },
              //   { name: "Idaho", value: 1595728 },
              //   { name: "Illinois", value: 12875255 },
              //   { name: "Indiana", value: 6537334 },
              //   { name: "Iowa", value: 3074186 },
              //   { name: "Kansas", value: 2885905 },
              //   { name: "Kentucky", value: 4380415 },
              //   { name: "Louisiana", value: 4601893 },
              //   { name: "Maine", value: 1329192 },
              //   { name: "Maryland", value: 5884563 },
              //   { name: "Massachusetts", value: 6646144 },
              //   { name: "Michigan", value: 9883360 },
              //   { name: "Minnesota", value: 5379139 },
              // ],
            },
          ],
        };
      });
      axios({
        url: "china.json",
        method: "get",
        crossdomain: true,
      }).then((res) => {
        myChart.hideLoading();
        echarts.registerMap("china", res.data, {});
        option && myChart.setOption(option);
      });
    };
    onMounted(() => {
      echartsInit();
    });
    return {
      echartsInit,
    };
  },
};
</script>
