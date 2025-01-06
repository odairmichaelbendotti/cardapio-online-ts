interface User {
    name: string
    email: string
    password: string
}

interface UserAddress {
    bairro: string
    estado: string
    localidade: string
    logradouro: string
    uf: string
}

interface CreateUserProps {
    nomeCompleto: string
    email: string
    senha: string
    whatsApp: string
    nascimento?: string
    cep: string
    cidade: string
    bairro: string
    numero: string
    referencia: string
}

interface IsAuthUser {
    auth: boolean
    role: boolean
}

interface ProductProps {
    id: string
    nome: string
    descricao: string
    imagem: string
    preco: string
    estoque: number
    createdAt: Date
    tipo: string
}

interface UserDashboardProps {
    email: string
    whatsapp: string
    cep: string
    cidade: string
    bairro: string
    numero: string
    referencia: string
}

interface ExtendedUserProps extends CreateUserProps {
    role: boolean
    id: string
}

interface ProductTypeProps {
    types: string[]
}

// Renderiza o menu em todas as páginas quando o DOM é carregado
document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('userToken')

    if (window.location.pathname == '/index.html' && !token) {
        window.location.href = '/pages/login.html'
        return
    }

    if (!token) return

    if (JSON.parse(token) !== '123') {
        const userData = await isAuth()
        loadMenu(userData)
    }

    hoverMenu()

    const verifyMenuHamburger = document.querySelector('.menu-hamburger')
    verifyMenuHamburger ? menuHamburger() : alert('Não carregou')

    showPassword()
    cadastrarUsuario()
    montarPaginaProduto()
    addProduct()
    removeProduct()
    montarDashboardUsers()
    toggleInfos()
    renderDashboardMenu()
})

// Cria um menu estático no HTML que serve para renderizar em todas as páginas
async function loadMenu(authUser: IsAuthUser) {
    const header = document.getElementsByTagName('header')[0]
    if (!header) return

    // Botão hamburger
    const hamburgerBtn = document.createElement('div')
    hamburgerBtn.className = 'text-2xl px-6 py-4 md:hidden menu-hamburger text-white'

    //font awesome ícone de hamburger
    const iconHamburger = document.createElement('i')
    iconHamburger.className = 'fa-solid fa-bars text-white'

    // Nav que receberá o conteúdo
    const nav = document.createElement('nav')
    nav.className = 'hidden fixed top-10 left-28 md:static my-4 flex-col px-4 md:flex md:flex-row md:justify-between nav-menu bg-[#20170E] py-4 rounded-2xl'

    const storedUser = authUser

    if (storedUser.auth) {
        const userLogged = storedUser
        nav.innerHTML = `
        <div class="px-6 text-center py-[2px] uppercase font-bold md:px-6 index border-[2px] border-[#20170E]"><a href="/index.html">Burger Land</a></div>
        <div class="mt-4 flex flex-col items-center gap-6 md:flex-row md:mt-0 menu-items">
            ${userLogged.role ? `<a href="/pages/dashboard.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 border-b-[#20170E] border-b-[2px] dashboard">Dashboard</ul></a>
            ` : ``} 
        <a href="/pages/cardapio.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 border-b-[#20170E] border-b-[2px] cardapio">Cardápio</ul></a>
        <a href="/pages/minha-conta.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 border-b-[#20170E] border-b-[2px] minha-conta">Minha conta</ul></a>
        
        <div class="relative">
        
        <a href="/pages/carrinho.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 border-b-[#20170E] border-b-[2px] text-md carrinho"><i class="fa-solid fa-cart-shopping"></i></ul></a>
        
        <p class="flex justify-center items-center absolute -top-2 -right-1 text-xs w-5 h-5 border-[1px] rounded-full text-[#F3DFA0] border-[#F3DFA0]">3</p>
        </div>
        
        
        <a><ul class="flex gap-2  items-center py-[2px] px-4 cursor-pointer hover:opacity-70 cardapio border-b-[#20170E] border-b-[2px] deslogar"><i class="fa-solid fa-right-from-bracket"></i><p>Sair</p></ul></a>             
        </div>
`
    } else {
        nav.innerHTML = `
        <div class="px-6 text-center py-[2px] uppercase font-bold md:px-6 border-[2px] border-[#20170E] index"><a href="/index.html">Burger Land</a></div>
        <div class="mt-4 flex flex-col items-center gap-6 md:flex-row md:mt-0 menu-items">
        <a href="/pages/login.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 border-[#20170E] border-[2px] acessar">Acessar</ul></a>          
        </div>`
    }

    const sair = nav.querySelector('.deslogar')

    if (sair) {
        sair.addEventListener('click', () => {
            // Limpa o token primeiro
            localStorage.setItem('userToken', '123');

            // Redireciona o usuário
            window.location.href = '/pages/login.html';
        });
    }

    hamburgerBtn.appendChild(iconHamburger)
    header.appendChild(hamburgerBtn)
    header.appendChild(nav)
}

