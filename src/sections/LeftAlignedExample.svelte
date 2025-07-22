<script>
    import * as Highcharts from "highcharts";
    import "highcharts/modules/exporting";
    import { Chart } from "@highcharts/svelte";
    import Scroller from "../lib/Scroller.svelte";
    import ArticleText from "../lib/ArticleText.svelte";
    import HDJImage from "./HDJ_urate.jpeg";


    let imageVisible = true;

    function toggleImage() {
        imageVisible = !imageVisible;
    }
</script>

<div>
    <Scroller layout="left">
        {#snippet sticky()}
            <!-- Replace the chart div and button with this: -->
            {#if imageVisible}
                <div class="image-container">
                    <img
                        src={HDJImage}
                        alt="Chart showing unemployment data for Hudson County"
                        class="chart-image"
                    />
                </div>
            {/if}

            <button on:click={toggleImage} class="toggle-button">
                {imageVisible ? "Hide Chart" : "Show Chart"}
            </button>

            <div>
                <p>Feel free to click on the button to reveal the chart.</p>
                <p>
                    <strong>
                        Hudson county is a region within New Jersey.
                    </strong>
                </p>
            </div>
        {/snippet}

        {#snippet scrolly()}
            <ArticleText>
                Looking at this specific piece of data from the BWDC website, we
                can say for sure that the rate on uneployment is higher within
                Hudson County than it is Nationally.
            </ArticleText>

            <ArticleText>
                This brings us back to our main question : <br><strong>Why is there a high number of loans distributed over the years 
                in New Jersey, but the rate of unemployment within an area of New Jersey is high? 
                </strong>
            </ArticleText>

            <ArticleText>
                Why is the correlation not correlating? 
            </ArticleText>

            <ArticleText>
                Well the answer is simple : 
                <strong>
                Lack of funds for a better education. 
                </strong>
            </ArticleText>
        {/snippet}
    </Scroller>
</div>

<style>
    .chart-image{
        margin: 0px auto;
        width: 80%; 
        height: auto; 
        display: block; 
    }

    .toggle-button {
        margin: 20px;
        padding: 20px;
        color: #007052;
        background-color: #0bd956;
        border: solid 2px #007052;
        border-radius: 16px;
        font-size: large;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 0 #007052;
    }

    .toggle-button:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #007052;
    }
</style>
