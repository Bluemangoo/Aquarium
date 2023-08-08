function renderMarkdown() {
    const markdownDivs = document.querySelectorAll("div.markdown");
    markdownDivs.forEach((div) => {

        //h2
        const h2Elements = div.querySelectorAll("h2");
        h2Elements.forEach((h2) => {
            h2.classList.add("fs-xx-large");
            h2.insertAdjacentElement("afterend", document.createElement("hr"));
        });

    });
}