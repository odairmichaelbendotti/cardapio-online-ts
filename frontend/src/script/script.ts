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
    nascimento: string
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

// Renderiza o menu em todas as páginas quando o DOM é carregado
document.addEventListener('DOMContentLoaded', async () => {
    
    const token = localStorage.getItem('userToken')

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
       
        if(userToken.message) {
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

async function isAuth () {
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