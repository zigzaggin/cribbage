const colors = ['blue', 'red', 'purple', 'green']

export function getColor(i) {
    return colors[i % colors.length];
}