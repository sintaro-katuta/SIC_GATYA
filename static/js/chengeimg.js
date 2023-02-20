

const imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = './static/img/monst.png';

imgArray[1] = new Image();
imgArray[1].src = './static/img/gachagacha.png';




function nextImage(){
    const img = document.getElementById(".arrow-left");
    for(var i = 0; i < imgArray.length;i++){
        if(imgArray[i].src == img.src){
            if(i === imgArray.length){
                document.getElementById("mainImage").src = imgArray[0].src;
                break;
            }
            document.getElementById("mainImage").src = imgArray[i+1].src;
            break;
        }
    }
}

function previousImage(){
    const img = document.getElementById(".arrow-right");
    for(var i = imgArray.length-1; i >=0 ;i--){
        if(imgArray[i].src == img.src){
            if(i === imgArray.length){
                document.getElementById("mainImage").src = imgArray[4].src;
                break;
            }
            document.getElementById("mainImage").src = imgArray[i-1].src;
            break;
        }
    }
}

