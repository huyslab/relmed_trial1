# RELMED trial 1
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
| screening | screening | ❌ Failed | ❌ Failed | ❌ Failed |
| wk0 | pilt-to-test | ❌ Failed | ❌ Failed | ❌ Failed |
| wk0 | reversal | ❌ Failed | ❌ Failed | ❌ Failed |
| wk0 | control | ❌ Failed | ❌ Failed | ❌ Failed |
| wk0 | wm | ❌ Failed | ❌ Failed | ❌ Failed |
| wk2 | pilt-to-test | ❌ Failed | ❌ Failed | ❌ Failed |
| wk2 | reversal | ❌ Failed | ❌ Failed | ❌ Failed |
| wk2 | control | ❌ Failed | ❌ Failed | ❌ Failed |
| wk2 | wm | ❌ Failed | ❌ Failed | ❌ Failed |
| wk4 | pilt-to-test | ❌ Failed | ❌ Failed | ✅ Success |
| wk4 | reversal | ❌ Failed | ❌ Failed | ❌ Failed |
| wk4 | control | ❌ Failed | ❌ Failed | ✅ Success |
| wk4 | wm | ❌ Failed | ❌ Failed | ❌ Failed |
| wk24 | pilt-to-test | ❌ Failed | ❌ Failed | ✅ Success |
| wk24 | reversal | ❌ Failed | ❌ Failed | ❌ Failed |
| wk24 | control | ❌ Failed | ❌ Failed | ✅ Success |
| wk24 | wm | ❌ Failed | ❌ Failed | ❌ Failed |
| wk28 | pilt-to-test | ❌ Failed | ❌ Failed | ✅ Success |
| wk28 | reversal | ❌ Failed | ❌ Failed | ❌ Failed |
| wk28 | control | ❌ Failed | ❌ Failed | ✅ Success |
| wk28 | wm | ❌ Failed | ❌ Failed | ✅ Success |
| wk0 | quests | ❌ Failed | ❌ Failed | ❌ Failed |
| wk2 | quests | ❌ Failed | ❌ Failed | ✅ Success |
| wk4 | quests | ❌ Failed | ❌ Failed | ✅ Success |
| wk24 | quests | ❌ Failed | ❌ Failed | ❌ Failed |
| wk28 | quests | ❌ Failed | ❌ Failed | ❌ Failed |
| wk6 | quests | ❌ Failed | ❌ Failed | ❌ Failed |
| wk8 | quests | ❌ Failed | ❌ Failed | ❌ Failed |
| wk52 | quests | ❌ Failed | ❌ Failed | ❌ Failed |

<!-- LOADING-TEST-RESULTS -->