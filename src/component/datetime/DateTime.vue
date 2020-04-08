<template>
  <div class="dateTime-content-box">
    <van-datetime-picker
    v-model="currentDate"
    type="date"
    :min-date="minDate"
    @confirm='setDate'
    @cancel='cancelDate'
    />
  </div>
</template>

<script>
export default {
  name: 'DateTime',
  data () {
    return {
      currentDate: new Date(),
      minDate: new Date(1500, 1, 1, 1, 1),
      dateTiem: {
        'year': 0,
        'month': 0,
        'day': 0
      }
    }
  },
  methods: {
    setDate (e) {
      console.log(e)
      this.dateTiem.year = this.currentDate.getFullYear()
      this.dateTiem.month = this.currentDate.getMonth() + 1
      this.dateTiem.day = this.currentDate.getDate()
      console.log(this.dateTiem)
      this.$emit('setDate', this.dateTiem)
    },
    cancelDate () {
      this.$emit('cancelDate', false)
    }
  }
}
</script>

<style lang='stylus' scoped>
.dateTime-content-box
  width: 100%
  height:100%
</style>
