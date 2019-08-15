const form = document.querySelector('form')
const input = document.querySelector('input')
const error = document.querySelector('.error')
const btns = document.querySelectorAll('button')
const formAct = document.querySelector('form span')

let activity = 'cycling'

btns.forEach(btn => {
  btn.addEventListener('click', e => {
    activity = e.target.dataset.activity
    btns.forEach(btn => btn.classList.remove('active'))
    e.target.classList.add('active')
    input.setAttribute('id', activity)
    //Set span text in form
    formAct.textContent = activity

    update(data)
  })
})

// Form Submit
form.addEventListener('submit', e => {
  e.preventDefault()

  const distance = parseInt(input.value)

  if (distance) {
    db.collection('activities')
      .add({
        distance,
        activity,
        date: new Date().toString()
      })
      .then(() => {
        error.textContent = ''
        input.value = ''
      })
  } else {
    error.text = 'Please enter a valid distance'
  }
})
