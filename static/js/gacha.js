const submit_btn = document.querySelector('#submit-btn');
const gatya_form = document.querySelector('#gatya-form');
const gatya_content = document.querySelector('#gatya-content');
const gatya_tabel = document.querySelector('#gatya-table');
const remove = document.querySelectorAll('.remove');
const probability = Array.from(document.querySelectorAll(".probability"));

//いろ　赤　黄色　マゼンタ　青　
const randColor = ['FF0000','FFFF00','FF00FF','0000FF','2E8B57'];
//ガチャカプセル色ランダム
var ResultColor = Math.floor(Math.random()*randColor.length);
var InsideColor = Math.floor(Math.random()*randColor.length);
console.log(randColor[ResultColor])

let probability_total = document.querySelector('.probability-total');
let click_count = 0;
let gatya_number = 1;



gatya_form.addEventListener('submit', (element) => {
    element.stopPropagation();
    element.preventDefault();
    const new_tr = document.createElement('tr');
    const new_th = document.createElement('th');
    const new_td1 = document.createElement('td');
    const new_td2 = document.createElement('td');
    const new_icon = document.createElement('i');
    const new_text = document.createElement('p');
    const new_input = document.createElement('input');
    const new_probability = document.createElement('span');

    new_th.className = "gatya-number";
    new_th.scope = "row";
    new_th.innerHTML = gatya_number;

    //ガチャの数
    gatya_number++;


    new_text.innerHTML = gatya_content.value;
    new_text.className = 'gatya-name m-0 text-center';
    new_text.style = "white-space: normal;"

    new_icon.className = "remove ms-5 bi bi-x-circle";
    new_icon.style = "cursor:pointer;"
    new_icon.setAttribute('onclick', 'remove_element(this)');

    new_input.type = 'range';
    new_input.min = 1;
    new_input.max = 100;
    new_input.step = 1;
    new_input.value = 50;
    new_input.setAttribute('oninput', 'show_probability(this);');
    new_input.className = 'probability p-0 mx-2';

    new_probability.className = 'probability_text w-auto';

    new_td1.appendChild(new_text);
    new_td2.appendChild(new_input);
    new_td2.appendChild(new_probability);
    new_td2.appendChild(new_icon);
    new_tr.appendChild(new_th);
    new_tr.appendChild(new_td1);
    new_tr.appendChild(new_td2);
    gatya_tabel.appendChild(new_tr);

    show_gatya_number();

    const probability = Array.from(document.querySelectorAll(".probability"));
    const probability_text = Array.from(document.querySelectorAll(".probability_text"));

    probability_text.forEach((pt, index) => {
        pt.innerHTML = probability[index].value + "%";
    });

    probability_total.innerHTML = "(合計:" + total_probability() + "%)";

    gatya_content.value = "";

});

probability.forEach((p, index) => {
    console.log(p)
    p.addEventListener('change', element => {
        element[index].innerHTML = p.value + "%";
    })
});

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 棒の色が変わらないので円を最初に描画

// 回す所の円を描画
ctx.beginPath();
ctx.arc(150, 300, 80, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
ctx.fillStyle = "#c9caca";
ctx.fill();
ctx.stroke();

// 円の中の棒を描画
ctx.beginPath();
ctx.rect(70, 290, 160, 20);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.stroke();

// 上部のカプセルの枠を描画
createRoundRect(ctx, 30, 30, 350, 150, 20);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.stroke();

//InsideCapsule();

// 下部のカプセルの出口を描画
createRoundRect(ctx, 280, 350, 100, 100, 20);
ctx.fillStyle = "#333";
ctx.fill();
ctx.stroke();


let degree = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360];// 角度の配列

