'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: 'Yeni!'});

chrome.alarms.onAlarm.addListener(alarm => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs =>
    chrome.tabs.sendMessage(tabs[0].id, {action: 'update'})
  );
});

chrome.alarms.create('update', {periodInMinutes: 0.2})