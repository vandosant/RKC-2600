(function (context) {
  function init() {
    var SpeechRecognition = webkitSpeechRecognition;
    var SpeechGrammarList = webkitSpeechGrammarList;
    var grammar = '#JSGF V1.0; grammar numbers; public <number> = 1 | 2 | 3 | 4';
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = true;
    document.body.onclick = function () {
      recognition.start();
      console.log('Ready to receive a command.');
    };
    var startTime = null;
    var eventTime = [];
    var started = false;
    var eventNum = 0;
    recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      if (transcript === 'one') {
        startTime = event.timeStamp;
        started = true;
      }
      if (started && transcript == '12' || transcript == '123' || transcript == '1234') {
        eventNum++;
        eventTime.push(event.timeStamp);
      }
    };
    recognition.onspeechend = function(event) {
      var totalDistance = eventTime.reduce(function(a, b) {return a + b})
      console.log((totalDistance / eventNum) - startTime);
    }
    recognition.onerror = function (event) {
      console.log('error', event.data)
    };
  }

  function teardown() {
  }

  Pages.page_scripts["/metronome"] = {
    init: init,
    teardown: teardown
  };

})(window);
