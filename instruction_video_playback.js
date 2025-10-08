const preload_video = {
  type: jsPsychPreload,
  video: ["RELMED_540p.mp4"],
  post_trial_gap: 400,
  show_progress_bar: true,
  message: "Loading the video, thanks for your patience...",
  data: {
    trialphase: "preload_video"
  },
  continue_after_error: true,
  on_start: () => {
    // Report to tests
    console.log("load_successful")

    // Report to relmed.ac.uk
    // postToParent({message: "load_successful"})
  }
};

const video_welcome_txt = {
  type: jsPsychInstructions,
  css_classes: ['instructions'],
  pages: [`
    <p>Before you dive in, please take a moment to watch our brief introductory video.</p>
    <p>It explains how games work in general and will help you feel prepared for what's ahead.</p>
    <p>Once you've watched it, you can move on to start the games!</p>
    `],
  show_clickable_nav: true,
  data: { trialphase: "instruction" }
};

const instruction_video = {
  type: jsPsychVideoButtonResponse,
  stimulus: ["RELMED_540p.mp4"],
  choices: ["Continue"],
  controls: true,
  height: 540,
  autoplay: false,
  trial_ends_after_video: false,
  response_allowed_while_playing: false
};