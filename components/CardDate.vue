<template>
  <div class="card-date">
    <div class="level mb-1">
      <h4 class="title level-left">{{ dateFormatter(date.date) }}</h4>
      <div class="level-right">
        <b-button
          class="close-button"
          size="is-medium"
          type="is-ghost"
          icon-left="close"
          @click="$emit('removeDate', date.date)"
        >
        </b-button>
      </div>
    </div>
    <div class="card-date__body">
      <div class="columns">
        <div class="column">
          <b-field label="Starttime">
            <b-timepicker v-model="localDate.startsAt"> </b-timepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Endtime">
            <b-timepicker
              v-model="localDate.endsAt"
              :min-time="localDate.startsAt"
            >
            </b-timepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Price">
            <b-numberinput v-model="localDate.price"></b-numberinput>
          </b-field>
        </div>
      </div>
      <b-field label="Type">
        <b-select v-model="localDate.type" expanded>
          <option v-for="option in shiftTypes" :key="option" :value="option">
            {{ option }}
          </option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>
<script>
import { toHumanReadableDate, getDefaultTime } from '~/utils/helpers'
import { SHIFT_TYPES } from '~/utils/constants'
export default {
  name: 'CardDate',
  props: {
    date: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localDate: {
        date: '',
        startsAt: getDefaultTime(),
        endsAt: getDefaultTime(),
        type: '',
        price: 0,
      },
    }
  },
  computed: {
    shiftTypes() {
      return SHIFT_TYPES
    },
  },
  watch: {
    localDate: {
      handler: function (newValue) {
        this.$emit('dateUpdate', newValue)
      },
      deep: true,
    },
  },
  mounted() {
    this.localDate = { ...this.date }
  },
  methods: {
    dateFormatter(date) {
      return toHumanReadableDate(date)
    },
  },
}
</script>
<style lang="scss">
.card-date {
  .title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }
  .close-button {
    color: var(--main-dark-color);
  }

  &__body {
    background-color: var(--main-dark-color);
    padding: 10px 5px;
    border-radius: 3px;

    .label {
      color: #fff;
      font-weight: normal;
      font-size: 14px;
    }
  }

  .b-numberinput .control {
    &.minus {
      display: none;
    }
    &.plus {
      display: none;
    }
  }
}
</style>
