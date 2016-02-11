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
    var eventDates = [];
    var started = false;
    var eventNum = 0;
    recognition.onresult = function (event) {
      var timeStamp = Date.now();
      var transcript = event.results[0][0].transcript;
      if (transcript === 'one') {
        startTime = event.timeStamp;
        startDate = timeStamp;
        started = true;
      }
      if (transcript == '12' || transcript == '123' || transcript == '1234') {
        eventNum++;
        eventDates.push(timeStamp);
        eventTime.push(event.timeStamp);
      }
    };
    recognition.onspeechend = function(event) {
      var dateDistance = eventDates.reduce(function(a, b) {return b - a}, 0)
      console.log((60 / (dateDistance / eventDates.length)) * 1000);
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
