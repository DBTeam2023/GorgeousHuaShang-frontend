export function findIndicesWithProperties(array, properties) {
    const indices = [];

    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        let match = true;

        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                if (item.property[key] !== properties[key]) {
                    match = false;
                    break;
                }
            }
        }

        if (match) {
            indices.push(index);
        }
    }

    return indices[0];
}


export  function mergeSimilarProperties(array) {
    const mergedProperties = {};

    array.forEach(item => {
        const property = item.property;

        for (const key in property) {
            if (property.hasOwnProperty(key)) {
                const value = property[key];

                if (!mergedProperties[key]) {
                    mergedProperties[key] = [value];
                } else if (!mergedProperties[key].includes(value)) {
                    mergedProperties[key].push(value);
                }
            }
        }
    });

    return mergedProperties;
}

export  const handleSelectProperties = (inputObject) => {
    for (const key in inputObject) {
        inputObject[key] = inputObject[key][0];
    }
    return inputObject;
}