/**
 * 
 * @param {*string} name 
 * @returns {*string} slug
 */
export const slugify = name => {
    const nameArr = name.toLowerCase().split(' ');
    return `${nameArr[0]}-${nameArr[1]}`;
}