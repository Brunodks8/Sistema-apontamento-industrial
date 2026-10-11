const item = document.querySelector("#item");
const quantidade = document.querySelector("#quantidade");
const maq = document.querySelector("#maq");
const turno = document.querySelector("#turno");
const table = document.querySelector("tbody");
let items = [];
let editIndex = null;

form.addEventListener("submit", (event) => {

    //VALIDAÇÕES
    event.preventDefault()

    if (item.value === "" || quantidade.value === "" || maq.value === "" || turno.value === "") {
        alert("Preencha todos os campos!!")
        return
    }

    //puxar dados para array
    if (editIndex === null) {
        items.push({
        item: item.value,
        quantidade: quantidade.value,
        maq: maq.value,
        turno: turno.value
    })} else {
        items[editIndex] = {
            item: item.value,
            quantidade: quantidade.value,
            maq: maq.value,
            turno: turno.value
        };
        editIndex = null;
    }

    setItensBD();
    loadItens();
    form.reset();
})

//DELETAR

function deleteItem(index) {
    items.splice(index,1);
    setItensBD();
    loadItens();
}

//EDITAR
function editItem(index) {
    const itemEdit = items[index];
    item.value = itemEdit.item;
    quantidade.value = itemEdit.quantidade;
    maq.value = itemEdit.maq;
    turno.value = itemEdit.turno;
    editIndex = index;
}

//INSERIR
var inserirD = (item, index) => {
    var tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.item}</td>
        <td>${item.quantidade}</td>
        <td>${item.maq}</td>
        <td>${item.turno}</td>
        <td><button class="apagarStyle" onclick="deleteItem(${index})">X</button></td>
        <td><button class="editarStyle" onclick="editItem(${index})">Editar</button></td>
         `;
    table.appendChild(tr);

};

//EXPORTAR

function exportarExcel() {
    if(items.length === 0){
        alert("Não existem dados para exportar!");
        return
    }

    const planilha = XLSX.utils.json_to_sheet(items);
    const arquivo = XLSX.utils.book_new();
     // Adiciona a planilha ao arquivo
    XLSX.utils.book_append_sheet(
        arquivo,
        planilha,
        "Apontamentos"
    );

    // Faz o download do arquivo
    XLSX.writeFile(arquivo, "apontamentos.xlsx");

};

const btnExportar = document.getElementById("export");
btnExportar.addEventListener("click", exportarExcel);



var loadItens = () => {
    table.innerHTML = "";
    items = getItensBD();
    items.forEach((item, index) => {
        inserirD(item, index);
    })
};

//Local Storage
const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () => localStorage.setItem("db_items", JSON.stringify(items));

loadItens();



