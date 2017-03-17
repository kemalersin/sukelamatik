'use strict';

const url = 'https://eksisozluk.com';

chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action == 'update') {
    $.get(`${url}/basliklar/gundem`)
      .done(data => {
        let html = $.parseHTML(data);
        let topicList = $(html).filter('ul.topic-list.partial').html();
        let topics = $(topicList).find('a').toArray();
        let topic = topics[Math.floor(Math.random() * topics.length)];

        console.log(topic.pathname);
      })
      .fail(console.log);
  }
});