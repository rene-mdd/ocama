
// Example POST method implementation:
async function postData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    signal: AbortSignal.timeout(1000),
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

  if (response?.ok) {
    return response.json(); // parses JSON response into native JavaScript objects
  } else {
    return null;
  }
}

postData("http://ocama.docksal.site/wp-json/wp/v2/posts/1/").then((data) => {

  console.log(data)
  let casaAnaBody = document.getElementById("casa-ana-text");
  let casaAnaTitle = document.getElementById("casa-ana-title");
  let newElement = document.createElement("div");
  // const baseWpImgUrl = "http://ocama.docksal.site/wp-content/uploads/2024/06/";
  // const anaImgList = document.getElementById("ana_21047-a").children;
  // anaImgList[0].childNodes[1].childNodes[1].setAttribute("href", "http://ocama.docksal.site/wp-content/uploads/2024/06/ana_21047.jpg");
  // anaImgList[0].childNodes[1].childNodes[1].children[0].setAttribute("src", "http://ocama.docksal.site/wp-content/uploads/2024/06/ana_21047.jpg");
  // console.log(anaImgList[0].childNodes[1].childNodes[1].children[0].setAttribute("src", "http://ocama.docksal.site/wp-content/uploads/2024/06/ana_21047.jpg"));
  // console.log(data)
  if (data?.id === 1) {
    newElement.innerHTML = !!(data.content.rendered) ? data.content.rendered : bodyData;
    casaAnaBody.appendChild(newElement);
    casaAnaTitle.innerText = data.title.rendered;
  } else {
    newElement.innerHTML = bodyData;
    casaAnaBody.appendChild(newElement);
    casaAnaTitle.innerText = titleData;
  }

}).catch((err) => {
  console.error(err)
  let casaAnaBody = document.getElementById("casa-ana-text");
  let casaAnaTitle = document.getElementById("casa-ana-title");
  let newElement = document.createElement("div");
  newElement.innerHTML = bodyData;
  casaAnaBody.appendChild(newElement);
  casaAnaTitle.innerText = titleData;
  console.log(casaAnaBody)
});

const titleData = `Casa Ana`
const bodyData = `<p>
        Meaning “Flower” in the Taino Language, Casa Ana, is an
        architectural masterpiece, spanning three indoor-outdoor
        levels cascading gracefully down the hillside and
        offering a majestic panoramic view overlooking the
        untouched beauty of Rincón Bay, capturing the wonder of
        the ocean’s vastness.
    </p>
    <p>
        The top floor houses the master bedroom, adorned with a
        live-edge king bed and floor-to-ceiling sliding doors
        that dissolve the boundaries between indoors and
        outdoors. The adjoining natural slate indoor-outdoor
        bathroom with carved wooden sinks creates a sensory
        connection with the elements. Step onto the covered
        wraparound veranda, where expansive wooden decks, and a
        cozy hanging chair beckon, inviting you to gaze at the
        azure ocean expanse below.
    </p>
    <p>
        Beyond, a splendid sun deck offers a setting for
        lounging, savoring cocktails, relishing in open-air
        dining, and stargazing.
    </p>
    <p>
        Descending via a marble-clad staircase, you'll discover
        the second level, home to a fully equipped kitchen,
        breakfast bar and dining area boasting live-edge
        elements. Floor-to-ceiling glass doors unveil yet
        another covered wraparound veranda, revealing panoramic
        vistas.
    </p>
    <p>
        Adjacent to this, a flexible space awaits—ideal for
        relaxation, lounging, or converting into a cozy
        secondary queen bedroom, complete with an ensuite
        natural slate bathroom, outdoor shower and a work desk.
        A descent to the third level reveals another inviting
        wooden sun deck, outdoor shower, and an 18-foot infinity
        pool, adorned with natural slate tiles. Here, you have
        the opportunity to envelop yourself in calmness,
        relishing uninterrupted periods while being serenaded by
        the orchestra of nature.
    </p> `