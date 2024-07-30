// const {parse} = require('@wordpress/block-serialization-default-parser');
// Example POST method implementation:
var wordpressBaseUrl = "http:\/\/ocama.docksal.site";
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

postData(`${wordpressBaseUrl}/wp-json/wp/v2/posts/1/`).then((data) => {

  console.log(data)
  let casaAnaBody = document.getElementById("casa-ana-text");
  let casaAnaTitle = document.getElementById("casa-ana-title");
  let newElement = document.createElement("div");
    const baseWpImgUrl = `${wordpressBaseUrl}wp-content/uploads/2024/06/`;
    const anaImgList = document.getElementById("ana_21047-a").children;


  if (data?.id === 1) {
    console.log(!!(data?.title?.rendered))
    casaAnaBody.innerHTML = "";
    casaAnaTitle.innerHTML = "";
    newElement.innerHTML = !!(data?.content?.rendered) ? data?.content?.rendered : bodyData;
    casaAnaBody.appendChild(newElement);
    casaAnaTitle.innerText = data?.title?.rendered;
    anaImgList[0].childNodes[1].childNodes[1].setAttribute("href", `${wordpressBaseUrl}wp-content/uploads/2024/06/ana_21047.jpg`);
    anaImgList[0].childNodes[1].childNodes[1].children[0].setAttribute("src", `${wordpressBaseUrl}wp-content/uploads/2024/06/ana_21047.jpg`);
  } 

}).catch((err) => {
  console.error(err)

});
