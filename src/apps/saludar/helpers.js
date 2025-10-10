export const greet = (name) => {
    if(!name) return "Hola!!"
    return  "Hola que tal "  + name?.trim()
}
