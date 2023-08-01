export function useMoneyFormatter() {
  function format(value: number, currency: string): string {
    const locale = 'en-US'

    if (Number.isFinite(value)) {
      const numFormat = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      })
      const options = numFormat.resolvedOptions()
      value = value / 10 ** options.minimumFractionDigits
      return numFormat.format(value)
    } else {
      return '#NaN#'
    }
  }

  return {
    format,
  }
}
