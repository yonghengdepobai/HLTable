
一个固定头部和可固定侧边的表格框

使用
```js
import HLTable from '' // 未发布...

var h = new HLTable(options);

options = {
    tabHeader: TabHead, // 头部数据
    tabBody: [],
    Dom: Element, // 要添加表格的dom
}

tabHeader = [{
    {
    field?: string, // 一列的字段名
    headerName: string, // 列名
    id?: string, // id
    edit?: boolean, // 是否可编辑
    fixed?: 'right' | 'left', // 默认为无
    children?: TabHead | null, // 子元素
}
}]

tabBody = [{

}]

// example

tabHeader = [
        {
            "headerName":"费用项目",
            "field":"name",
            edit: true,
            fixed: 'left',
        },
        {
            "headerName":"业务类别",
            "field":"yw_type_name"
        },
        {
            "headerName":"费用金额",
            "field":"spending"
        },
        {
            "headerName":"经手人",
            "field":"handlers"
        },
        {
            "headerName":"费用项目",
            "field":"clname"
        },
        {
            "headerName":"业务类别",
            "field":"clyw_type_name"
        },
        {
            "headerName":"费用金额",
            "field":"clspending"
        },
        {
            "headerName":"经手人",
            "field":"clhandlers"
        }
    ]

    tabBody = [
        {
            "name":"经营费用合计",
            "yw_type_name":"1",
            "spending":"0.00",
            "handlers":"1",
            "dept_id":null,
            "clname":"车油费",
            "clyw_type_name":"1",
            "clspending":0,
            "clhandlers":"1"
        },


```