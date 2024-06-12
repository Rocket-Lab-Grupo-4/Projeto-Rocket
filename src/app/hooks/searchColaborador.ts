import { useState, useEffect } from 'react';

const searchColaboradores = () => {
    const [colaboradores, setColaboradores] = useState([]);
    const [filteredColaboradores, setFilteredColaboradores ] = useState([]);


useEffect (() => {

    fetch('/users') //ainda não ta definido
    .then(response => response.json())
    .then(data => {
        setColaboradores(data);
        setFilteredColaboradores(data);
    })
    .catch(error => console.error('Erro ao buscar colaboradores', error))
}, []);

const filterColaboradores = (query: string) => {
    if (query === '') {
        setFilteredColaboradores(colaboradores);
    }
    else {
        //const filtered = colaboradores.filter(colaborador =>

           // colaborador.name.toLowerCase().includes(query.toLowerCase())
        //);
    }
}

return { colaboradores: filteredColaboradores, filterColaboradores };

};
export default searchColaboradores;