class Search {
    searchIndex = [];
    isSearchIndexReady = false;
    emptyElement = document.createElement("div");

    constructor() {
        {
            this.emptyElement.classList.add("flex","flex-col", "center");
            const icon = document.createElement("div");
            const content = document.createElement("div");

            icon.classList.add("icon", "icon-empty", "h-20", "w-20");
            content.classList.add("fs-large")
            content.innerText = "什么都没找到 :(";

            this.emptyElement.appendChild(icon);
            this.emptyElement.appendChild(content);
        }
        fetch("/api/v2/search")
            .then(async response => {
                if (!response.ok) {
                    document.getElementById("search-value").innerText = "啊哦，加载失败了。刷新试试吧。";
                }
                this.searchIndex = await response.json();
                this.isSearchIndexReady = true;
                this.updateSearch();
            });
    }

    updateSearch() {
        if (!this.isSearchIndexReady) {
            return;
        }
        const urlParams = new URLSearchParams(location.search);
        const keyword =
            Array.from(
                new Intl.Segmenter("zh", { granularity: "word" })
                    .segment(urlParams.get("q").toLowerCase())
            )
                .filter(item => item.isWordLike)
                .map(item => item.segment);

        let resId = [];
        let res = [];

        function push(fish) {
            if (resId.indexOf(fish.id) === -1) {
                resId.push(fish.id);
                res.push(fish);
            }
        }

        for (const fish of this.searchIndex) {
            for (const keywordElement of keyword) {
                if (fish.name.toLowerCase().includes(keywordElement)) {
                    push(fish);
                }
            }
        }
        for (const fish of this.searchIndex) {
            if (fish.id in resId) {
                continue;
            }
            for (const keywordElement of keyword) {
                for (const tag of fish.tags) {
                    if (tag.includes(keywordElement)) {
                        push(fish);
                        break;
                    }
                }
            }
        }
        for (const fish of this.searchIndex) {
            if (fish.id in resId) {
                continue;
            }
            for (const keywordElement of keyword) {
                if (fish.content.includes(keywordElement)) {
                    push(fish);
                    break;
                }
            }
        }
        this.outputSearchResult(res);
    }

    elementCache = {};

    toElement(fish) {
        {
            const cache = this.elementCache?.[fish.id];
            if (cache) {
                return cache;
            }
        }
        const box = document.createElement("div");

        const titleLink = document.createElement("a");
        const title = document.createElement("h3");
        const descriptionLink = document.createElement("a");
        const description = document.createElement("div");

        box.classList.add("mb-6", "min-h-[3.5rem]", "md:min-h-[5rem]", "p-2");
        title.classList.add("fs-medium", "md:fs-x-large", "font-bold", "text-font-black", "dark:text-font-light", "link-hover");
        description.classList.add("fs-x-small", "line-h-4", "md:line-h-6", "md:fs-medium", "max-h-8", "md:max-h-12", "w-auto", "overflow-y-hidden", "overflow-ellipsis", "text-font-lighter-black", "dark:text-font-darker-light", "link-hover");

        title.innerText = fish.name;
        descriptionLink.innerText = fish.description;

        titleLink.href = `/fish/${fish.id}/`;
        titleLink.target = `_blank`;
        descriptionLink.href = `/fish/${fish.id}/`;
        descriptionLink.target = `_blank`;

        titleLink.appendChild(title);
        descriptionLink.appendChild(description);

        box.appendChild(titleLink);
        box.appendChild(descriptionLink);

        this.elementCache[fish.id] = box;

        return box;
    }

    outputSearchResult(result) {
        const searchValue = document.getElementById("search-value");
        searchValue.innerHTML = "";
        if (result.length === 0) {
            searchValue.appendChild(this.emptyElement);
        } else {
            for (const resultElement of result) {
                searchValue.appendChild(this.toElement(resultElement));
            }
        }
    }
}

const searchInstance = new Search();

function initSearch() {
    const searchBox = document.getElementById("search");

    searchBox.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            search();
        }
    });

    const urlParams = new URLSearchParams(location.search);
    searchBox.value = urlParams.get("q");

    window.addEventListener("popstate", function() {
        const urlParams = new URLSearchParams(location.search);
        searchBox.value = urlParams.get("q");
        searchInstance.updateSearch();
    });
}

function search() {
    const searchBox = document.getElementById("search");
    const param = {
        q: searchBox.value
    };
    const pageUrl = "?" + new URLSearchParams(param).toString();
    window.history.pushState("", "", pageUrl);

    searchInstance.updateSearch();
}

