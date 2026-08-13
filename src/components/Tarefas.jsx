import { useState, useEffect } from "react"

const Tarefas = () => {

    //Hook - useState=Manipula o estado da variavel
    const [tarefas, setTarefas] = useState(() => {
        const salvarDados = localStorage.getItem("items-tarefas");
        return salvarDados ? JSON.parse(salvarDados) : [];
    });
    const [campo, setCampo] = useState('');

    //Hook -useEffect- Realiza um efeito colateral , no exemplo vai atualizar em tempo real a tarefa criada

    useEffect(() => {
        localStorage.setItem("items-tarefas", JSON.stringify(tarefas));
        [tarefas]
    })

    //Arrow Função adicionar campo 
    const AdicionarTarefa = (e) => {
        e.preventDefault();
        if (!campo.trim()) return;

        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };

        setTarefas([...tarefas, novaTarefa]);
        setCampo('')

    }

    const RemoverTarefa = (id) => {
        const alterarTarefa = tarefas.filter((tarefa) => { tarefa.id !== id })
        setTarefas(alterarTarefa);
    }

    return (
    <>
    <div className="todo-container">
        <h1>Minha lista de tarefas</h1>

        <form onSubmit={AdicionarTarefa} className="todo-form">
            <input
            type="text"
            value={campo}
            placeholder="Digite uma nova tarefa"
            className="todo-input"
            onChange={(e) => setCampo(e.target.value)}
            />
            <button type="submit" className="btn-add">Adicionar</button>
        </form>
        <ul className="todo-list">
            {tarefas.map((item) => (
                <li key={item.id} className="todo-item">
                    <span>{item.text}</span>
                    <button onClick={RemoverTarefa(item.id)} className="btn-delete">
                        Excluir
                    </button>
                </li>
            ))}
        </ul>
        {tarefas.length === 0 && <p className="todo-vazio">Nenhuma Tarefa</p>}
        
    </div>


    </>
    )
}

export default Tarefas
