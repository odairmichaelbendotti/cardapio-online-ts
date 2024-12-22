
// Renderiza o menu em todas as páginas quando o DOM é carregado
document.addEventListener('DOMContentLoaded', () => {
    loadMenu()
    hoverMenu()
    
    const verifyMenuHamburger = document.querySelector('.menu-hamburger')
    verifyMenuHamburger ? menuHamburger() : alert('Não carregou')
    showPassword()
    loginTemporario()
    userNameOnHeader()
})

// Cria um menu estático no HTML que serve para renderizar em todas as páginas
function loadMenu() {
    const header = document.getElementsByTagName('header')[0]
    if (!header) return

    // Botão hamburger
    const hamburgerBtn = document.createElement('div')
    hamburgerBtn.className = 'text-2xl px-6 py-4 md:hidden menu-hamburger text-white'

    //font awesome ícone de hamburger
    const iconHamburger  = document.createElement('i')
    iconHamburger.className = 'fa-solid fa-bars text-white'

    // Nav que receberá o conteúdo
    const nav = document.createElement('nav')
    nav.className = 'hidden my-4 flex-col px-4 md:flex md:flex-row md:justify-between nav-menu'
    
    nav.innerHTML = `
            <div class="text-center py-[2px] uppercase font-bold md:px-6 index border-[2px] border-[#20170E]"><a href="/index.html">Burger Land</a></div>
            <div class="mt-4 flex flex-col items-center gap-6 md:flex-row md:mt-0 menu-items">
                <a href="/pages/cardapio.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 cardapio border-b-[#20170E] border-b-[2px]">Cardápio</ul></a>
                <a href="/pages/produtos.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 produtos border-b-[#20170E] border-b-[2px]">Produtos</ul></a>
                <a href="/pages/login.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 acessar border-[#20170E] border-[2px]">Acessar</ul></a>
            </div>
    `
    hamburgerBtn.appendChild(iconHamburger)
    header.appendChild(hamburgerBtn)
    header.appendChild(nav)
}

// Cria o menu hamburger e adiciona o evento de click para ocultar o nav inteiro quando clicado.
function menuHamburger() {
    const menu = document.querySelector('.menu-hamburger')
    const nav = document.querySelector('.nav-menu')
    
    if(!menu || !nav) {
        alert('Não carregou')
        return
    }

    menu.addEventListener('click', () => {
        nav.classList.toggle('hidden')
    })
}

// Aplica a classe active-menu conforme pathname de cada link.
function hoverMenu() {
    const link = window.location.pathname
    
    const verifyMenu = document.querySelector('.nav-menu')
    if(!verifyMenu) return

    switch(link) {
        case '/pages/cardapio.html':
            document.querySelector('.cardapio')?.classList.remove('border-b-[#20170E]')
            document.querySelector('.cardapio')?.classList.add('active-menu')
        break
        case '/pages/produtos.html':
            document.querySelector('.produtos')?.classList.remove('border-b-[#20170E]')
            document.querySelector('.produtos')?.classList.add('active-menu')
        break
        case '/pages/login.html':
            case '/pages/cadastro.html':
            const loginBtn = document.querySelector('.acessar')

            if(!loginBtn) return
            loginBtn.classList.add('active-menu-login')
        break
        case '/index.html':
            document.querySelector('.index')?.classList.remove('border-[#20170E]')
            document.querySelector('.index')?.classList.add('active-menu-home')
        break


    }

    console.log(link)
}

function showPassword() {
    const btnEye = document.querySelector('.show-password')
    const passwordInput = document.querySelector('.password-input') as HTMLInputElement

    btnEye?.addEventListener('click', () => {

        btnEye.classList.toggle('fa-lock')      
        btnEye.classList.toggle('fa-unlock')

        if (btnEye.classList.contains('fa-lock')) {
            passwordInput.type = 'password'
        } else {
            passwordInput.type = 'text'
        }

    })
}

function loginTemporario() {
    const user: User = {
        name: 'Odair Michael Bendotti',
        email: 'odair.michael@hotmail.com',
        password: '123'
    }

    const btnLogin = document.querySelector('.login-button')?.addEventListener('click', () => {
    localStorage.setItem('user', JSON.stringify(user))
    })
}

interface User {
    name: string
    email: string
    password: string
}

function userNameOnHeader() {
    const loginAcesso = document.querySelector('.acessar')
    const menuItems = document.querySelector('.menu-items')

    const storedUser = localStorage.getItem('user')
    if (!storedUser) return
    const usuario: User = JSON.parse(storedUser) 

    if (loginAcesso) {
        loginAcesso.classList.add('hidden')
        
        const helloUser = document.createElement('div')
        helloUser.textContent = `Olá, ${usuario.name.split(' ')[0]}`

        menuItems?.appendChild(helloUser)

    }

}
