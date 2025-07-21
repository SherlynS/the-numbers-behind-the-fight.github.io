<script>
    import { onMount } from "svelte";

    let { title, subtitle } = $props();

    let numbers = $state([]);
    const columns = 12;
    const numbersPerColumn = 8;

    // Educational statistics and relevant numbers
    const educationNumbers = [
        "75%",
        "3.2",
        "$45K",
        "89%",
        "2.8",
        "$52K",
        "67%",
        "4.1",
        "92%",
        "1.9",
        "$38K",
        "84%",
        "3.7",
        "76%",
        "2.5",
        "$61K",
        "88%",
        "3.4",
        "71%",
        "4.3",
        "$43K",
        "95%",
        "2.1",
        "79%",
        "3.9",
        "$56K",
        "82%",
        "2.7",
        "93%",
        "4.0",
        "$41K",
        "77%",
        "3.1",
        "86%",
        "2.4",
        "$59K",
        "91%",
        "3.6",
        "73%",
        "4.2",
    ];

    function createNumbers() {
        numbers = [];
        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < numbersPerColumn; row++) {
                const index = col * numbersPerColumn + row;
                const number = {
                    id: index,
                    value: educationNumbers[index % educationNumbers.length],
                    x: Math.max(
                        0,
                        Math.min(
                            95,
                            (col / columns) * 100 + (Math.random() - 0.5) * 10,
                        ),
                    ),
                    y: Math.max(
                        0,
                        Math.min(
                            95,
                            (row / numbersPerColumn) * 100 +
                                (Math.random() - 0.5) * 15,
                        ),
                    ),
                    size: Math.random() * 25 + 15,
                    direction: col % 2 === 0 ? "floatUp" : "floatDown",
                    duration: Math.random() * 4 + 8,
                    delay: row * 0.3 + Math.random() * 2,
                    opacity: Math.random() * 0.1 + 0.05,
                };
                numbers.push(number);
            }
        }
    }

    function updateNumbers() {
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            const randomValue =
                educationNumbers[
                    Math.floor(Math.random() * educationNumbers.length)
                ];

            if (numbers[randomIndex]) {
                numbers[randomIndex].value = randomValue;
            }
        }
        // No need for numbers = [...numbers] with $state
    }

    let mouseX = $state(0.5);
    let mouseY = $state(0.5);

    function handleMouseMove(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    }

    onMount(() => {
        createNumbers();
        const interval = setInterval(updateNumbers, 3000);
        return () => clearInterval(interval);
    });
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div class="title-card">
    <!-- Animated Numbers Background -->
    <div class="numbers-container">
        {#each numbers as number (number.id)}
            <div
                class="floating-number"
                style="
                    left: {number.x}%;
                    top: {number.y}%;
                    font-size: {number.size}px;
                    animation: {number.direction} {number.duration}s linear {number.delay}s infinite, 
                    pulse {number.duration /
                    2}s ease-in-out {number.delay}s infinite;
                    color: rgba(227, 255, 0, {number.opacity});
                    transform: translate({(mouseX - 0.5) *
                    (((number.id % 3) + 1) * 0.5)}px, {(mouseY - 0.5) *
                    (((number.id % 3) + 1) * 0.5)}px);
                "
            >
                {number.value}
            </div>
        {/each}
    </div>

    <!-- Main Content -->
    <div class="content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </div>
</div>

<style>
    .title-card {
        background: #0a7dcc;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
        position: relative;
        overflow: hidden;
    }

    /* Animated Background */
    .numbers-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }

    .floating-number {
        position: absolute;
        font-weight: bold;
        user-select: none;
        font-family: "Courier New", monospace;
        transition: transform 0.1s ease-out;
    }

    /* Main Content */
    .content {
        max-width: 900px;
        background-color: #cc348d;
        padding: 7rem;
        border: 6px solid #8ab408;
        border-radius: 2rem;
        box-shadow: 16px 16px #5e8a03;
        position: relative;
        z-index: 2;
        backdrop-filter: blur(2px);
    }

    h1 {
        font-size: 3rem;
        margin: 0;
        color: #ffffff;
        text-shadow: 1px 1px 0 #efa750;
    }

    p {
        font-size: 1.3rem;
        color: #f7f5eb;
        margin-top: 1rem;
    }

    /* Animations */
    @keyframes floatUp {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes floatDown {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100px) rotate(-360deg);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @media (max-width: 600px) {
        .content {
            padding: 4rem 2rem;
        }

        h1 {
            font-size: 2.2rem;
        }

        p {
            font-size: 1.1rem;
        }
    }
</style>
