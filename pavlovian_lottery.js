/**
 * Pavlovian Lottery Task
 * 
 * A simple lottery game where participants view Pavlovian stimuli (as conditioned stimuli)
 * paired with coins (as unconditioned stimuli/rewards).
 * 
 * Participants press a key to run the lottery, which displays a Pavlovian stimulus
 * followed by its associated coin reward with animation effects.
 */

// Define the Pavlovian stimuli and their associated rewards
const pavlovianStimuli = [
  { stimulus: "imgs/Pav_stims/wk0/PIT1.png", reward: "imgs/1pound.png", value: "£1" },
  { stimulus: "imgs/Pav_stims/wk0/PIT2.png", reward: "imgs/50pence.png", value: "50p" },
  { stimulus: "imgs/Pav_stims/wk0/PIT3.png", reward: "imgs/1penny.png", value: "1p" },
  { stimulus: "imgs/Pav_stims/wk0/PIT4.png", reward: "imgs/1pennybroken.png", value: "-1p" },
  { stimulus: "imgs/Pav_stims/wk0/PIT5.png", reward: "imgs/50pencebroken.png", value: "-50p" },
  { stimulus: "imgs/Pav_stims/wk0/PIT6.png", reward: "imgs/1poundbroken.png", value: "-£1" }
];

// Define the number of repeats for each stimulus (making sure the total is a multiple of 6)
const repeatsPerStimulus = 5; // 5 repeats × 6 stimuli = 30 total trials

