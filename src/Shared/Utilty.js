export const isNullOrEmpty = (arr) => {
    const emptyLength = 0;
    return !arr || arr.length === emptyLength;
};