function spin() {
    window.setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 中央からランダムに回転
        ctx.beginPath();
        ctx.translate(150, 300);// ctx.translate(x,y) は ctx.arc(x,y)と同じ値
        ctx.rotate(degree[Math.floor(Math.random() * degree.length)] * Math.PI / 360);
        ctx.translate(-150, -300);

        // 回す所の円を描画
        ctx.arc(150, 300, 80, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
        ctx.fillStyle = "#c9caca";
        ctx.fill();
        ctx.stroke();

        // 円の中の棒を描画
        ctx.beginPath();
        ctx.rect(70, 290, 160, 20);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();

        // 位置と回転をリセット
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // 上部のカプセルの枠を描画
        createRoundRect(ctx, 30, 30, 350, 150, 20);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();

        //ガチャ中身
        //InsideCapsule();

        // 下部のカプセルの出口を描画
        createRoundRect(ctx, 280, 350, 100, 100, 20);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.stroke();

        if(click_count == 2){
            window.setTimeout(ResulltCapsule,500)
            //ResulltCapsule();
        }

    }, 500);
    ctx.restore();
};
canvas.addEventListener('click', (e) => {
    // マウスの座標をCanvas内の座標とあわせるため
    const rect = canvas.getBoundingClientRect();
    const point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
    //クリック判定処理
    const square = {
        x: 150, y: 300,
        r: 80
    };

    const hit =
        Math.pow(square.x - point.x, 2) + Math.pow(square.y - point.y, 2) <= Math.pow(square.r, 2);

    if (hit) {
        // 二回クリックしたら画面遷移
        if (click_count < 2) {
            for (let i = 0; i < 50; i++) {
                spin();
            }
        } else {
            //alert("!!!!");
        }
        click_count++;// クリックしたカウント
    }

});

function show_probability(element) {
    element.nextElementSibling.innerHTML = element.value + "%";
    probability_total.innerHTML = "(合計:" + total_probability() + "%)";
}

function show_gatya_number() {
    const gatya_number = Array.from(document.querySelectorAll('.gatya-number'));
    gatya_number.forEach((gn, index) => {
        gn.innerHTML = index + 1;
    })
}

function total_probability() {
    const probability = Array.from(document.querySelectorAll('.probability'));
    let total = probability.reduce((sum, i) => sum + parseInt(i.value), 0);
    return total;
}

function add_gatya() {
    if (total_probability() > 100) {
        alert("確率が100%以上です。");
    } else if (total_probability() < 100) {
        alert("確率が100%以下です。");
    } else {
        const gatya_name = Array.from(document.querySelectorAll('.gatya-name'));
        console.log(total_probability());
        gatya_name.forEach((gn, index) => {

        });
    }
}

function remove_element(element) {
    element.parentElement.parentElement.remove();
    show_gatya_number();
}

function all_remove() {
    count = 1;
    const table_body = document.querySelector("#gatya-table");
    probability_total.innerHTML = "";
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
}

function createRoundRect(context, x, y, width, height, radius) {
    ctx.beginPath();
    // 左上移動
    ctx.moveTo(x + radius, y);
    // 右上に繋がる線
    ctx.lineTo(x + width - radius, y);
    // 弧
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    // 右下に繋がる線
    ctx.lineTo(x + width, y + height - radius);
    // 弧
    ctx.arcTo(x + width, y + height, x + width - radius
        , y + height, radius);
    // 左下に繋がる線
    ctx.lineTo(x + radius, y + height);
    // 弧
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    // 右上に繋がる線
    ctx.lineTo(x, y + radius);
    // 弧
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
}

//結果用カプセル
function ResulltCapsule() {
    //カプセル描画
    ctx.beginPath();
    ctx.arc(330, 400, 40, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    ctx.fillStyle = "#"+ randColor[ResultColor];
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(330, 400, 40, 0 * Math.PI / 180, 180 * Math.PI / 180, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

}

// //ガチャ中身用カプセル
// function InsideCapsule(){
//     var RandWidth = Math.floor(Math.random()*230)+30;
//     var RandHeight = Math.floor(Math.random()*180)+30;
//      //カプセル描画
//      ctx.beginPath();
//      ctx.arc(RandWidth, RandHeight, 40, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
//      ctx.fillStyle = "#"+ randColor[InsideColor];
//      ctx.fill();
//      ctx.stroke();
 
//      ctx.beginPath();
//      ctx.arc(RandWidth, RandHeight, 40, 0 * Math.PI / 180, 180 * Math.PI / 180, false);
//      ctx.fillStyle = "white";
//      ctx.fill();
//      ctx.stroke();
// }
// function gatyaInside(){
//     if(gatya_number){
//         for(i = 0; i < gatya_number.length ; i++){
//             InsideCapsule(gatya_number.length);
//         }
//     }
// }


