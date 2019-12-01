export const FormatDate = (d: string): string => {
    const date = new Date(d);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}