---
title: Transcribe FAQs
layout: layout-page-sidenav
description: Transcribe FAQs
single_level_nav: true
_data: single-level-nav
faqs:
  - name: How long does it take to transcribe a file?
    description: >
      It usually takes less than an hour to transcribe an hour of audio. Depending on the audio quality, the duration may vary. If the audio is soft and mumbled, it could take slightly longer.
  - name: Does live transcription have a time limit?
    description: >
      Yes, there is a two-hour limit for each live transcription session. 
  - name: Is there a limit on the number of transcriptions I can submit?
    description: >
      No, Transcribe does not set a limit on the number of transcriptions a user can submit. In general, users should use the service appropriately and with fair usage. If you have large number of transcription tasks to be processed in batch, please contact us separately at <transcribe@tech.gov.sg>. 
  - name: I want to use Transcribe for my online meetings. How do I make sure the voices of all attendees are captured?
    description: >
      You may refer to the tips for online meeting [here](https://www.transcribe.gov.sg/user_guide/useful_tips/live_recording/){:target="_blank"} for more information on the setup.
  - name: Sometimes the transcripts do not seem to be accurate, with a number of errors and missing texts. Why is that so?
    description: >
      The performance and accuracy of speech-to-text transcription is typically measured by Word Error Rate (WER) that summarises the errors in a transcript including insertion, deletion and substitution. In reality, the accuracy varies according to use case scenario and is determined by a number of factors such as the fluency, the enunciation and speakers’ accents. For use case in a formal speech setting with professional audio system and articulate speakers, the WER could be as low as 10%. For meetings and focus group discussions that involve many speakers with different accents and fluency, poor audio system and significant background noise, the WER could go as high as 30% to 40%. Therefore, the accuracy for each transcription task varies and sometimes one transcript could have more errors than the other.
  - name: Can Transcribe detect multiple languages and transcribe multiple languages in a task?
    description: >
      Transcribe does not support auto detection of language and language switching in a task. After the language for the task is selected, the transcript would be in the selected language only. Any other languages used in the same task would not be transcribed 
---

{% include faqs-app.html sectionName="FAQs" sectionDescription=page.section_description faqData=page.faqs %}
