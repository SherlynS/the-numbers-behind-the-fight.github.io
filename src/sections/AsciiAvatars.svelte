<script lang="ts">
  import { onMount } from "svelte";
  import { conversation, characterStyles } from "./conversation.js";

  // Type definitions
  type Speaker = "left" | "right" | null;
  let currentSpeaker = $state<Speaker>(null);

  interface Character {
    x: number;
    y: number;
    ascii: string;
    colors: typeof characterStyles.left | typeof characterStyles.right;
    speaker: Speaker;
  }

  let container: HTMLDivElement;
  let containerWidth = 800;
  let containerHeight = 600;
  let currentDialogueIndex = $state(0);
  let showSpeechBubble = $state(false);
  let currentMessage = $state<string>("");

  // ASCII art templates - enhanced for bigger display
  const leftCharacterArt = `                        
         ■◆◆▪○            
       ■◆◆◆◆◆■o           
      ◆■◆▪▪◆◆◆◆.          
     ▲◆◆■▪▪◆....          
     ▲◆■◆◆...  .          
     ■◆■■...   .           
     ▲◆■◆..  ◜ ◝          
     ■■◆■.   ▮ ▮          
     ▲■◆◆.    ◝           
     ■■■■.    ▱.          
     ▲■■■..    .          
     ■■■■......           
     ■■▲■■...             
   □□▲■■■▲□.◠◠□           
  □□□■▲■□■□□□◠□□□□◠       
  □◠□▲▲■□▲□□□□□□□□□       
  □□□▲□□□□□□□□□□□□□□`;

  const rightCharacterArt = `                        
        ●●●●●●              
      ●●●○○○●●●            
     ●●●○○○○○●●●           
     ●●○○◐◐○○●●           
     ●●○○○○○○●●           
     ●●●○○○○●●●           
      ●●●●●●●●            
       ■■■■■■             
       ■■■■■■             
       ■■■■■■             
       ■■■■■■             
       ▲▲▲▲▲▲             
       ▲▲▲▲▲▲             
     ██▲▲▲▲▲▲██           
    ███▲▲▲▲▲▲███          
   ████▲▲▲▲▲▲████         
  ██████▲▲▲▲██████        `;

  // Character positions - will be calculated responsively
  const leftCharacter = {
    x: 0,
    y: 0,
    ascii: leftCharacterArt,
    colors: characterStyles.left,
  };

  const rightCharacter = {
    x: 0,
    y: 0,
    ascii: rightCharacterArt,
    colors: characterStyles.right,
  };

  function calculateCharacterPositions() {
    if (!container) return;

    containerWidth = container.clientWidth;
    containerHeight = container.clientHeight;

    // Position characters more responsively
    const characterSpacing = Math.min(containerWidth * 0.3, 300);
    const centerX = containerWidth / 2.3;
    const centerY = containerHeight * 0.3; // Position lower for better speech bubble placement

    leftCharacter.x = centerX - characterSpacing;
    leftCharacter.y = centerY;

    rightCharacter.x = centerX + characterSpacing;
    rightCharacter.y = centerY;
  }

  function showNextDialogue() {
    // Check if we've reached the end of the conversation
    if (currentDialogueIndex >= conversation.length) {
      // Reset conversation to start over
      currentDialogueIndex = 0;
    }

    // Get the current dialogue item
    const dialogueItem = conversation[currentDialogueIndex];
    if (!dialogueItem) {
      console.error("No dialogue item found at index:", currentDialogueIndex);
      return;
    }

    currentSpeaker =
      dialogueItem.speaker === "left" || dialogueItem.speaker === "right"
        ? (dialogueItem.speaker as Speaker)
        : null;
    currentMessage = dialogueItem.message;
    showSpeechBubble = true;

    // Advance to next dialogue index for the next click
    currentDialogueIndex++;

    // Hide speech bubble after 4 seconds
    setTimeout(() => {
      showSpeechBubble = false;
    }, 900000);
  }

  function getSpeechBubblePosition() {
    if (!currentSpeaker) return { x: 0, y: 0 };

    const character =
      currentSpeaker === "left" ? leftCharacter : rightCharacter;
    const bubbleOffset = currentSpeaker === "left" ? -50 : 50; // Offset for better positioning

    return {
      x: character.x + bubbleOffset,
      y: character.y - 180, // Position well above character
    };
  }

  onMount(() => {
    calculateCharacterPositions();

    // Handle click events
    const handleClick = () => {
      showNextDialogue();
    };

    // Handle keyboard events
    const handleKeyPress = (event: {
      code: string;
      preventDefault: () => void;
    }) => {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        showNextDialogue();
      }
    };

    container.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyPress);

    // Handle resize
    const handleResize = () => {
      calculateCharacterPositions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyPress);
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  });
</script>

