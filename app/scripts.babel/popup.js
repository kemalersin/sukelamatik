'use strict';

(function () {
  function showOptions() {
    chrome.tabs.create({
      url: `chrome://extensions/?options=${chrome.runtime.id}`
    });
  }

  function showEntry() {
    chrome.browserAction.setBadgeText({text: ''});

    chrome.storage.local.get('entry', result => {
      let entry = result.entry;

      $('button.refresh').hide();

      if (!entry) {
        return;
      }

      $('#title').remove();

      $('#entry-list')
        .html('')
        .before(entry.titleHTML)
        .append(entry.entryHTML);
    });
  }

  $('body')
    .on('click', 'button.refresh', showEntry)
    .on('click', 'button.options', showOptions)
    .on('click', 'a', (event) => {
      let el = event.currentTarget;

      if ($(el).hasClass('url')) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      chrome.tabs.create({
        url: `https://eksisozluk.com${el.pathname}${el.search}`
      });
    });

  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.update) {
      $('button.refresh').show();
    }
  });

  showEntry();
}());