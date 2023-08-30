//Script pra download de lista de imóveis/domicilios cadastrados

function export2txt(data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 0)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "page_1.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//Retorna a 'página' de cadastros especificada
function getPage(page){
    //                                      /sigss/imobiliarioFamiliar2/lista?searchField=entiMembro.entiNome&searchString=&area=&miar=&rifa=&filtroCondicaoFamiliar=todos&outrosFiltros=&_search=false&nd=1692370560576&rows=15&page=1&sidx=imov.imovInscricaoImobiliaria&sord=asc
    var theUrl = window.location.origin + '/sigss/imobiliarioFamiliar2/lista?searchField=entiMembro.entiNome&searchString=&area=&miar=&rifa=&filtroCondicaoFamiliar=todos&outrosFiltros=&_search=false&nd=1692370560576&rows=5000&page=' + page + '&sidx=imov.imovInscricaoImobiliaria&sord=asc';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    data = JSON.parse(xmlHttp.responseText);
    return data;
}

//Baixa todos os cadastros atualmente disponiveis na base
function getFullyDb(){
    let total = -1;
    let drop = {"page":1,"total":1,"records":0,"rows":[]};

    for(let i = 1; i <= total || total == -1; i++){
        var page = getPage(i);
        console.log('Page ' + i + '/' + total + ' downloaded...');

        if(total == -1){
            total = page['total'];
        }

        drop['rows'] = drop['rows'].concat(page['rows']);
    }

    drop['records'] = drop['rows'].length;

    export2txt(drop);
}

getFullyDb();