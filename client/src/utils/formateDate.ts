const formatDate = (date: string | Date): string => {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date)
}

export default formatDate
