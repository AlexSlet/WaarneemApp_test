<template>
  <div>
    <div v-if="shifts.length">
      <MainTitle> Filter </MainTitle>
      <div class="columns">
        <div class="column is-6">
          <PriceFilter />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-2">
        <MainTitle> Shifts </MainTitle>
      </div>
      <div class="column is-2 is-offset-8">
        <MainButton @onClick="addShift()"> Add Shift </MainButton>
      </div>
    </div>
    <CardShift
      v-for="shift in shiftsToRender"
      :key="shift.id"
      :shift="shift"
      @editShift="editShift"
    />
    <MainDrawer
      v-if="isDrawer"
      :is-open="isDrawer"
      :shift-id="shiftId"
      @onClose="toggleDrawer()"
    />
  </div>
</template>

<script>
import MainTitle from '~/components/MainTitle.vue'
import PriceFilter from '~/components/PriceFilter.vue'
import MainButton from '~/components/MainButton.vue'
import CardShift from '~/components/CardShift.vue'
import MainDrawer from '~/components/MainDrawer.vue'

export default {
  name: 'IndexPage',
  components: {
    MainTitle,
    PriceFilter,
    MainButton,
    CardShift,
    MainDrawer,
  },
  data() {
    return {
      isDrawer: false,
      shiftId: null,
    }
  },
  computed: {
    shifts() {
      return this.$store.state.shifts
    },
    shiftsFiltered() {
      return this.$store.state.filteredShifts
    },
    shiftsToRender() {
      return this.shiftsFiltered || this.shifts
    },
  },
  methods: {
    editShift(id) {
      this.shiftId = id
      this.toggleDrawer()
    },
    addShift() {
      this.shiftId = null
      this.toggleDrawer()
    },
    toggleDrawer() {
      this.isDrawer = !this.isDrawer
    },
  },
}
</script>
