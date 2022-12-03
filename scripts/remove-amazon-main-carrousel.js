const url = "https://www.primevideo.com/";

chrome.runtime.onInstalled.addListener((tab) => {
  chrome.action.setBadgeText({ text: "OFF" });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.url?.startsWith(url)) return;

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "OFF" ? "ON" : "OFF";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  const styleConfig = {
    files: ["styles/amazon-style.scss"],
    target: { tabId: tab.id },
  };

  switch (nextState) {
    case "ON":
      await chrome.scripting.insertCSS(styleConfig);
      break;
    case "OFF":
      await chrome.scripting.removeCSS(styleConfig);
  }
});
