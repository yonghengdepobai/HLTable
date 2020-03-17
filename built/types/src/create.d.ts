declare type TabHead = Head[];
declare type Head = {
    field: string;
    name: string;
    id?: string;
    children?: TabHead | null;
};
declare type tabOption = {
    tabHeader: TabHead;
    tabBody: [];
    Dom: Element | 'string';
};
declare class HLTable {
    options: tabOption;
    constructor(options: tabOption);
    importCss(): void;
    /**
     * 根据 tabHeader生成表头
     */
    createHeader(header: TabHead): HTMLElement;
    /**
     *
     * @param outDiv
     * 将元素输出
     */
    outTabl(outDiv: HTMLDivElement): void;
}
export default HLTable;
