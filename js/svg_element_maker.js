const svgElementMaker = (type, properties) => {
    const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        type
    )

    for (const property in properties) {
        svgElement.setAttributeNS(null, property, properties[property])
    }

    return svgElement
}

export { svgElementMaker }

