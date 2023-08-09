import { Fish } from "../../types/fish";
import bucket from "../bucket";
import { SourceTag } from "../../types/sourceTag";

const sub = new Fish("chrome", ["google-chrome", "googlechrome"]);

sub.getUrl = async function(query) {
    return "https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B560FED26-DDD1-19D9-0338-73CA62762D2E%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe";
};

sub.sources["google"] = new SourceTag("Google", {
    official: true,
    web: true
});

bucket.add(sub);