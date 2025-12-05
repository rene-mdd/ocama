var wordpressBaseUrl = "http://ocama.docksal.site";
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
  } else {
    return null;
  }
}

postData(`${wordpressBaseUrl}/wp-json/wp/v2/posts?categories=6&_embed=1`)
  .then((data) => {
    // if (!post) return;
    // promotions general page
    const areWeInMainPromoPage =
      document.querySelectorAll("#feature-1-active").length;
    if (!!areWeInMainPromoPage) {
      const parser = new DOMParser();
      const dataContent = data[0].content.rendered;
      const featuredTitle = data[0].title.rendered;
      const doc = parser.parseFromString(dataContent, "text/html");
      console.log(doc);
      const featuredImage = data[0]._embedded?.["wp:featuredmedia"]?.[0];
      const featuredImgAlt = featuredImage.alt_text;
      const featuredImgCaption = featuredImage.caption?.rendered;
      const featuredDescription = featuredImage.description.raw;
      console.log(featuredDescription);
      document.getElementById("promo-1-title").innerHTML = featuredTitle;
      document.getElementById("featured-caption").innerHTML =
        featuredImgCaption;
      document.getElementById("promo-1-alt").innerHTML = featuredImgAlt;
      document.getElementById("featured-description").innerHTML =
        featuredDescription;

      console.log(featuredImage.alt_text);
      document
        .getElementById("featured-promotion-img")
        .setAttribute("src", featuredImage.source_url);
    }
    // promotion 1
    const areWeInPromotionOne = document.querySelectorAll(
      "#promotion-1-active"
    ).length;
    if (!!areWeInPromotionOne) {
      const imgUrls = [];
      const parser = new DOMParser();
      const dataContent = data[0].content.rendered;
      const doc = parser.parseFromString(dataContent, "text/html");
      const paragraphs = [...doc.querySelectorAll("p")].map((p) =>
        p.textContent.trim()
      );
      doc.querySelectorAll("img").forEach((img) => imgUrls.push(img.src));
      const listItems = [...doc.querySelectorAll("li")].map(li => li.textContent.trim());
      console.log(listItems)
      const promotionOneLeft = imgUrls[0];
      const promotionOneRight = imgUrls[1];
      const featuredTitle = data[0].title.rendered;
      document
        .getElementById("promotion-1-left")
        .setAttribute("src", promotionOneLeft);
      document
        .getElementById("promotion-1-right")
        .setAttribute("src", promotionOneRight);
      document.getElementById("promo-1-title").innerHTML = featuredTitle;
      document.getElementById("promo-1-upper-text").innerHTML = paragraphs[0];
      document.getElementById("promo-1-bottom-text").innerHTML = paragraphs[1];
            const promoOneListWrapper = document.getElementById("promo-1-list-wrapper").children;

      const promoOneList = document.getElementById("promo-1-list");

      console.log(promoOneListWrapper[2])

    }
  })
  .catch((err) => {
    console.error(err);
  });
