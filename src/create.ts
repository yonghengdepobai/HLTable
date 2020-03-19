
// import css from './hl_table.css';
import * as util from './utils'
type colData = {
    field: string, // 一列的字段名
    name: string, // 列名
    id?: string, // id
};

type rowData =  colData[];

type TabHead = Head[]; // 对于多行表头的处理
type Head = {
    field?: string, // 一列的字段名
    headerName: string, // 列名
    id?: string, // id
    edit?: boolean, // 是否可编辑
    fixed?: 'right' | 'left', // 默认为无 
    children?: TabHead | null, // 子元素
};

type tabOption = { 
    tabHeader: TabHead, // 头部数据
    tabBody: [],
    Dom: Element | 'string', // 元素选择器
}

class HLTable {
    private options: tabOption;
    tabAttr = {
        defWidth: 100, // 默认宽度
        defHeight: 30, // 默认高度
        headerLen: null,
        bodyLen: null,
        maxHeight: 0,
    };
    constructor(options: tabOption) {
        this.options = options; // 接收一个设置对象
        
        this.importCss();

        // 自已他建一个div做为输出div
        let outDiv = document.createElement('div');
        outDiv.classList.add('hltabContainer');
        // 给一个默认高宽
        outDiv.style.maxWidth = '98vw';
        outDiv.style.maxHeight = '80vh';

        // 处理表头生成一个表头
        let {headDom, headArr} = this.createHeader({header: this.options.tabHeader,
            tabAttr: this.tabAttr, outDom: outDiv});

        let hbody = this.createBody({bArr: this.options.tabBody, tabAttr: this.tabAttr});
        let showDom;
        if (this.options.tabBody.length > 100) {
            showDom= VirtualScrolling({allDom: outDiv, bodyArr: this.options.tabBody, tabAttr: this.tabAttr,
                                headArr: headArr,});
            hbody.appendChild(showDom);
        } else {
            showDom = setTabBody({body:this.options.tabBody, header:headArr, defWidth: this.tabAttr.defWidth});
            hbody.appendChild(showDom);
        }
        // hbody.style.maxHeight = (util.getViewportOffset().height * 0.8 - headArr.length * this.tabAttr.defHeight) + 'px';
        outDiv.appendChild(hbody);
        this.renderView({bodyArr: this.options.tabBody, tabAttr: this.tabAttr,
             allDom: outDiv, headArr: headArr, bodyDom: hbody, newDom: showDom});
        
        
        // 输出显示
        this.outTabl(outDiv, this.options.Dom);
    }

    createBody(param: {bArr, tabAttr}): HTMLElement {
        let {bArr, tabAttr} = param;
        let hbody = document.createElement('div');
        hbody.style.height = bArr.length * tabAttr.defHeight + 'px';
        let maxh = (util.getViewportOffset().height * 0.8 -
         tabAttr.headerLen * tabAttr.defHeight)
        hbody.style.maxHeight = maxh + 'px';
        tabAttr.bodyLen = bArr.length;
        tabAttr.maxHeight = maxh;
        return hbody;
    }


