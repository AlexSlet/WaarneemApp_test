<template>
  <div class="main-drawer" :class="{ open: isOpen }">
    <MainTitle>{{ shiftId ? 'Edit' : 'Create' }}</MainTitle>
    <div>
      <b-field label="Title">
        <b-input v-model="shift.title"></b-input>
      </b-field>
      <b-field label="Description">
        <b-input
          v-model="shift.description"
          type="textarea"
          minlength="10"
        ></b-input>
      </b-field>
      <b-field label="Dates">
        <b-datepicker
          v-model="datePickerDates"
          placeholder="Click to select..."
          multiple
          :min-date="minDate"
        >
        </b-datepicker>
      </b-field>
    </div>
    <div class="dates-list mt-6">
      <CardDate
        v-for="date in shift.dates"
        :key="date.id"
        :date="date"
        @removeDate="removeDate"
        @dateUpdate="dateUpdate"
      />
    </div>
    <div class="actions columns mt-4">
      <div class="column">
        <b-button v-if="shiftId" active expanded @click="shiftDelete"
          >Delete</b-button
        >
        <b-button v-else active expanded @click="closeDrawer">Close</b-button>
      </div>
      <div class="column">
        <MainButton @onClick="shiftSave">Save</MainButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getDefaultTime } from '~/utils/helpers'
import MainTitle from '~/components/MainTitle.vue'
import CardDate from '~/components/CardDate.vue'
import MainButton from '~/components/MainButton.vue'

export default {
  name: 'MainDrawer',
  components: {
    MainTitle,
    CardDate,
    MainButton,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    shiftId: {
      type: Number,
      default: () => null,
    },
  },
  data() {
    return {
      minDate: undefined,
      datePickerDates: [],
      shift: {
        title: '',
        description: '',
        dates: [],
      },
    }
  },
  computed: {
    ...mapGetters(['getShiftById']),
    shiftToEdit() {
      return this.getShiftById(this.shiftId)
    },
  },
  watch: {
    datePickerDates: function (newValue, oldValue) {
      if (newValue.length > oldValue.length) {
        this.addNewDate(newValue[newValue.length - 1])
      } else if (newValue.length < oldValue.length) {
        const removedDate = oldValue.filter((date) => !newValue.includes(date))
        this.removeDate(removedDate[0])
      }
    },
  },
  mounted() {
    this.minDate = new Date()
    if (this.shiftToEdit) {
      this.shift = structuredClone(this.shiftToEdit)
      this.shift.dates.forEach((item, index) => {
        this.$set(this.datePickerDates, index, item.date)
      })
    }
  },
  methods: {
    ...mapMutations([
      'addShift',
      'editShift',
      'deleteShift',
      'resetFilteredShifts',
    ]),
    shiftSave() {
      this.shiftId ? this.editShift(this.shift) : this.addShift(this.shift)
      this.resetFilteredShifts()
      this.closeDrawer()
    },
    shiftDelete() {
      this.deleteShift(this.shiftId)
      this.resetFilteredShifts()
      this.closeDrawer()
    },
    closeDrawer() {
      this.$emit('onClose')
    },
    addNewDate(date) {
      this.shift.dates.push({
        id: new Date().getTime(),
        date,
        startsAt: getDefaultTime(),
        endsAt: getDefaultTime(),
        type: '',
        price: 0,
      })
    },
    removeDate(date) {
      this.shift.dates = this.shift.dates.filter((item) => item.date !== date)
      this.datePickerDates = this.datePickerDates.filter(
        (item) => item !== date
      )
    },
    dateUpdate(data) {
      const index = this.shift.dates.findIndex((item) => item.id === data.id)
      this.$set(this.shift.dates, index, data)
    },
  },
}
</script>

<style scoped lang="scss">
.main-drawer {
  position: fixed;
  min-height: 100%;
  width: 455px;
  top: 0;
  right: 0;
  box-shadow: 0px 6px 40px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  padding: 35px 30px;
  transform: translate(100%);
  transition: all 0.3s ease;

  &.open {
    transform: translate(0%);
  }

  .field textarea {
    resize: none;
  }

  .dates-list {
    max-height: 40vh;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-gutter: stable;
  }

  .actions {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 25px;
    padding: 0 30px;
  }
}
</style>
