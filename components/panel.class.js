'use strict';
const moment = require('moment');
export default class Panel {
    constructor(container){
        this.container = container;
    }

    buildPanel(data){
        this.container.innerHTML = this.buildMarkUp(data);
    }

    clearPanel(){
        this.container.innerHTML = '';
    }

    buildMarkUp(data){
        let html = `
            <h2>${data.properties.Name}</h2>
            <p><strong>Section:</strong> ${data.properties.Section}</p>
            <p><strong>Year Enacted:</strong> ${moment(data.properties.Year_Enacted).format('MMMM Do, YYYY')}</p>
            ${(data.properties.Report_Link != "n/a") ? `<p><a href="${data.properties.Report_Link}" target="_blank">Download Report</a></p>` : ``}
        `;
        
        return html;
    }
}