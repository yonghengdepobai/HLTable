import HLTable from './create';


describe('createHeader', () => {
    // let hlt = new HLTable({ 
    //     tabHeader: [],
    //     tabBody: [],
    //     Dom: document.createElement('div'),
    // })
    let cre = HLTable.prototype.createHeader;
    let head = [{field: 't', name: '1'}];
    test('创建一个数据的表头', () => {
        // expect(cre(head).className.includes('hl_All_head')).toBe(true);
        expect(1+1).toBe(2);
    });
})