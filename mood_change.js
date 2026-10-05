// Global rating of change in mood, based on the item used in:
// Kounali, D., Button, K. S., Lewis, G., Gilbody, S., Kessler, D., Araya, R., ... & Lewis, G. (2022).
// How much change is enough? Evidence from a longitudinal study on depression in UK primary care.
// Psychological Medicine, 52(10), 1875-1882.
const mood_change = {
    type: jsPsychHtmlButtonResponse,
    css_classes: ['instructions'],
    stimulus: `<p><span class="highlight-txt">Compared to one week ago, how have your mood and feelings changed?</span></p>
<p>I feel...</p>`,
    choices: ["A lot better", "Slightly better", "About the same", "Slightly worse", "A lot worse"],
    post_trial_gap: 400,
    data: {
        trialphase: "mood_change"
    }
}

const mood_change_timeline = [
    mood_change
];
