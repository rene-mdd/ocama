var wordpressBaseUrl = "https://ocama.com/wpbackend.ocama.com";

async function postData(urlPost) {
  // Default options are marked with *
  try {
    const responsePost = await fetch(urlPost, {
      signal: AbortSignal.timeout(5000),
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    if (!responsePost.ok) {
      console.error("HTTP error:", responsePost.status);
      return null;
    }

    const resultPost = await responsePost.json();
    return resultPost;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

postData(`${wordpressBaseUrl}/wp-json/wp/v2/posts?categories=6&_embed=1`)
  .then((data) => {
    if (!data || !Array.isArray(data)) return;

    // promotions general page
    const organizedPosts = [...data].reverse();
    const areWeInMainPromoPage =
      document.querySelectorAll("#feature-1-active").length;

    if (!!areWeInMainPromoPage) {
      for (let post = 0; post <= organizedPosts.length - 1; ++post) {
        if (document.getElementById(`promotion-${post}-container`)) {
          document.getElementById(`promotion-${post}-container`).style.display =
            "flex";
        }

        const parser = new DOMParser();
        const dataContent = organizedPosts[post].content.rendered;
        const featuredTitle = organizedPosts[post].title.rendered;
        const doc = parser.parseFromString(dataContent, "text/html");

        const featuredImage =
          organizedPosts[post]._embedded?.["wp:featuredmedia"]?.[0];

        const featuredImgAlt = featuredImage?.alt_text ?? "";
        const featuredImgCaption = featuredImage?.caption?.rendered ?? "";
        const featuredDescription = featuredImage?.description?.rendered ?? "";
        const featuredImgUrl = featuredImage?.source_url ?? "";

        if (document.getElementById(`promo-${post}-title`)) {
          document.getElementById(`promo-${post}-title`).innerHTML =
            featuredTitle;
        }

        if (document.getElementById(`featured-${post}-caption`)) {
          document.getElementById(`featured-${post}-caption`).innerHTML =
            featuredImgCaption;
        }

        if (document.getElementById(`promo-${post}-alt`)) {
          document.getElementById(`promo-${post}-alt`).innerHTML =
            featuredImgAlt;
        }

        if (document.getElementById(`featured-${post}-description`)) {
          document.getElementById(`featured-${post}-description`).innerHTML =
            featuredDescription;
        }

        if (
          featuredImgUrl &&
          document.getElementById(`featured-${post}-promotion-img`)
        ) {
          document
            .getElementById(`featured-${post}-promotion-img`)
            .setAttribute("src", featuredImgUrl);
        }

        // FIX: use organizedPosts[post].id, not data[post].id
        const postId = organizedPosts[post].id;

        if (document.querySelector(`#go-to-promo-${post}`)) {
          document.querySelector(`#go-to-promo-${post}`).dataset.apiLink =
            postId;
        }

        const promoUrl = `/promotions/promo-${postId}/index.html`;
        console.log(promoUrl);

        const link = document.getElementById(`go-to-promo-${post}`);
        if (link) {
          link.href = promoUrl;
        }
      }
    }

    // promotion 1
    const areWeInPromotionOne = document.querySelectorAll(
      "#promotion-1-active",
    ).length;

    if (!!areWeInPromotionOne) {
      const url = new URL(window.location.href).pathname;

      // FIX: safe regex match
      const match = url.match(/promo-(\d+)/);
      if (!match) {
        console.error("Could not extract promo ID from URL:", url);
        return;
      }

      const getPostId = match[1];

      postData(
        `${wordpressBaseUrl}/wp-json/wp/v2/posts/${getPostId}?_embed=1`,
      ).then((post) => {
        if (!post) return;

        const imgUrls = [];
        const parser = new DOMParser();
        const dataContent = post.content.rendered;
        const doc = parser.parseFromString(dataContent, "text/html");

        const paragraphs = [...doc.querySelectorAll("p")].map((p) =>
          p.textContent.trim(),
        );

        const listItems = [...doc.querySelectorAll("li")].map((li) =>
          li.textContent.trim(),
        );

        doc.querySelectorAll("img").forEach((img) => imgUrls.push(img.src));

        const promotionOneLeft = imgUrls[0] ?? "";
        const promotionOneRight = imgUrls[1] ?? "";
        const featuredTitle = post.title.rendered ?? "";

        if (document.getElementById("promotion-1-left") && promotionOneLeft) {
          document
            .getElementById("promotion-1-left")
            .setAttribute("src", promotionOneLeft);
        }

        if (document.getElementById("promotion-1-right") && promotionOneRight) {
          document
            .getElementById("promotion-1-right")
            .setAttribute("src", promotionOneRight);
        }

        if (document.getElementById("promo-featured-title")) {
          document.getElementById("promo-featured-title").innerHTML =
            featuredTitle;
        }

        if (document.getElementById("promo-1-upper-text")) {
          document.getElementById("promo-1-upper-text").innerHTML =
            paragraphs[0] ?? "";
        }

        if (document.getElementById("promo-1-offers-deadline")) {
          document.getElementById("promo-1-offers-deadline").innerHTML =
            paragraphs[2] ?? "";
        }

        if (document.getElementById("promo-1-bottom-text")) {
          document.getElementById("promo-1-bottom-text").innerHTML =
            paragraphs[1] ?? "";
        }

        if (document.getElementById("promo-1-offers-list-title")) {
          document.getElementById("promo-1-offers-list-title").innerHTML =
            paragraphs[3] ?? "";
        }

        if (document.getElementById("promo-1-additional-inclusions")) {
          document.getElementById("promo-1-additional-inclusions").innerHTML =
            paragraphs[4] ?? "";
        }

        if (document.getElementById("promo-1-terms")) {
          document.getElementById("promo-1-terms").innerHTML =
            paragraphs[5] ?? "";
        }

        const promoOneListWrapper = document.getElementById("promo-1-list");
        if (promoOneListWrapper) {
          for (let i = 0; i < listItems.length; ++i) {
            promoOneListWrapper.appendChild(
              document.createElement("li"),
            ).innerHTML = listItems[i];
          }
        }
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });
