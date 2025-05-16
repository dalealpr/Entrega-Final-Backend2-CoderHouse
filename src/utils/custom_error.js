export default class CustomError extends Error{
    constructor(message, status){
        super(message)
        this.status = status
    }
}
// Con esto Creo un mensaje de error y un codigo personalizado para cada peticion
// throw new CustomError("Custom Error", 404)