<div class="conversation-world" bind:this={container}>
  <!-- Background elements for depth -->
  <div class="background-decoration"></div>

  <!-- Left Character -->
  <div
    class="character left-character"
    style="
      transform: translate3d({leftCharacter.x}px, {leftCharacter.y}px, 0);
      background: {leftCharacter.colors.bg};
    "
  >
    <div
      class="background-layer"
      style="
        background: {leftCharacter.colors.accent};
        border-top: 1px solid {leftCharacter.colors.border};
      "
    ></div>
    <div class="ascii-container" style="color: {leftCharacter.colors.text};">
      <pre>{leftCharacter.ascii}</pre>
    </div>
    <div
      class="character-glow"
      style="background: {leftCharacter.colors.accent};"
    ></div>
  </div>

  <!-- Right Character -->
  <div
    class="character right-character"
    style="
      transform: translate3d({rightCharacter.x}px, {rightCharacter.y}px, 0);
      background: {rightCharacter.colors.bg};
    "
  >
    <div
      class="background-layer"
      style="
        background: {rightCharacter.colors.accent};
        border-top: 1px solid {leftCharacter.colors.border};
      "
    ></div>
    <div class="ascii-container" style="color: {rightCharacter.colors.text};">
      <pre>{rightCharacter.ascii}</pre>
    </div>
    <div
      class="character-glow"
      style="background: {rightCharacter.colors.accent};"
    ></div>
  </div>

  <!-- Speech Bubble -->
  {#if showSpeechBubble}
    <div
      class="speech-bubble {currentSpeaker}"
      style="
        transform: translate3d({getSpeechBubblePosition()
        .x}px, {getSpeechBubblePosition().y}px, 0);
      "
    >
      <div class="bubble-content">
        {currentMessage}
      </div>
      <div class="bubble-tail"></div>
    </div>
  {/if}

  <!-- Enhanced progress indicator -->
  <div class="progress-indicator">
    <div class="progress-text">
      Dialogue: {Math.min(
        currentDialogueIndex,
        conversation.length,
      )}/{conversation.length}
    </div>
    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: {(Math.min(currentDialogueIndex, conversation.length) /
          conversation.length) *
          100}%"
      ></div>
    </div>
    <div class="interaction-hint">PRESS THE SPACE BAR TO CONTINUE</div>
  </div>
</div>

<style>
  .conversation-world {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #2c5a8b;
    font-family: "Courier New", monospace;
    overflow-x: hidden;
    cursor: pointer;
  }

  .background-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a7dcc;
    pointer-events: none;
  }

  .character {
    position: absolute;
    width: clamp(180px, 25vw, 300px);
    height: clamp(180px, 25vw, 300px);
    border-radius: 12px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 2px rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center center;
  }

  .character:hover {
    transform: scale(1.08) !important;
    z-index: 10;
    box-shadow:
      0 12px 48px rgba(0, 0, 0, 0.4),
      0 0 0 3px rgba(255, 255, 255, 0.2);
  }

  .character-glow {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 16px;
    opacity: 0.3;
    filter: blur(8px);
    z-index: -1;
  }

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    opacity: 0.8;
  }

  .ascii-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .ascii-container pre {
    margin: 0;
    line-height: 1.1;
    font-size: clamp(8px, 1.2vw, 14px);
    white-space: pre;
    text-align: center;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .speech-bubble {
    position: absolute;
    z-index: 1000;
    pointer-events: none;
    animation: bubbleAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .bubble-content {
    background: white;
    color: #333;
    padding: 16px 24px;
    border-radius: 20px;
    font-size: clamp(14px, 2vw, 18px);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(0, 0, 0, 0.05);
    max-width: clamp(250px, 40vw, 400px);
    min-width: 180px;
    text-align: left;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;
    font-weight: 500;
  }

  .bubble-tail {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid white;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .speech-bubble.left .bubble-content {
    background: linear-gradient(135deg, #ffe8f5 0%, #fff2f9 100%);
    border: 2px solid #e8a2c7;
    color: #8b2c6b;
  }

  .speech-bubble.left .bubble-tail {
    border-top-color: #ffe8f5;
  }

  .speech-bubble.right .bubble-content {
    background: linear-gradient(135deg, #e8f4ff 0%, #f2f9ff 100%);
    border: 2px solid #a2c7e8;
    color: #2c5a8b;
  }

  .speech-bubble.right .bubble-tail {
    border-top-color: #e8f4ff;
  }

  .progress-indicator {
    position: fixed;
    top: 20px;
    left: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #333;
    padding: 16px 20px;
    border-radius: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    z-index: 1001;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    min-width: 200px;
  }

  .progress-text {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3a94e8, #0757a1);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .interaction-hint {
    font-size: 11px;
    opacity: 0.7;
    font-style: italic;
  }

  @keyframes bubbleAppear {
    0% {
      opacity: 0;
      transform: scale(0.7) translateY(30px);
    }
    60% {
      transform: scale(1.05) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .progress-indicator {
      top: 10px;
      left: 10px;
      right: 10px;
      padding: 12px 16px;
    }

    .bubble-content {
      font-size: 16px;
      padding: 14px 20px;
    }
  }

  @media (max-height: 600px) {
    .character {
      width: clamp(120px, 20vw, 200px);
      height: clamp(120px, 20vw, 200px);
    }
  }
</style>
