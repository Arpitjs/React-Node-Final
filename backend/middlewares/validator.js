export const validateBody = (schema) => {
    return (req, res, next) => {
        const { body } = req;
        // console.log(body);
        const { error } = schema.validate(body, {});
        error ? next({ msg: error.details[0].message }) : next();
}
}