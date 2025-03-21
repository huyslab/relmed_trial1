// Function setting up PILT blocks
window.pilt_test_confidence_every = 4;

window.skipThisBlock = false;

// Message between blocks
const inter_block_msg = {
    type: jsPsychHtmlKeyboardResponse,
    choices: () => {

        const n_stimuli = jsPsych.data.get().filter({ trial_type: "PILT" }).last(1).select("n_stimuli").values[0];

        return n_stimuli === 2 ? ['arrowright', 'arrowleft'] : ['arrowright', 'arrowleft', 'arrowup']
    },
    css_classes: ['instructions'],
    stimulus: inter_block_stimulus,
    data: {
        trialphase: "pilt_inter_block",
    },
    on_start: saveDataREDCap,
    on_finish: () => { window.skipThisBlock = false }
}

// Post-PILT test trial
const id_from_stimulus = () => {
    const is_pit = jsPsych.evaluateTimelineVariable('stimulus_left').includes("PIT");

    return is_pit ? "imgPIT" : "imgPILT"
}

const test_trial = (task) => {
    return {
        timeline: [
            kick_out,
            fullscreen_prompt,
            // Test trial
            {
                type: jsPsychPILT,
                stimulus_right: jsPsych.timelineVariable('stimulus_right'),
                stimulus_left: jsPsych.timelineVariable('stimulus_left'),
                stimulus_middle: '',
                feedback_left: jsPsych.timelineVariable('feedback_left'),
                feedback_right: jsPsych.timelineVariable('feedback_right'),
                feedback_middle: '',
                optimal_right: false,
                optimal_side: '',
                response_deadline: window.defaul_response_deadline,
                n_stimuli: 2,
                present_pavlovian: false,
                present_feedback: false,
                response_deadline: () => {
                
                    // Try to fetch deadline from timeline
                    let deadline_from_timeline;
                    try {
                        deadline_from_timeline = jsPsych.evaluateTimelineVariable('response_deadline') ?? null;
                    } catch (error) {
                        deadline_from_timeline = null;
                    }
                    // Return if found
                    if (deadline_from_timeline !== null){
                        
                        return deadline_from_timeline
                    } 
    
                    // Use defaults otherwise
                    if (can_be_warned(`${task}_test`)){
                        return window.default_response_deadline
                    } else {
                        return window.default_long_response_deadline
                    }
                },
                show_warning: () => {
                    return can_be_warned(`${task}_test`)
                },    
                data: {
                    trialphase: `${task}_test`,
                    block: jsPsych.timelineVariable("block"),
                    trial: jsPsych.timelineVariable("trial"),
                    stimulus_left: jsPsych.timelineVariable("stimulus_left"),
                    stimulus_right: jsPsych.timelineVariable("stimulus_right"),
                    same_valence: jsPsych.timelineVariable("same_valence"),
                    same_block: jsPsych.timelineVariable("same_block"),
                    magnitude_left: jsPsych.timelineVariable("magnitude_left"),
                    magnitude_right: jsPsych.timelineVariable("magnitude_right"),
                    original_block_left: jsPsych.timelineVariable("original_block_left"),
                    original_block_right: jsPsych.timelineVariable("original_block_right"),
                },
                on_finish: function(data) {
                    if (data.response === "noresp") {
                        var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
                        jsPsych.data.addProperties({
                            n_warnings: up_to_now + 1
                        });
                    }

                    if (data.response_deadline_warning) {
                        const up_to_now = parseInt(jsPsych.data.get().last(1).select(`${task}_test_n_warnings`).values);
                        jsPsych.data.addProperties({
                            [`${task}_test_n_warnings`]: up_to_now + 1
                        });
                    }
                 },
                post_trial_gap: 600
            },
            {
                timeline: [
                    {
                        type: jsPsychHtmlButtonResponse,
                        stimulus: '<p>How confident are you that your last choice was correct?</p>',
                        choices: ["1<br>Not at all", "2", "3", "4", "5<br>Very confident"],
                        data: {
                            trialphase: "pilt_confidence"
                        }
                    }
                ],
                conditional_function: () => {
                    let missed = jsPsych.data.get().last(1).select("response").values[0] == null
    
                    let n_trials = jsPsych.data.get().filterCustom((trial) => /^[a-zA-Z]+_test$/.test(trial.trialphase)).count()
    
                    return !missed && ((n_trials % window.pilt_test_confidence_every) === (window.pilt_test_confidence_every - 1))
                },
                post_trial_gap: 800
            }
        ]
    };
}
    

