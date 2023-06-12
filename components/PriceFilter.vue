<template>
  <div class="price-slider columns">
    <div class="column is-4">
      <h3 class="title">Filter on price</h3>
    </div>
    <div class="column">
      <b-slider
        v-model="values"
        :min="0"
        :max="getMaxFilterValue"
        :step="1"
        @change="filterShifts"
      >
        <template v-for="val in [0, getMaxFilterValue]">
          <b-slider-tick :key="val" :value="val">{{ val }}</b-slider-tick>
        </template>
      </b-slider>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PriceSlider',
  data() {
    return {
      values: [0, this.getMaxFilterValue],
    }
  },
  computed: {
    ...mapGetters(['getMaxFilterValue']),
    shifts() {
      return this.$store.state.shifts
    },
  },
  mounted() {
    this.filterShifts([0, this.getMaxFilterValue])
  },
  methods: {
    ...mapMutations(['setFilteredShifts']),
    filterShifts([minPrice, maxPrice]) {
      const filteredShifts = this.shifts.filter((item) => {
        const price = item.dates[0].price
        return price >= minPrice && price <= maxPrice
      })
      this.setFilteredShifts(filteredShifts)
    },
  },
}
</script>

<style scoped lang="scss">
.price-slider {
  display: flex;

  .title {
    font-size: 24px;
    font-weight: 400;
    margin: 0;
  }
}
</style>
