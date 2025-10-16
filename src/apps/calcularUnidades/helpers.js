export const toMilimiters = (quantity,originUnit) => {
    if(originUnit == 'originMm') return quantity;
    if(originUnit== 'originCm') return (quantity * 10)
    if(originUnit== 'originDm') return (quantity * 100)
    if(originUnit== 'originM') return (quantity * 1000)
    if(originUnit== 'originDam') return (quantity * 10000)
    if(originUnit== 'originHm') return (quantity * 100000)
    if(originUnit== 'originKm') return (quantity * 1000000)
}

export const toDestiny = (quantity, destinyUnit) => {
    if(destinyUnit == 'destinyMm') return quantity + ' milimetros';
    if(destinyUnit== 'destinyCm') return (quantity / 10)+ ' centimetros'
    if(destinyUnit== 'destinyDm') return (quantity / 100)+' decimetros'
    if(destinyUnit== 'destinyM') return (quantity / 1000)+' metros'
    if(destinyUnit== 'destinyDam') return (quantity / 10000) + ' decametros'
    if(destinyUnit== 'destinyHm') return (quantity / 100000) + ' hectometros'
    if(destinyUnit== 'destinyKm') return (quantity / 1000000)+' kilometros'
}

export const verifyData = (quantity) => {
    if(!quantity || quantity != Number) return false;
    return true
}