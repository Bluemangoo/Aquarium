import { Fish } from "../../../types/fish";

const sub=new Fish("cloud-music",["cloudmusic","wangyiyunyinyue"])

sub.getUrl=async function(query){
    return "https//music.163.com/api/pc/package/download/latest"
}