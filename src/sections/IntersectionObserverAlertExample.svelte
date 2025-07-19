<script>
    import "highcharts/modules/exporting";
    import Scroller from "../lib/Scroller.svelte";
    import ObservedArticleText from "../lib/ObservedArticleText.svelte";

    let hasAlerted = false;

    const options = {
        threshold: [0.85, 0.95],
    };

    const simpleCallback = (entries, observer) => {
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

    const alertCallback = (entries, observer) => {
        entries.forEach((entry) => {
            const elem = entry.target;
            if (entry.intersectionRatio >= 0.9 && !hasAlerted) {
                // "active" state
                alert(
                    "The first time that article text section scrolls into view," +
                        " this alert pops up! Then, we set the hasAlerted flag to true," +
                        " which we use to prevent the alert from showing again." +
                        " Refresh the page if you want to see it happen again. " +
                        '(btw, "flag" is just a jargon term for a boolean variable!)',
                );
                hasAlerted = true;
            }
        });
    };
</script>

<div>
    <Scroller layout="right">
        {#snippet sticky()}
            <div>
                <p>
                    You can use the event triggered by an Intersection Observer
                    any way you want!
                </p>

                <p>
                    This section will show you how to use it to
                    <strong>
                        change something other than the element that triggered
                        the event.
                    </strong>
                </p>
                <p>
                    To see this section in action again, you'll have to refresh
                    the page.
                </p>
            </div>
        {/snippet}

        {#snippet scrolly()}
            <ObservedArticleText callback={simpleCallback} {options}>
                This article text is just like the ones from the last section.
                <br /><br />
                <strong>The next one will do something different.</strong>
            </ObservedArticleText>

            <ObservedArticleText callback={alertCallback} {options}>
                This <code>{"<ArticleText>"}</code> component causes an alert to
                show when scrolled into view!
                <br /><br />
                Notice that nothing changes about this particular
                <code>{"<ArticleText>"}</code> component itself.
                <br /><br />
                <strong
                    >You can use an Intersection Observer event to trigger
                    changes:</strong
                >
                <ul>
                    <li>the observed element itself</li>
                    <li>in some other element</li>
                    <li>or both</li>
                </ul>
            </ObservedArticleText>

            <ObservedArticleText callback={simpleCallback} {options}>
                Think of the Intersection Observer event trigger like any other
                event:
                <ul>
                    <li>a <code>mouseover</code> event</li>
                    <li>a <code>mouseclick</code> event</li>
                    <li>a keyboard key being pressed</li>
                </ul>
                Any of these kinds of events can be used to trigger any action you
                want to take on the page.
            </ObservedArticleText>

            <ObservedArticleText callback={simpleCallback} {options}>
                <strong>
                    🤔 How might you use this functionality to draw attention to
                    something on your website?
                </strong>
            </ObservedArticleText>
        {/snippet}
    </Scroller>
</div>
