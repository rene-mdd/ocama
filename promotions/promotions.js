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
    const organizedPosts = data.reverse();

    const areWeInMainPromoPage =
      document.querySelectorAll("#feature-1-active").length;
    if (!!areWeInMainPromoPage) {
      for (let post = 0; post <= data.length - 1; ++post) {
        console.log(data[post]);
        document.getElementById(`promotion-${post}-container`).style.display =
          "flex";
        const parser = new DOMParser();
        const dataContent = organizedPosts[post].content.rendered;
        const featuredTitle = organizedPosts[post].title.rendered;
        const doc = parser.parseFromString(dataContent, "text/html");
        const featuredImage =
          organizedPosts[post]._embedded?.["wp:featuredmedia"]?.[0];
        const featuredImgAlt = featuredImage.alt_text;
        const featuredImgCaption = featuredImage.caption?.rendered;
        const featuredDescription = featuredImage.description.raw;
        document.getElementById(`promo-${post}-title`).innerHTML =
          featuredTitle;
        document.getElementById(`featured-${post}-caption`).innerHTML =
          featuredImgCaption;
        document.getElementById(`promo-${post}-alt`).innerHTML = featuredImgAlt;
        document.getElementById(`featured-${post}-description`).innerHTML =
          featuredDescription;
        document
          .getElementById(`featured-${post}-promotion-img`)
          .setAttribute("src", featuredImage.source_url);
        document.querySelector(`#go-to-promo-${post}`).dataset.apiLink =
          data[post].id;
        document.addEventListener("click", function (e) {
          console.log(e.target.matches("a[data-api-link]"))
          if (e.target.matches("a[data-api-link]")) {
            const postId = e.target.dataset.apiLink;
            sessionStorage.setItem("selectedPostId", postId);
          }
        });
      }
    }
    // promotion 1
    const areWeInPromotionOne = document.querySelectorAll(
      "#promotion-1-active"
    ).length;
    if (!!areWeInPromotionOne) {
      const getPostId = sessionStorage.getItem("selectedPostId");
      console.log(getPostId)
      for (let post = 0; post <= data.length - 1; ++post) {
        if (getPostId === 13) {
          console.log(data[post]);
          const imgUrls = [];
          const parser = new DOMParser();
          const dataContent = data[post].content.rendered;
          const doc = parser.parseFromString(dataContent, "text/html");
          const paragraphs = [...doc.querySelectorAll("p")].map((p) =>
            p.textContent.trim()
          );
          doc.querySelectorAll("img").forEach((img) => imgUrls.push(img.src));
          const listItems = [...doc.querySelectorAll("li")].map((li) =>
            li.textContent.trim()
          );
          const promotionOneLeft = imgUrls[0];
          const promotionOneRight = imgUrls[1];
          const featuredTitle = data[post].title.rendered;
          document
            .getElementById("promotion-1-left")
            .setAttribute("src", promotionOneLeft);
          document
            .getElementById("promotion-1-right")
            .setAttribute("src", promotionOneRight);
          document.getElementById("promo-featured-title").innerHTML =
            featuredTitle;
          document.getElementById("promo-1-upper-text").innerHTML =
            paragraphs[0];
          document.getElementById("promo-1-offers-deadline").innerHTML =
            paragraphs[2];
          document.getElementById("promo-1-bottom-text").innerHTML =
            paragraphs[1];
          document.getElementById("promo-1-offers-list-title").innerHTML =
            paragraphs[3];
          document.getElementById("promo-1-additional-inclusions").innerHTML =
            paragraphs[4];
          document.getElementById("promo-1-terms").innerHTML = paragraphs[5];
          const promoOneListWrapper =
            document.getElementById("promo-1-list").children;
          for (let i = 0; i < listItems.length; ++i) {
            promoOneListWrapper[i].innerHTML = listItems[i];
          }
        } 
        // else if (getPostId === 246) {
        //   console.log(data[post].id);
        //   console.log(getPostId)
        //   const imgUrls = [];
        //   const parser = new DOMParser();
        //   const dataContent = data[post].content.rendered;
        //   const doc = parser.parseFromString(dataContent, "text/html");
        //   const paragraphs = [...doc.querySelectorAll("p")].map((p) =>
        //     p.textContent.trim()
        //   );
        //   doc.querySelectorAll("img").forEach((img) => imgUrls.push(img.src));
        //   const listItems = [...doc.querySelectorAll("li")].map((li) =>
        //     li.textContent.trim()
        //   );
        //   const promotionOneLeft = imgUrls[0];
        //   const promotionOneRight = imgUrls[1];
        //   const featuredTitle = data[post].title.rendered;
        //   document
        //     .getElementById("promotion-0-left")
        //     .setAttribute("src", promotionOneLeft);
        //   document
        //     .getElementById("promotion-0-right")
        //     .setAttribute("src", promotionOneRight);
        //   document.getElementById("promo-0-title").innerHTML = featuredTitle;
        //   document.getElementById("promo-0-upper-text").innerHTML =
        //     paragraphs[0];
        //   document.getElementById("promo-0-offers-deadline").innerHTML =
        //     paragraphs[2];
        //   document.getElementById("promo-0-bottom-text").innerHTML =
        //     paragraphs[1];
        //   document.getElementById("promo-0-offers-list-title").innerHTML =
        //     paragraphs[3];
        //   document.getElementById("promo-0-additional-inclusions").innerHTML =
        //     paragraphs[4];
        //   document.getElementById("promo-0-terms").innerHTML = paragraphs[5];
        //   const promoOneListWrapper =
        //     document.getElementById("promo-0-list").children;
        //   for (let i = 0; i < listItems.length; ++i) {
        //     promoOneListWrapper[i].innerHTML = listItems[i];
        //   }
        // } 
        else {
          return null;
        }
      }
    }
  })
  .catch((err) => {
    console.error(err);
  });
