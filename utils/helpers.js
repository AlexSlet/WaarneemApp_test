export function toHumanReadableDate(date) {
  return new Date(date).toLocaleDateString('en-GB')
}

export function toHumanReadableTime(date) {
  return new Date(date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getDefaultTime() {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  return date
}
