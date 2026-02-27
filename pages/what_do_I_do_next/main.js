function slowScroll(id) {
    document.querySelector(id).scrollIntoView({
        behavior: "smooth"
    });
}