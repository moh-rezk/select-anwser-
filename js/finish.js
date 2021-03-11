 export class Finish{
    constructor(score){
        this.secornumber=document.getElementById('score');
        this.tryBtn=document.getElementById('tryBtn');
        this.secornumber.innerHTML=score;
        this.tryBtn.addEventListener('click',this.tryAgain.bind(this));
       
    }
    tryAgain(){

        $('#finish').fadeOut(1000,()=>{
            $('#setting').fadeIn(1000);
           
          });
    }
    

}
