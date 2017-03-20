'use strict';

const url = 'https://eksisozluk.com';

chrome.runtime.onInstalled.addListener(details => {
  chrome.alarms.create('update', {periodInMinutes: 0.1});
});

chrome.alarms.onAlarm.addListener(alarm => {
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
          chrome.browserAction.setBadgeText({text: 'Yeni!'});
        })
    })
    .fail(console.log);
});