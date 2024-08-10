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