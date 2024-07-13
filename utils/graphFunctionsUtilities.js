const generateRandomLightColor = () => {
    const minBrightness = 70; // Adjust this value to set the minimum brightness for the color
    return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 50)}%, ${minBrightness + Math.floor(Math.random() * (100 - minBrightness))}%)`
}

const processData = (data) => {
    const resultArray = {}

    data.trim().split('\n').forEach(row => {
        const columns = row.split('\t')

        const clusterId = columns[0]
        const hadith1 = columns[5]
        const hadith2 = columns[6]

        if (!resultArray[clusterId]) {
            resultArray[clusterId] = {
                nodes: new Set(),
                relations: []
            }
        }

        resultArray[clusterId].nodes.add({ key: columns[1], hadith: hadith1 })
        resultArray[clusterId].nodes.add({ key: columns[2], hadith: hadith2 })

        resultArray[clusterId].relations.push({ from: columns[1], to: columns[2] })
    });

    return resultArray
}

const checkForDuplication = (resultArray, clusterNumber) => {
    const cluster = resultArray[clusterNumber]
    if (!cluster) return

    const nodesMap = new Map()
    cluster.nodes.forEach(node => {
        nodesMap.set(node.key, node)
    })

    const filteredNodes = Array.from(nodesMap.values())
    const filteredResult = { ...cluster, nodes: filteredNodes }

    // adding color to each node
    filteredResult.nodes.forEach(node => {
        node.color = generateRandomLightColor()
    })

    return filteredResult
}

module.exports = {processData, checkForDuplication}