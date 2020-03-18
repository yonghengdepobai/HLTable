
// import css from './hl_table.css';

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
        outDiv.classList.add('hltabContainer');
        // 给一个默认高宽
        outDiv.style.width = '98vw';
        outDiv.style.height = '80vh';

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

        changeChilderToArr(header, allIn);
        

        for (let i = 0; i < allIn.length; i++) {
            let f = document.createElement('div');
            let item = allIn[i];
            for (let j = 0; j < item.length; j++) {
                let hs = document.createElement('div');
                let jitem = item[j];
                hs.style.width = (jitem.width * defWidth)  + 'px'; // 设置样式 style 还是class
                hs.classList.add(`headRow`, `headRow_${i}`); // 添加通用样式
                if (i == allIn.length - 1) {
                    hs.innerText = jitem.info.headerName;
                } else {
                    if (jitem.info.children != null) {hs.innerText = jitem.info.headerName;}
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

var mokHeader = {
    "header":[
        {
            "children":[
                {
                    "headerName":"日期",
                    "field":"date"
                },
                {
                    "headerName":"客户姓名",
                    "field":"customer_name"
                },
                {
                    "headerName":"客户级别",
                    "field":"level"
                },
                {
                    "headerName":"省（直辖市）",
                    "field":"addr_province"
                },
                {
                    "headerName":"地（市）",
                    "field":"addr_city"
                },
                {
                    "headerName":"县（市）",
                    "field":"addr_country"
                },
                {
                    "headerName":"乡镇",
                    "field":"addr_detail"
                },
                {
                    "headerName":"电话",
                    "field":"phone"
                }
            ],
            "headerName":"客户信息"
        },
        {
            "children":[
                {
                    "headerName":"产品简称",
                    "field":"shangpinjc"
                },
                {
                    "headerName":"产品大类",
                    "field":"zhizaobm"
                },
                {
                    "headerName":"产品类别",
                    "field":"dingdanlb"
                },
                {
                    "headerName":"型号规格",
                    "field":"dangci"
                },
                {
                    "headerName":"其他",
                    "field":"qita"
                }
            ],
            "headerName":"产品信息"
        },
        {
            "children":[
                {
                    "headerName":"销售模式",
                    "field":"xiaoshoums"
                },
                {
                    "headerName":"销量",
                    "field":"xiaoliang"
                },
                {
                    "headerName":"销售单价",
                    "field":"xiaoshoudj"
                },
                {
                    "headerName":"成本单价",
                    "field":"benyuedj"
                },
                {
                    "headerName":"销售收入",
                    "field":"xiaoshousr"
                },
                {
                    "headerName":"销售成本",
                    "field":"xiaoshoucb"
                },
                {
                    "headerName":"毛利",
                    "field":"maoli"
                },
                {
                    "headerName":"毛利率",
                    "field":"maolil"
                }
            ],
            "headerName":"销售盈亏"
        },
        {
            "children":[
                {
                    "headerName":"现金销售",
                    "field":"cash"
                },
                {
                    "headerName":"欠款销售",
                    "field":"qiankuane"
                },
                {
                    "headerName":"提货方式",
                    "field":"tihuofs"
                },
                {
                    "headerName":"经手人",
                    "field":"jingshour"
                }
            ],
            "headerName":"责任信息"
        }
    ]
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

export default HLTable;