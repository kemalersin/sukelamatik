'use strict';

(function () {
  const url = 'https://eksisozluk.com';

  function setAlarm() {
    chrome.storage.sync.get({
        updateFrequency: 5
      }, result => {
      chrome.alarms.clear('update');
      chrome.alarms.create('update', {periodInMinutes: result.updateFrequency})
    });
  }

  function getEntry() {
    $.get(`${url}/basliklar/gundem`)
      .done(topicData => {
        let topics = $(topicData).find('ul.topic-list.partial > li > a').toArray();
        let topic = topics[Math.floor(Math.random() * topics.length)];

        $.get(`${url}${topic.pathname}?a=dailynice`)
          .done(entryData => {
            let title = $(entryData).find('h1#title')[0];
            let entries = $(entryData).find('ul#entry-list > li').toArray();
            let entry = entries[Math.floor(Math.random() * entries.length)];

            let entryObject = {
              id: $(entry).data('id'),
              author: $(entry).data('author'),
              authorId: $(entry).data('author-id'),
              favoriteCount: $(entry).data('favorite-count'),
              date: $(entry).find('footer > .info > a.entry-date').text(),

              titleHTML: title.outerHTML,
              entryHTML: entry.outerHTML
            };

            chrome.storage.local.set({'entry': entryObject});

            chrome.browserAction.setBadgeText({text: 'yeni!'});
            chrome.browserAction.setBadgeBackgroundColor({color: '#80c14b'});
            chrome.browserAction.enable();

            chrome.runtime.sendMessage({updateEntry: true});
          })
      })
      .fail(err => {
        console.log(err);
        chrome.browserAction.disable();
      });
  }

  chrome.runtime.onInstalled.addListener(details => {
    chrome.browserAction.disable();
    chrome.alarms.onAlarm.addListener(alarm => getEntry());

    setAlarm();
    getEntry();
  });

  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.updateAlarm) {
      setAlarm();
    }
  });
}());