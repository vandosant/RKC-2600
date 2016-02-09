(function (context) {

  function init() {
    var SpeechRecognition = webkitSpeechRecognition;
    var SpeechGrammarList = webkitSpeechGrammarList;
    var grammar = '#JSGF V1.0; grammar numbers; public <number> = 1 | 2 | 3 | 4';
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    document.body.onclick = function () {
      recognition.start();
      console.log('Ready to receive a color command.');
    };

    recognition.onresult = function (event) {
      var color = event.results[0][0].transcript;
      console.log('Result received:', color);
      console.log('Confidence:', event.results[0][0].confidence);
    };
    recognition.onspeechstart = function (event) {
      console.log('spst')
    };
    recognition.onsaudiostart = function (event) {
      console.log('sdst')
    };
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