// Post-PILT test confidence trial

// Build post_PILT test block
function build_post_PILT_test(structure, task_name = "pilt") {

    // Preload images
    let test = [
        {
            type: jsPsychPreload,
            images: [
                ...new Set(structure.flat().flatMap(obj => [obj.stimulus_right, obj.stimulus_left]))
            ],
            post_trial_gap: 800,
            continue_after_error: true
        }
    ];

    // Push blocks from structure
    for (let i = 0; i < structure.length; i++) {

        // Push block                
        test.push({
            timeline: [
                test_trial(task)
            ],
            timeline_variables: structure[i]
        });
    }

    return test
}


// PILT trial
const pavlovian_images_f = () => {
    let PIT_imgs = {
        0.01: "PIT3.png",
        1.0: "PIT1.png",
        0.5: "PIT2.png",
        "-0.01": "PIT4.png",
        "-1": "PIT6.png",
        "-0.5": "PIT5.png"
    };
    PIT_imgs = Object.fromEntries(Object.entries(PIT_imgs).map(([k, v]) => [k, "Pav_stims/" + window.session + "/" + v]));
    return PIT_imgs;
};

const PILT_trial = (task) => {
    return {
        timeline: [
            kick_out,
            fullscreen_prompt,
        {
            type: jsPsychPILT,
            stimulus_right: () => 'imgs/PILT_stims/'+ jsPsych.evaluateTimelineVariable('stimulus_right'),
            stimulus_left: () => 'imgs/PILT_stims/'+ jsPsych.evaluateTimelineVariable('stimulus_left'),
            stimulus_middle: () => 'imgs/PILT_stims/'+ jsPsych.evaluateTimelineVariable('stimulus_middle'),
            feedback_left: jsPsych.timelineVariable('feedback_left'),
            feedback_right: jsPsych.timelineVariable('feedback_right'),
            feedback_middle: jsPsych.timelineVariable('feedback_middle'),
            optimal_right: jsPsych.timelineVariable('optimal_right'),
            optimal_side: jsPsych.timelineVariable('optimal_side'),
            response_deadline: () => {
                
                // Try to fetch deadline from timeline
                let deadline_from_timeline;
                try {
                    deadline_from_timeline = jsPsych.evaluateTimelineVariable('response_deadline') ?? null;
                } catch (error) {
                    deadline_from_timeline = null;
                }
                // Return if found
                if (deadline_from_timeline !== null){
                    
                    return deadline_from_timeline
                } 

                // Use defaults otherwise
                if (can_be_warned(task)){
                    return window.default_response_deadline
                } else {
                    return window.default_long_response_deadline
                }
            },
            show_warning: () => {
                return can_be_warned(task)
            },
            n_stimuli: jsPsych.timelineVariable('n_stimuli'),
            present_pavlovian: jsPsych.timelineVariable('present_pavlovian'),
            pavlovian_images: pavlovian_images_f(),
            data: {
                trialphase: task,
                block: jsPsych.timelineVariable('block'),
                trial: jsPsych.timelineVariable('trial'),
                stimulus_group: jsPsych.timelineVariable('stimulus_group'),
                stimulus_group_id: jsPsych.timelineVariable('stimulus_group_id'),
                valence: jsPsych.timelineVariable('valence'),
                n_groups: jsPsych.timelineVariable('n_groups'),
                rest_1pound: jsPsych.timelineVariable('rest_1pound'),
                rest_50pence: jsPsych.timelineVariable('rest_50pence'),
                rest_1penny: jsPsych.timelineVariable('rest_1penny')
            },
            on_finish: function(data) {
                if (data.response === "noresp") {
                    var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
                    jsPsych.data.addProperties({
                        n_warnings: up_to_now + 1
                    });
                }

                if (data.response_deadline_warning) {
                    const up_to_now = parseInt(jsPsych.data.get().last(1).select(`${task}_n_warnings`).values);
                    jsPsych.data.addProperties({
                        [`${task}_n_warnings`]: up_to_now + 1
                    });
                }
            },
            post_trial_gap: 400
        }
        ],
        conditional_function: function () {

            // Only consider stopping if this is an early stop task, if this is not a practice block, and if there had been at least five previous trials
            if (jsPsych.evaluateTimelineVariable('early_stop') &&
                Number.isInteger(jsPsych.evaluateTimelineVariable('block')) &&
                jsPsych.evaluateTimelineVariable('trial') > 5
            ) {

                // Block number
                const block = jsPsych.data.get().last(1).select('block').values[0];

                // Find all sitmulus-pairs in block
                let unique_stimulus_pairs = [...new Set(jsPsych.data.get().filter({
                    trial_type: "PILT",
                    block: block
                }).select('stimulus_group').values)]

                // Initialize a variable to store the result
                let all_optimal = true;

                // Iterate over each unique stimulus_group and check the last 5 choices
                unique_stimulus_pairs.forEach(g => {

                    // Filter data for the current stimulus_group
                    let num_optimal = jsPsych.data.get().filter({
                        trial_type: "PILT",
                        block: block,
                        stimulus_group: g
                    }).last(5).select('response_optimal').sum();

                    // Check if all last 5 choices for this group are correct
                    if (num_optimal < 5) {
                        all_optimal = false;
                    }
                });

                if (all_optimal) {
                    window.skipThisBlock = true;
                }

                return !all_optimal
            } else {
                return true
            }

        }
    }
}

