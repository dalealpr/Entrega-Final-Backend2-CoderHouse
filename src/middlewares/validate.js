export const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: 'Datos inválidos',
                details: error.details.map(err => err.message),
            });
        }

        next();
    };
};