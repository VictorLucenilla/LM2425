let tareas = [];

const agregarTarea = (tarea) => {
    const nuevaTarea = {
        id: Object.keys(tareas).length + 1,
        tarea: tarea,
        completada: false
    };
    tareas.push(nuevaTarea);
    renderLista();
};

const buscarTarea = (busqueda) => {
    const matchingTareas = tareas.filter((tarea) => tarea.tarea.includes(busqueda));
    renderLista(matches);
};

const eliminarTarea = (id) => {
    const index = tareas.findIndex((tarea) => tarea.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        renderLista();
    }
};

const renderLista = () => {
    const listaElemento = document.getElementById("lista-tareas");
    listaElemento.innerHTML = "";
    tareas.forEach((tarea) => {
        const tareaHTML = `
            <li class="tarea ${tarea.completada ? "completado" : ""}">${tarea.tarea}</li>
        `;
        listaElemento.appendChild(document.createElement("ul").appendChild(tareaHTML));
    });
};

const buscarElemento = (id) => {
    const matchingTareas = tareas.filter((tarea) => tarea.id === id);
    if (matchingTareas.length > 0) {
        renderLista(matches);
    } else {
        alert("No se encontró la tarea con el ID " + id);
    }
};

const addEventListeners = () => {
    document.getElementById("agregar-tarea").addEventListener("click", agregarTarea);
    document.getElementById("busqueda").addEventListener("keyup", buscarTarea);
    document.addEventListener("DOMContentLoaded", renderLista);
};

addEventListeners();