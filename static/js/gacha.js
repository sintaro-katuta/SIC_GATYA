const submit_btn = document.querySelector('#submit-btn');
const gatya_form = document.querySelector('#gatya-form');
const gatya_content = document.querySelector('#gatya-content');
const gatya_tabel = document.querySelector('#gatya-table');
const remove = document.querySelectorAll('.remove');
const probability = Array.from(document.querySelectorAll(".probability"));
let probability_total = document.querySelector('.probability-total');
let count = 1;

gatya_form.addEventListener('submit', (element) =>{
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
    new_th.innerHTML = count;

    count++;

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
    new_input.setAttribute('oninput','show_probability(this);');
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

    probability_text.forEach((pt,index) => {
        pt.innerHTML = probability[index].value + "%";
    });

    probability_total.innerHTML = "(合計:" + total_probability() + "%)";

    gatya_content.value = "";

});

probability.forEach((p,index) =>{
    console.log(p)
    p.addEventListener('change',element => {
        element[index].innerHTML = p.value + "%";
    })
})

function show_probability(element) {
    element.nextElementSibling.innerHTML = element.value + "%";
    probability_total.innerHTML = "(合計:" + total_probability() + "%)";
}

function show_gatya_number() {
    const gatya_number = Array.from(document.querySelectorAll('.gatya-number'));
    gatya_number.forEach((gn,index) => {
        gn.innerHTML = index+1;
    })
}

function total_probability() {
    const probability = Array.from(document.querySelectorAll('.probability'));
    let total = probability.reduce((sum,i) => sum + parseInt(i.value),0);
    return total;
}

function add_gatya(){
    if(total_probability() > 100){
        alert("確率が100%以上です。");
    }else if(total_probability() < 100){
        alert("確率が100%以下です。");
    }else{
        const gatya_name = Array.from(document.querySelectorAll('.gatya-name'));
        console.log(total_probability());
        gatya_name.forEach((gn,index) => {

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
    while(table_body.firstChild){
        table_body.removeChild(table_body.firstChild);
    }
}