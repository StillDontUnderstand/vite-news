<template>
  <h1 style="text-align: center">USD/CNY 汇率预测模型</h1>
  <!-- TODO 多模型切换 -->
  <div id="mycharts" style="height: 1000px; width: 100%"></div>
  <!-- TODO 邮件发送 -->
  <div>12345</div>
  <a-button @click="daymodel()">showdata</a-button>
</template>
<style>
</style>
<script>
import * as echarts from "echarts";
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "Model",

  setup() {
    const colors = ["#5470C6", "#91CC75", "#EE6666"];
    const echartsInit = () => {
      var chartDom = document.getElementById("mycharts");
      var myChart = echarts.init(chartDom);
      var option;

      // prettier-ignore
      const data = [
        ["2000-06-05", 116],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 130],
        ["2000-06-15", 245],
        ["2000-06-16", 139],
        ["2000-06-17", 115],
         ["2000-06-18", 111], 
         ["2000-06-19", 309], 
         ["2000-06-20", 206], 
         ["2000-06-21", 137], 
         ["2000-06-22", 128], 
         ["2000-06-23", 85], 
         ["2000-06-24", 94],
        ["2000-06-25", 71], 
        ["2000-06-26", 106], 
        ["2000-06-27", 84], 
        ["2000-06-28", 93], 
        ["2000-06-29", 85], 
        ["2000-06-30", 73], 
        ["2000-07-01", 83], 
        ["2000-07-02", 125],
        ["2000-07-03", 107], 
        ["2000-07-04", 82], 
        ["2000-07-05", 44], 
        ["2000-07-06", 72], 
        ["2000-07-07", 106], 
        ["2000-07-08", 107], 
        ["2000-07-09", 66], 
        ["2000-07-10", 91],
        ["2000-07-11", 92],
         ["2000-07-12", 113],
          ["2000-07-13", 107], 
          ["2000-07-14", 131], 
          ["2000-07-15", 111], 
          ["2000-07-16", 64], 
          ["2000-07-17", 69], 
          ["2000-07-18", 88],
        ["2000-07-19", 77], 
        ["2000-07-20", 83], 
        ["2000-07-21", 111], 
        ["2000-07-22", 57], 
        ["2000-07-23", 55], 
        ["2000-07-24", 60]];
      const dateList = data.map(function (item) {
        return item[0];
      });
      const valueList = data.map(function (item) {
        return item[1];
      });
      option = {
        // Make gradient line here
        color: colors,
        visualMap: [
          // {
          //   show: true,
          //   type: "continuous",
          //   seriesIndex: 0,
          //   min: 0,
          //   max: 400,
          // },
          // {
          //   show: false,
          //   type: "continuous",
          //   seriesIndex: 1,
          //   dimension: 1,
          //   min: 0,
          //   max: dateList.length - 1,
          // },
        ],
        title: [
          {
            top: "45%",
            left: "center",
            text: "1、由于宏观经济更新频率低、且具有明显的滞后性，为提高日度模型的准确性，我们现阶段主要采取传统的时间序列模型ARIMA对USDCNY市场走势进行日度预测。\n2、考虑到汇率波动具有明显的异方差性，我们同时加入GARCH波动率预测模型对ARIMA进行进一步拟合优化。",
          },
          //   {
          //     top: "55%",
          //     left: "center",
          //     text: "Gradient along the x axis",
          //   },
        ],
        legend: {
          data: ["real", "predicted", "difference"],
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: {
              show: true,
              pixelRatio: 3,
            },
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: [
          {
            data: dateList,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "USD/CNY",
            min: 6.2,
            max: 6.6,
            position: "right",
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "Difference",
            min: -1000,
            max: 1000,
            position: "left",
            offset: 0,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value} bps",
            },
          },
        ],
        grid: [
          {
            bottom: "60%",
          },
          {
            bottom: "60%",
          },
        ],
        series: [
          {
            name: "real",
            type: "line",
            showSymbol: true,
            // data: valueList,
            data: [],
            endLabel: {
              show: true,
              color: colors[0],
              fontSize: 16,
            },
            labelLayout: {
              moveOverlap: "shiftY",
            },
            emphasis: {
              focus: "series",
            },
            encode: {
              x: "Year",
              y: "FX_RATE",
              label: ["Country", "FX_RATE"],
              itemName: "Year",
              tooltip: ["FX_RATE"],
            },
          },
          {
            name: "predicted",
            type: "line",
            showSymbol: true,
            yAxisIndex: 0,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
            endLabel: {
              show: true,
              color: colors[1],
              fontSize: 16,
            },
          },
          {
            name: "difference",
            type: "bar",
            showSymbol: true,
            yAxisIndex: 1,
            data: [
              211.0, 211.2, 311.3, 411.5, 611.3, 1011.2, 2110.3, 2113.4, 2311.0,
              1116.5, 1112.0, 611.2, 121.0, 211.2, 311.3, 411.5, 611.3, 1011.2,
              2110.3, 2113.4, 2311.0, 1116.5, 1112.0, 611.2, 211.0, 211.2,
              311.3, 411.5, 611.3, 1011.2, 2110.3, 2113.4, 2311.0, 1116.5,
              1112.0, 611.2, 211.0, 112.2, 311.3, 411.5, 611.3, 1011.2, 2110.3,
              2113.4, 2311.0, 1116.5, 1112.0, 611.2,
            ],
          },
        ],
      };
      axios({
        url: "api/daymodel",
        method: "get",
        crossdomain: true,
      }).then((res) => {
        if (res.status == 200) {
          const temp = JSON.parse(res.data);
          temp.Origin.pop();
          console.log(temp)
          // const predict = temp.ARIMA
          const predict = temp.ARIMA_GARCH

          option.series[0].data = temp.Origin;
          option.series[1].data = predict;
          // option.series[2].data = temp.ARIMA_GARCH;

          const diffArray = (arr1, arr2) =>
            arr1.map(function (num, idx) {
              return (num - arr2[idx])*10000;
            });

          const diff = diffArray(predict, temp.Origin);
          console.log(diff)
          option.series[2].data = diff;

          option.xAxis[0].data = temp.date;

          option && myChart.setOption(option);
        }
      });
    };

    onMounted(() => {
      echartsInit();
    });
    return {
      echartsInit,
    };
  },
  data() {
    return {
      // alldata:[],
      date_list: [],
      origin_list: [],
      arima_list: [],
      garch_list: [],
      drag: false,
      loading: false,
    };
  },
  methods: {
    daymodel() {},
  },
};
</script>
