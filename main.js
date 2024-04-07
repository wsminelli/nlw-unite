
/*const participante = {
    nome: "Willian Minelli",
    email: "wsminelli@gmail.com",
    dataIncricao: new Date(2024, 2, 22, 19, 20), 
    dataCheckin: new Date(2024, 2, 25, 22, 00) 
}*/

let participantes = [
    {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20)
    },
    {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20)
    },
    {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: null
    },
    {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20)
    },
    {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 6, 20, 20)
    },
    {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: null
    },
    {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20)
    },
    {
    nome: "Lucas Sousa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 9, 20, 20)
    },
    {
    nome: "Paula Costa",
    email: "paula@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: null
    },
    {
    nome: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: new Date(2023, 5, 11, 20, 20)
    }
]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">Confirmar check-in</button>
        `
    }

    return `
        <tr>
            <td>
                <strong>${participante.nome}</strong>
                <br>
                <small>${participante.email}</small>
            </td>
            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
        </tr>
    `
}

const atualizarLista = (participantes) => {

    let output = ""

    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    //document.querySelector('tbody').innerHTML = criarNovoParticipante(participantes[2])
    document.querySelector('tbody').innerHTML = output

}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const participante = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participantesExiste = participantes.find((p) => {
        return p.email == participante.email
    })

    if(participantesExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
} 

const fazerCheckIn = (event) => {

    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if(confirm(mensagemConfirmacao) == false) {
        return
    }
    
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}

const inputName = document.querySelector('[name="nome"]');
const inputEmail = document.querySelector('[name="email"]');
const inputWrapper = document.querySelectorAll('.input-wrapper');

inputName.addEventListener('click', () => {
    inputWrapper.forEach(wrapper => wrapper.classList.add('ativo'));
});

inputEmail.addEventListener('click', () => {
    inputWrapper.forEach(wrapper => wrapper.classList.add('ativo'));
});

document.addEventListener('click', (event) => {
    inputWrapper.forEach(wrapper => {
        if (!wrapper.contains(event.target)) {
            wrapper.classList.remove('ativo');
        }
    });
});