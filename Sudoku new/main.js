const a = document.querySelectorAll('input')

for (let i = 0; i < 81; i++) {
  a[i].setAttribute('id', `i${i}`)
  
}

document.querySelector('#clear').addEventListener('click',function(e){

  for (i = 0; i < 81; i++) {
    a[i].value='';
  }
})