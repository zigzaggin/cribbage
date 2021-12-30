const colors = ['blue', 'red', 'purple', 'green']

export function getColor(i) {
    if (i + "")
        return colors[parseInt(i) % colors.length];
    return null;
}