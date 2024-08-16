import { filtersType } from "./types"

const categories = ["backgrounds", "fashion", "nature", "science", "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music"]

const filters: filtersType = {
    order: ["popular", "latest"],
    orientation: ["vertical", "horizontal"],
    type: ["photo", "illustration", "vector"],
    theme: ["red", "green", "yellow", "orange", "turquoise", "blue", "white", "black", "brown", "pink", "gray", "purple"],
}


export const constants = {
    categories, filters
}

