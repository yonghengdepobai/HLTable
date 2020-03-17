"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import css from './hl_table.css';
require("./hl_table.css");
var HLTable = /** @class */ (function () {
    function HLTable(options) {
        this.options = options; // 接收一个设置对象
        this.importCss();
        // 自已他建一个div做为输出div
        var outDiv = document.createElement('div');
        // 处理表头生成一个表头
        var headDom = this.createHeader(this.options.tabHeader);
        outDiv.appendChild(headDom);
        // 输出显示
        this.outTabl(outDiv);
    }
    HLTable.prototype.importCss = function () {
        // 给body引入一个css谁的
        var css = document.createElement('link');
        css.type = 'text/css';
        css.href = './hl_table.css';
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(css);
    };
    /**
     * 根据 tabHeader生成表头
     */
    HLTable.prototype.createHeader = function (header) {
        var defWidth = 100; // 默认宽度
        var defHeight = 30; // 默认高度
        var allHead = document.createElement('div');
        var pushArr = [], allIn = [];
        for (var i_1 = 0, len = header.length; i_1 < len; i_1++) {
            var item = header[i_1];
            if (item.children == null) { // 如果不存在
                pushArr.push({ width: 1, height: 1, info: item });
            }
            else {
                pushArr.push({ width: 1 * item.children.length, height: 1 * item.children.length,
                    info: item });
            }
        }
        allIn.push(pushArr);
        headEnd(pushArr, allIn);
        var i = 0;
        function headEnd(parr, allIn) {
            var temp = false;
            var arr = [];
            i++;
            // if (i > 6) {return}
            for (var i_2 = 0; i_2 < parr.length; i_2++) {
                var item = parr[i_2].info;
                console.log(item, item.children == null);
                if (item.children == null) {
                    arr.push({ width: 1, height: 1, info: item });
                }
                else {
                    temp = true;
                    arr.push({ width: 1 * item.children.length, height: 1 * item.children.length,
                        info: item });
                }
            }
            if (temp) {
                // 添加了一行在递归一次看是否还一行
                allIn.push(arr);
                headEnd(arr, allIn);
            }
            else {
                // allIn.push(arr);
                return;
            }
        }
        for (var i_3 = 0; i_3 < allIn.length; i_3++) {
            var f = document.createElement('div');
            var item = allIn[i_3];
            for (var j = 0; j < item.length; j++) {
                var hs = document.createElement('div');
                var jitem = item[j];
                hs.style.width = (jitem.width * defWidth) + 'px'; // 设置样式 style 还是class
                hs.classList.add("headRow", "headRow_" + i_3); // 添加通用样式
                if (i_3 == allIn.length - 1) {
                    hs.innerText = jitem.info.name;
                }
                else {
                    if (jitem.info.children != null) {
                        hs.innerText = jitem.info.name;
                    }
                }
                f.appendChild(hs);
            }
            allHead.appendChild(f);
        }
        return allHead;
    };
    /**
     *
     * @param outDiv
     * 将元素输出
     */
    HLTable.prototype.outTabl = function (outDiv) {
        // 得到要输出Dom
        var ndom;
        if (typeof this.options.Dom == 'string') {
            ndom = document.querySelector(this.options.Dom);
        }
        else if (this.options.Dom instanceof Element) {
            ndom = this.options.Dom;
        }
        else {
            throw (new Error('请传入Dom或选择器'));
        }
        ndom.appendChild(outDiv);
    };
    return HLTable;
}());
exports.default = HLTable;
