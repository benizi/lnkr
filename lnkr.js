const copy = text => {
  let copier = e => {
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();
    document.removeEventListener("copy", copier);
  };
  document.addEventListener("copy", copier, true);
  document.execCommand("copy", false, null);
};

const second_tld = (hostname, domain) => {
  let m = hostname.match(/([^.]+)\.[^.]+$/);
  return m && m[1] == domain;
};

const amzn = ({ hostname, pathname }) => {
  if (!hostname.match(/(?:^|\.)amazon\./)) return;
  let dp = pathname.match(/\/dp\/([^\/]+)(?:$|\/)/);
  if (dp) return `https://amzn.com/${dp[1]}`;
};

// Link Facebook profile and photo pages
const fcbk = ({ hostname, pathname, search }) => {
  if (!second_tld(hostname, "facebook")) return;
  let [, php] = pathname.match(/^\/(\w+)\.php$/) || [];
  if (!php) return `https://${hostname}${pathname}`;
  switch (php) {
    case "profile":
      let [, id] = search.match(/[\/&?](id=[^&]+)/) || [];
      if (id) return `https://${hostname}${pathname}?${id}`;
      break;
    case "photo":
      let [, fbid] = search.match(/[\/&?](fbid=[^&]+)/) || [];
      if (!fbid) return;
      let [, set] = search.match(/[\/&?](set=[^&]+)/) || [];
      let q = [fbid, set].filter(i => i).join("&").replace(/^(?=.)/, "?");
      return `https://${hostname}${pathname}${q}`;
  }
};

const lnkr = ({ url: orig }) => {
  let url = new URL(orig),
    checkers = [amzn, fcbk];
  for (let fn of checkers) {
    let ret = fn(url);
    if (ret) return copy(ret);
  }
};

chrome.browserAction.onClicked.addListener(lnkr);
