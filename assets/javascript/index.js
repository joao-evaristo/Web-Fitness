const url = "https://taco-backend-thiago.herokuapp.com/api/v1/food"

//Faz a conexão com a API e armazena seu retorno no Local Storage
fetch(url)
.then((response) => response.json())
    .then(result => { 
        console.log(result); 
        localStorage.setItem("tabelataco", JSON.stringify(result));
    });

//Roda as funçoes a cada caractere digitado no input
$("#buscarAlimentos").keyup(function() {
    var valorInput = $(this).val();

    exibirDados(DadosFiltrados(valorInput))
});

//Filtra as comidas armazenadas no LS baseado no que está no input
function DadosFiltrados(inputValue){
    let comidasFiltradas = JSON.parse(localStorage.getItem("tabelataco"));
    var busca = [inputValue]
    busca.map(comidas => {
        comidasFiltradas = comidasFiltradas.filter(comida =>
            comida.description.toLowerCase().includes(comidas.toLowerCase())
        );
    });

    return comidasFiltradas
}

//Exibe a comida com suas informações nutricionais
function exibirDados(foods){
    $("#alimentos").empty();

    for(i=0;i<foods.length;i++){
        var desc = foods[i].description
        var unid = foods[i].base_unit
        
        var qntd = `${parseInt(foods[i].base_qty).toFixed(2)}`   
        var cal = `${parseInt(foods[i].attributes.energy.kcal).toFixed(2)}`   
        var carbo = `${parseInt(foods[i].attributes.carbohydrate.qty).toFixed(2)}` 
        var prot= `${parseInt(foods[i].attributes.protein.qty).toFixed(2)}`
        var fat = `${parseInt(foods[i].attributes.lipid.qty).toFixed(2)}`

        $("#alimentos").append( 
            `<div id="alimento___${i}" class="alimento" onclick="armazenaAlimento(this)">
                <div id="info1">
                    <h1>${desc}</h1>
                    <input type="hidden" id="hiddenNome" value="${desc}">
                    <p>${cal}Kcal</p>
                    <input type="hidden" id="hiddenCal" value="${cal}">
                </div>
                <div id="info2">                  
                    <p>Quantidade ${qntd}${unid}</p>
                    <div class="macros">
                        <p>Carboidratos ${carbo}${unid}</p>
                        <input type="hidden" id="hiddenCarbo" value="${carbo}">
                        <p>Proteína ${prot}${unid}</p>
                        <input type="hidden" id="hiddenProt" value="${prot}">
                        <p>Gordura ${fat}${unid}</p>
                        <input type="hidden" id="hiddenGord" value="${fat}">
                    </div>
                </div>           
            </div>`
        );
    }
    
}