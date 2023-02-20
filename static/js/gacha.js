const submit_btn = document.querySelector('#submit-btn');
const gatya_form = document.querySelector('#gatya-form');
const gatya_content = document.querySelector('#gatya-content');
const gatya_tabel = document.querySelector('#gatya-table');
const remove = document.querySelectorAll('.remove');
const probability = Array.from(document.querySelectorAll(".probability"));
let count = 0;


gatya_form.addEventListener('submit', (element) =>{
    element.stopPropagation();
    element.preventDefault();
    const new_tr = document.createElement('tr');
    const new_td1 = document.createElement('td');
    const new_td2 = document.createElement('td');
    const new_td3 = document.createElement('td');
    const new_td4 = document.createElement('td');
    const new_icon = document.createElement('i');
    const new_text = document.createElement('p');
    const new_input = document.createElement('input');

    const new_probability = document.createElement('span');

    new_text.innerHTML = gatya_content.value;
    new_text.className = 'm-0 text-break';
    new_text.style = "white-space: normal;"

    new_icon.className = "remove bi bi-x-circle";
    new_icon.style = "cursor:pointer;"
    new_icon.setAttribute('onclick', 'remove_element(this)');

    new_input.type = 'range';
    new_input.min = 0;
    new_input.max = 100;
    new_input.step = 1;
    new_input.value = 100;
    new_input.setAttribute('oninput','show_probability(this);');
    new_input.className = 'probability p-0 mx-2';

    new_probability.className = 'probability_text';

    new_td1.appendChild(new_text);
    new_td2.appendChild(new_input);
    new_td3.appendChild(new_probability);
    new_td4.appendChild(new_icon);
    new_tr.appendChild(new_td1);
    new_tr.appendChild(new_td2);
    new_tr.appendChild(new_td3);
    new_tr.appendChild(new_td4);
    gatya_tabel.appendChild(new_tr);

    let average;
    const probability = Array.from(document.querySelectorAll(".probability"));
    const probability_text = Array.from(document.querySelectorAll(".probability_text"));

    probability.forEach((p) => {
        average = 100 / probability.length;
        p.value = Math.round(average);
        console.log(p);
    });


    console.log(probability_text);
    probability_text.forEach(pt => {
        console.log(pt);
        pt.innerHTML = average + "%";
    })
});

probability.forEach((p,index) =>{
    console.log(p)
    p.addEventListener('change',element => {
        element[index].innerHTML = p.value + "%";
    })
})

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 棒の色が変わらないので円を最初に描画

// 回す所の円を描画
ctx.beginPath();
ctx.arc( 150, 300, 80, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
ctx.fillStyle = "#c9caca";
ctx.fill();
ctx.stroke();

// 円の中の棒を描画
ctx.beginPath();
ctx.rect(70, 290, 160, 20 );
ctx.fillStyle = "#fff";
ctx.fill();
ctx.stroke();

// 上部のカプセルの枠を描画
createRoundRect(ctx, 30, 30, 350, 150, 20);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.stroke();

// 下部のカプセルの出口を描画
createRoundRect(ctx, 280, 350, 100, 100, 20);
ctx.fillStyle = "#333";
ctx.fill();
ctx.stroke();


let degree = [15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360];// 角度の配列

function spin(){
    window.setTimeout(function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // 中央からランダムに回転
        ctx.beginPath();
        ctx.translate(150,300);// ctx.translate(x,y) は ctx.arc(x,y)と同じ値
        ctx.rotate(degree[Math.floor(Math.random()*degree.length)]*Math.PI / 360);
        ctx.translate(-150,-300);

        // 回す所の円を描画
        ctx.arc( 150, 300, 80, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
        ctx.fillStyle = "#c9caca";
        ctx.fill();
        ctx.stroke();

        // 円の中の棒を描画
        ctx.beginPath();
        ctx.rect(70, 290, 160, 20 );
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();

        // 位置と回転をリセット
        ctx.setTransform(1,0,0,1,0,0);

        // 上部のカプセルの枠を描画
        createRoundRect(ctx, 30, 30, 350, 150, 20);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();
        
        // 下部のカプセルの出口を描画
        createRoundRect(ctx, 280, 350, 100, 100, 20);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.stroke();

    },500);
    ctx.restore();
};

canvas.addEventListener('click',(e)=>{
    // マウスの座標をCanvas内の座標とあわせるため
    const rect = canvas.getBoundingClientRect();
    const point = {
        x:e.clientX - rect.left,
        y:e.clientY - rect.top
    };
    //クリック判定処理
    const square = {
        x:150,y:300,
        r:80
    };

    const hit =
        Math.pow(square.x - point.x, 2) + Math.pow(square.y - point.y, 2) <= Math.pow(square.r, 2);

    if (hit){
        // 二回クリックしたら画面遷移
        if(count < 2){
            for(let i=0;i<50;i++){
                spin();
            }
        }else{
            //alert("!!!!");
        }
        count++;// クリックしたカウント
    }
});

function remove_element(element) {
    element.parentElement.parentElement.remove();
}

function show_probability(element) {
    element.parentElement.nextElementSibling.innerHTML = element.value + "%";
}

function createRoundRect(context, x, y, width, height, radius){
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