// Function to initialize the Pavlovian Lottery experiment
function initPavlovianLottery(jsPsych) {
  // Create a welcome screen
  const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <h1>Welcome to the Lucky Lottery Game!</h1>
      <p>In this game, you'll play a simple lottery by pressing the spacebar.</p>
      <p>Each lottery spin will reveal a pattern followed by a coin.</p>
      <p>Your goal is to learn which patterns lead to which coins.</p>
      <p>Some patterns are lucky and will win you money!</p>
      <p>Others are unlucky and will lose you money!</p>
      <p>Press any key to continue to the instructions.</p>
    `,
    post_trial_gap: 500
  };

  // Create instructions screen
  const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <h2>How to Play the Lucky Lottery</h2>
      <div style="width: 80%; margin: 0 auto; text-align: left;">
        <p><strong>1.</strong> Press the SPACEBAR to spin the lottery wheel.</p>
        <p><strong>2.</strong> Watch carefully as patterns slide by!</p>
        <p><strong>3.</strong> See which pattern stops in the center frame!</p>
        <p><strong>4.</strong> Try to learn which patterns lead to which coins.</p>
      </div>
      <p>This will help you in future games!</p>
      <p>There are 30 lottery spins in total.</p>
      <p>Ready? Press the SPACEBAR to start the lottery!</p>
    `,
    choices: [" "],
    post_trial_gap: 1000
  };

  // Function to create a balanced, randomized array of all trials
  function createTrials() {
    let allTrials = [];
    
    // Add each stimulus-reward pair repeatsPerStimulus times
    pavlovianStimuli.forEach(pair => {
      for (let i = 0; i < repeatsPerStimulus; i++) {
        allTrials.push(pair);
      }
    });
    
    // Shuffle the array to randomize presentation order
    allTrials = jsPsych.randomization.shuffle(allTrials);
    
    return allTrials;
  }

  // Create fixation cross trial
  const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 500
  };

  // Create a one-armed bandit style animation with center focus
  const lotteryAnimation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      const currentStimulus = jsPsych.evaluateTimelineVariable('stimulus');
      
      // Create a carousel/slot machine style display
      return `
        <div class="lottery-container">
          <h3>Spinning the Lucky Lottery!</h3>
          <div class="slot-machine-container">
            <div class="selection-frame"></div>
            <div id="slot-reel" class="slot-reel">
              <!-- Slot images will be added via JavaScript -->
            </div>
          </div>
          <div class="lottery-message">Watch what pattern lands in the center!</div>
        </div>
      `;
    },
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_start: function() {
      // Add CSS for the lottery animation
      const css = document.createElement('style');
      css.innerHTML = `
        .lottery-container {
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 800px;
        }
        
        h3 {
          color: #2c3e50;
          margin-bottom: 15px;
        }
        
        .lottery-message {
          margin-top: 15px;
          font-size: 18px;
          font-weight: bold;
          color: #4a90e2;
        }
        
        .slot-machine-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 0 8px rgba(0,0,0,0.2);
          margin: 0 auto;
        }
        
        .selection-frame {
          position: absolute;
          width: 240px;
          height: 190px;
          border: 8px solid #d3d3d3;
          border-radius: 15px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
          pointer-events: none;
          transition: all 0.5s ease;
        }
        
        .frame-highlight {
          border-color: #ffcc00;
          box-shadow: 0 0 8px rgba(255, 204, 0, 0.5), inset 0 0 4px rgba(255, 204, 0, 0.2);
        }
        
        .slot-reel {
          position: absolute;
          display: flex;
          top: 0;
          left: 0;
          height: 100%;
          transition: transform 0.1s linear;
        }
        
        .slot-item {
          flex: 0 0 240px;
          height: 220px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 10px;
          transition: all 0.2s ease;
        }
        
        .slot-image {
          max-width: 200px;
          max-height: 180px;
          object-fit: contain;
          transition: all 0.3s ease;
        }
        
        .winning-item {
          transform: scale(1.05);
          box-shadow: 0 0 8px gold;
          background-color: rgba(255, 215, 0, 0.05);
          border-radius: 10px;
          animation: pulse 1s infinite alternate;
        }
        
        @keyframes pulse {
          from { box-shadow: 0 0 4px gold; }
          to { box-shadow: 0 0 8px gold; }
        }
      `;
      document.head.appendChild(css);
    },
    on_load: function() {
      const currentStimulus = jsPsych.evaluateTimelineVariable('stimulus');
      const slotReel = document.getElementById('slot-reel');
      const slotContainer = document.querySelector('.slot-machine-container');
      const selectionFrame = document.querySelector('.selection-frame');
      
      if (slotReel && slotContainer) {
        // Create a long sequence of images that repeats all stimuli several times
        let reelContent = '';
        
        // Function to shuffle an array (Fisher-Yates algorithm)
        function shuffleArray(array) {
          const newArray = [...array];
          for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          }
          return newArray;
        }
        
        // Create a sequence with no consecutive duplicates
        let lastImageSrc = null;
        const allItems = [];
        
        // Create 5 sets of shuffled stimuli (enough for the full reel)
        for (let i = 0; i < 5; i++) {
          // Get shuffled stimuli
          let shuffledStimuli = shuffleArray([...pavlovianStimuli]);
          
          // Check if first item matches last item from previous set
          if (lastImageSrc !== null && shuffledStimuli[0].stimulus === lastImageSrc) {
            // Swap with another position to avoid duplicates
            for (let j = 1; j < shuffledStimuli.length; j++) {
              if (shuffledStimuli[j].stimulus !== lastImageSrc) {
                // Swap positions to avoid duplicate
                [shuffledStimuli[0], shuffledStimuli[j]] = [shuffledStimuli[j], shuffledStimuli[0]];
                break;
              }
            }
          }
          
          // Add all stimuli from this set
          shuffledStimuli.forEach(stim => {
            allItems.push(stim.stimulus);
            lastImageSrc = stim.stimulus;
          });
        }
        
        // Check for any remaining duplicates (in case there are any)
        for (let i = 0; i < allItems.length - 1; i++) {
          if (allItems[i] === allItems[i + 1]) {
            // Find a different stimulus to replace the duplicate
            const options = pavlovianStimuli
              .map(stim => stim.stimulus)
              .filter(src => src !== allItems[i] && (i + 2 >= allItems.length || src !== allItems[i + 2]));
            
            if (options.length > 0) {
              // Replace with a non-duplicate option
              allItems[i + 1] = options[Math.floor(Math.random() * options.length)];
            }
          }
        }
        
        // Generate HTML for all items
        allItems.forEach(stimSrc => {
          reelContent += `
            <div class="slot-item">
              <img src="${stimSrc}" class="slot-image">
            </div>
          `;
        });
        
        // Ensure penultimate item is different from both target and the last item in allItems
        const lastItemInSequence = allItems[allItems.length - 1];
        const filteredStimuli = pavlovianStimuli.filter(stim => 
          stim.stimulus !== currentStimulus && 
          stim.stimulus !== lastItemInSequence
        );
        const penultimateStimulus = filteredStimuli[Math.floor(Math.random() * filteredStimuli.length)].stimulus;
        
        // Add a penultimate item that is guaranteed to be different from the target
        reelContent += `
          <div class="slot-item">
            <img src="${penultimateStimulus}" class="slot-image">
          </div>
        `;
        
        // Add our target item as the final item that will stop in the center
        reelContent += `
          <div class="slot-item target-item" id="winning-item">
            <img src="${currentStimulus}" class="slot-image">
          </div>
        `;
        
        // Fill the reel with content
        slotReel.innerHTML = reelContent;
        
        // Calculate the width of the reel for proper positioning
        const itemWidth = 260; // 240px width + 20px margin
        const totalItems = slotReel.children.length;
        slotReel.style.width = (itemWidth * totalItems) + 'px';
        
        // Initial position: far to the right so items appear to enter from the right
        slotReel.style.transform = `translateX(${slotContainer.offsetWidth}px)`;
        
        // Find the target item position (it's the last item in our reel)
        const winningItem = document.getElementById('winning-item');
        let targetIndex = totalItems - 1;
        
        // Calculate the exact position needed to center the target in the frame
        const containerCenter = slotContainer.offsetWidth / 2;
        const targetPosition = containerCenter - (targetIndex * itemWidth) - (itemWidth / 2);
        
        // Animation sequence
        setTimeout(() => {
          // First movement: slide from right to left through container
          slotReel.style.transition = 'transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)';
          slotReel.style.transform = `translateX(${targetPosition}px)`;
          
          // Phase 2: Highlight the winning item and the frame
          setTimeout(() => {
            if (winningItem) {
              winningItem.classList.add('winning-item');
            }
            if (selectionFrame) {
              selectionFrame.classList.add('frame-highlight');
            }
          }, 3100);
        }, 200);
      }
    }
  };

  // Create a combined result display that shows the stimulus with its coin
  const showResult = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      const stimulusImg = jsPsych.evaluateTimelineVariable('stimulus');
      const rewardImg = jsPsych.evaluateTimelineVariable('reward');
      const value = jsPsych.evaluateTimelineVariable('value');
      
      return `
        <div class="result-container">
          <h3>You got:</h3>
          <div class="result-display">
            <div class="result-stimulus">
              <img src="${stimulusImg}" class="result-image">
            </div>
            <div class="result-reward">
              <img src="${rewardImg}" class="coin-image">
              <p class="${value.includes('-') ? 'negative' : 'positive'}">${value}</p>
            </div>
          </div>
        </div>
      `;
    },
    choices: "NO_KEYS",
    trial_duration: 2000,
    on_start: function() {
      // Add CSS for the result display
      const css = document.createElement('style');
      css.innerHTML = `
        .result-container {
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 500px;
        }
        
        .result-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .result-stimulus {
          padding: 15px;
          border: 4px solid gold;
          border-radius: 10px;
          background-color: #fffaf0;
          margin-bottom: 15px;
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
        }
        
        .result-image {
          max-width: 250px;
          max-height: 180px;
        }
        
        .result-reward {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: popIn 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        
        .coin-image {
          max-width: 100px;
          max-height: 100px;
        }
        
        .result-reward p {
          font-size: 28px;
          font-weight: bold;
          margin: 10px 0;
        }
        
        .positive {
          color: #28a745;
        }
        
        .negative {
          color: #dc3545;
        }
        
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(css);
    }
  };

  // Create a ready prompt for the next trial
  const readyPrompt = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>Press SPACEBAR to spin the lottery again!</p>",
    choices: [" "]
  };

  // Build the main task trial sequence
  const trialSequence = {
    timeline: [
      fixation,
      lotteryAnimation,
      showResult,
      readyPrompt
    ],
    timeline_variables: createTrials()
  };

  // Create an ending message
  const endMessage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <h2>Game Completed!</h2>
      <p>Great job! You've completed all the lottery spins.</p>
      <p>You've now learned which patterns are associated with which coins.</p>
      <p>This knowledge will help you in the upcoming tasks.</p>
      <p>Press any key to continue to the next part of the experiment.</p>
    `,
    post_trial_gap: 1000
  };

  // Build the full experiment timeline
  const timeline = [
    welcome,
    instructions,
    trialSequence,
    endMessage
  ];

  // Return the timeline
  return {
    timeline: timeline
  };
}