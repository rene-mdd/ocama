var wordpressBaseUrl = "http:\/\/ocama.docksal.site/";
async function postData(urlPost) {
  // Default options are marked with *
  const responsePost = await fetch(urlPost, {
    signal: AbortSignal.timeout(1500),
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
  if (responsePost?.ok) {
    const resultPost = await responsePost.json();
    return resultPost;
  }
  else {
    return null;
  }
}

postData(`${wordpressBaseUrl}/wp-json/wp/v2/posts/82/`).then((data) => {
  console.log(data)
  let casaBody = document.getElementById("casa-bagua-text");
  let casaTitle = document.getElementById("casa-bagua-title");
  let newElement = document.createElement("div");
  const baseWpImgUrl = `${wordpressBaseUrl}wp-content/uploads/2024/06/`;
  const casaImgList = document.getElementById("casa-bagua-carrousel-img").children;

  if (data?.id === 82) {
    casaBody.innerHTML = "";
    casaTitle.innerHTML = "";
    newElement.innerHTML = data?.content?.rendered;
    casaBody.appendChild(newElement);
    casaTitle.innerText = data?.title?.rendered;
    casaImgList[0].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_21047.jpg`);
    casaImgList[0].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_21047.jpg`);
    casaImgList[1].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_4099.jpg`);
    casaImgList[1].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_4099.jpg`);
    casaImgList[2].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_55849.jpg`);
    casaImgList[2].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_55849.jpg`);
    casaImgList[3].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_73335.jpg`);
    casaImgList[3].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_73335.jpg`);
    casaImgList[4].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_90968.jpg`);
    casaImgList[4].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_90968.jpg`);
    casaImgList[5].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_94043.jpg`);
    casaImgList[5].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_94043.jpg`);
    casaImgList[6].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_123650291.jpg`);
    casaImgList[6].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_123650291.jpg`);
    casaImgList[7].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}ana_123650292.jpg`);
    casaImgList[7].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}ana_123650292.jpg`);
  } 

}).catch((err) => {
  console.error(err)
});