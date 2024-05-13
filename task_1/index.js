import { encoded, translations } from './data.js'

// Массив исключений - поля, которые не нужно расшифровывать
const exceptions = ["groupId", "service", "formatSize", "ca"]

// Функция для добавления уникальных идентификаторов в объект уникальных идентификаторов
function addUniqueId(objUniqueIds, id, translation){
    // Проверяем, существует ли уже массив для данного идентификатора
    if (objUniqueIds[id] == undefined) objUniqueIds[id] = []

    // Проверяем, содержит ли массив уже данный перевод, и если нет - добавляем
    if (!objUniqueIds[id].includes(translation)) 
        objUniqueIds[id].push(translation)

    return objUniqueIds
}

// Функция для расшифровки полей объектов
function decode(encoded) {
    let decoded = [] // Массив для расшифрованных объектов
    let uniqueIds = {} // Объект для хранения уникальных идентификаторов

    // Проходимся по каждому объекту в массиве encoded
    for (let i in encoded) {
        decoded.push({}) // Создаем новый объект для расшифрованных данных

        // Проходимся по каждой паре ключ-значение в текущем объекте
        for (let [key, value] of Object.entries(encoded[i])) {
            let decodeValue = value // По умолчанию берем значение без изменений

            // Проверяем, является ли ключ полем для расшифровки и не входит ли он в исключения
            if (key.includes('Id') && !exceptions.includes(key)) {
                // Получаем перевод из словаря translations
                let translation = translations[value]
                // Если перевод существует, заменяем значение на переведенное и добавляем в уникальные идентификаторы
                if (translation !== undefined) {
                    decodeValue = translation
                    uniqueIds = addUniqueId(uniqueIds, key, decodeValue)
                }
            }
            // Присваиваем расшифрованное или исходное значение соответствующему ключу
            decoded[i][key] = decodeValue
        }
    }

    // Возвращаем расшифрованные данные и уникальные идентификаторы
    return [decoded, uniqueIds]
}

// Выводим исходные данные и словарь с переводами
console.log(encoded, translations)

// Расшифровываем данные
let [decoded, uniqueIds] = decode(encoded)

// Выводим расшифрованные данные и уникальные идентификаторы
console.log(decoded)
console.log(uniqueIds)
