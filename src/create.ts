
// import css from './hl_table.css';

type colData = {
    field: string, // 一列的字段名
    name: string, // 列名
    id?: string, // id
};

type rowData =  colData[];

type TabHead = Head[]; // 对于多行表头的处理
type Head = {
    field: string, // 一列的字段名
    name: string, // 列名
    id?: string, // id
    children?: TabHead | null, // 子元素
};

type tabOption = { 
    tabHeader: TabHead, // 头部数据
    tabBody: [],
    Dom: Element | 'string', // 元素选择器
}

class HLTable {
    options: tabOption;
    constructor(options: tabOption) {
        this.options = options; // 接收一个设置对象
        
        this.importCss();

        // 自已他建一个div做为输出div
        let outDiv = document.createElement('div');

        // 处理表头生成一个表头
        let headDom = this.createHeader(this.options.tabHeader);
        outDiv.appendChild(headDom);
        
        // 输出显示
        this.outTabl(outDiv, this.options.Dom);
    }

    importCss(): void {
        // 给body引入一个css谁的
        let css = document.createElement('link');
        css.rel = "stylesheet";
        css.type = 'text/css';
        css.href = './css/index.css';
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(css);
    }

    /**
     * 根据 tabHeader生成表头
     */
    createHeader(header: TabHead): HTMLElement {
        let defWidth: number = 100; // 默认宽度
        let defHeight: number = 30; // 默认高度
        let allHead: HTMLElement = document.createElement('div');
        // 解析 将数组倒过来
        type tempHead = {width, height, info};
        type tempAll = tempHead[][];
        let pushArr: tempHead[] = [], allIn: tempHead[][] = [];
        
        for (let i = 0, len = header.length; i < len; i++) {
            let item = header[i];
            if (item.children == null) { // 如果不存在
                pushArr.push({width: 1, height: 1, info: item})
            } else {
                pushArr.push({width: 1 * item.children.length, height: 1 * item.children.length,
                     info: item})
            }
        }
        allIn.push(pushArr);
        headEnd(pushArr, allIn);

        let i = 0;
        function headEnd(parr: tempHead[], allIn: tempHead[][]) {
            let temp = false;
            let arr = [];
            i++;
            // if (i > 6) {return}
            for (let i = 0; i < parr.length; i++) {
                let item = parr[i].info;
                console.log(item, item.children == null);
                if (item.children == null) {
                    arr.push({width: 1, height: 1, info: item})
                } else {
                    temp = true;
                    arr.push({width: 1 * item.children.length, height: 1 * item.children.length,
                        info: item})
                }
            }
            if (temp) {
                // 添加了一行在递归一次看是否还一行
                allIn.push(arr);
                headEnd(arr, allIn);
            } else {
                // allIn.push(arr);
                return ;
            }
        }

        for (let i = 0; i < allIn.length; i++) {
            let f = document.createElement('div');
            let item = allIn[i];
            for (let j = 0; j < item.length; j++) {
                let hs = document.createElement('div');
                let jitem = item[j];
                hs.style.width = (jitem.width * defWidth)  + 'px'; // 设置样式 style 还是class
                hs.classList.add(`headRow`, `headRow_${i}`); // 添加通用样式
                if (i == allIn.length - 1) {
                    hs.innerText = jitem.info.name;
                } else {
                    if (jitem.info.children != null) {hs.innerText = jitem.info.name;}
                }
                f.appendChild(hs);
            }
            f.classList.add('hl_headGroup');
            allHead.appendChild(f);
        }
        allHead.classList.add('hl_All_head')

        return allHead;
        
    }

    /**
     * 
     * @param outDiv 
     * 将元素输出
     */
    outTabl(outDiv: HTMLDivElement, pDiv) {
        // 得到要输出Dom
        let ndom: Element;
        if (typeof pDiv == 'string' ) {
            ndom = document.querySelector(pDiv);
        } else if (pDiv instanceof Element) {
            ndom = pDiv;
        } else {
            throw(new Error('请传入Dom或选择器'));
        }

        ndom.appendChild(outDiv);
    }
}

export default HLTable;