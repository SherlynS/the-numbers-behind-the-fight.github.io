import { getNJLoansData } from './dataProcessor.js';

export function getChartOptions(csvData) {
    const seriesData = getNJLoansData(csvData);
    
    return {
        chart: {
            type: "area",
            zoomType: 'x'
        },
        title: {
            text: "7(a) Loans in New Jersey (Past 10 Years)"
        },
        // ... rest of your chart options ...
        series: [{
            name: '7(a) Loans',
            data: seriesData
        }]
    };
}