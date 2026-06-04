 
const form = document.querySelector(".register-form");
const firstnameEl = document.querySelector(".firstname");
const lastnameEl = document.querySelector(".lastnameEl");
const emailEl = document.querySelector(".email")
const passwordEl = document.querySelector(".password");
/*const roleEl = document.querySelector(".role");*/

const submitEl = document.querySelector(".submit")


async function registerfunc(name ,surname, gmail , password , role) {
    const res = await fetch(`${baseUrl}/api/auth/register`,{
           method : "POST",

    headers : {
        "Content-Type" : "application-json",
    },

        body: JSON.stringify({
       firstName: name,
        lastName: surname ,
        email: gmail,
        password: password,
        role: role
    })

    
    })
 

const data = await res.json() 

console.log(await res)

console.log(data)
   
   
}



form.addEventListener("submit",(e) => {
e.preventDefault(
    firstnameEl.value,
    lastnameEl.value,
    emailEl.value,
    passwordEl.value,
   )
})