
var CalculatorViewModel = function() {

    this.calculatorDisplay = ko.observable(""); 
    
    this.updateCalculatorDisplay = function(value) {
      this.calculatorDisplay(this.calculatorDisplay()+value); 
      console.log((this.calculatorDisplay()+value));
    };
    this.operatorDisplay=function(value)
    {
      if(this.calculatorDisplay()=="" || this.calculatorDisplay()+ value + value )
      alert("enter the value")
      else
      this.calculatorDisplay(this.calculatorDisplay()+"");    
    }  
    
    this.clearDisplay = function() {
      this.calculatorDisplay(""); 
    }
    
    this.backspace = function() {
      if (this.calculatorDisplay().length) {
        this.calculatorDisplay(this.calculatorDisplay().substring(0,this.calculatorDisplay().length-1)); 
      }
    }
    
      this.evaluateDisplay = function() {
        this.calculatorDisplay(eval(this.calculatorDisplay()).toString()); 
      }
    }
    $(document).ready(function () {
      $("#input").keypress(function (e) {
        var keyCode = e.which;
        if ((keyCode < 47 || keyCode > 58)) {
             return false;
        }
   });
   
});
      
  ko.applyBindings(new CalculatorViewModel()); 
  