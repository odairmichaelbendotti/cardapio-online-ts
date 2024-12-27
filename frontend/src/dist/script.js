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
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem('userToken');
    if (!token)
        return;
    if (JSON.parse(token) !== '123') {
        const userData = yield isAuth();
        loadMenu(userData);
    }
    hoverMenu();
    const verifyMenuHamburger = document.querySelector('.menu-hamburger');
    verifyMenuHamburger ? menuHamburger() : alert('Não carregou');
    showPassword();
    cadastrarUsuario();
}));
// Cria um menu estático no HTML que serve para renderizar em todas as páginas
function loadMenu(authUser) {
    return __awaiter(this, void 0, void 0, function* () {
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
        nav.className = 'hidden fixed top-10 left-28 md:static my-4 flex-col px-4 md:flex md:flex-row md:justify-between nav-menu bg-[#20170E] py-4 rounded-2xl';
        const storedUser = authUser;
        if (storedUser.auth) {
            const userLogged = storedUser;
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
                // Limpa o token primeiro
                localStorage.setItem('userToken', '123');
                // Redireciona o usuário
                window.location.href = '/pages/login.html';
            });
        }
        hamburgerBtn.appendChild(iconHamburger);
        header.appendChild(hamburgerBtn);
        header.appendChild(nav);
    });
}
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
            };
            const userSignIn = yield cadastrarUsuarioAoBD(userData);
            if (!userSignIn.message)
                localStorage.setItem('userToken', JSON.stringify(userSignIn));
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
        const userToken = yield loginGetUserInfos(userEmail.value, userPassword.value);
        if (userToken.message) {
            userNotFound === null || userNotFound === void 0 ? void 0 : userNotFound.classList.remove('hidden');
        }
        else {
            window.location.href = '/pages/cardapio.html';
            if (!userNotFound)
                return;
            if (!userNotFound.classList.contains('hidden'))
                userNotFound === null || userNotFound === void 0 ? void 0 : userNotFound.classList.add('hidden');
            localStorage.setItem('userToken', JSON.stringify(userToken));
        }
    }));
}
function loginGetUserInfos(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
            // Retorna o token do usuário que fez login.
            return data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function isAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem('userToken');
        if (!token)
            return;
        const response = yield fetch('http://localhost:3000/validate-token', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${JSON.parse(token)}`
            }
        });
        if (!response.ok)
            return;
        const data = yield response.json();
        // Retorna um objeto com "auth" e "role" sendo true ou falso.
        console.log(data);
        return data;
    });
}
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/pages/cardapio');
        if (!response)
            return;
        const data = yield response.json();
        return data;
    });
}
function renderCardapio() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getAllProducts();
        if (!data)
            return;
        const containerCardapio = document.getElementById('product-area');
        if (!containerCardapio)
            return;
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'flex gap-4 bg-[#30271d] w-full p-4 rounded-xl shadow-sm shadow-[#30271d] hover:opacity-90 cardapio-items hover:cursor-pointer';
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
        `;
            div.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(`http://localhost:3000/pages/cardapio/${item.id}`);
                    if (!response.ok)
                        return;
                    const data = yield response.json();
                    console.log(data);
                    window.location.href = `/pages/cardapio/produto.html?id=${item.id}`;
                }
                catch (error) {
                    console.error(error);
                }
            }));
            const cartProducts = div.querySelectorAll('.cart-products');
            cartProducts.forEach(element => {
                element.addEventListener('click', () => {
                    alert(item.id);
                    event === null || event === void 0 ? void 0 : event.stopPropagation();
                });
            });
            containerCardapio.appendChild(div);
        });
    });
}
const currentPath = window.location.pathname;
if (currentPath === '/pages/cardapio.html') {
    renderCardapio();
}
