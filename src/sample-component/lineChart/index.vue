<template>
  <chartView
    height="100%"
    :chart-option="chartOption"
    :extra-option="extraOptions"
  ></chartView>
</template>

<script>
export default {
  name: 'BaseBar',
  data() {
    return {
      chartOption: {},
      extraOptions: {},
    }
  },
  props: {
    setting: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    setting: {
      immediate: true,
      deep: true,
      handler() {
        const {
          title,
          grid,
          xAxis,
          yAxis,
          tooltip,
          series,
          dataset,
          color,
          legend,
          actions,
        } = this.setting
        this.chartOption = this.caculateOption(series)
        this.extraOptions = {
          title,
          grid,
          xAxis,
          yAxis,
          tooltip,
          dataset,
          color,
          legend,
          actions,
        }
      },
    },
  },
  methods: {
    caculateOption(series) {
      return this.$chartFn.getBarOption({
        series,
      })
    },
  },
}
</script>

<style scoped lang="less"></style>
