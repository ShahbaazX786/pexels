export type nullishString = null | string;

export type categoryPropsType = {
    activeCategory: string | null;
    changeActiveCategory: React.Dispatch<React.SetStateAction<string>> | Function,
}

export type categoryItemPropsType = {
    title: string;
    index: number;
    isActive: boolean;
    changeActiveCategory: React.Dispatch<React.SetStateAction<string>>,
}

export type imageCardPropsType = {
    item: Object | any;
    index: number;
    columns: number;
}

export type imageMasonryPropsType = {
    data: Object | any;
}

export type filterSectionPropsType = React.JSX.IntrinsicAttributes & { data: any; filterName: any; filters: any; setFilters: any; }

export type filtersType = {
    order: string[],
    orientation: string[],
    type: string[],
    colors: string[],
}

export type sectionsType = {
    order: (props: filterSectionPropsType) => React.JSX.Element,
    orientation: (props: filterSectionPropsType) => React.JSX.Element,
    type: (props: filterSectionPropsType) => React.JSX.Element,
    colors: (props: filterSectionPropsType) => React.JSX.Element,
}

export type FilterRowPropsType = {
    data: any,
    filterName: string | any,
    filters: any,
    setFilters: React.Dispatch<React.SetStateAction<string>> | Function,
}

export type paramsType = {
    page: number,
    category?: string,
    q?: string,
    filters?: Object,
}