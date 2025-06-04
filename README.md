# RELMED trial 1
----
[![Task Loading](https://github.com/huyslab/relmed_trial1/actions/workflows/validate_loading.yaml/badge.svg?branch=main)](https://github.com/huyslab/relmed_trial1/actions/workflows/validate_loading.yaml)
[![Task Simulation](https://github.com/huyslab/relmed_trial1/actions/workflows/validate_simulation.yml/badge.svg?branch=main)](https://github.com/huyslab/relmed_trial1/actions/workflows/validate_simulation.yml)
![GitHub Release](https://img.shields.io/github/v/release/huyslab/relmed_trial1)

This reposistory hosts the experiment website for the RELMED trial 1, which includes PILT, Vigour, PIT, reversal, WM, control, and questionnaires. The task is coded with jsPsych.

## Files in this repository (update needed)
```
.
├── consent.html - landing page, consent form.
├── experiment.html - main experiment script, participants are redirected here from conset.html
├── PILT.js - main script for PILT
├── PILT_instructions.js - instructions for PILT
├── plugin-PLT.js - plugin for PILT trial
├── pilot6_pilt.json - trial sequence for PILT
├── pilot6_pilt_test.json - trial sequence for PILT test phase
├── vigour.js - main vigour task script
├── vigour_instructions.js - vigour task 
├── visgour_styles.css - stylesheet for vigour task
├── post-vigour-test.js - script for post vigour task test
├── vigour.json - trial sequence for vigour task
├── reversal.js - main script for reversal task
├── PIT.js - main script for PIT transfer phase
├── questionnaires.js - main script for all the questionnaires
├── plugin-reversal.js - plugin for reversal trial
├── pilot4_reversal_sequence.js - trial sequence for reversal task
├── utils.js - functions and trial objects shared across tasks
├── jspsych - jsPsych library/
│   └── .
└── lambda - AWS lambda function scripts/
    └── .
```


<!-- LOADING-TEST-RESULTS -->

### 🧪 Can all tasks load?

| Session | Task | Chromium | Firefox | WebKit |
|---------|------|----------|---------|--------|
| screening | screening | ✅ Success | ✅ Success | ✅ Success |
| wk0 | pilt-to-test | ✅ Success | ✅ Success | ✅ Success |
| wk0 | reversal | ✅ Success | ✅ Success | ✅ Success |
| wk0 | control | ✅ Success | ✅ Success | ✅ Success |
| wk0 | wm | ✅ Success | ✅ Success | ✅ Success |
| wk2 | pilt-to-test | ✅ Success | ✅ Success | ✅ Success |
| wk2 | reversal | ✅ Success | ✅ Success | ✅ Success |
| wk2 | control | ✅ Success | ✅ Success | ✅ Success |
| wk2 | wm | ✅ Success | ✅ Success | ✅ Success |
| wk4 | pilt-to-test | ✅ Success | ✅ Success | ✅ Success |
| wk4 | reversal | ✅ Success | ✅ Success | ✅ Success |
| wk4 | control | ✅ Success | ✅ Success | ✅ Success |
| wk4 | wm | ✅ Success | ✅ Success | ✅ Success |
| wk24 | pilt-to-test | ✅ Success | ✅ Success | ✅ Success |
| wk24 | reversal | ✅ Success | ✅ Success | ✅ Success |
| wk24 | control | ✅ Success | ✅ Success | ✅ Success |
| wk24 | wm | ✅ Success | ✅ Success | ✅ Success |
| wk28 | pilt-to-test | ✅ Success | ✅ Success | ✅ Success |
| wk28 | reversal | ✅ Success | ✅ Success | ✅ Success |
| wk28 | control | ✅ Success | ✅ Success | ✅ Success |
| wk28 | wm | ✅ Success | ✅ Success | ✅ Success |
| wk0 | quests | ✅ Success | ✅ Success | ✅ Success |
| wk2 | quests | ✅ Success | ✅ Success | ✅ Success |
| wk4 | quests | ✅ Success | ✅ Success | ✅ Success |
| wk24 | quests | ✅ Success | ✅ Success | ✅ Success |
| wk28 | quests | ✅ Success | ✅ Success | ✅ Success |
| wk6 | quests | ✅ Success | ✅ Success | ✅ Success |
| wk8 | quests | ✅ Success | ✅ Success | ✅ Success |
| wk52 | quests | ✅ Success | ✅ Success | ✅ Success |

<!-- LOADING-TEST-RESULTS -->