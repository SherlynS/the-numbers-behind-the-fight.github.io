export function getNJLoansData(csvData) {
    const currentYear = new Date().getFullYear();
    
    const njLoans = csvData.filter(row => 
        row.state_name === "New Jersey" && 
        row.loan_type === "7(a) Loans" && 
        row.approval_fiscal_year >= currentYear - 10
    );

    // Sort by year
    njLoans.sort((a, b) => a.approval_fiscal_year - b.approval_fiscal_year);

    // Prepare data for Highcharts
    return njLoans.map(loan => ({
        x: Date.UTC(loan.approval_fiscal_year, 0, 1),
        y: loan.loan_amount,
        name: loan.geo_name
    }));
}