const bannerTexts = [
    "广告位招租",
    "有问题去 GitHub 提 issue 哦。",
    "不点个 star 再走吗？ (可怜脸)",
    "喜欢就推荐给别人吧！",
    "还喜欢什么可以提 PR 的。",
    "装新机就喜欢这样的站。",
    "你也想在这里写点东西？提 PR 吧！"
];

function initBanner() {
    document.getElementById("banner-text").innerHTML = bannerTexts.sample();
}