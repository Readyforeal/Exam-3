$(document).ready(function(){

    var numbers = [];
    numbers.length = 20;

    var companies = ["googl", "coke", "msft", "razff", "pep"];

    $("#btn-rand").on("click", function(){
        GenerateRandom();
    });

    $("#btn-even").on("click", function(){
        ShowEven();
    });

    $("#btn-odd").on("click", function(){
        ShowOdd();
    });

    $("#ajax").on("click", function(){
        AjaxStock();
    });

    $("#random-output").css('color', '#007bff');
    $("#even-output").css('color', '#28a745');
    $("#odd-output").css('color', '#dc3545');

    function GenerateRandom(){
        for(var i = 0; i < numbers.length; i++){
            numbers[i] = Math.floor(Math.random() * 10);
        }

        document.getElementById("random-output").innerHTML = numbers;
        document.getElementById("even-output").innerHTML = "";
        document.getElementById("odd-output").innerHTML = "";
    }

    function ShowEven(){
        var evenNumbers = [];

        for(var i = 0; i < numbers.length; i++){
            if(numbers[i] % 2 == 0){
                evenNumbers.push(numbers[i]);
            }
        }

        document.getElementById("even-output").innerHTML = evenNumbers;
    }

    function ShowOdd(){
        var oddNumbers = [];

        for(var i = 0; i < numbers.length; i++){
            if(numbers[i] % 2 != 0){
                oddNumbers.push(numbers[i]);
            }
        }

        document.getElementById("odd-output").innerHTML = oddNumbers;
    }

    function AjaxStock(){

        var resultsSymbols = [];
        var resultsPrices = [];

        for(var i = 0; i < companies.length; i++){
            $.getJSON("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + companies[i] + "&apikey=6PZKH2WY7939TLOG", function(result){
                resultsSymbols.push(result["Global Quote"]["01. symbol"]);
                resultsPrices.push(result["Global Quote"]["05. price"]);
            });
        }

        setTimeout(function(){
            for(var i = 0; i < companies.length; i++){
                document.getElementById("comp-" + i).innerHTML = resultsSymbols[i] + " : " + resultsPrices[i];
            }
        }, 2000);
    }
});