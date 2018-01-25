const copy = text => {
  let copier = e => {
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();
    document.removeEventListener("copy", copier);
  };
  document.addEventListener("copy", copier, true);
  document.execCommand("copy", false, null);
};

const amzn = ({ hostname, pathname }) => {
  if (!hostname.match(/(?:^|\.)amazon\./)) return;
  let dp = pathname.match(/\/dp\/([^\/]+)(?:$|\/)/);
  if (dp) return `https://amzn.com/${dp[1]}`;
};

const lnkr = ({ url: orig }) => {
  let url = new URL(orig),
    checkers = [amzn];
  for (let fn of checkers) {
    let ret = fn(url);
    if (ret) return copy(ret);
  }
};

chrome.browserAction.onClicked.addListener(lnkr);
