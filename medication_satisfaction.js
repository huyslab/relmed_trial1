// Single-item medication satisfaction, adapted from the Medication Satisfaction Questionnaire (MSQ):
// Vernon, M. K., Revicki, D. A., Awad, A. G., Dirani, R., Panish, J., Canuso, C. M., ... & Kalali, A. (2010).
// Psychometric evaluation of the Medication Satisfaction Questionnaire (MSQ) to assess satisfaction
// with antipsychotic medication among schizophrenia patients. Schizophrenia Research, 118(1-3), 271-278.
const medication_satisfaction = {
    type: jsPsychSurveyLikert,
    questions: () => [
        {
            // Up to and including week 8, participants are still receiving study pills
            prompt: `<span class="highlight-txt">${window.session_week <= 8 ?
                "Overall, how satisfied are you with your RELMED study pills?" :
                "Overall, how satisfied are you with the pills you started in the RELMED study?"}</span>`,
            labels: [
                "Extremely<br>dissatisfied",
                "Very<br>dissatisfied",
                "Somewhat<br>dissatisfied",
                "Neither<br>dissatisfied<br>nor satisfied",
                "Somewhat<br>satisfied",
                "Very<br>satisfied",
                "Extremely<br>satisfied"
            ],
            required: true,
            name: "medication_satisfaction"
        }
    ],
    // Widen the scale so the seven labels have room
    scale_width: 720,
    post_trial_gap: 400,
    data: {
        trialphase: "medication_satisfaction"
    }
}

const medication_satisfaction_timeline = [
    medication_satisfaction
];
