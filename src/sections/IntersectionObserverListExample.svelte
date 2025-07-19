<script>
    import { blur, slide } from "svelte/transition";
    import Scroller from "../lib/Scroller.svelte";
    import ObservedArticleText from "../lib/ObservedArticleText.svelte";
    import ArticleText from "../lib/ArticleText.svelte";

    const options = {
        threshold: [0.95],
    };

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            const elem = entry.target;
            // TODO: only do this if we're scrolling upward
            if (entry.intersectionRatio >= 0.9) {
                // "active" state
                elem.style.backgroundColor = "#e3ff00";
                const listItem = firstList.pop();
                secondList.push(listItem);
            }
        });
    };

    let firstList = $state([
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
    ]);

    let secondList = $state([]);
</script>

<div>
    <Scroller layout="right">
        {#snippet sticky()}
            <div id="lists-container">
                <div class="list">
                    <h3>list one</h3>
                    {#each firstList as item}
                        <div
                            class="list-item"
                            in:slide={{ duration: 750 }}
                            out:blur={{ duration: 1000 }}
                        >
                            {item}
                        </div>
                    {/each}
                </div>

                <div class="list">
                    <h3>list two</h3>
                    {#each secondList as item}
                        <div
                            class="list-item"
                            in:slide={{ duration: 750 }}
                            out:blur={{ duration: 1000 }}
                        >
                            {item}
                        </div>
                    {/each}
                </div>
            </div>
        {/snippet}

        {#snippet scrolly()}
            <ArticleText>
                This section is... a little buggy. But it might give you some
                ideas. As you scroll through each of the <code
                    >{"<ObservedArticleText>"}</code
                >
                components, list items are moved from list one to list two.
                <br /><br />
                (The buggy bit is that if you scroll in the opposite direction, they
                still get moved).
            </ArticleText>

            <ObservedArticleText {callback} {options}>
                Move element seven.
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                Move element six.
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                Move element five.
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                Move element four.
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                Move element three.
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                Move element two.
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                Move element one.
            </ObservedArticleText>
        {/snippet}
    </Scroller>
</div>

<style>
    #lists-container {
        display: flex;
        position: fixed;
        flex: 1 1; /* Allows growing, shrinking */
        width: 100%;
    }

    .list {
        margin: 0px 20px;
        background-color: #ff99fc;
        color: #8427c9;
        border: solid #8427c9 3px;
        border-radius: 20px;
        box-shadow: 16px 16px #8aa6df;
        width: 100%;
    }

    .list-item {
        background-color: #e3ff00;
        color: #8427c9;
        border: solid #8427c9 3px;
        border-radius: 20px;
        padding: 10px;
        width: 50%;
        margin: 5px auto;
        text-align: center;
    }

    h3 {
        text-align: center;
    }
</style>
