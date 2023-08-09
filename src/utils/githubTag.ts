import { SourceTag } from "../types/sourceTag";

export default function addGithubTag(sources: { [key: string]: SourceTag }) {
    sources["91chi"] = new SourceTag("91chi", {});
    sources["yanqishui"] = new SourceTag("yanqishui", {});
    sources["ghproxy"] = new SourceTag("GitHubProxy", {});
    sources["ghproxymirror"] = new SourceTag("GitHubProxyMirror", {});
    sources["fastgit"] = new SourceTag("FastGithub", {});
}