// Coin lottery trial
const coin_lottery = {
    type: jsPsychCoinLottery,
    coins: () => {
        const coins_from_data = get_coins_from_data();

        return createProportionalArray(coins_from_data, 35).sort()
    },
    props: () => {

        // Compute data proportion
        const coins_from_data = get_coins_from_data();

        let raw_props = computeCategoryProportions(coins_from_data);

        raw_props = [raw_props[0.01], raw_props[0.5], raw_props[1], raw_props["-0.01"], raw_props["-0.5"], raw_props["-1"]]

        const prior = [0.1, 0.3, 0.5, 0.1 / 3, 0.1 / 3, 0.1 / 3];

        // Take weighted average
        const weight_data = 0.6;

        let weightedSum = raw_props.map((value, index) => {
            return (value * weight_data) + (prior[index] * (1 - weight_data));
        });

        // Normalize and return
        let sum = weightedSum.reduce((acc, value) => acc + value, 0);
        return weightedSum.map(value => value / sum);
    }
}

// Build PILT task block
function build_PILT_task(structure, insert_msg = true, task_name = "pilt") {

    let PILT_task = [];
    for (let i = 0; i < structure.length; i++) {

        // Get list of unique images in block to preload
        let preload_images = structure[i].flatMap(item => [item.stimulus_right, item.stimulus_left]);
        preload_images = [...new Set(preload_images)].map(value => `imgs/PILT_stims/${value}`);

        // Get valence for the block
        const valence = structure[i][0]["valence"];

        // Get n_stimuli for this block
        const n_stimuli = structure[i][0]["n_stimuli"];

        // Get block number
        const block_number = structure[i][0]["block"];

        // Build block
        block = [
            {
                type: jsPsychPreload,
                images: preload_images,
                post_trial_gap: 800,
                continue_after_error: true
            }
        ];

        if (isValidNumber(block_number) & task_name === "pilt"){
            block.push(
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `
                        <p>On the next round you will play to <b>${valence > 0 ? "win" : "avoid losing"} coins</b>.<p>` + 
                       ( n_stimuli === 2 ? `<p>Place your fingers on the left and right arrow keys, and press either one to continue.</p>` :
                        `<p>Place your fingers on the left, right, and up arrow keys, and press either one to continue.</p>`),
                    choices: n_stimuli === 2 ? ['arrowright', 'arrowleft'] : ['arrowright', 'arrowleft', 'arrowup'],
                    css_classes: ['instructions'],
                    data: {
                        trialphase: "pre_block",
                    },
                }
            )
        }
            
        block.push(
            {
                timeline: [
                    PILT_trial(task_name)
                ],
                timeline_variables: structure[i],
                on_start: () => {

                    const block = jsPsych.evaluateTimelineVariable('block');

                    if ((jsPsych.evaluateTimelineVariable('trial') == 1) && (typeof block === "number")){
                        updateState(`${task_name}_start_block_${block}`)
                    }
                }
            }
        );
        
        // Add message
        if (insert_msg) {
            block.push(inter_block_msg);
        }

        PILT_task = PILT_task.concat(block)
    }

    return PILT_task
}

