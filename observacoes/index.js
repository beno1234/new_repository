const express = require('express')
const {v4: uuidv4} = require('uuid')
const app = express()
//aplicamos um middleware
app.use(express.json())

const observacoesPorLembretesId = {}

// localhost:5000/lembretes/id:/observacoes
app.post('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4()
    const {texto} = req.body
    const observacoesDoLembrete = observacoesPorLembretesId[req.params.id] || []
    observacoesDoLembrete.push({id: idObs, texto: texto})
    observacoesPorLembretesId[req.params.id] = observacoesDoLembrete

    res.status(201).send(observacoesDoLembrete)
})

app.get('/lembretes/:id/observacoes', (req,res) => {
    res.send(observacoesPorLembretesId[req.params.id]  ||  [])
})

app.listen(5000, () => {
    console.log('Server Rodando')
})