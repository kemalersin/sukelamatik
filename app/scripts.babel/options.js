'use strict';

(function () {
  $('form').submit(() => {
    chrome.storage.sync.set({
      updateFrequency: +$('#UpdateFrequency').val()
    });

    chrome.runtime.sendMessage({updateAlarm: true});

    window.close();
    return false;
  });

  chrome.storage.sync.get({
    updateFrequency: 5
  }, result =>
    $('#UpdateFrequency').val(result.updateFrequency)
  );
}());