const num1Element=document.getElementById('num1') as number;
const num2Element=document.getElementById('num2') as number;
const button=document.querySelector('button')!;

const numResults:Array<number>=[];
const textResults:Array<string>=[];

type numOrString=number | string;
type Result={val:number,timeStamp:Date};
interface ResultObj{
    val:number;
    timeStamp:Date;
}

function add(num1: numOrString,num2:numOrString){
    if(typeof num1==='number' && typeof num2==='number'){
        return num1+num2;
    }
    else  if(typeof num1==='string' && typeof num2==='string'){
        return num1 +' '+num2;
    }
}
function printResult(resultObj:Result){
    console.log(resultObj.val)
}

button.addEventListener('click',()=>{
    const num1=num1Element.value;
    const num2=num2Element.value;
    const result=add(+num1,+num2);
    numResults.push(result as number);
    const stringResult=add(num1,num2);
    textResults.push(stringResult as string);
    printResult({val:result as number,timeStamp:new Date()})
    console.log(numResults,textResults)
})
const myPromise=new Promise<string>((resolve,reject)=>{
    setTimeout(()=>{
        resolve('it worked')
    },1000);

})
myPromise.then((result)=>{
    console.log(result.split(''))
});