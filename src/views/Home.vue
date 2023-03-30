<template>
<div>
  <el-row :gutter="10" style="margin-bottom: 60px">
    <el-col :span="6">
      <el-card style="color: #409EFF">
        <div><i class="el-icon-user-solid"></i> 用户总数</div>
        <div style="padding: 10px 0; text-align: center; font-weight: bold">
          100
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card style="color: #409EFF">
        <div>销售总量</div>
        <div style="padding: 10px 0; text-align: center; font-weight: bold">
          ￥ 1000000
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card style="color: #409EFF">
        <div>盈利</div>
        <div style="padding: 10px 0; text-align: center; font-weight: bold">
          ￥ 30000
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card style="color: #409EFF">
        <div>门店总数</div>
        <div style="padding: 10px 0; text-align: center; font-weight: bold">
          100
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <div id="main" style="width: 500px; height: 400px"></div>
    </el-col>
    <el-col :span="12">
      <div id="pie" style="width: 500px; height: 400px"></div>
    </el-col>
  </el-row>


</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "Home",
  data(){
    return{

    }
  },
  mounted() {  //页面元素渲染之后再触发
    var option = {
      title: {
        text: '各季度会员数量统计',
        subtext: '趋势图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      xAxis: {
        type: 'category',
        data: ["第一季度", "第二季度", "第三季度", "第四季度"]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: "广东",
          data: [],
          type: 'line'
        },
        {
          name: "广东",
          data: [],
          type: 'bar'
        },
        {
          name: "广西",
          data: [],
          type: 'line'
        },
        {
          name: "广西",
          data: [],
          type: 'bar'
        }
      ]
    };

    //饼图
    var pieOption = {
      title: {
        text: '各季度会员数量统计',
        subtext: '比例图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: "广东",
          type: 'pie',
          radius: '50%',
          center: ['75%', '50%'],
          label: { //饼图上的文本标签
            normal: {
              show: true,
              position: 'inner', //标签的位置
              textStyle : {
                fontWeight : 300,
                fontSize : 14, //字体大小
                color: '#fff'
              },
              formatter: '{d}%'
            }
          },
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: "广西",
          type: 'pie',
          radius: '50%',
          center: ['25%', '50%'],
          label: { //饼图上的文本标签
            normal: {
              show: true,
              position: 'inner', //标签的位置
              textStyle : {
                fontWeight : 300,
                fontSize : 14, //字体大小
                color: '#fff'
              },
              formatter: '{d}%'
            }
          },
          data: [
            {name: "第一季度", value: 1},
            {name: "第二季度", value: 2},
            {name: "第三季度", value: 4},
            {name: "第四季度", value: 3},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    var pieChartDom = document.getElementById('pie');
    var pieChart = echarts.init(pieChartDom);

    this.request.get("/echarts/members").then(res => {
      //填空
      //option.xAxis.data = res.data.x
      option.series[0].data = res.data
      option.series[1].data = res.data
      option.series[2].data = [1, 2, 4, 3]
      option.series[3].data = [1, 2, 4, 3]
      myChart.setOption(option);

      pieOption.series[0].data = [
        {name: "第一季度", value: res.data[0]},
        {name: "第二季度", value: res.data[1]},
        {name: "第三季度", value: res.data[2]},
        {name: "第四季度", value: res.data[3]},
      ]
      pieChart.setOption(pieOption);
    })

  }
}
</script>

<style scoped>

</style>