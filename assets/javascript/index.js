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
    $("#teste").empty();

    for(i=0;i<foods.length;i++){
        var desc = foods[i].description
        var unid = foods[i].base_unit
        
        var qntd = `${parseInt(foods[i].base_qty).toFixed(2)}${unid}`   
        var cal = `${parseInt(foods[i].attributes.energy.kcal).toFixed(2)}kcal`   
        var carbo = `${parseInt(foods[i].attributes.carbohydrate.qty).toFixed(2)}${unid}` 
        var prot= `${parseInt(foods[i].attributes.protein.qty).toFixed(2)}${unid}`
        var fat = `${parseInt(foods[i].attributes.lipid.qty).toFixed(2)}${unid}`

        $("#teste").append( 
            `<div>
                <h1>${desc}</h1>
                <p>Quantidade ${qntd}</p>
                <p>Calorias ${cal}</p>
                <p>Carboidratos ${carbo}</p>
                <p>Proteína ${prot}</p>
                <p>Gordura ${fat}</p>
            </div>`
        );
    }
    
}