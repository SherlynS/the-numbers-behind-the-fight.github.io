<script>
    import TitleCard from "../lib/TitleCard.svelte";

    const title = `The general take away is for us to invest in dreams 
        not who people are or what they identify as.`;
    const subtitleLines = [
        "Thank you for taking the time to read through my website." +
            " Wanna help me make a change in Hudson County?" +
            " Schedule a time to meet : https://calendly.com/saavedrasherlynedu",
    ];
</script>

<TitleCard {title} subtitle={subtitleLines} />
