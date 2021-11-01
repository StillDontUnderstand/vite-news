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
            return params.seriesName + "<br/>" + params.name + ": " + valueStr;
          },
        },
        visualMap: {
          left: "right",
          min: 0,
          max: 80000,
          inRange: {
            color: [
              "#a0edf0",
              "#a0e1f0",
              "#a0d4f0",
              "#a0c8f0",
              "#a0bbf0",
              "#a0aff0",
              "#a0a2f0",
              "#a096f0",
              "#a089f0",
              "#a07df0",
              "#a070f0",
              "#a064f0",
              "#a057f0",
              "#a04bf0",
              "#a03ef0",
              "#a032f0",
              "#a025f0",
              "#a019f0",
              "#a00cf0",
              "#a000f0",
            ],
          },
          text: ["High", "Low"],
          calculable: true,
        },
        toolbox: {
          show: true,
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
          },
        ],
      };
      axios({
        url: "api/option_statistic",
      }).then((res) => {
        var data = JSON.parse(res.data);
        console.log(option);
        option.series[0].data = data.statistic;
        for (var i = 0; i < data.statistic.length; i++) {
          data.statistic[i]["value"] = Number(data.statistic[i]["value"].split(".")[0]);
        }
        // option.visualMap.min = data.min;
        // option.visualMap.max = data.max;

        console.log(option);
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
