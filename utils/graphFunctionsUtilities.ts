function generateRandomLightColor() {
    const minBrightness = 70; // Adjust this value to set the minimum brightness for the color
    return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 50)}%, ${minBrightness + Math.floor(Math.random() * (100 - minBrightness))}%)`
}

const solidColors = [
    "#f6511d", "#ffb400", "#00a6ed", "#7fb800", "#0d2c54",
    "#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff",
    "#6f1d1b", "#bb9457", "#432818", "#99582a", "#036d97",
    "#4c90c0", "#d90a0a", "#628f32", "#b8d20d"
]

// Function to randomly choose a color from the solidColors array
function getRandomSolidColor() {
    const randomIndex = Math.floor(Math.random() * solidColors.length);
    return solidColors[randomIndex];
}

export function processData(data) {
    const resultArray = {}

    data.trim().split('\n').forEach(row => {
        const columns = row.split('\t')

        const clusterId = columns[0]
        const hadithId1 = columns[3]
        const hadithId2 = columns[4]
        const hadith1 = columns[5]
        const hadith2 = columns[6]

        if (!resultArray[clusterId]) {
            resultArray[clusterId] = {
                nodes: new Set(),
                relations: []
            }
        }

        resultArray[clusterId].nodes.add({key: columns[1], hadith: hadith1, hadithId: hadithId1})
        resultArray[clusterId].nodes.add({key: columns[2], hadith: hadith2, hadithId: hadithId2})

        resultArray[clusterId].relations.push({from: columns[1], to: columns[2]})
    });

    return resultArray
}

export function checkForDuplication(resultArray, clusterNumber) {
    const cluster = resultArray[clusterNumber]
    if (!cluster) return

    const nodesMap = new Map()
    cluster.nodes.forEach(node => {
        nodesMap.set(node.key, node)
    })

    const filteredNodes = Array.from(nodesMap.values())
    const filteredResult = {...cluster, nodes: filteredNodes}

    // Adding color to each node
    filteredResult.nodes.forEach(node => {
        node.color = generateRandomLightColor()
    })

    // Create a map to store unique colors for each 'from' value
    const fromColorMap = new Map()

    // Adding unique color to each relationship based on the 'from' property
    filteredResult.relations.forEach(relation => {
        if (!fromColorMap.has(relation.from)) {
            fromColorMap.set(relation.from, getRandomSolidColor()); // Use solid colors for relations
        }
        relation.color = fromColorMap.get(relation.from)
    });

    return filteredResult
}