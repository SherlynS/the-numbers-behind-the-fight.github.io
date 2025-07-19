<script>
    import Scroller from "../lib/Scroller.svelte";
    import ObservedArticleText from "../lib/ObservedArticleText.svelte";

    // this `options` object below is passed into the <ObservedArticleText>
    // component, and from there it gets passed to the IntersectionObserver object w
    // when it's created.
    // the thresholds to fire the callback are 85% and 95%. in the callback function,
    // we check whether the visible area is >= 90%. so, triggering the callback at
    // 85% and 95% ensures we trigger the correct change in background color
    // whether the element is being scrolled into the viewport or out of the viewport.
    const options = {
        threshold: [0.85, 0.95],
    };

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            const elem = entry.target;

            if (entry.intersectionRatio >= 0.9) {
                // "active" state
                elem.style.backgroundColor = "#e3ff00";
            } else if (entry.intersectionRatio < 0.9) {
                // "inactive" state
                elem.style.backgroundColor = "#888888";
            }
        });
    };
</script>

<div>
    <Scroller layout="left">
        {#snippet sticky()}
            <div>
                <p>
                    This section shows how to use the
                    <code>{"<ObservedArticleText>"} component.</code>
                </p>
                <p>
                    The <code>{"<ObservedArticleText>"}</code>
                    component is very similar to the
                    <code>{"<ArticleText>"}</code>
                    component, but it also creates and uses an
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
                    >
                        Intersection Observer
                    </a>.
                </p>
                <p>
                    That Intersection Observer object "watches" the element. We
                    can use it to answer the question:
                    <br /><br />
                    <strong
                        >"Is this element currently visible in the browser
                        window?"</strong
                    >
                    <br /><br />
                    <strong> How does it work?</strong> When some specified percentage of
                    the element crosses into or out of the viewport of this
                    browser window, a
                    <strong> callback function </strong> is called.
                </p>
                <p>
                    A <strong>callback function</strong> is a function, which we
                    define, that will get called when a specific event happens.
                </p>
                <p>
                    We can define any behavior we want to in that callback
                    function. In this case, we turn the background of the box a
                    different color depending on whether the element is more or
                    less than 90% visible.
                </p>
                <p>
                    📝 <strong>Try it yourself!:</strong> Make a change so that
                    the article text box changes color when <strong>50%</strong>
                    of it is visible.
                </p>
            </div>
        {/snippet}

        {#snippet scrolly()}
            <ObservedArticleText {callback} {options}>
                <code>{"<ObservedArticleText>"}</code> example #1
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                <code>{"<ObservedArticleText>"}</code> example #2
            </ObservedArticleText>

            <ObservedArticleText {callback} {options}>
                <code>{"<ObservedArticleText>"}</code> example #3
            </ObservedArticleText>
        {/snippet}
    </Scroller>
</div>
