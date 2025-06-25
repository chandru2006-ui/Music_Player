
const Maincontant = () => {
  function evennumber()
  {
    let start=parseInt(window.prompt("Enter the First Number :"));
    let end=parseInt(window.prompt("Enter the Second Number :"));
    let i;
    for(i=start;i<=end;i++)
    {
      if(i%2===0)
      {
        alert("Even Number :"+i);
      }
    }
    
  }
  const click=(e)=>{
        alert(e.target.Textcontant);//return the name of the  HTML element
    }
  const findme=(name)=>{
       alert("i am "+name);
  }
  return (
    <div className="Mainstyle">
        <main>
            Welcome to My page!
            <br /><br />
            <button onClick={evennumber}>even number</button>
            <br /><br />
            <button onClick={(e)=>click(e)}>Click me</button>
             <br /><br />
            <button onClick={()=>{findme("chandru")}}>Find me</button>
        </main>
    </div>
  )
}

export default Maincontant