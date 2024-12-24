"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Renderiza o menu em todas as páginas quando o DOM é carregado
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    hoverMenu();
    const verifyMenuHamburger = document.querySelector('.menu-hamburger');
    verifyMenuHamburger ? menuHamburger() : alert('Não carregou');
    showPassword();
    cadastrarUsuario();
});
// Cria um menu estático no HTML que serve para renderizar em todas as páginas
function loadMenu() {
    const header = document.getElementsByTagName('header')[0];
    if (!header)
        return;
    // Botão hamburger
    const hamburgerBtn = document.createElement('div');
    hamburgerBtn.className = 'text-2xl px-6 py-4 md:hidden menu-hamburger text-white';
    //font awesome ícone de hamburger
    const iconHamburger = document.createElement('i');
    iconHamburger.className = 'fa-solid fa-bars text-white';
    // Nav que receberá o conteúdo
    const nav = document.createElement('nav');
    nav.className = 'hidden fixed top-10 left-28 md:static my-4 flex-col px-4 md:flex md:flex-row md:justify-between nav-menu';
    const storedUser = localStorage.getItem('userInfos');
    if (storedUser) {
        const userLogged = JSON.parse(storedUser);
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
`;
    }
    else {
        nav.innerHTML = `
        <div class="px-6 text-center py-[2px] uppercase font-bold md:px-6 border-[2px] border-[#20170E] index"><a href="/index.html">Burger Land</a></div>
        <div class="mt-4 flex flex-col items-center gap-6 md:flex-row md:mt-0 menu-items">
        <a href="/pages/login.html"><ul class="py-[2px] px-4 cursor-pointer hover:opacity-70 border-[#20170E] border-[2px] acessar">Acessar</ul></a>          
        </div>`;
    }
    const sair = nav.querySelector('.deslogar');
    if (sair) {
        sair.addEventListener('click', () => {
            localStorage.removeItem('userInfos');
            window.location.href = '/pages/login.html';
        });
    }
    else {
    }
    hamburgerBtn.appendChild(iconHamburger);
    header.appendChild(hamburgerBtn);
    header.appendChild(nav);
}
// function removerElements() {
//     if (!localStorage.getItem('userInfos')) {
//         document.querySelector('.cardapio')?.remove()
//         document.querySelector('.produtos')?.remove()
//     } else {
//         document.querySelector('.acessar')?.remove()
//     }
// }
// Cria o menu hamburger e adiciona o evento de click para ocultar o nav inteiro quando clicado.
function menuHamburger() {
    const iconHamburger = document.querySelector('.menu-hamburger i');
    const nav = document.querySelector('.nav-menu');
    if (!iconHamburger || !nav) {
        alert('Não carregou');
        return;
    }
    iconHamburger.addEventListener('click', () => {
        iconHamburger.classList.toggle('fa-bars');
        iconHamburger.classList.toggle('fa-xmark');
        nav.classList.toggle('hidden');
    });
}
// Aplica a classe active-menu conforme pathname de cada link.
function hoverMenu() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const link = window.location.pathname;
    const verifyMenu = document.querySelector('.nav-menu');
    if (!verifyMenu)
        return;
    switch (link) {
        case '/pages/cardapio.html':
            (_a = document.querySelector('.cardapio')) === null || _a === void 0 ? void 0 : _a.classList.remove('border-b-[#20170E]');
            (_b = document.querySelector('.cardapio')) === null || _b === void 0 ? void 0 : _b.classList.add('active-menu');
            break;
        case '/pages/produtos.html':
            (_c = document.querySelector('.produtos')) === null || _c === void 0 ? void 0 : _c.classList.remove('border-b-[#20170E]');
            (_d = document.querySelector('.produtos')) === null || _d === void 0 ? void 0 : _d.classList.add('active-menu');
            break;
        case '/pages/dashboard.html':
            (_e = document.querySelector('.dashboard')) === null || _e === void 0 ? void 0 : _e.classList.remove('border-b-[#20170E]');
            (_f = document.querySelector('.dashboard')) === null || _f === void 0 ? void 0 : _f.classList.add('active-menu');
            break;
        case '/pages/minha-conta.html':
            (_g = document.querySelector('.minha-conta')) === null || _g === void 0 ? void 0 : _g.classList.remove('border-b-[#20170E]');
            (_h = document.querySelector('.minha-conta')) === null || _h === void 0 ? void 0 : _h.classList.add('active-menu');
            break;
        case '/pages/carrinho.html':
            (_j = document.querySelector('.carrinho')) === null || _j === void 0 ? void 0 : _j.classList.remove('border-b-[#20170E]');
            (_k = document.querySelector('.carrinho')) === null || _k === void 0 ? void 0 : _k.classList.add('active-menu');
            break;
        case '/pages/login.html':
        case '/pages/cadastro.html':
            const loginBtn = document.querySelector('.acessar');
            if (!loginBtn)
                return;
            loginBtn.classList.add('active-menu-login');
            break;
        case '/index.html':
            (_l = document.querySelector('.index')) === null || _l === void 0 ? void 0 : _l.classList.remove('border-[#20170E]');
            (_m = document.querySelector('.index')) === null || _m === void 0 ? void 0 : _m.classList.add('active-menu-home');
            break;
    }
    console.log(link);
}
// Mostra a senha (clicar no cadeado do menu que faz login e de criar usuário)
function showPassword() {
    const btnEyes = document.querySelectorAll('.show-password');
    const passwordInputs = document.querySelectorAll('.password-input');
    if (!btnEyes || !passwordInputs)
        return;
    btnEyes.forEach((btnEye, index) => {
        btnEye.addEventListener('click', () => {
            // Obter o input correspondente pelo índice
            const passwordInput = passwordInputs[index];
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                btnEye.classList.remove('fa-lock');
                btnEye.classList.add('fa-unlock');
            }
            else {
                passwordInput.type = 'password';
                btnEye.classList.remove('fa-unlock');
                btnEye.classList.add('fa-lock');
            }
        });
    });
}
function cadastrarUsuario() {
    return __awaiter(this, void 0, void 0, function* () {
        const btnCadastrar = document.getElementById('cadastrar-usuario');
        const userNome = document.getElementById('user-nome');
        const userEmail = document.getElementById('user-email');
        const userPassword = document.getElementById('user-password');
        const userConfirmPassword = document.getElementById('user-confirm-password');
        const userWhatsApp = document.getElementById('user-whatsapp');
        const userAniversario = document.getElementById('user-aniversario');
        const userCep = document.getElementById('user-cep');
        const userCidade = document.getElementById('user-cidade');
        const userBairro = document.getElementById('user-bairro');
        const userNumero = document.getElementById('user-numero');
        const userReferencia = document.getElementById('user-referencia');
        if (!btnCadastrar)
            return;
        if (!userCep || !btnCadastrar)
            return;
        btnCadastrar.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            if (!userNome || !userEmail || !userPassword || !userConfirmPassword || !userWhatsApp || !userAniversario || !userNumero || !userReferencia)
                return;
            const userData = {
                name: userNome.value,
                email: userEmail.value,
                password: userPassword.value,
                whatsApp: userWhatsApp.value,
                aniversario: userAniversario.value,
                cep: userCep.value,
                cidade: userCidade.value,
                bairro: userBairro.value,
                numero: userNumero.value,
                referencia: userReferencia.value,
                role: false
            };
            const userSignIn = yield cadastrarUsuarioAoBD(userData);
        }));
        userCep.addEventListener('blur', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield pegarEnderecoViaCep(`${userCep.value}`);
            if (!data) {
                alert('CEP não encontrado');
                return;
            }
            userCidade.value = data.localidade;
            userBairro.value = data.bairro;
        }));
        userConfirmPassword.addEventListener('blur', () => {
            if (userPassword.value !== userConfirmPassword.value) {
                alert('As senhas não conferem.');
            }
        });
    });
}
function cadastrarUsuarioAoBD(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/pages/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = yield response.json();
            console.log(result);
            return result;
        }
        catch (error) {
            console.log('Erro na função cadastrarUsuarioAoBD()');
            console.log(error);
        }
    });
}
// Função que faz uma requisição ao VIACEP para pegar informações sobre o endereço
function pegarEnderecoViaCep(cep) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cep.length < 8) {
            alert('cep inválido.');
            return;
        }
        const response = yield fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok)
            return;
        const data = yield response.json();
        return data;
    });
}
// Verificar se o botão de login existe no DOM, faz a requisição ao BD, recebe os dados do usuário do BD e depois armazena no localStorage
const loginBtn = document.getElementById('login-user-button');
if (loginBtn) {
    const userEmail = document.getElementById('user-login-email');
    const userPassword = document.getElementById('user-login-password');
    const userNotFound = document.querySelector('.user-login-error');
    loginBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!userEmail || !userPassword)
            return;
        const userData = yield loginGetUserInfos(userEmail.value, userPassword.value);
        if (!userData)
            return;
        if (userData.message) {
            userNotFound === null || userNotFound === void 0 ? void 0 : userNotFound.classList.remove('hidden');
            return;
        }
        localStorage.setItem('userInfos', JSON.stringify(userData));
        window.location.href = '/pages/cardapio.html';
    }));
}
function loginGetUserInfos(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/pages/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response)
            return;
        const data = yield response.json();
        return data;
    });
}
