const clientId = "916ac11fe0944e138feb1b53a22f5a47";
const clientSecret = "647fd770106648b2b5c3b20af855f782";
const tokenUrl = "https://accounts.spotify.com/api/token";
const redirectUri =
  "https://ciongu.github.io/MusicTasteUnboxed/public/page.html";
let authUri = "https://accounts.spotify.com/authorize?";
const scope = "user-read-private user-read-email user-top-read ";
const state = Math.random().toString(36).slice(2);

const requestAuth = function () {
  authUri +=
    `response_type=code` +
    `&client_id=${clientId}` +
    `&scope=${scope}` +
    `&redirect_uri=${redirectUri}` +
    `&state=${state}`;

  window.location.href = authUri;
};

//prettier-ignore
const getAccesToken = async function () {
  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("code", getCode());
  body.append("redirect_uri", redirectUri);


  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
  const data = await response.json()



  return data.access_token
};

const getCode = function () {
  const code = new URLSearchParams(window.location.search).get("code");
  return code;
};

const btn = document.querySelector(".req-auth");
if (btn) {
  btn.addEventListener("click", requestAuth);
}

const logout = function () {
  window.location.href = "https://www.spotify.com/logout/";
};

const redirectLogin = function () {
  window.location.href =
    "https://ciongu.github.io/MusicTasteUnboxed/public/index.html";
};

const logOutBtn = document.querySelector(".log-out");
if (logOutBtn) {
  logOutBtn.addEventListener("click", function () {
    logout();
    redirectLogin();
  });
}

const accToken = await getAccesToken();

export default accToken;
