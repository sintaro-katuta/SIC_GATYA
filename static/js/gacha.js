const submit_btn = document.querySelector('#submit-btn');
const gatya_form = document.querySelector('#gatya-form');
const gatya_content = document.querySelector('#gatya-content');
const gatya_tabel = document.querySelector('#gatya-table');
const remove = document.querySelectorAll('.remove');
const probability = Array.from(document.querySelectorAll(".probability"));


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


function remove_element(element) {
    element.parentElement.parentElement.remove();
}

function show_probability(element) {
    element.parentElement.nextElementSibling.innerHTML = element.value + "%";
}

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.fillRect(100,250,150,50);
var degree = 0;

function spin(){
    for(let i=0;i<5;i++){
        window.setTimeout(function() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            //ctx.save();
                ctx.beginPath();
            // ctx.translate(canvas.width/2,canvas.height/2);
                ctx.translate(canvas.width/2.35,canvas.height/1.45);
                //ctx.rotate(Math.PI /180);
                ctx.rotate(45*Math.PI /360);
                ctx.translate(-canvas.width/2.35, -canvas.height/1.45);
                ctx.fillRect(100,250,150,50);   

        },10);
        
    }

    ctx.restore();

//    requestAnimationFrame(spin)
 
};
canvas.addEventListener('click',(e)=>{

    spin();
});

//canvas
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext('2d');

// ctx.fillRect(100,250,150,50);
// var degree = 0;

// function spin(){
// setInterval( function(){
//     ctx.save();

//     ctx.beginPath();
//     ctx.clearRect(0,0,canvas.width,canvas.height);

//     // ctx.translate(canvas.width/2,canvas.height/2);
//     ctx.translate(canvas.width/2.35,canvas.height/1.45);
//     ctx.rotate(++degree * Math.PI /180);
//     ctx.translate(-canvas.width/2.35, -canvas.height/1.45);

//     ctx.fillRect(100,250,150,50);

//     ctx.restore();
 
// },25);
// }
// canvas.addEventListener('click',(e)=>{
//     spin();
// });
