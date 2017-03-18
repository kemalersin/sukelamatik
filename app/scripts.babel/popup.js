'use strict';

chrome.browserAction.setBadgeText({text: ''});

chrome.storage.local.get('entry', result => {
  let entry = result.entry;

  $('#entry-list')
    .append(entry.html)
    .before(entry.title);


});