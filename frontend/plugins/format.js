export default ({ app }, inject) => {
  inject('format', {
    price (value) {
      let formatted = parseFloat(value).toFixed(2)

      if (formatted < 0) {
        formatted = '-$' + formatted.replace('-', '')
      } else {
        formatted = '$' + formatted
      }

      return formatted
    }
  })
}
