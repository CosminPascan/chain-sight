const formatNumber = (number) => {
    return new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(
        number
    )
}

export default formatNumber
