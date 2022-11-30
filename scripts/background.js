const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

chrome.runtime.onInstalled.addListener(() =>
  chrome.action.setBadgeText({ text: "OFF" })
);

chrome.action.onClicked.addListener(async (tab) => {
  if (!isValidTab(tab)) return;

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  const styleConfig = {
    files: ["styles/specialist-bonus.css"],
    target: { tabId: tab.id },
  };

  switch (nextState) {
    case "ON":
      await chrome.scripting.insertCSS(styleConfig);
      break;
    case "OFF":
      await chrome.scripting.removeCSS(styleConfig);
      break;
  }
});

const isValidTab = (tab) => {
  if (
    (!tab || !tab.url) &&
    !tab.url.startsWith(extensions) &&
    !tab.url.startsWith(webstore)
  )
    return false;
  return true;
};

// to inject JavaScript: scripting.executeScript()
