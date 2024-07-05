export const convertMinutesToString = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`
}