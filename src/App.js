import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props) {
  return (
    <div className="App">
        <p>{props.value}</p>
    </div>
  );
}

function Button(props) {
  return (
  <button onClick={props.click}>{props.text}</button>
  );
}

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: "",
      previous:'',
      operat:"",
      operation:" ",
      bolVirgula: false,
      listaMem: []
    };
    this.addNumber = this.addNumber.bind(this);
    this.compute = this.compute.bind(this);
    this.igual = this.igual.bind(this);
    this.apagaTudo= this.apagaTudo.bind(this);
    this.apagaCurrent= this.apagaCurrent.bind(this);
    this.addMem= this.addMem.bind(this);
    this.recupMem= this.recupMem.bind(this);
    this.apagaTudoMem= this.apagaTudoMem.bind(this);
    this.apagaUltimoMem= this.apagaUltimoMem.bind(this);
    this.somaTopoMem= this.somaTopoMem.bind(this);
    this.apagaUmMem= this.apagaUmMem.bind(this);
    this.recebeUmMem= this.recebeUmMem.bind(this);
    }



  addNumber(number) {
    const { bolVirgula} = this.state
    if (number !== ".") {
      this.setState({
        currentOperand: this.state.currentOperand + number
      })
    } else if (number === "." & bolVirgula===false) {
      this.setState({
        currentOperand: this.state.currentOperand + number,
        bolVirgula: true
      })
    } else if (number === "." & bolVirgula===true) {
      this.setState({
        currentOperand: this.state.currentOperand + "",
      })
    }
  }
    apagaTudo() {
      this.setState(
        {
          currentOperand: '',
          previous:'',
          operation:"",
          bolVirgula: false

        }
      );
    }

  
    apagaCurrent() {
      this.setState(
        {
          currentOperand: '',
          bolVirgula: false
        }
      );
    }
  igual() {
    this.setState( (state) =>{
        let ig;
        const {previous, currentOperand, operation} = state;
        const prev = parseFloat(previous);
        const cur = parseFloat(currentOperand);
        switch(operation) {
          case "+":
            ig=prev+cur;
            break;
          case "-":
            ig=prev-cur;
            break;
          case "/":
            ig=prev/cur;
            break;
          case "*":
            ig=prev*cur;
            break;
          default:
            return;
        }
        return{
          currentOperand: ig,
          previous:'',
          operation:"",
        }
      }
    );
    this.setState(
      {
        bolVirgula: false
      }
      );
  }
  addMem() {
    console.log(this.state.listaMem)
    this.setState((state) => {
      const {currentOperand, listaMem} = state;
      const lista = listaMem.slice();
      const cur = parseFloat(currentOperand);
      lista.unshift(cur)
      return{
        listaMem: lista
      }
    }
    );
  }

  recupMem(){
    this.setState((state) => {
      const {listaMem} = state;
      const primeiro =listaMem.slice(0)[0];
      return{
        currentOperand: parseFloat(primeiro)
      }
    }
    );
  }

  apagaTudoMem(){
    this.setState(
      {
        listaMem: []
      }
    );
  }

  apagaUltimoMem(){
    this.setState((state) => {
    const {listaMem} = state;
    const lista = listaMem.slice();
    lista.pop();
    return{
      listaMem: lista
    }
    }
    );
  }

  somaTopoMem(){
    this.setState((state) => {
      const {currentOperand,listaMem} = state;
      const lista = listaMem.slice();
      const topo = listaMem.slice(0)[0] + parseFloat(currentOperand);
      lista.shift();
      lista.unshift(topo);
      return{
        listaMem: lista
      }
    }
    );
  }

  apagaUmMem(el){
    this.setState((state) => {
      const {listaMem} = state;
      const pilha = listaMem.slice()
      pilha.splice(pilha.indexOf(el), 1);
      return{
        listaMem: pilha
      }
    }
    );
  }
  
  recebeUmMem(el){
    this.setState( 
      {
        currentOperand: el
      }
    );
  }


  compute(num_at,operat) {
    this.setState(
      {
        currentOperand: '',
        previous:num_at+operat,
        operation:operat ,
        bolVirgula: false
      }
      );
    }

  render() {
  return (
    <div className="App">
      <h1 class="head"> Calculadora </h1>
        <div class="display">
          <h3 class="previous"><Display value={this.state.previous}/></h3>
          <h1 class="current"><Display value={this.state.currentOperand}/></h1>
        </div>
        <div class="corpo">
          <div class="buttons">
            <Button text="1" click={() => this.addNumber('1')}/>
            <Button text="2" click={() => this.addNumber('2')}/>
            <Button text="3" click={() => this.addNumber('3')}/>
            <Button text="4" click={() => this.addNumber('4')}/>
            <Button text="5" click={() => this.addNumber('5')}/>
            <Button text="6" click={() => this.addNumber('6')}/>
            <Button text="7" click={() => this.addNumber('7')}/>
            <Button text="8" click={() => this.addNumber('8')}/>
            <Button text="9" click={() => this.addNumber('9')}/>
            <Button text="0" click={() => this.addNumber('0')}/>
            <Button text="." click={() => this.addNumber(".")}/>
            <Button text="CE" click={() => this.apagaCurrent()}/>
            <Button text="-" click={() => this.compute(this.state.currentOperand,'-')}/>
            <Button text="+" click={() => this.compute(this.state.currentOperand,'+')} />
            <Button text="/" click={() => this.compute(this.state.currentOperand,'/')}/>
            <Button text="*" click={() => this.compute(this.state.currentOperand,'*')}/>
            <Button text="=" click={() => this.igual(this.state.currentOperand,this.state.previous,this.state.operation)}/>
            <Button text="C" click={() => this.apagaTudo()}/>
            <Button text="ME" click={() => this.addMem()}/>
            <Button text="MR" click={() => this.recupMem()}/>
            <Button text="MA" click={() => this.apagaTudoMem()}/>
            <Button text="MU" click={() => this.apagaUltimoMem()}/>
            <Button text="M+" click={() => this.somaTopoMem()}/>
          </div>
          <div class="lista">
            <h3> Memória </h3>
            {
                this.state.listaMem.map(
                  (el) =>
                  <div class="listaDisplay"> 
                    <Button text="MC" click={() => this.apagaUmMem(el)}/> 
                    {el} 
                    <Button text="MR" click={() => this.recebeUmMem(el)}/> 
                  </div>

                )
              }
          </div>
        </div>
      </div>
  );
  }
}

export default App;
