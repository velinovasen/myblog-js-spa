function init_loader() {
    navigate('home')
}

init_loader()

window.addEventListener('popstate', (e) => {
    router(location.pathname.slice(1))  
})


const DOMSelectors = {
    titleInput: () => document.getElementById('title-input'),                               // most likely this will be the input fields from the form
    categoryInput: () => document.getElementById('category-input'),
    contentInput: () => document.getElementById('content-input'),

    titleEditInput: () => document.getElementById('title-edit-input'),                               // most likely this will be the input fields from the form
    categoryEditInput: () => document.getElementById('category-edit-input'),
    contentEditInput: () => document.getElementById('content-edit-input'),
}


// NAVBAR BUTTONS 

function createNewItem(event) {
    event.preventDefault()

    navigate(event.target.href)
}

function homeButton(event) {
    event.preventDefault()

    if (event.target.parentElement.id === 'close-btn') {
        navigate(event.target.parentElement.href)
    } else {
    navigate(event.target.href)
}}

function logoutButton(event) {
    event.preventDefault()

    localStorage.removeItem('auth')
    setTimeout(function(){navigate('home')}, 700)
}
// LOGIN AND REGISTER BUTTONS

function registerNowButton(event) {      // register button click, redirect to register template
    event.preventDefault()

    console.log(event.target.href)

    navigate(event.target.href)
}

function loginNowButton(event) {
    event.preventDefault()

    console.log(event.target.href)

    navigate(event.target.href)
}

function loginSubmitButton(event) {
    event.preventDefault()

    let email = document.getElementById('email-login-input').value;
    let password = document.getElementById('password-login-input').value;

    authServices.loginUser(email, password)
    setTimeout(function() {navigate('home')}, 700)
    
    
}

function registerSubmitButton(event) {
    event.preventDefault()

    let email = document.getElementById('email-register-input').value;
    let password = document.getElementById('password-register-input').value;
    let password2 = document.getElementById('password2-register-input').value;
    
    if (!email || !password || !password2) {
        return;
    }
    if (password.length < 6 || password !== password2) {
        return;
    }

    const data = authServices.registerUser(email, password);
    
    setTimeout(function() {navigate('home')}, 700);
  
}

// ITEMS BUTTONS

function deleteItem(event) {
    event.preventDefault()
    const id = event.target.className;

    itemServices.deleteItemFetch(id)
    console.log('DELETED');
    setTimeout(function() { navigate('/home') }, 700)
}

async function editItemButtonSubmit(event) {
    event.preventDefault()
    const id = event.target.id                                                       // will need to adjust this 
    const title = DOMSelectors.titleEditInput().value;                            /// need to adjust
    const category = DOMSelectors.categoryEditInput().value;
    const content = DOMSelectors.contentEditInput().value;
    const isOk = correctInputChecker(title, category, content);

    if (isOk) {
    console.log(id, title, category, content);
       itemServices.editItemFetch(id, {title, category, content})
    
       setTimeout(function() { navigate('/home') }, 1200)
    }

}

function editItem(event) {                      //edit item button 
    event.preventDefault()

    const title = event.target.parentElement.getElementsByClassName('title-data-for-edit')[0].innerText;
    const category = event.target.parentElement.getElementsByClassName('category-data-for-edit')[0].innerText;
    const content = event.target.parentElement.getElementsByClassName('content-data-for-edit')[0].innerText;
    const id = event.target.className;

    document.getElementById('title-edit-input').value = title;
    document.getElementById('category-edit-input').value = category;
    document.getElementById('content-edit-input').innerText = content;
    document.getElementsByClassName('edit-submit-button')[0].id = id;

    document.getElementById('toggle-edit').style.display = 'block';

}

function buyItem(event) {                       // buy the item button
    event.preventDefault()
    let itemId = event.target.id;
    console.log(event.target.parentElement)
    let user = JSON.parse(localStorage.getItem('auth'))
    let buyer = user.email;
    itemServices.buyShoes(itemId, buyer)        
    setTimeout(function() { navigate('/details/' + itemId) }, 700)    
}

function detailsButton(event) {                          // details button
    event.preventDefault()

    navigate('/details/' + event.target.className)
}

function createItemButton(event) {                      // create item button
    event.preventDefault()

    const title = DOMSelectors.titleInput().value;                            /// need to adjust
    const category = DOMSelectors.categoryInput().value;
    const content = DOMSelectors.contentInput().value;

    const validator = correctInputChecker(title, category, content);
    
    if (!validator) {
        return;
    }

    itemServices.createOffer(title, category, content)

    DOMSelectors.titleInput().value = '';
    DOMSelectors.categoryInput().value = '';
    DOMSelectors.contentInput().value = '';

    console.log(title, category, content)

    setTimeout(function() {navigate('home')}, 700)

}

// correct input form checker

function correctInputChecker(title, category, content){

    let isOk = true;

    if (!/[A-z]+$/.test(title)) {
        isOk = false;
        return isOk;
    }
    if (!/[A-z]+$/.test(category)) {
        isOk = false;
        return isOk;
    }
    if (!/.+/.test(content)) {
        isOk = false;
        return isOk;
    }

    return isOk;

}