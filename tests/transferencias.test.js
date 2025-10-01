import http from 'k6/http'
import { sleep, check } from 'k6'
import { obterToken } from '../helpers/autenticacao.js'

export const options = {
  iterations: 1
}

export default function () {
  const token = obterToken()

  const url = 'http://localhost:3000/transferencias'
  const payload = JSON.stringify({
    contaOrigem: 2,
    contaDestino: 1,
    valor: 15.00,
    token: ""
  })
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  let res = http.post(url, payload, params)

  check(res, { 'Validar que a transferência foi realizada com status 201': (res) => res.status === 201 })

  sleep(1)
}
