import { useState, useEffect } from "react"

const Tarefas = () => {

    // HOOK- useState= Manipula o estado da variável
    const [tarefas, setTarefas] = useState(() => {
        const salvarDados = localStorage.getItem("items-tarefas");
        return salvarDados ? JSON.parse(salvarDados) : [];
    });
    const [campo, setCampo] = useState('');

    //HOOK-useEffect - realiza um efeito colateral , no exmeplo vai 
    //atualizar em tempo real a tarefa criada

    useEffect(() => {
        localStorage.setItem("items-tarefas", JSON.stringify(tarefas));
    }, [tarefas])

    // Arrow function adicionar campo
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
        const alterarTarefa = tarefas.filter((tarefa) => { return tarefa.id !== id })
        setTarefas(alterarTarefa);
    }

    return (
        <>
            <div className="todo-container">
                <h1>Minha lista de Tarefas</h1>
                <form onSubmit={AdicionarTarefa} className="todo-form">
                    <input
                        type="text"
                        value={campo}
                        placeholder="Digite uma nova tarefa..."
                        className="todo-input"
                        onChange={(e) => setCampo(e.target.value)}
                    />
                    <button type="submit" className="btn-add">
                        Adicionar
                    </button>

                </form>
                <ul className="todo-list">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="todo-item">
                            <span>{tarefa.text}</span>
                            <button onClick={() => RemoverTarefa(tarefa.id)}
                                className="btn-delete">
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