    renderView(param: {bodyArr, bodyDom: HTMLElement, headArr, tabAttr, allDom, newDom: HTMLElement}) {
        // 用什么来更新页面 scroll 事件还是requestAnimationFrame
        let {bodyDom, tabAttr, bodyArr, headArr, allDom, newDom} = param;
        allDom.addEventListener('scroll', (e) => {
            console.log('???');
            let showbody = VirtualScrolling({allDom, bodyArr, tabAttr, headArr }); // 更新Dom
            bodyDom.removeChild(bodyDom.childNodes[0]);
            bodyDom.appendChild(showbody);

        })
        
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
    createHeader(param: {header: TabHead, outDom: HTMLElement, tabAttr}): {headDom: HTMLElement, headArr} {
        let {header, outDom, tabAttr} = param;
        let allHead: HTMLElement = document.createElement('div');
        // 解析 将数组倒过来
        type tempHead = {width, height, info};
        type tempAll = tempHead[][];
        let pushArr: tempHead[] = [], allIn: tempHead[][] = [];

        changeChilderToArr(header, allIn);
        // console.log(allIn, '?????||||');
        

        for (let i = 0; i < allIn.length; i++) {
            let f = document.createElement('div');
            let item = allIn[i];
            for (let j = 0; j < item.length; j++) {
                let hs = document.createElement('div');
                let jitem = item[j];
                // console.log(jitem);
                if (!jitem.info.field && i == allIn.length - 1) {
                    throw new Error('表头数组数据格式不对，就输入field字段');
                }
                hs.style.width = (jitem.width * tabAttr.defWidth)  + 'px'; // 设置样式 style 还是class
                hs.classList.add(`headRow`, `headRow_${i}`); // 添加通用样式
                // 判断是否要设置固定
                if (jitem.info.fixed == 'left') {
                    hs.style.position = 'sticky';
                    hs.style.background = '#fff';
                    hs.style.left = j * tabAttr.defWidth + 'px'
                }
                if (jitem.info.fixed == 'right') {
                    hs.style.position = 'sticky';
                    hs.style.background = '#fff';
                    hs.style.right = j * tabAttr.defWidth + 'px'
                }
                if (i == allIn.length - 1) {
                    hs.innerText = jitem.info.headerName;
                } else {
                    if (jitem.info.children != null) {hs.innerText = jitem.info.headerName;}
                }
                f.appendChild(hs);
            }
            f.classList.add('hl_headGroup');
            f.style.width = allIn[allIn.length - 1].length * tabAttr.defWidth + 'px';
            allHead.appendChild(f);
        }
        allHead.classList.add('hl_All_head');
        allHead.style.width = allIn[allIn.length - 1].length * tabAttr.defWidth + 'px';

        tabAttr.headerLen = allIn.length;
        outDom.appendChild(allHead);
        // console.log(allHead.style.width, '????');
        outDom.style.width = allHead.style.width;

        return {headDom: allHead, headArr: allIn};
        
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



function changeChilderToArr(header: TabHead, newArr = []) {
    let arr = [], nextArr = [], temp = false;
    for (let i = 0; i < header.length; i++) {
        let item = header[i];
        let w = item.children ? item.children.length : 1;
        arr.push({info: item, width: w, height: 1, children: item.children});
        if (item.children) {
            temp = true;
            nextArr.push(...item.children)
            // if (item.notOne)
            // changeChilderToArr(item.children);
        } else {
            nextArr.push(item)
        }
    }
    newArr.push(arr);
    if (temp) {
        changeChilderToArr(nextArr, newArr);
    }
}

function setTabBody(param: {body, header, defWidth}): HTMLElement {
    // 处理body数组同时生成dom
    let bdom = document.createElement('div');
    bdom.classList.add('hlBody')
    let h = param.header[param.header.length - 1];
    for (let i = 0; i < param.body.length; i++) {
        let item = param.body[i];
        let rowDom = document.createElement('div');
        rowDom.classList.add('hlBodyRow');
        rowDom.style.width = h.length * 100 + 'px';
        for (let j = 0; j < h.length; j++) {
            let jitem = h[j];
            let colDom = document.createElement('div');
            setCell({colDom, item, jitem, index: j, defWidth: param.defWidth});
            rowDom.appendChild(colDom);
        }
        bdom.appendChild(rowDom);
    }
    return bdom;
}

function setTabVBody(param: {header, body, defWidth}): HTMLElement {
    // 处理body数组同时生成dom
    let bdom = document.createElement('div');
    bdom.classList.add('hlBody')
    let h = param.header[param.header.length - 1];
    for (let i = 0; i < param.body.length; i++) {
        let item = param.body[i];
        let rowDom = document.createElement('div');
        rowDom.classList.add('hlBodyRow');
        rowDom.style.width = h.length * 100 + 'px';
        for (let j = 0; j < h.length; j++) {
            let jitem = h[j];
            let colDom = document.createElement('div');
            setCell({colDom, item, jitem, index:j, defWidth: param.defWidth});
            rowDom.appendChild(colDom);
        }
        bdom.appendChild(rowDom);
    }
    return bdom;
}

function setCell(param: {colDom: HTMLElement, item, jitem, index, defWidth}) {
    if (param.jitem.info.edit) { // 可编辑
        param.colDom.addEventListener('dblclick', function(e) {
            let val = this.innerText;
            let _this = this;
            let input = document.createElement('input');
            input.value = val; // 设置样式
            input.style.width = '100%';
            input.setAttribute('autofocus', 'autofocus');
            input.addEventListener('blur', function(e) {
                let val = this.value;
                _this.removeChild(this);
                _this.innerText = val;
            })
            this.innerText = '';
            this.appendChild(input);
        });
    } else {
        // console.log(param.item, param.jitem.info);
        
    }
    param.colDom.innerText = param.item[param.jitem.info.field];
    // console.log(param.jitem.info);
    if (param.jitem.info.fixed == 'left') {
        param.colDom.style.position = 'sticky';
        param.colDom.style.background = '#fff';
        param.colDom.style.left = param.index * param.defWidth + 'px'
    }
    if (param.jitem.info.fixed == 'right') {
        param.colDom.style.position = 'sticky';
        param.colDom.style.background = '#fff';
        param.colDom.style.right = param.index * param.defWidth + 'px'
    }
    // 设置样式
    param.colDom.classList.add('hlBodyCol');
    param.colDom.style.width = '100px';
}


/**
 * 设置页面虚拟滚动
 */
function VirtualScrolling(param: {allDom, bodyArr, headArr, tabAttr}) {
    let {bodyArr, headArr, tabAttr, allDom} = param;
    let viewport; // table数据的可视区域 要提供可视区域高度，用于计算要加载的数据条数
    // let size; // 每条据在DOM中占用的高度，用于统计虚拟列表的高度，默认的每行高度为30px
    let RenderItems; // 真正呈现在用户视觉上的items
    let ReMainItems; // (向上，向下)可视区域之外的数据高度，不是显示在viewport中，但是存在DOM中
    // 用于滚动距离不是很大，UI不需要重新渲染
    // 计算boby高度 行高确定

    let {size, sTop, index, tabheight} = VirtualSParm({allDom, tabAttr});
    let sbody = bodyArr.slice(index, index + size * 3);
    // console.log(size, sTop, index, sbody);
    // return;
    let showbody = setTabVBody({header: headArr, body: sbody, defWidth: tabAttr.defWidth});
    // showbody.style.height = tabheight + 'px';
    showbody.style.paddingTop = sTop + 'px';
    showbody.style.paddingBottom = tabheight - sTop - (size * 2 * tabAttr.defHeight) + 'px';
    return showbody;
}

function VirtualSParm(param: {allDom?: HTMLElement, tabAttr}) {
    let {tabAttr, allDom} = param;
    let tabheight = tabAttr.bodyLen * tabAttr.defHeight;
    // console.log(tabheight, tabAttr.defHeight);
    let size = Math.ceil(tabAttr.maxHeight / tabAttr.defHeight);
    let oldTop = allDom ? allDom.scrollTop: 0;
    let sTop = Math.max(oldTop - size * tabAttr.defHeight, 0);
    let index = Math.floor(sTop / tabAttr.defHeight);
    // let sbody = bodyArr.slice(index, index + size * 3);
    return {tabheight, size, sTop, index}
}

export default HLTable;