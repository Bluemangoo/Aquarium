function renderMarkdown() {
    const markdownDivs = document.querySelectorAll("div.markdown");
    markdownDivs.forEach((div) => {

        //h2
        const h2Elements = div.querySelectorAll("h2");
        h2Elements.forEach((e) => {
            e.insertAdjacentElement("afterend", document.createElement("hr"));
        });

    });
}