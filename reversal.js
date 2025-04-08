// This files creates the jsPsych timeline for the reversal task block

// Parameters
const rev_n_trials = (window.demo || (window.task === "screening")) ? 50 : 150; // N trials

// Parse json sequence
const reversal_timeline = JSON.parse(reversal_json);

// First preload for task
const reversal_preload = {
    type: jsPsychPreload,
    images: [
        "imgs/squirrels_empty.png",
        "imgs/squirrels_bg.png",
        "imgs/squirrels_fg.png",
        "imgs/1penny.png",
        "imgs/1pound.png",
        "imgs/PILT_keys.jpg"
    ],
    post_trial_gap: 400,
    data: {
        trialphase: "reversal_preload"
    },
    continue_after_error: true,
    on_finish: () => {
        // Report to tests
        console.log("load_successful")

        // Report to relmed.ac.uk
        postToParent({message: "load_successful"})
    }
}

// Assemble list of blocks
var reversal_blocks = [
];
for (i=0; i<reversal_timeline.length; i++){
    reversal_blocks.push([
        {
            timeline: [
                {
                    timeline: [
                        kick_out,
                        fullscreen_prompt,
                        {
                            type: jsPsychReversal,
                            feedback_right: jsPsych.timelineVariable('feedback_right'),
                            feedback_left: jsPsych.timelineVariable('feedback_left'),
                            optimal_right: jsPsych.timelineVariable('optimal_right'),
                            response_deadline: () => {
                                if (can_be_warned("reversal")){
                                    // console.log(window.default_response_deadline)
                                    return window.default_response_deadline
                                } else {
                                    // console.log(window.default_long_response_deadline)
                                    return window.default_long_response_deadline
                                }
                            },
                            show_warning: () => {
                                return can_be_warned("reversal")
                            },
                            on_finish: () => {
                                n_trials = jsPsych.data.get().filter({trial_type: "reversal"}).count()
                                
                                if (n_trials % 40 == 0) {
                                    saveDataREDCap(retry = 3);
                                  }
                            }
                        }
                    ],
                    conditional_function: () => {

                        // Check whether participants are up to crtierion
                        const criterion = jsPsych.evaluateTimelineVariable('criterion');

                        let num_correct = jsPsych.data.get()
                            .filter({block: jsPsych.evaluateTimelineVariable('block'), trial_type: 'reversal'})
                            .select('response_optimal').sum()

                        // Check whether trial limit reached
                        let n_trials = jsPsych.data.get()
                        .filter({trial_type: 'reversal'})
                        .count()

                        return (n_trials < rev_n_trials) && (num_correct < criterion)
                },
                on_finish: function(data) {
                    if (data.response === null) {
                        const up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
                        jsPsych.data.addProperties({
                            n_warnings: up_to_now + 1
                        });
                    }

                    if (data.response_deadline_warning) {
                        const up_to_now = parseInt(jsPsych.data.get().last(1).select('reversal_n_warnings').values);
                        jsPsych.data.addProperties({
                            reversal_n_warnings: up_to_now + 1
                        });
                    }
                 },
            }
            ],
            timeline_variables: reversal_timeline[i],
            data: {
                block: jsPsych.timelineVariable('block'),
                trial: jsPsych.timelineVariable('trial'),
                trialphase: "reversal"
            }
        }
    ]);
}

// Reversal instructions
const reversal_instructions = [
    {
        type: jsPsychInstructions,
        css_classes: ['instructions'],
        pages: [
            `<p>Let's start with the first game!</p>
            <p>Next, you will meet two friendly squirrels, each with a bag of coins to share. 
            Use the arrow keys to choose either the left or right squirrel. 
            The squirrel you pick will give you a coin to add to your safe.</p>`,
            `<p>One squirrel has higher-value coins, and the other has lower-value coins. 
            But every few turns they secretly switch bags.</p>
            <p>Your goal is to figure out which squirrel has the better coins and collect as many high-value ones as possible.<p>`
        ],
        show_clickable_nav: true,
        data: {trialphase: "reversal_instruction"},
        on_start: () => {
            updateState(`reversal_instructions_start`)
        },
        on_finish: () => {
            if (window.session !== "screening") {
                updateState(`no_resume`)
            }
            updateState(`reversal_task_start`)    
        }
    },
    {
        type: jsPsychHtmlKeyboardResponse,
        css_classes: ['instructions'],
        stimulus: `
            <p>You will now play the squirrel game for about ${rev_n_trials == 50 ? 3 : 5} minutes without breaks.</p>
            <p>When you're ready, place your fingers comfortably on the <strong>left and right arrow keys</strong> as shown below. Press down <strong> both left and right arrow keys at the same time </strong> to begin.</p>
            <img src='imgs/PILT_keys.jpg' style='width:250px;'></img>`,
        // choices: ['arrowleft', 'arrowright'],
        data: {trialphase: "reversal_instruction"},
        on_finish: () => {
            jsPsych.data.addProperties({
                reversal_n_warnings: 0
            });
        },
        response_ends_trial: false,
        simulation_options: {simulate: false},
        on_load: function() {
            const start = performance.now();
            const multiKeysListener = setupMultiKeysListener(
                ['ArrowRight', 'ArrowLeft'], 
                function() {
                    jsPsych.finishTrial({
                        rt: Math.floor(performance.now() - start)
                    });
                    // Clean up the event listeners to prevent persistining into the next trial
                    multiKeysListener.cleanup();
                }
            );
        }
    },
]
