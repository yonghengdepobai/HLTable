// import HLTable from '../built/index';
// import HLTable from './index.js';

// var HLTable = require('/build.js');
// require


window.onload = function(e) {
    console.log('||||||',e, HLTable);
    var htab = HLTable.default;
    console.log(htab);
    
    var tab = new htab({
        // tabHeader: [{
        //     "headerName":"日期",
        //     "field":"date"
        // }],
        tabHeader: this.mokHeader.header,
        tabBody: [],
        Dom: document.getElementById('example'),
    });
    // var tab = new HLTable();
    console.log(tab);
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
