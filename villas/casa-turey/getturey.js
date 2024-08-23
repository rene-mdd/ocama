var wordpressBaseUrl = "https://ocama.com/wpbackend.ocama.com/";
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
  console.log(responsePost)
  if (responsePost?.ok) {
    const resultPost = await responsePost.json();
    return resultPost;
  }
  else {
    return null;
  }
}

postData(`${wordpressBaseUrl}/wp-json/wp/v2/posts/162/`).then((data) => {
  console.log(data)
  let casaBody = document.getElementById("casa-turey-text");
  let casaTitle = document.getElementById("casa-turey-title");
  let newElement = document.createElement("div");
  const baseWpImgUrl = `${wordpressBaseUrl}wp-content/uploads/2024/08/`;
  const casaImgList = document.getElementById("casa-turey-carrousel-img").children;

  if (data?.id === 162) {
    casaBody.innerHTML = "";
    casaTitle.innerHTML = "";
    newElement.innerHTML = data?.content?.rendered;
    casaBody.appendChild(newElement);
    casaTitle.innerText = data?.title?.rendered;
    casaImgList[0].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}casa_turey_gallery_01`);
    casaImgList[0].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}casa_turey_gallery_01.jpg`);
    casaImgList[1].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}casa_turey_gallery_02.jpg`);
    casaImgList[1].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}casa_turey_gallery_02.jpg`);
    casaImgList[2].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}casa_turey_gallery_03.jpg`);
    casaImgList[2].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}casa_turey_gallery_03.jpg`);
    casaImgList[3].childNodes[1].childNodes[1].setAttribute("href", `${baseWpImgUrl}casa_turey_gallery_04.jpg`);
    casaImgList[3].childNodes[1].childNodes[1].children[0].setAttribute("src", `${baseWpImgUrl}casa_turey_gallery_04.jpg`);
  } 

}).catch((err) => {
  console.error(err)
});