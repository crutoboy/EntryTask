import { encoded, translations } from './data.js'

const exceptions = ["groupId", "service", "formatSize", "ca"]


function addUniqueId(objUniqueIds, id, translation){
    if (objUniqueIds[id] == undefined) objUniqueIds[id] = []

    if (!objUniqueIds[id].includes(translation)) 
        objUniqueIds[id].push(translation)

    return objUniqueIds
}

function decode(encoded) {
    let decoded = []
    let uniqueIds = {}

    for (let i in encoded) {
        decoded.push({})

        for (let [key, value] of Object.entries(encoded[i])) {
            let decodeValue = value

            if (key.includes('Id') && !exceptions.includes(key)) {
                let translation = translations[value]
                if (translation !== undefined) {
                    decodeValue = translation
                    uniqueIds = addUniqueId(uniqueIds, key, decodeValue)
                }
            }
            decoded[i][key] = decodeValue
        }
    }

    return [decoded, uniqueIds]
}

console.log("Let's rock")
console.log(encoded, translations)

let [decoded, uniqueIds] = decode(encoded)

console.log(decoded)
console.log(uniqueIds)
