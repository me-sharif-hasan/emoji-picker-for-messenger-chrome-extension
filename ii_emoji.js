let flag = false;
let emoji_insert = (html) => {
    document.querySelectorAll('title').forEach((t) => {
        console.log("ii emoji loaded", t);
        if (t.innerHTML === "Profile photo") {
            flag = true;
            let holder = t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

            //console.log(html)
            holder.innerHTML += html;
            load_all();
        }
    })
}

const url = chrome.runtime.getURL('data/emoji.html');

fetch(url).then(response => response.text())
    .then(data => {
        window.onload = ()=>{
            emoji_insert(data);
        };
        window.onclick = () => {
            console.log(document.getElementById("ii_emoji"));
            if (!flag||document.getElementById("ii_emoji")===null) {
                console.log(flag);
                emoji_insert(data);
            }

        }
    })
function copyDivToClipboard(e) {
    var range = document.createRange();
    range.selectNode(e.target);
    console.log(e)
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}
let load_all=()=>
{
    document.querySelectorAll(".tox-collection__item").forEach((elm) => {
        elm.onclick = (e) => {
            console.log(e.target.innerText);
            copyDivToClipboard(e);
        }
    });
}