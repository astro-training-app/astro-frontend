export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth) {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

// Format date to readable format
export function formatDate(dateString, options = { year: "numeric", month: "short", day: "numeric" }) {
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Format currency
export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

// Truncate text with ellipsis
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Generate random ID
export function generateId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

// Debounce function for search inputs etc.
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Get initials from name
export function getInitials(name) {
  if (!name) return ""
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}
