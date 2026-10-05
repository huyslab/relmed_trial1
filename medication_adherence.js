const medication_adherence = {
    type: jsPsychHtmlButtonResponse,
    css_classes: ['instructions'],
    stimulus: () => {
        // Up to and including week 8, participants are still receiving study pills
        if (parseInt(window.session.replace("wk", "")) <= 8) {
            return `<p><span class="highlight-txt">In the past week, have you been taking your RELMED study pills?</span></p>`;
        }

        return `<p><span class="highlight-txt">In the past week, have you been taking the pills you started in the RELMED study?</span></p>
<p>Answer "Yes" if you now get the same medication from your GP.</p>`;
    },
    choices: ["Yes", "No"],
    post_trial_gap: 400,
    data: {
        trialphase: "medication_status"
    }
}

const medication_adherence_timeline = [
    medication_adherence
];
