# Objetivo do Projeto:
<h2>Este endpoint é utilizado para buscar quartos disponíveis com base nas datas de check-in e check-out e retornar o preço da estadia e o nome, a descrição e a imagem do quarto .</h2>

<h3>Tecnologias Utilizadas:</h3>

<ul>
<li>TypeScript
<li>AdonisJS (API)
<li>Puppeteer (Crawler)
<li>Japa (Testes)
</ul>

<h3>Instruções para rodar o projeto:</h3>

<ol>
<li>Você deve ter um API CLIENT em sua máquina <strong>(como Insomnia, Postman).</strong>
<li>Instale as dependências com o seguinte comando: <strong>npm install.</strong>
<li>Copie os dados do arquivo <strong>.env.example</strong> e cole-os em um novo arquivo <strong>.env.</strong>
<li>Para rodar o projeto, execute o comando abaixo: <strong>npm run dev.</strong>
<li>Para rodar os testes, execute o comando abaixo: <strong>node ace test.</strong>
<li>Para rodar um teste por vez, execute o comando <strong>node ace test --tests 'nome do teste'.</strong>
</ol>

<h3>Instruções para usar a API:</h3>

<ul>

<li>Exemplos de respostas de erros da API:

<li>Para campos vazios:

```
{
  "errors": [
    {
      "rule": "required",
      "field": "checkin",
      "message": "checkin is required"
    },
    {
      "rule": "required",
      "field": "checkout",
      "message": "checkout is required"
    }
  ]
}
```
<li> A data de check-in deve ser igual ou maior que a data de hoje:

```
{
  "statusCode": 422,
  "errors": [
    {
      "rule": "afterOrEqual",
      "field": "checkin",
      "message": "Past date must be greater than or equal to today",
      "args": {
        "afterOrEqual": "2023-04-05T19:20:03.228-03:00"
      }
    }
  ]
}

```
<li>
A data de check-in deve ser menor que a data de check-out:

```
{
  "errors": [
    {
      "rule": "check-in date must be less than check-out date",
      "field": "checkout"
    }
  ]
}

```

<li> O cliente tem que ficar pelo menos três noites de hospedagem, então o check-out tem que ser 3 dias depois do check-in

```
{
	"errors": [
		{
"rule": "You must stay at least 3 nights at the hotel",
"field": "checkout"
		}
	]
}
```

<li>Rotas:

<li> Método POST na rota /search
<li>O body da requisição esperado é um JSON com as seguintes informações:
<li>checkin: data de check-in, no formato "YYYY-MM-DD".
<li>checkout: data de check-out, no formato "YYYY-MM-DD".

<li> Exemplo:

```
{
  "checkin": "2023-04-05",
  "checkout": "2023-04-08"
}

```

<li>A resposta da API é um array de JSON ou um JSON, contendo as seguintes informações para cada quarto encontrado:
<li>name: nome do quarto.
<li>description: descrição do quarto.
<li>price: preço da estadia.
<li>image: URL da imagem do quarto.

<li> E quando o quarto não é encontrado na data passada é retornado uma mensagem

<li> Exemplo de quartos encontrados:

```
{ "response" : [
{
"name": "Superior",
"description": "Próximo ao rio e no 2 piso.",
"price":"R$1.876,50",
"image":"https://letsimage.s3.amazonaws.com/letsbook/193/quartos/34/fotoprincipal.jpg"
	}
]
}
```

<li> Exemplo de quartos não encontrados naquela data:

```
{
	"response": "Desculpe, mas não temos quartos disponíveis para esta data. Que tal tentar uma nova busca para um período diferente?"
}
```

OBS: se quiser abrir o browser, é so ir no arquivo Crawler.ts e trocar await puppeteer.launch({ headless: true }) de true para false