// Cria o menu hamburger e adiciona o evento de click para ocultar o nav inteiro quando clicado.
function menuHamburger() {
    const iconHamburger = document.querySelector('.menu-hamburger i')
    const nav = document.querySelector('.nav-menu')

    if (!iconHamburger || !nav) {
        alert('Não carregou')
        return
    }

    iconHamburger.addEventListener('click', () => {
        iconHamburger.classList.toggle('fa-bars')
        iconHamburger.classList.toggle('fa-xmark')

        nav.classList.toggle('hidden')
    })
}

// Aplica a classe active-menu conforme pathname de cada link.
function hoverMenu() {
    const link = window.location.pathname

    const verifyMenu = document.querySelector('.nav-menu')
    if (!verifyMenu) return

    switch (link) {
        case '/pages/cardapio.html':
            document.querySelector('.cardapio')?.classList.remove('border-b-[#20170E]')
            document.querySelector('.cardapio')?.classList.add('active-menu')
            break
        case '/pages/produtos.html':
            document.querySelector('.produtos')?.classList.remove('border-b-[#20170E]')
            document.querySelector('.produtos')?.classList.add('active-menu')
            break
        case '/pages/dashboard.html':
            document.querySelector('.dashboard')?.classList.remove('border-b-[#20170E]')
            document.querySelector('.dashboard')?.classList.add('active-menu')
            break
        case '/pages/minha-conta.html':
            document.querySelector('.minha-conta')?.classList.remove('border-b-[#20170E]')
            document.querySelector('.minha-conta')?.classList.add('active-menu')
            break
        case '/pages/carrinho.html':
            document.querySelector('.carrinho')?.classList.remove('border-b-[#20170E]')
            document.querySelector('.carrinho')?.classList.add('active-menu')
            break
        case '/pages/login.html':
        case '/pages/cadastro.html':
            const loginBtn = document.querySelector('.acessar')

            if (!loginBtn) return
            loginBtn.classList.add('active-menu-login')
            break
        case '/index.html':
            document.querySelector('.index')?.classList.remove('border-[#20170E]')
            document.querySelector('.index')?.classList.add('active-menu-home')
            break


    }
}

// Mostra a senha (clicar no cadeado do menu que faz login e de criar usuário)
function showPassword() {
    const btnEyes = document.querySelectorAll('.show-password')
    const passwordInputs = document.querySelectorAll('.password-input')

    if (!btnEyes || !passwordInputs) return;

    btnEyes.forEach((btnEye, index) => {
        btnEye.addEventListener('click', () => {
            // Obter o input correspondente pelo índice
            const passwordInput = passwordInputs[index] as HTMLInputElement;

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                btnEye.classList.remove('fa-lock');
                btnEye.classList.add('fa-unlock');
            } else {
                passwordInput.type = 'password';
                btnEye.classList.remove('fa-unlock');
                btnEye.classList.add('fa-lock');
            }
        });
    });
}

