## [2.0.2](https://github.com/huyslab/relmed_trial1/compare/v2.0.1...v2.0.2) (2025-08-22)


### Bug Fixes

* remove safe-based feedback from WM (and trial entirely) ([#328](https://github.com/huyslab/relmed_trial1/issues/328)) ([f66a772](https://github.com/huyslab/relmed_trial1/commit/f66a77275f8df778b3a0af495a39b511dca2c39d))

## [2.0.1](https://github.com/huyslab/relmed_trial1/compare/v2.0.0...v2.0.1) (2025-07-24)


### Bug Fixes

* add Pavlovian lottery back in main timeline of trial 1 ([#325](https://github.com/huyslab/relmed_trial1/issues/325)) ([801c245](https://github.com/huyslab/relmed_trial1/commit/801c2458ff8bb6ed885f42d6bd5c8dc63f1cd2e8))
* add trialphase variable to delay discounting task ([e37db7f](https://github.com/huyslab/relmed_trial1/commit/e37db7fd999336d41dc3e242775ba50926f70ac8))

# [2.0.0](https://github.com/huyslab/relmed_trial1/compare/v1.1.1...v2.0.0) (2025-07-08)


* feat!: add max press rate trial and browser interaction logging ([aea190d](https://github.com/huyslab/relmed_trial1/commit/aea190d0513f0942ebd9b23c183ef25205edb754))


### BREAKING CHANGES

* data structure has changed, adding interaction_data and jspsych_data fields

## [1.1.1](https://github.com/huyslab/relmed_trial1/compare/v1.1.0...v1.1.1) (2025-07-08)


### Bug Fixes

* wm sequence too difficult. return to older wm sequnces, with less stimuli. tested in pilot 8 ([88735b8](https://github.com/huyslab/relmed_trial1/commit/88735b8dd4a0fa5ff69540bad8ef96a16d077d1e))

# [1.1.0](https://github.com/huyslab/relmed_trial1/compare/v1.0.3...v1.1.0) (2025-06-26)


### Bug Fixes

* **instruction:** add max trial key press example gif for clearer instruction ([26f7e19](https://github.com/huyslab/relmed_trial1/commit/26f7e198bd254cea4aa926e16055cbf87649fc3e))


### Features

* **control_configs:** update fruit placeholders and add new images for screening and weeks 4, 24, and 28 ([f0fdb45](https://github.com/huyslab/relmed_trial1/commit/f0fdb4580e9405e5c31d32d3ddccaa2f785fc620))

## [1.0.3](https://github.com/huyslab/relmed_trial1/compare/v1.0.2...v1.0.3) (2025-06-02)


### Bug Fixes

* **bonus:** prevent bonus resumption carry-over across modules ([6d37410](https://github.com/huyslab/relmed_trial1/commit/6d374109bdc1fb6b11c96f437481c3686fb4f8f7))

## [1.0.2](https://github.com/huyslab/relmed_trial1/compare/v1.0.1...v1.0.2) (2025-05-29)


### Bug Fixes

* **task:** correct PILT bonus calculation to avoid earned being larger than max ([1551c78](https://github.com/huyslab/relmed_trial1/commit/1551c7875b40cbaa33078061f0693cf10a3e5495))

## [1.0.1](https://github.com/huyslab/relmed_trial1/compare/v1.0.0...v1.0.1) (2025-05-29)


### Bug Fixes

* **task:** remove obsolete vigour/pit bonus trial ([5b7ef3c](https://github.com/huyslab/relmed_trial1/commit/5b7ef3cf9cb1c92e83f1c349a99e991a4bde5a7e))

# 1.0.0 (2025-05-28)


### Bug Fixes

* Add PIT css file ([c0d9cc8](https://github.com/huyslab/relmed_trial1/commit/c0d9cc8892ea39694a25d12ff43b27a2fbe9b034))
* Add test js to html ([712268e](https://github.com/huyslab/relmed_trial1/commit/712268ea631cd04c7dcab7472dea2ad6e3b50b5a))
* add vigourTimeline init for task == "vigour ([7b288d1](https://github.com/huyslab/relmed_trial1/commit/7b288d1663128f528a6461b5b2d7c92b179d7b2e))
* adjust control timeline for every 6 exploration then one prediction ([96d3457](https://github.com/huyslab/relmed_trial1/commit/96d345712aa1997fe32abbfa7827358714ec7680))
* adjust control timeline for every 6 exploration then one prediction ([c777384](https://github.com/huyslab/relmed_trial1/commit/c77738458a40fdc7bb824cee2b3ddca2e8854c09))
* cancel zombie firstKeyListener that stops simulation ([295d237](https://github.com/huyslab/relmed_trial1/commit/295d237838ba43add20f75067ce0ab3e2b8d1fb9))
* cancel zombie firstKeyListener that stops simulation ([9c6b9d1](https://github.com/huyslab/relmed_trial1/commit/9c6b9d12d0373a0828b171fac183cb8d77f17c52))
* change pavlovian pilt test order ([6a3e12a](https://github.com/huyslab/relmed_trial1/commit/6a3e12a2240f5ee3022fd2eea5098ab03f50edee))
* correct the number of choices for prediction trials in control instructions ([61cf322](https://github.com/huyslab/relmed_trial1/commit/61cf322168b0001566f1ee2752b33283bb0f0df5))
* correct the number of choices for prediction trials in control instructions ([c1775e4](https://github.com/huyslab/relmed_trial1/commit/c1775e411d5e6088fc9d7319a9478f243d3e2f1e))
* Fix kick-out trialphase variable ([7481025](https://github.com/huyslab/relmed_trial1/commit/74810259871bf3a1a9e446a693832c2dbd90a22a))
* Fix no "PIT_instructions.js" issue ([def7198](https://github.com/huyslab/relmed_trial1/commit/def7198440f7efde6f0636773d1d76fa2c1e2301))
* Fix typo ([a889ac5](https://github.com/huyslab/relmed_trial1/commit/a889ac5df1b5ee6ab1d133b29b1eb97c13743b0b))
* Fix uncommented comments ([2ab95eb](https://github.com/huyslab/relmed_trial1/commit/2ab95ebe041fc577db5e44e9e46186ced05a19e0))
* Fix wrong choice parameter which prevented simulation ([01767f8](https://github.com/huyslab/relmed_trial1/commit/01767f8fda3b08dfd2bdc2dfbcbbd255c3e026ad))
* resolve a bug in estimated completion time display in the instruction ([68dbdfb](https://github.com/huyslab/relmed_trial1/commit/68dbdfbb237432cf5b2bbe9e3e4185af7eadcb2c))
* resolve a bug in estimated completion time display in the instruction ([4d42203](https://github.com/huyslab/relmed_trial1/commit/4d42203e26500c16961b2bc84db69317817d89d9))
* set control total bonus only to be conditional on if it's not screening ([d13e7c6](https://github.com/huyslab/relmed_trial1/commit/d13e7c625ea61ba98033110fb23a2eeb31de082f))
* set control total bonus only to be conditional on if it's not screening ([a596c09](https://github.com/huyslab/relmed_trial1/commit/a596c096388c9d09f0e75bfebb51c6cf48246e6f))
* update choices for prediction trials based on session type ([66da2cb](https://github.com/huyslab/relmed_trial1/commit/66da2cbe606fb34e860037e2b020f433475d3718))
* update choices for prediction trials based on session type ([521c037](https://github.com/huyslab/relmed_trial1/commit/521c037edb6f35144eed528f494aea6b5d26c02c))
* update control rating to include state update on finish ([e776fe6](https://github.com/huyslab/relmed_trial1/commit/e776fe6e9ff4d038d2fdf80af9909cac2b96b1c4))
* update island icons and remove unused images for screening ([9d9e524](https://github.com/huyslab/relmed_trial1/commit/9d9e5247333aaa5a4a1e63779d25d34a66e4ade1))
* update island icons and remove unused images for screening ([371cca8](https://github.com/huyslab/relmed_trial1/commit/371cca83e2e55fd2c86e6e82f83d837030c8b924))
* update island images for screening ([15953ff](https://github.com/huyslab/relmed_trial1/commit/15953ffc21a345edc5b7734d410030bd5201afca))
* update island images for screening ([2a4d44b](https://github.com/huyslab/relmed_trial1/commit/2a4d44b484a59999a8e8863e036cf0a0fbd97d3f))
* Update prediction choices based on session type in control instructions ([a076d3e](https://github.com/huyslab/relmed_trial1/commit/a076d3e5c0ea3fefcbbeed5c176cd75a71559d43))
* update screening name from placeholder to strawberry ([e7559fa](https://github.com/huyslab/relmed_trial1/commit/e7559fab022eabd3c4e9308469b3546928df4d57))
* update screening name from placeholder to strawberry ([8c7707f](https://github.com/huyslab/relmed_trial1/commit/8c7707f3f1eeb03afc78e29c8498145807b1c94c))
* update stimulus pairs and magnitudes in pavlovian_test.json for consistency ([dea5ae0](https://github.com/huyslab/relmed_trial1/commit/dea5ae0f9a140ac8de3390517866c2eb85b3b50b))
* update stimulus pairs and magnitudes in pavlovian_test.json for consistency ([c754a79](https://github.com/huyslab/relmed_trial1/commit/c754a794f3b20bcf5502c489b78f4d9d613a14cd))
* update the calculation for the amount of bonus written to the data ([4277e2d](https://github.com/huyslab/relmed_trial1/commit/4277e2dc6c39ba8e0eefe04779e71e432e8826e4))


### Features

* **action:** add semantic release configuration ([7e3c764](https://github.com/huyslab/relmed_trial1/commit/7e3c764f61bdb176e47e0414515ec1d17221ed42))
* **action:** merge semantic release configuration into the main branch ([66db032](https://github.com/huyslab/relmed_trial1/commit/66db0320fcc6fd2ac065ea49e53b2e8e855dc9e1))
* Activate every task ([0a002af](https://github.com/huyslab/relmed_trial1/commit/0a002afb5e81bd67625648e39284e1b6b844db66))
* Add a cloud background to piggy bank in PIT to increase contrast ([2353bcd](https://github.com/huyslab/relmed_trial1/commit/2353bcdf80336781f1ba2f35d2c576044fac6bdb))
* Add a PIT html for testing ([71d2c3a](https://github.com/huyslab/relmed_trial1/commit/71d2c3afa7b032818d35c2b2a0563b0246dfe4c0))
* Add back kick_out, fullscreen_prompt, and REDCap save ([f321ce3](https://github.com/huyslab/relmed_trial1/commit/f321ce355e590bc6978878e374d8890eb86da0c5))
* Add catch questions and rearrange questionnaire order ([e40ae4f](https://github.com/huyslab/relmed_trial1/commit/e40ae4fc8f807d50ef02c06b9687e2ac6dc9c77d))
* add control task to screening session in experiment.html and separately add total reward feedback to standalone control task ([826ab65](https://github.com/huyslab/relmed_trial1/commit/826ab6511beec30d280545ea7b7b5be052fced42))
* add control task to screening session in experiment.html and separately add total reward feedback to standalone control task ([f33c374](https://github.com/huyslab/relmed_trial1/commit/f33c3741694bf6555f19d1ad23f25455e2f8d1af))
* Add free sort functionality and new pavlovian judge script ([e476883](https://github.com/huyslab/relmed_trial1/commit/e47688383058bbe058c516956372f1909c849f42))
* Add kick_out and fullscreen_prompt to PIT ([bec5a5f](https://github.com/huyslab/relmed_trial1/commit/bec5a5f335acb0b9da73592eaf466b427afdddfd))
* Add kick-out and fullscreen check to post vigour test ([c37360c](https://github.com/huyslab/relmed_trial1/commit/c37360c26799de0a0214c038d7848eaa13ece5f7))
* Add no press warning to PIT ([954c690](https://github.com/huyslab/relmed_trial1/commit/954c69039956508ec5f01394c9e73bf44a734b7e))
* Add noPressWarning function for ITI-like warning message ([7001d78](https://github.com/huyslab/relmed_trial1/commit/7001d78d62edf55686cc059cc543073a4b8dbf83))
* Add numeric values to the coins ([220e91a](https://github.com/huyslab/relmed_trial1/commit/220e91ad33eb327b09ad4c1239fc2dd6911f325b))
* Add pavlovian stimuli and preload ([f70ab97](https://github.com/huyslab/relmed_trial1/commit/f70ab9713ea2e358a296d18f271f46daf2ad0ced))
* Add pavlovian stimuli behind the coin ([4c4c83e](https://github.com/huyslab/relmed_trial1/commit/4c4c83e85630959236e6220a957e9420c2b01cb5))
* Add Pavlovian test sequence ([b1151c0](https://github.com/huyslab/relmed_trial1/commit/b1151c0c445800cd8747e53481f1717abd1b162b))
* Add PIT components ([11651d5](https://github.com/huyslab/relmed_trial1/commit/11651d5126828ff2d2b568c4de7b3a76cb3c12c1))
* Add post-task test ([c3e08a2](https://github.com/huyslab/relmed_trial1/commit/c3e08a20b972d9918ece8ddd7c72d86fb381fd36))
* Add post-vigour comparison task ([21fcf41](https://github.com/huyslab/relmed_trial1/commit/21fcf417af3f4cd35f473a0341833442875ffec6))
* Add progress bar to indicate press times ([d6862fe](https://github.com/huyslab/relmed_trial1/commit/d6862feeff687893f074ec7172bb83bcf67ec460))
* Add questionnaires ([4c21a14](https://github.com/huyslab/relmed_trial1/commit/4c21a14deeafb46d918e38c2451a275c3b6183bc))
* Add simulation mode support ([224b452](https://github.com/huyslab/relmed_trial1/commit/224b45273c0308b0310254954826a27834264c64))
* Add timer and looping functions for instructions to control the flow ([c4170f1](https://github.com/huyslab/relmed_trial1/commit/c4170f1973d9b7b433e9c968f2bdec7e22ba9107))
* Add trialphase to data section ([2e0af75](https://github.com/huyslab/relmed_trial1/commit/2e0af75dddce98cef364827853101047f74e58ae))
* Add two acceptability questions about PIT task ([da15ea4](https://github.com/huyslab/relmed_trial1/commit/da15ea48c515ca5d9d4b13ebafd6daee83b69352))
* Add two questions about understanding of vividness and swirls ([72906bb](https://github.com/huyslab/relmed_trial1/commit/72906bba14343321d28bd6203f388394b6ad63aa))
* Add warning functionality to Vigour ([43e1983](https://github.com/huyslab/relmed_trial1/commit/43e19833757a20710dd4198c39e370d31377dc22))
* Adjust piggy bank image hue based on magnitude ([88f1b49](https://github.com/huyslab/relmed_trial1/commit/88f1b4927d6a4c04947228c11aa0fd016cc39861))
* Adjust task order ([24e54aa](https://github.com/huyslab/relmed_trial1/commit/24e54aa823c0924d56e28699373a7d4f35205e67))
* Bias the probability towards high reward trials ([39cdda2](https://github.com/huyslab/relmed_trial1/commit/39cdda2b643513592805ded2e37ac04c644bc326))
* Change bonus pay and move into vigour.js file ([1b1ac22](https://github.com/huyslab/relmed_trial1/commit/1b1ac22059919baec47dbe63f541464382b25c27))
* Change introduction interface ([125b1c0](https://github.com/huyslab/relmed_trial1/commit/125b1c051ae5ddb2a182821e517720d6eeff4178))
* Change shake key to "b" ([9bd423d](https://github.com/huyslab/relmed_trial1/commit/9bd423dcfc782c29d3f7d423fcc3aa0e021b40d2))
* Change task trial structure and data saving ([aed9226](https://github.com/huyslab/relmed_trial1/commit/aed92261cb33d576c43a272fe86b67e6b51edb44))
* Change the pavlovian stimuli presentation ([5e6e81f](https://github.com/huyslab/relmed_trial1/commit/5e6e81fac674d074f1d1ec87486c109b587b9af8))
* Combine Vigour and PIT bonuses ([60a7fd2](https://github.com/huyslab/relmed_trial1/commit/60a7fd273fa244fac93de6aa0ab9d081b444c307))
* Disable reversal ([7e53cba](https://github.com/huyslab/relmed_trial1/commit/7e53cba853946dbae490082efd8d3f1ddaa2b658))
* Enhance piggy bank styles with brightness for better distinction ([9953798](https://github.com/huyslab/relmed_trial1/commit/9953798b732909e7aca5a3bb1ad5ba97e7cf5f0c))
* Ensure Pavlovian stimuli look the same across tasks ([b7afaeb](https://github.com/huyslab/relmed_trial1/commit/b7afaeb970745ff2f723c76fc0870b7b8a67a25b))
* Ensure Pavlovian stimuli look the same across tasks ([8e0f9d0](https://github.com/huyslab/relmed_trial1/commit/8e0f9d0ecc23922f7c5f4a09f34ff5b59a7b6b5f))
* Extend the instruction animation ([4b60d19](https://github.com/huyslab/relmed_trial1/commit/4b60d1985330e9ec5f6e71313a2c20ddd4c7af83))
* Force participants to retake max press trials once if too slow ([463b99f](https://github.com/huyslab/relmed_trial1/commit/463b99f74da80c30d7293478349eeea01fe9c0be))
* implement control timeline adjustments for screening session and add the island images ([2a6b388](https://github.com/huyslab/relmed_trial1/commit/2a6b388789ba07b3e7c672f7ae6452f289521075))
* implement control timeline adjustments for screening session and add the island images ([a7bdab9](https://github.com/huyslab/relmed_trial1/commit/a7bdab93f9288104b61420544c8462d5265c5ba1))
* Lengthen simulation trial length ([83e8216](https://github.com/huyslab/relmed_trial1/commit/83e8216f6e1495217e1adb2a511733ffd45bbea3))
* New PIT stimuli ([2230515](https://github.com/huyslab/relmed_trial1/commit/2230515462e21fec3029f9864b35ce450d0b2eae))
* No background when piggy changes ([9e11075](https://github.com/huyslab/relmed_trial1/commit/9e1107534b8fcce566b249a3829e4f5956808890))
* Preload images ([76bba13](https://github.com/huyslab/relmed_trial1/commit/76bba13ed0de60aa507e9ec4a1a25dd1f3ec0dde))
* Remove trial structure and trial information ([1d2b18e](https://github.com/huyslab/relmed_trial1/commit/1d2b18e56e48a8ee6d3d0f32bc56412b3ee1ce7b))
* Replace marble imgs to PIT imgs ([f109668](https://github.com/huyslab/relmed_trial1/commit/f109668dc3534ed101650c0d3cc3fab98ae08d8c))
* Replace marble imgs to PIT imgs ([14a8d9c](https://github.com/huyslab/relmed_trial1/commit/14a8d9ca30b0a6b6d94c114651864993f16c6617))
* Save post-vigour test to REDCap ([c942fe3](https://github.com/huyslab/relmed_trial1/commit/c942fe3a13cd4306d67b65d401a82110f6b793f1))
* Separate PILT and PILT test for more flexibility of task order ([dc5d015](https://github.com/huyslab/relmed_trial1/commit/dc5d015e86e11e5f4696bb5b3829a51c64d6d502))
* Shorten trials to 7s ([510f60f](https://github.com/huyslab/relmed_trial1/commit/510f60f9002393739c9843bb6ae0c6efe6ae5aec))
* Substitute the second block of PILT test with Pavlovian test ([e7d4545](https://github.com/huyslab/relmed_trial1/commit/e7d4545ed4e50595a590d55e5d40c1cbbd20a855))
* Sync with PILOT2 task code ([e68d5d9](https://github.com/huyslab/relmed_trial1/commit/e68d5d9441cf384804ab46057a5369a587571487))
* Upate explicit PIT instruction ([6a5b84e](https://github.com/huyslab/relmed_trial1/commit/6a5b84e4439be4e45c65cce8cf71f38ded472b9d))
* Update (double) the PIT sequence ([573652b](https://github.com/huyslab/relmed_trial1/commit/573652b06238db1c3effba8d230fc25fa6d6f29b))
* Update box shaking animation and coin dropping ([bcd0227](https://github.com/huyslab/relmed_trial1/commit/bcd02273aa54f97e1a91863c6ca0f00479633c21))
* Update experiment page layout and styling ([02f7aed](https://github.com/huyslab/relmed_trial1/commit/02f7aed4125787b2a2a3ea7034997b4a9c8de8f1))
* Update experiment page with new instruction ([c17b1cd](https://github.com/huyslab/relmed_trial1/commit/c17b1cdab27b65a7e4aff0bb59aca39c6dae71a2))
* Update image paths to include session number for PIT stimuli ([38835ce](https://github.com/huyslab/relmed_trial1/commit/38835ce212de19d45c6ca223c84a852ba92611fc))
* Update loop-conditioned instructions ([c7a6eff](https://github.com/huyslab/relmed_trial1/commit/c7a6eff34e588f91b0a2cde3adf3d174cd892c39))
* Update PIT instructions ([440bea0](https://github.com/huyslab/relmed_trial1/commit/440bea0823cdc51240dcbe823d9119e029db7a7a))
* Update post vigour test sequence to match difficulty items proportion ([f1f2100](https://github.com/huyslab/relmed_trial1/commit/f1f210027f1062592353277a691c2771153fefd9))
* Update post-vigour test sequence using orthogonal array ([242527c](https://github.com/huyslab/relmed_trial1/commit/242527cf54fa23d7c1d19257caa57a829957a829))
* Update saturation change scale to ratio ([1798465](https://github.com/huyslab/relmed_trial1/commit/1798465f88fa4c99aec0a56260807883bc343b0f))
* Update session 2 pavlovian stims ([f889364](https://github.com/huyslab/relmed_trial1/commit/f8893640d4e3450848e0da19a9a9b894359f8f02))
* Update setup of experiment config ([4d45618](https://github.com/huyslab/relmed_trial1/commit/4d45618c94cf13c506e5facf3a5c7cce76e895a7))
* Update simulation mode for faster display and more reasonable data ([0bbee15](https://github.com/huyslab/relmed_trial1/commit/0bbee154fd3c07470f698fcfe2ba2badc843879a))
* Update the PIT sequence to pop out the pavlovian change ([ad7b1e9](https://github.com/huyslab/relmed_trial1/commit/ad7b1e9f41c6561ceb6f972b279befa8731c7162))
* Update the vigour sequence ([186e330](https://github.com/huyslab/relmed_trial1/commit/186e3300ba07281707cf90b2acd4fd0b41808c16))
* Use grayscale and blurry piggy bank image for ITI ([23c7b5c](https://github.com/huyslab/relmed_trial1/commit/23c7b5c43b5238b65aa028bf6cbbf248fc9d353b))
* Use images to display 'box' and 'coins' ([8067589](https://github.com/huyslab/relmed_trial1/commit/806758936e2278748174fce7b2a07ffea7c5d14d))
* Use key "b" to begin the task ([969d6be](https://github.com/huyslab/relmed_trial1/commit/969d6be4b7d98f65a77e46a687f48b5e56c6f626))
* Use lognorm dist to control sample prob ([853513a](https://github.com/huyslab/relmed_trial1/commit/853513abd5a765f0eb11dede5442ade506f972a0))
* Use predetermined sequence ([7f70949](https://github.com/huyslab/relmed_trial1/commit/7f709497a84c309597e7b46371578f3e2f146d96))


### Reverts

* Revert global variables: reward and press ([91b502a](https://github.com/huyslab/relmed_trial1/commit/91b502a8c9cd6b69166b9fd35461d7588648bf64))


### BREAKING CHANGES

* `update...` functions are deprecated
