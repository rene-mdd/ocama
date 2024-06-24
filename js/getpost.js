async function getPosts() {
    const response = await fetch("http://ocama.docksal.site/wp-json");
    console.log(response)
    const movies = await response.json();
    console.log(movies);
  }getPosts()