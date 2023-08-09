const bannerTexts = [
    "招人画图标，提PR可得贡献者哦。",
    "广告位招租",
    "有问题去 GitHub 提 issue 哦。",
    "不点个 star 再走吗？ (可怜脸)",
    "喜欢就推荐给别人吧！"
];

function renderBanner() {
    document.getElementById("banner-text").innerHTML = bannerTexts.sample();
}