export const getAge = (dob: Date) => {
    const todayDate = new Date();
    const diff = todayDate.getTime() - dob.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};