<script>
    import Scroller from "../lib/Scroller.svelte";
    import ArticleText from "../lib/ArticleText.svelte";
    import lackOfFunds from "./lack_of_funding.jpg";
    import attainedDegress from "./percent_of_degrees_attained_nj.jpg";
    import { onMount } from 'svelte';
    
    let showSecondImage = false;
    let imageVisible = true;

    // Function to toggle the second image (following the same pattern)
    function toggleSecondImage() {
        showSecondImage = !showSecondImage;
    }
</script>

<div>
   <Scroller layout="left">
        {#snippet sticky()}
            {#if imageVisible}
                <div class="image-container">
                    {#if !showSecondImage}
                        <img
                            src={lackOfFunds}
                            alt="Chart showing lack of funds in Hudson County/NJ"
                            class="chart-image"
                        />
                    {:else}
                        <img
                            src={attainedDegress}
                            alt="Education degree attainment statistics"
                            class="chart-image"
                        />
                    {/if}
                </div>
            {/if}

            <button on:click={toggleSecondImage} class="toggle-button">
                {showSecondImage ? "Show Funding Chart" : "Show Education Statistics"}
            </button>
            <div>
                <p>Feel free to click on the button to switch between charts.</p>
                <p>
                    <strong>
                        These charts show education funding and achievement data for New Jersey.
                    </strong>
                </p>
            </div>
        {/snippet}

        {#snippet scrolly()}
            <ArticleText>
                Hudson county has a demographic that consists of mainly
                hispanic, along with also high numbers for white, black and
                asian. A lot of Hudson County public high schools are very
                undersourced due to either their low graduation rate or low
                testing rate. This website dives into the lack of funding
                specifically towards New Jersey black and latino students.
                <br>
                <br>
                <strong>
                    <a
                        href="https://edlawcenter.org/research/the-color-of-opportunity/"
                    >
                        Click here: The Color of Opportunity</a
                    >
                </strong>
                <br>
                <br>
                Due to the lack of funding in education within NJ, it is evident
                that it is hard for current generations to find jobs, as we previously
                saw in our data.
            </ArticleText>

            <ArticleText>
                Therefore investing more in these public schools regardless of
                what race or gender these students are is critical.
            </ArticleText>
        {/snippet}
    </Scroller>
</div>

<style>
    .chart-image {
        transition: opacity 0.5s ease-in-out;
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
    .fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .image-container {
        position: relative;
    }
</style>