// Load PILT sequences from json file
async function load_squences(session) {
    try {
        // Fetch PILT sequences
        const response = await fetch('trial1_PILT.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const structure = await response.json();
        let sess_structure = structure[session];

        if (window.demo){
            sess_structure = sess_structure.slice(0,6);
        }

        window.totalBlockNumber = sess_structure.length

        // Fetch post-PILT test sequences
        const test_response = await fetch('trial1_PILT_test.json');

        if (!test_response.ok) {
            throw new Error(`Network response was not ok ${test_response}`);
        }

        const test_structure = await test_response.json();

        let test_sess_structure = test_structure[session];

        if (window.demo){
            test_sess_structure = [test_sess_structure[0].slice(0,25)];
        }

        // Add folder to stimuli, and rename block
        for (i=0; i<test_sess_structure.length; i++){
            for(j=0; j<test_sess_structure[i].length; j++) {
                test_sess_structure[i][j].stimulus_left = `imgs/PILT_stims/${test_sess_structure[i][j].stimulus_left}`
                test_sess_structure[i][j].stimulus_right = `imgs/PILT_stims/${test_sess_structure[i][j].stimulus_right}`    
            }
        }

        // Fetch pavlovian test sequences
        const pavlovian_response = await fetch('pavlovian_test.json');
        let pav_test_structure = await pavlovian_response.json();

        // Add folder to stimuli, and rename block
        for (i=0; i<pav_test_structure.length; i++){
            pav_test_structure[i].stimulus_left = `imgs/Pav_stims/${window.session}/${pav_test_structure[i].stimulus_left}`
            pav_test_structure[i].stimulus_right = `imgs/Pav_stims/${window.session}/${pav_test_structure[i].stimulus_right}`
            pav_test_structure[i].block = "pavlovian"
            pav_test_structure[i].feedback_left = pav_test_structure[i].magnitude_left
            pav_test_structure[i].feedback_right = pav_test_structure[i].magnitude_right
        }

        // Add Pavlovaian test to the end of test strucutre
        if (!window.demo){
            test_sess_structure = [pav_test_structure].concat(test_sess_structure);
        }

        // Fetch WM structure
        const WM_response = await fetch('trial1_WM.json');
        const WM_structure = await WM_response.json();
        let WM_sess_structure = WM_structure[session];

        if (window.demo){
            WM_sess_structure = WM_sess_structure.slice(0,3);
        }

        // Fetch LTM structure
        const LTM_response = await fetch('trial1_LTM.json');
        const LTM_structure = await LTM_response.json();
        let LTM_sess_structure = LTM_structure[session];

        if (window.demo){
            LTM_sess_structure = LTM_sess_structure.slice(0,3);
        }

        // Fetch WM test structure
        const WM_test_response = await fetch('trial1_WM_test.json');
        const WM_test_structure = await WM_test_response.json();
        let WM_test_sess_structure = WM_test_structure[session];

        // Add folder to stimuli
        for (i=0; i<WM_test_sess_structure.length; i++){
            for(j=0; j<WM_test_sess_structure[i].length; j++) {
                WM_test_sess_structure[i][j].stimulus_left = `imgs/PILT_stims/${WM_test_sess_structure[i][j].stimulus_left}`
                WM_test_sess_structure[i][j].stimulus_right = `imgs/PILT_stims/${WM_test_sess_structure[i][j].stimulus_right}`    
            }
        }

        // Fetch LTM test structure
        const LTM_test_response = await fetch('trial1_LTM_test.json');
        const LTM_test_structure = await LTM_test_response.json();
        let LTM_test_sess_structure = LTM_test_structure[session];

        // Add folder to stimuli
        for (i=0; i<LTM_test_sess_structure.length; i++){
            for(j=0; j<LTM_test_sess_structure[i].length; j++) {
                LTM_test_sess_structure[i][j].stimulus_left = `imgs/PILT_stims/${LTM_test_sess_structure[i][j].stimulus_left}`
                LTM_test_sess_structure[i][j].stimulus_right = `imgs/PILT_stims/${LTM_test_sess_structure[i][j].stimulus_right}`    
            }
        }
        
        
        run_full_experiment(sess_structure, test_sess_structure, WM_sess_structure, WM_test_sess_structure, LTM_sess_structure, LTM_test_sess_structure);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function return_PILT_full_sequence(structure, test_structure, WM_structure, WM_test_structure, LTM_structure, LTM_test_structure) {
    // Compute best-rest
    computeBestRest(structure);
    computeBestRest(WM_structure);
    computeBestRest(LTM_structure);

    let PILT_procedure = [];

    // Add instructions
    PILT_procedure = PILT_procedure.concat(prepare_PILT_instructions());

    // Add PILT
    let PILT_blocks = build_PILT_task(structure);
    PILT_blocks[0]["on_start"] = () => {updateState("pilt_task_start")};
    PILT_procedure = PILT_procedure.concat(PILT_blocks);

    // Add test
    let PILT_test_procedure = [];
    PILT_test_procedure.push(test_instructions('pilt'));
    let test_blocks = build_post_PILT_test(test_structure);
    test_blocks[0]["on_start"] = () => {
        updateState("post_test_task_start");
        updateState("no_resume");
    };
    PILT_test_procedure = PILT_test_procedure.concat(test_blocks);

    // WM block
    let WM_blocks = build_PILT_task(WM_structure, true, "wm");
    WM_blocks[0]["on_start"] = () => {
        updateState("wm_task_start");
        updateState("no_resume_10_minutes");
    };
    const WM_procedure = WM_instructions.concat(WM_blocks);

    // LTM block
    let LTM_blocks = build_PILT_task(LTM_structure, true, "ltm");
    LTM_blocks[0]["on_start"] = () => {
        updateState("ltm_task_start");
        updateState("no_resume_10_minutes");
    };
    const LTM_procedure = LTM_instructions.concat(LTM_blocks);
    

    // WM test block
    let WM_test_procedure = [];
    WM_test_procedure.push(test_instructions('wm'));
    WM_test_procedure = WM_test_procedure.concat(build_post_PILT_test(WM_test_structure, "wm"));

    // LTM test block
    let LTM_test_procedure = [];
    LTM_test_procedure.push(test_instructions('ltm'));
    LTM_test_procedure = LTM_test_procedure.concat(build_post_PILT_test(LTM_test_structure, "ltm"));
    


    return {
        PILT_procedure: PILT_procedure,
        PILT_test_procedure: PILT_test_procedure,
        WM_procedure: WM_procedure,
        WM_test_procedure: WM_test_procedure,
        LTM_procedure: LTM_procedure,
        LTM_test_procedure: LTM_test_procedure
    }
}