async function cadastrarUsuario() {
    const btnCadastrar = document.getElementById('cadastrar-usuario')
    const userNome = document.getElementById('user-nome') as HTMLInputElement
    const userEmail = document.getElementById('user-email') as HTMLInputElement
    const userPassword = document.getElementById('user-password') as HTMLInputElement
    const userConfirmPassword = document.getElementById('user-confirm-password') as HTMLInputElement
    const userWhatsApp = document.getElementById('user-whatsapp') as HTMLInputElement
    const userAniversario = document.getElementById('user-aniversario') as HTMLInputElement
    const userCep = document.getElementById('user-cep') as HTMLInputElement
    const userCidade = document.getElementById('user-cidade') as HTMLInputElement
    const userBairro = document.getElementById('user-bairro') as HTMLInputElement
    const userNumero = document.getElementById('user-numero') as HTMLInputElement
    const userReferencia = document.getElementById('user-referencia') as HTMLInputElement

    if (!btnCadastrar) return
    if (!userCep || !btnCadastrar) return

    btnCadastrar.addEventListener('click', async () => {
        if (!userNome || !userEmail || !userPassword || !userConfirmPassword || !userWhatsApp || !userAniversario || !userNumero || !userReferencia) return

        const userData: CreateUserProps = {
            nomeCompleto: userNome.value,
            email: userEmail.value,
            senha: userPassword.value,
            whatsApp: userWhatsApp.value,
            nascimento: userAniversario.value,
            cep: userCep.value,
            cidade: userCidade.value,
            bairro: userBairro.value,
            numero: userNumero.value,
            referencia: userReferencia.value,
        }

        const userSignIn = await cadastrarUsuarioAoBD(userData)
        if (!userSignIn.message) localStorage.setItem('userToken', JSON.stringify(userSignIn))
    })

    userCep.addEventListener('blur', async () => {
        const data: UserAddress = await pegarEnderecoViaCep(`${userCep.value}`)

        if (!data) {
            alert('CEP não encontrado')
            return
        }

        userCidade.value = data.localidade
        userBairro.value = data.bairro
    })

    userConfirmPassword.addEventListener('blur', () => {
        if (userPassword.value !== userConfirmPassword.value) {
            alert('As senhas não conferem.')
        }
    })
}

