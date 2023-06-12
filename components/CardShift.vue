<template>
  <div class="card shift-card">
    <div class="level mb-0">
      <h4 class="title level-left">{{ shift.title }}</h4>
      <div class="level-right">
        <b-button class="edit-button" type="is-ghost" @click="editShift">
          <b-icon icon="pencil" size="is-medium"> </b-icon>
        </b-button>
      </div>
    </div>
    <p class="description">{{ shift.description }}</p>
    <h4 class="title">Dates</h4>
    <ul class="dates-list">
      <li
        v-for="(date, index) in shift.dates"
        :key="date.date + index"
        class="dates-list__item"
      >
        <div>{{ normalizeDate(date.date) }}</div>
        <div>{{ normalizeTime(date.startsAt) }}</div>
        <div>{{ normalizeTime(date.endsAt) }}</div>
        <div>{{ date.type }}</div>
        <div class="has-text-centered">€ {{ date.price }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { toHumanReadableDate, toHumanReadableTime } from '~/utils/helpers'
export default {
  name: 'ShiftCard',
  props: {
    shift: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editShift() {
      this.$emit('editShift', this.shift.id)
    },
    normalizeDate(date) {
      return toHumanReadableDate(date)
    },
    normalizeTime(date) {
      return toHumanReadableTime(date)
    },
  },
}
</script>

<style scoped lang="scss">
.shift-card {
  padding: 30px 60px 50px 60px;
  margin-bottom: 45px;

  .title {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .description {
    font-size: 24px;
    margin-bottom: 25px;
  }

  .dates-list {
    margin-top: 25px;
    &__item {
      background-color: var(--main-dark-color);
      color: #fff;
      padding: 15px 30px;
      border-radius: 6px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 3fr 1fr;
      margin-bottom: 20px;
    }
  }

  .edit-button {
    color: var(--main-dark-color);
  }
}
</style>
