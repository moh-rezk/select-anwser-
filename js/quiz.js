
import { Finish } from "./finish.js";
export class Quiz {


    constructor(data, numberOfQuestion) {

        this.numberOfQuestions=numberOfQuestion;
        this.data=data;
        this.totalAmount = document.getElementById('totalAmount');
        this.getUserAnswer=document.getElementsByName('answer');
        this.question = document.getElementById('question');
        this.rowAnswer = document.getElementById('rowAnswer');
        this.nextBtn = document.getElementById('next');
        this.current=document.getElementById('current');
        this.curretQuestion=0;
        this.score=0;
        
        this.nextBtn.addEventListener("click",this.nextQuestion.bind(this));
       
       this.showQuestion();
    }


    nextQuestion(){
       
        
        let userAnswers=[...this.getUserAnswer].filter(e=>e.checked);
        if(userAnswers<1){
            $('.alert').fadeIn(500);
        }else{
            let userCheckedAnswer= this.chechedAnswer(userAnswers[0].value);
           if (userCheckedAnswer){
            $('#Correct').fadeIn(1000,()=>this.displayOff());
             this.score++  ;
          }else{
              $('#inCorrect').fadeIn(1000,()=>this.displayOff());
          }
           
            this.curretQuestion++;
            (this.curretQuestion<this.numberOfQuestions)? this.showQuestion():this.finish();

        }
       
        
       
        
    }
    showQuestion(){

        this.question.innerHTML=this.data[this.curretQuestion].question;
        this.totalAmount.innerHTML=this.numberOfQuestions;
        this.current.innerHTML=this.curretQuestion+1;
        this.showAnswer(this.curretQuestion);

    }

  
    displayOff(){
        $('#inCorrect').fadeOut(1000);
        $('#Correct').fadeOut(1000);

    }

    showAnswer(QuestionNumber){

        let correct_answer=this.data[QuestionNumber].correct_answer;
        let incorrect_answers=this.data[QuestionNumber].incorrect_answers;
        let allAnswer=[correct_answer,...incorrect_answers];
       

        let ranNums = [];
        let i = allAnswer.length;
        let j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(allAnswer[j]);
           allAnswer.splice(j,1);

        }

       
     
        let cartona=``;
        for (let i = 0; i < ranNums.length; i++) {
           cartona+=` <div>
           <input class="form-check-input" type="radio" name="answer" value="${ranNums[i]}" id="flexRadioDefault1">
           <label class="form-check-label" for="flexRadioDefault1">
             ${ranNums[i]}
           </label>
           </div>`
            
        }
        this.rowAnswer.innerHTML=cartona;



    }

    chechedAnswer(checkedAnswer){

        let correct;
        if (this.data[this.curretQuestion].correct_answer==checkedAnswer) {
            correct=true;
            
        }else{
            correct=false;
        }

        return correct;
    }



    finish(){

      $('#quiz').fadeOut(1000,()=>{
        $('#finish').fadeIn(1000);
        new Finish(this.score)
      });

    }
}