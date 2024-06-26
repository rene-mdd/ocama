// Example POST method implementation:
async function postData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("http://ocama.docksal.site/wp-json/wp/v2/posts/1/").then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
}).catch((err) => {
  console.error(err)
});