import { Quiz} from "./quiz.js";
export class Settings{

    constructor(){

        this.categoryElement=document.getElementById('category');
        this.difficultyElement =document.getElementsByName('difficulty');
        this.numberOfQuestions=document.getElementById('numberOfQuestions');
        this.startBtn=document.getElementById('stratBtn');
        this.startBtn.addEventListener('click',this.start.bind(this));
    }




   async start(){

      let numberOfQuestion=this.numberOfQuestions.value;
      let category=this.categoryElement.value;
      let dificultyLevel=[...this.difficultyElement].filter(word=> word.checked);
      let dificultyLevelValue=dificultyLevel[0].value;

  



      let url = `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty=${dificultyLevelValue}`;
        
        let data=await this.fetchUrl(url);
        console.log(data);
        console.log(url)
        if(data.length>0){
            $('#setting').fadeOut(500,function() {
                $('#quiz').fadeIn(500)
            })
           new Quiz(data,numberOfQuestion)
            
    
    
        }

    }


    async fetchUrl(url){
        
        let fetchData=await fetch(url);
        let data= await fetchData.json();
        return data.results

    }
}