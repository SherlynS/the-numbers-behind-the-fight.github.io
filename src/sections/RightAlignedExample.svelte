<script lang="ts">
    import * as Highcharts from "highcharts";
    import "highcharts/modules/exporting";
    import { Chart } from "@highcharts/svelte";
    import Scroller from "../lib/Scroller.svelte";
    import ArticleText from "../lib/ArticleText.svelte";
    import loansNJ from "../../7a_loans_NEW2.csv";
    import type { Options } from "highcharts";

    interface LoanData {
        state_name: string;
        loan_type: string;
        approval_fiscal_year: number;
        number_of_loans: string;
        geo_name: string;
    }

    function processNJLoansData(data: any[]) {
        // Change parameter type to any[] temporarily
        const currentYear = new Date().getFullYear();

        const njLoans = data
            .map((row) => ({
                ...row,
                // Convert string values to numbers
                approval_fiscal_year: parseInt(row.approval_fiscal_year, 10),
                number_of_loans: parseFloat(row.number_of_loans),
            }))
            .filter(
                (row) =>
                    row.state_name === "New Jersey" &&
                    row.loan_type === "7(a) Loans" &&
                    row.approval_fiscal_year >= currentYear - 10,
            );

        njLoans.sort((a, b) => a.approval_fiscal_year - b.approval_fiscal_year);

        return njLoans.map((loan) => ({
            x: Date.UTC(loan.approval_fiscal_year, 0, 1),
            y: loan.number_of_loans,
            name: loan.geo_name,
        }));
    }

    // Chart options
    const options: Options = {
        chart: {
            type: "column",
            //zoomType: "x",
        },
        title: {
            text: "7(a) Loans in New Jersey (Past 10 Years)",
        },
        subtitle: {
            text: "Loan amounts over time",
        },
        xAxis: {
            type: "datetime",
            title: {
                text: "Year",
            },
        },
        yAxis: {
            title: {
                text: "Number of loans",
            },
            labels: {
                formatter: function () {
                    return this.value.toLocaleString();
                },
            },
        },
        tooltip: {
            pointFormat: "<b>{point.y:,.0f}</b>",
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                threshold: null,
            },
        },
        series: [
            {
                type: "column", // Add this line
                name: "7(a) Loans",
                color: "#2ecc71",
                data: processNJLoansData(loansNJ),
            },
        ],
    };
</script>

<div>
    <Scroller layout="right">
        {#snippet sticky()}
            <div class="chart">
                <Chart {options} highcharts={Highcharts} />
            </div>
            <p>
                This a chart that shows the total number of loans that have been
                given out in New Jersey for the past few years.
                <a
                    href="https://public.tableau.com/app/profile/harsha.mallajosyula5209/viz/BWDC-BusinessOwnership-Section2_1/Dashboard-BusinessOwnership-Section2_1"
                >
                    Offical BWDC chart</a
                >!
            </p>
            <p>
                📈 <strong> Number of loans </strong> are important to consider because
                they allow us to understand how much suppot is being provided to
                new businesses.
            </p>
            <p>Feel free to hover over the data and explore!</p>
            <p>
                Now let's go ahaed and take a closer look at this data within
                the county.
            </p>
        {/snippet}

        {#snippet scrolly()}
            <ArticleText>
                <strong
                    >Why did the charachter on the right struggle with finding a
                    job?</strong
                >
            </ArticleText>

            <ArticleText>
                It would be safe to assume that because small business are
                opening, then that would indicate more job opportunities.
                Nationally this is true, but in <strong
                    >Hudson county, NJ</strong
                >
                this isn't the case.
            </ArticleText>

            <ArticleText>
                Let't take a closer look at the data (on the left) in order to
                understand why this is not the case within New Jersey first.
            </ArticleText>

            <ArticleText>
                As you can see from the numbers the total number of loans
                distributed across the years has been increasing, which would be
                considered a great thing because, more jobs = more job
                opportunities, RIGHT ?
            </ArticleText>
        {/snippet}
    </Scroller>
</div>

<style>
    .chart {
        width: 90%;
        margin: 0px auto;
    }
</style>
