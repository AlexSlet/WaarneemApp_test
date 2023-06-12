export const state = () => ({
  shifts: [],
  filteredShifts: null,
})

export const getters = {
  getShiftById: (state) => (id) => {
    return state.shifts.find((shift) => shift.id === id)
  },
  getMaxFilterValue(state) {
    if (!state.shifts.length) return null
    const prices = []
    state.shifts.forEach((shift) => {
      shift.dates.forEach((date) => prices.push(date.price))
    })
    return Math.max(...prices)
  },
}

export const mutations = {
  addShift(state, shift) {
    shift.id = new Date().getTime()
    state.shifts.push(shift)
  },
  editShift(state, shift) {
    const index = state.shifts.findIndex((item) => item.id === shift.id)
    state.shifts[index] = { ...shift }
  },
  deleteShift(state, id) {
    state.shifts = state.shifts.filter((item) => item.id !== id)
  },
  setFilteredShifts(state, shifts) {
    state.filteredShifts = shifts
  },
  resetFilteredShifts(state) {
    state.filteredShifts = null
  },
}
