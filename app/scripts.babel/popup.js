'use strict';

chrome.browserAction.setBadgeText({text: ''});

chrome.storage.local.get('entry', result => {
  let entry = result.entry;

  $('#entry-list')
    .before(entry.titleHTML)
    .append(entry.entryHTML);

  $('body').on('click', 'a', (event) => {
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
});