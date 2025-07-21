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
                Here's an example chart using
                <a href="https://www.highcharts.com/">Highcharts</a>!
            </p>
            <p>
                📈 <strong>Highcharts</strong> is a super-flexible library for
                creating all kinds of charts. See demos of different chart types
                <a href="https://www.highcharts.com/demo">here</a>.
            </p>
            <p>
                Since we're using Highcharts through Svelte, the syntax is a
                little different from what you might see in the demos. But all
                of Highcharts' functionality is available through the Highcharts
                for Svelte package.
            </p>
            <p>
                The configuration is done through the
                <code>options</code> json object passed to the chart, which you'll
                see in the source code for this template.
            </p>
            <p>
                Use the
                <a href="https://api.highcharts.com/highcharts/"
                    >API reference</a
                >
                to understand what each element in the <code>options</code> object
                does.
            </p>
        {/snippet}

        {#snippet scrolly()}
            <ArticleText>
                <strong
                    >Why did the right charachter struggle with finding a job?</strong
                >
            </ArticleText>

            <ArticleText>
                It would be safe to assume that because small business are
                opening, then that would indicate more job opportunities,
                nationally that is the strong case, but in <strong
                    >Hudson county, NJ</strong
                >
                that isn't the case.
            </ArticleText>

            <ArticleText>
                Let't take a closer look at the data in order to understand why
                this is the case nationally.
            </ArticleText>

            <ArticleText>
                This is <strong>just one way</strong> that scrollytelling can
                look.
                <br /><br />
                <strong>
                    If you use this template, be sure to modify it and make it
                    your own!
                </strong>
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