async function cadastrarUsuarioAoBD(data: CreateUserProps) {
    try {
        const response = await fetch('http://localhost:3000/pages/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log('Erro na função cadastrarUsuarioAoBD()')
        console.log(error)
    }
}

// Função que faz uma requisição ao VIACEP para pegar informações sobre o endereço
async function pegarEnderecoViaCep(cep: string) {
    if (cep.length < 8) {
        alert('cep inválido.')
        return
    }
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    if (!response.ok) return

    const data = await response.json()
    return data
}

// Verificar se o botão de login existe no DOM, faz a requisição ao BD, recebe os dados do usuário do BD e depois armazena no localStorage
const loginBtn = document.getElementById('login-user-button')
if (loginBtn) {
    const userEmail = document.getElementById('user-login-email') as HTMLInputElement
    const userPassword = document.getElementById('user-login-password') as HTMLInputElement
    const userNotFound = document.querySelector('.user-login-error')

    loginBtn.addEventListener('click', async () => {
        if (!userEmail || !userPassword) return

        const userToken = await loginGetUserInfos(userEmail.value, userPassword.value)

        if (userToken.message) {
            userNotFound?.classList.remove('hidden')
        } else {
            window.location.href = '/pages/cardapio.html'
            if (!userNotFound) return

            if (!userNotFound.classList.contains('hidden')) userNotFound?.classList.add('hidden')

            localStorage.setItem('userToken', JSON.stringify(userToken))
        }
    })
}

async function loginGetUserInfos(email: string, password: string) {
    try {
        const response = await fetch('http://localhost:3000/pages/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (!response) return


        const data = await response.json()

        // Retorna o token do usuário que fez login.
        return data
    } catch (error) {
        console.error(error)
    }
}

async function isAuth() {
    const token = localStorage.getItem('userToken')

    if (!token) return

    const response = await fetch('http://localhost:3000/validate-token', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${JSON.parse(token)}`
        }
    })

    if (!response.ok) return

    const data = await response.json()

    // Retorna um objeto com "auth" e "role" sendo true ou falso.
    console.log(data)
    return data
}

async function getAllProducts() {
    const response = await fetch('http://localhost:3000/pages/cardapio')

    if (!response) return

    const data = await response.json()
    return data
}

async function renderCardapio() {
    const data: ProductProps[] = await getAllProducts()
    if (!data) return

    const containerCardapio = document.getElementById('product-area')
    if (!containerCardapio) return

    data.forEach(item => {
        const div = document.createElement('div')
        div.className = 'flex gap-4 bg-[#30271d] w-full p-4 rounded-xl shadow-sm shadow-[#30271d] hover:opacity-90 cardapio-items hover:cursor-pointer'
        div.innerHTML = `
                <img src='../${item.imagem}'
                    class="w-24 md:w-36 rounded-xl">
                <div class="flex flex-col justify-between w-full ">
                    <div class="w-full">
                        <p class="text-md uppercase font-bold w-full tracking-wide md:text-md">${item.nome}</p>
                        <p class="text-xs text-justify md:text-sm text-[#f9f1d7]">${item.descricao}</p>
                    </div>
                    <div class="flex justify-between w-full">
                        <p class="font-bold text-md md:text-xl">R$${Number(item.preco).toFixed(2)}</p>
                        <div class="flex items-center gap-4">
                            <div class="text-md cursor-pointer md:text-xl"><i class="fa-regular fa-heart hover:text-red-300"></i></div>
                            <div class="text-md cursor-pointer md:text-sm cart-products"><i class="fa-solid fa-cart-shopping"></i></div>
                        </div>
                    </div>
                </div>
        `
        div.addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3000/pages/products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "action": "getSpecificProduct", id: item.id })
                })

                if (!response.ok) return

                const data: ProductProps = await response.json()
                console.log(data)

                localStorage.setItem('productData', JSON.stringify(data))

                window.location.href = `/pages/products.html`
            } catch (error) {
                console.error(error)
            }
        })

        const cartProducts = div.querySelectorAll('.cart-products')
        cartProducts.forEach(element => {
            element.addEventListener('click', () => {
                alert(item.id)
                event?.stopPropagation()
            })
        })

        containerCardapio.appendChild(div)
    })
}

const currentPath = window.location.pathname;

if (currentPath === '/pages/cardapio.html') {
    renderCardapio()
}

function montarPaginaProduto() {
    const main = document.getElementById('product-view-container')

    if (!main) return

    const stored = localStorage.getItem('productData')
    if (!stored) return
    const data: ProductProps = JSON.parse(stored)

    main.innerHTML = `
        <img src="../${data.imagem}" alt="" class="rounded-xl md:rounded-2xl">
        <div class="flex flex-col">
            <div>
                <div>
                    <p class="font-bold text-xl uppercase">${data.nome}</p>
                    <div class="flex items-center gap-4">
                        <div class="flex gap-2">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <p>(1.130 avaliações)</p>
                    </div>
                </div>
                <p class="text-justify mt-4">${data.descricao}</p>
                
                <div class="flex items-center justify-between mt-4 md:mt-12">
                    <p class="font-bold text-2xl">R$${Number(data.preco).toFixed(2)}</p> 
                    <div class="flex gap-3">
                        <p class="w-8 h-8 flex justify-center items-center text-xl border-1 rounded-full bg-[#F3DFA0] text-[#20170E] cursor-pointer" id="remove-product">-</p>
                        <p class="w-8 h-8 flex justify-center items-center text-xl border-1 rounded-full text-[#F3DFA0]" id="product-qtd">0</p>
                        <p class="w-8 h-8 flex justify-center items-center text-xl border-1 rounded-full bg-[#F3DFA0] text-[#20170E] cursor-pointer" id="add-product">+</p>
                    </div>
                </div>
                <p class="hidden text-sm mt-2 text-red-500" id="fora-de-estoque">Quantidade fora de estoque.</p>

                <div class="flex gap-2 mt-8">
                    <p class="uppercase text-xl font-bold">Total:</p>
                    <p class="text-xl font-bold" id="total-amount">R$0.00</p>
                </div>
                
                <div class="py-2 text-[#20170E] bg-[#F3DFA0] text-center uppercase rounded-md mt-3 cursor-pointer font-bold" onclick="addToCart()">Adicionar ao carrinho</div>
            </div>
        </div>
    `
}

async function addProduct() {
    const productQtd = document.getElementById('product-qtd')
    const addProduct = document.getElementById('add-product')
    const OutOfStock = document.getElementById('fora-de-estoque')
    const totalAmount = document.getElementById('total-amount')

    if (!productQtd || !addProduct || !totalAmount) return

    addProduct.addEventListener('click', async () => {
        const currentValue = parseInt(productQtd.innerText || '0', 10)

        const stored = localStorage.getItem('productData')
        if (!stored) return

        const product: ProductProps = JSON.parse(stored)

        const stock = await verifyQtdProduct((product.id).toString(), currentValue.toString())
        const maxStock = stock.Estoque

        if (currentValue === maxStock) {
            productQtd.innerText = maxStock.toString()
            OutOfStock?.classList.remove('hidden')
            return
        } else {
            const amountNow = productQtd.innerText = (currentValue + 1).toString()
            totalAmount.innerText = `R$${(Number(amountNow) * Number(product.preco)).toFixed(2).toString()}`
        }

        if (currentValue !== maxStock) {
            if (!OutOfStock?.classList.contains('hidden')) {
                OutOfStock?.classList.add('hidden')
            }
        }
    })
}

async function removeProduct() {
    const productQtd = document.getElementById('product-qtd')
    const removeProduct = document.getElementById('remove-product')
    const OutOfStock = document.getElementById('fora-de-estoque')
    const totalAmount = document.getElementById('total-amount')

    if (!productQtd || !removeProduct || !totalAmount) return

    removeProduct.addEventListener('click', async () => {
        let currentValue = parseInt(productQtd.innerText || '0', 10)

        const stored = localStorage.getItem('productData')
        if (!stored) return
        const product = JSON.parse(stored)

        const maxStock = await verifyQtdProduct(product.id.toString(), currentValue.toString())

        if (currentValue === 0) {
            productQtd.innerText = '0'
        } else {
            const amountNow = productQtd.innerText = (currentValue - 1).toString()
            totalAmount.innerText = `R$${(Number(amountNow) * Number(product.preco)).toFixed(2).toString()}`
        }

        if (currentValue !== maxStock) {
            if (!OutOfStock?.classList.contains('hidden')) {
                OutOfStock?.classList.add('hidden')
            }
        }
    })
}

async function verifyQtdProduct(id: string, qtd: string) {
    try {
        const response = await fetch('http://localhost:3000/pages/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "action": "checkQtd", id: id, qtd: qtd })
        })

        if (!response.ok) return

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

async function addToCart() {
    const productQtd = document.getElementById('product-qtd')
    const storedUserToken = localStorage.getItem('userToken')
    const storedProduct = localStorage.getItem('productData')

    if (!storedUserToken || !productQtd || !storedProduct) return

    const userToken = JSON.parse(storedUserToken)
    const productId: ProductProps = JSON.parse(storedProduct)

    try {
        const response = await fetch('http://localhost:3000/pages/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': userToken
            },
            body: JSON.stringify({
                "action": "addToCart",
                "id": productId.id,
                "qtd": productQtd.innerText
            })
        })

        if (!response) {
            console.log('deu ruim')
            return
        }

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }

}

async function getAllUsers() {
    const response = await fetch('http://localhost:3000/pages/dashboard')
    if (!response.ok) return

    const data: UserDashboardProps | null = await response.json()

    return data
}

async function montarDashboardUsers() {
    const tbody = document.getElementById('table-user-infos')
    if (!tbody) return

    const data = await getAllUsers()

    if (!(data instanceof Array)) return

    for (let i = 0; i < data.length; i++) {

        const tr = document.createElement('tr')
        tr.className = `text-center hover:bg-[#3a3128]`
        tr.setAttribute('data-id', `${data[i].id}`)

        tr.innerHTML = `
            <td class="py-2 text-left md:text-center">${data[i].email}</td>
            <td class="hidden md:table-cell">${data[i].whatsApp}</td>
            <td class="hidden md:table-cell">${data[i].cep}</td>
            <td class="hidden md:table-cell">${data[i].cidade}</td>
            <td class="hidden md:table-cell">${data[i].bairro}</td>
            <td class="hidden md:table-cell">${data[i].numero}</td>
            <td class="hidden md:table-cell">${data[i].referencia}</td>
            <td class="py-2 flex justify-center items-center">
                <div class="flex items-center gap-4">
                    <p class="edit-user-btn"><i class="fa-regular fa-pen-to-square cursor-pointer"></i></p>
                    <p class="remove-user-btn"><i class="fa-solid fa-trash cursor-pointer"></i></p>
                </div>
            </td>   
        `
        tbody.appendChild(tr)

        const btnEditUser = tr.querySelector('.edit-user-btn')
        if (!btnEditUser) return

        const removeBtnUser = tr.querySelector('.remove-user-btn')
        if (!removeBtnUser) return

        btnEditUser.addEventListener('click', async () => {
            openEditUserArea()
            const user = await getSpeficiUser(data[i].id)
            changeInfos(user)




        })

        removeBtnUser.addEventListener('click', async () => {
            const row = document.querySelector(`[data-id="${data[i].id}"]`)
            try {
                const response = await fetch(`http://localhost:3000/pages/dashboard/${data[i].id}`, {
                    method: 'DELETE'
                })

                if (response.ok) {
                    console.log('Usuário deletado com sucesso.')
                    const data = await response.json()
                    console.log(data)
                    row?.remove()
                }

            } catch (error) {
                console.log(error)
            }
        })
    }
}

function renderDashboardMenu() {
    const elements = document.querySelectorAll('[data-check]')

    if (!elements) return

    elements.forEach(element => {
        element.addEventListener('click', () => {
            elements.forEach(el => {
                el.setAttribute('data-check', 'false')
                el.classList.remove('active-dashboard')
            })

            element.setAttribute('data-check', 'true')
            element.classList.add('active-dashboard')
        })
    })
}

function openEditUserArea() {
    const container = document.getElementById('popup-edit-user')
    if (!container) return
    container.style.display = 'block'
}

function editUser() {
    const container = document.getElementById('popup-edit-user')
    const closeBtn = document.getElementById('close-popup-edit-user')
    if (!closeBtn || !container) return
    closeBtn.addEventListener('click', () => {
        container.style.display = 'none'
    })
}

editUser()

async function getSpeficiUser(id: string) {
    const response = await fetch(`http://localhost:3000/pages/dashboard/${id}`)

    if (!response) return

    const data = await response.json()
    return data
}

async function changeInfos(user: ExtendedUserProps) {
    const userName = document.querySelector<HTMLInputElement>('.edit-user-name');
    const userEmail = document.querySelector<HTMLInputElement>('.edit-user-email');
    const userPassword = document.querySelector<HTMLInputElement>('.edit-user-senha');
    const userWhatsApp = document.querySelector<HTMLInputElement>('.edit-user-whatsapp');
    const userCEP = document.querySelector<HTMLInputElement>('.edit-user-cep');
    const userCity = document.querySelector<HTMLInputElement>('.edit-user-cidade');
    const userNeighborhood = document.querySelector<HTMLInputElement>('.edit-user-bairro');
    const userNumber = document.querySelector<HTMLInputElement>('.edit-user-numero');
    const userReference = document.querySelector<HTMLInputElement>('.edit-user-referencia');
    const checkbox = document.getElementById('is-admin-user') as HTMLInputElement
    const btnSalvar = document.getElementById('change-user-infos')

    // Verifica se algum dos elementos está ausente
    if (!userName || !userEmail || !userPassword || !userWhatsApp || !userCEP || !userCity || !userNeighborhood || !userNumber || !userReference || !checkbox) {
        throw new Error('Um ou mais elementos necessários não foram encontrados na DOM.');
    }

    userCEP.addEventListener('blur', async () => {
        const pegarCep = await pegarEnderecoViaCep(userCEP.value)
        userCity.value = pegarCep.localidade
        userNeighborhood.value = pegarCep.logradouro
    })

    userName.value = user.nomeCompleto
    userEmail.value = user.email
    userPassword.value = user.senha
    userWhatsApp.value = user.whatsApp
    userCEP.value = user.cep
    userCity.value = user.cidade
    userNeighborhood.value = user.bairro
    userNumber.value = user.numero
    userReference.value = user.referencia

    if (user.role) {
        checkbox.checked = true
    } else {
        checkbox.checked = false
    }

    btnSalvar?.addEventListener('click', async () => {
        const userData = {
            id: user.id,
            nomeCompleto: userName.value,
            email: userEmail.value,
            senha: userPassword.value,
            whatsApp: userWhatsApp.value,
            cep: userCEP.value,
            cidade: userCity.value,
            bairro: userNeighborhood.value,
            numero: userNumber.value,
            referencia: userReference.value,
            role: checkbox.checked
        }
        await changeUserInfos(userData)
    })
}

async function changeUserInfos(userInfo: ExtendedUserProps) {
    const response = await fetch('http://localhost:3000/pages/dashboard', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify({
            "action": "updateUser",
            "infos": userInfo
        })
    })

    if (!response.ok) return

    const data = await response.json()
    console.log(data)
    return data
}

function toggleInfos() {
    const userProducts = document.getElementById('user-produtos')
    const userBtn = document.getElementById('user-dashboard')
    const userArea = document.getElementById('table-user-area')
    const productsDashboard = document.getElementById('products-area-dashboard')

    if (!userProducts || !userArea || !userBtn || !productsDashboard) return

    userProducts.addEventListener('click', () => {
        userBtn.classList.remove('active-dashboard')
        userProducts.classList.add('active-dashboard')
        userArea.style.display = 'none'
        productsDashboard.style.display = 'block'
    })

    userBtn.addEventListener('click', () => {
        userBtn.classList.add('active-dashboard')
        userProducts.classList.remove('active-dashboard')
        userArea.style.display = 'block'
        productsDashboard.style.display = 'none'
    })
}

async function renderProductsToEdit() {
    const data: ProductProps[] = await getAllProducts()
    const productsArea = document.getElementById('grid-products')

    if (!data || !productsArea) return

    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div')
        div.className = 'flex justify-between items-center w-full px-4 py-[10px] bg-[#2b251f] rounded-md'

        div.innerHTML = `
        <img src="../${data[i].imagem}" alt="" class="rounded-md w-16">
        <div clasl="flex flex-col">
            <p class="font-bold">${data[i].nome}</p>
            <p class="hidden md:block text-sm text-[#2b251f] font-bold">${data[i].tipo}</p>
        </div>
        <p  class="hidden md:block">R$${Number(data[i].preco).toFixed(2)}</p>
        <div class="flex items-center justify-center gap-2">
            <div class="cursor-pointer"><i class="fa-regular fa-pen-to-square edit-product-btn"></i></div>
            <div class="cursor-pointer"><i class="fa-solid fa-trash-can delete-product-btn"></i></div>
        </div>
        `
        productsArea.appendChild(div)

        const editBtn = div.querySelector('.edit-product-btn')
        const removeBtn = div.querySelector('.delete-product-btn')

        if (!editBtn || !removeBtn) return

        editBtn.addEventListener('click', () => {
            editProduct(data[i])
        })

        removeBtn.addEventListener('click', () => {
            alert(data[i].id)
        })
    }
}

renderProductsToEdit()

async function editProduct(infos: ProductProps) {
    const editProductContainer = document.getElementById('edit-product-area')
    if (!editProductContainer) return

    const div = document.createElement('div')
    div.className = 'w-[90%] md:w-1/2 md:flex md:flex-col md:items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F3DFA0] py-2 p-6'

    const productTypes: ProductTypeProps = await getTypeProducts()
    console.log(productTypes.types)

    div.innerHTML = `
    <div class="fixed top-1 right-1 p-2 bg-[#20170E] cursor-pointer text-[#F3DFA0] close-popup-edit-product">X</div>
    <div class="flex flex-col items-center justify-center">
        <img src="../${infos.imagem}" alt="" class="w-[90%] md:w-48 rounded-md mt-4">
        <div class="flex w-full justify-center items-center gap-4 md:w-48 py-[4px] rounded-md bg-[#20170E] text-[#F3DFA0] text-center mt-2 cursor-pointer">
            <i class="fa-solid fa-file-arrow-up"></i>
            <p>Alterar imagem</p>
        </div>
    </div>
    <div class="w-full mt-4 flex flex-col justify-center md:flex-row md:gap-4 mb-4">
    <div class="flex flex-col gap-[2px] md:w-1/2">    
        <div>
            <label htmlFor="" class="text-[#20170E] text-xs">Nome</label>
            <input type="text" placeholder="Nome" class="w-full bg-[#F3DFA0] border-[1px] rounded-sm border-[#20170E] text-xs py-[6px] text-[#20170E] pl-[4px] placeholder-[#20170E] outline-none edit-product-nome" value="${infos.nome}">
        </div>

        <div>
            <label htmlFor="" class="text-[#20170E] text-xs">Categoria</label>
            <select type="text" placeholder="Tipo" class="w-full bg-[#F3DFA0] border-[1px] rounded-sm border-[#20170E] text-xs py-[6px] text-[#20170E] pl-[2px] placeholder-[#20170E] outline-none edit-product-tipo">
                <option value="${(infos.tipo).toLocaleLowerCase()}">${infos.tipo}</option>
                ${productTypes.types.map(element => 
                    `<option value="${element.toLowerCase()}">${element}</option>`
                ).join('')}
            </select>
        </div>
        <div>
            <label htmlFor="" class="text-[#20170E] text-xs">Descrição</label>
            <input type="text" placeholder="Descrição" class="w-full bg-[#F3DFA0] border-[1px] rounded-sm border-[#20170E] text-xs py-[6px] text-[#20170E] pl-[4px] placeholder-[#20170E] outline-none edit-product-descricao" value="${infos.descricao}">
        </div>
    </div>
        <div class="flex flex-col">
            <div>
            <label htmlFor="" class="text-[#20170E] text-xs">Preço</label>
                <input type="text" placeholder="Preço" class="w-full bg-[#F3DFA0] border-[1px] border-[#20170E] rounded-sm text-xs py-[6px] text-[#20170E] pl-[4px] placeholder-[#20170E] outline-none edit-product-preco" value="R$${Number(infos.preco).toFixed(2)}">  
            </div>

            <div>
            <label htmlFor="" class="text-[#20170E] text-xs">Estoque</label>
                <input type="number" placeholder="Estoque" class="w-full bg-[#F3DFA0] border-[1px] border-[#20170E] rounded-sm text-xs py-[6px] text-[#20170E] pl-[4px] placeholder-[#20170E] outline-none edit-product-estoque" value="${Number(infos.estoque)}">
        </div>
    </div>
    </div>   
    <div class="w-full flex gap-2">
        <div class="w-full bg-[#20170E] text-[#F3DFA0] py-2 text-center rounded-xl cursor-pointer salvar-alteracoes">Salvar alterações</div> 
        <div class="px-6 bg-red-600 text-[#F3DFA0] py-2 text-center rounded-xl cursor-pointer close-popup-edit-product">Cancelar</div>
    </div>
    `

    const salvar = div.querySelector('.salvar-alteracoes')?.addEventListener('click', () => {
        const productNome = div.querySelector('.edit-product-nome') as HTMLInputElement
        const productTipo = div.querySelector('.edit-product-tipo') as HTMLInputElement
        const productDescricao = div.querySelector('.edit-product-descricao') as HTMLInputElement
        const productPreco = div.querySelector('.edit-product-preco') as HTMLInputElement
        const productEstoque = div.querySelector('.edit-product-estoque') as HTMLInputElement
    
        if(!productNome || !productTipo || !productDescricao || !productPreco || !productEstoque) return
    
        const productNewInfos = {
            id: infos.id,
            nome: productNome.value,
            tipo: productTipo.value,
            descricao: productDescricao.value,
            preco: productPreco.value,
            estoque: productEstoque.value
        }

        changeProductInfos(productNewInfos)
    })   

    editProductContainer.appendChild(div)
    editProductContainer.style.display = 'block'

    const closeProductContainer = div.querySelectorAll('.close-popup-edit-product')
    if (!closeProductContainer) return
    closeProductContainer.forEach(element => {
        element.addEventListener('click', () => {
            editProductContainer.style.display = 'none'
        })
    })
}

async function getTypeProducts() {
    const response = await fetch('http://localhost:3000/pages/dashboard/productTypes')
    if (!response.ok) return
    const data = await response.json()
    return data
}

async function changeProductInfos(newInfos: any) {
    const response = await fetch('http://localhost:3000/pages/dashboard', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "action": "updateProduct",
            "newInfos": newInfos
        })
    })

    if(!response.ok) return

    const data = await response.json()
    console.log(data)
}