// import HLTable from '../built/index';
// import HLTable from './index.js';

// var HLTable = require('/build.js');
// require


window.onload = function(e) {
    console.log('||||||',e, HLTable);
    var htab = HLTable.default;
    console.log(htab);
    var tab = new htab({
        tabHeader: [{field: 't', name: '1'}],
        tabBody: [],
        Dom: document.getElementById('example'),
    });
    // var tab = new HLTable({});
    console.log(tab);
}
