console.log('Carosello Objects')

const images = [
    {
        image: 'img/01.webp',
        title: "Marvel's Spiderman Miles Morale",
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    },
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    },
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: 'Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.',
    },
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
    },
]


const imagesDOMEl = document.querySelector('.images')
const thumbsDOMEl = document.querySelector('.thumbs')
const btnUpEl = document.querySelector('.btn_up')
const btnDownEl = document.querySelector('.btn_down')
// variabile di stato per gestire le funzioni nextImage e prevImage
let index = 0

const thumbListDivEl = document.createElement('div')
thumbListDivEl.classList.add('thumb_list')
thumbsDOMEl.append(thumbListDivEl)

addImagesDynamicallyFrom(images)
// una volta aggiunti dinamicamente i dati, recupero le collections HTML per gestire il render della prima slide e usare gli array per nextImgae e PrevImage
const imageDOMElements = document.getElementsByClassName('image')
const imageInfoDOMElements = document.getElementsByClassName('image_info')
const firstImageEl = imageDOMElements[0]
const firstInfoEl = imageInfoDOMElements[0]
firstImageEl.classList.add('active')
firstInfoEl.classList.add('active')

btnDownEl.addEventListener('click', nextImage)
btnUpEl.addEventListener('click', prevImage)
const autoPlay = setInterval(nextImage, 3000)
clickOnThumbnail()

// FUNZIONI
function addImagesDynamicallyFrom(arrayOfObjects) {
    arrayOfObjects.forEach((element, index) => {
        // recupero le proprietà dell'oggetto images
        const imgSrc = element.image
        const title = element.title
        const text = element.text

        // creo l'elemento del DOM img per visualizzare le immagini
        const imageEl = document.createElement('img')
        imagesDOMEl.append(imageEl)
        imageEl.src = imgSrc
        imageEl.classList.add('image')

        const thumbEl = document.createElement('div')
        thumbEl.classList.add('thumb')
        thumbListDivEl.append(thumbEl)
        const thumbImgEl = document.createElement('img')
        thumbEl.append(thumbImgEl)
        // assegno alle thumb l'attributo 'data-index' per memorizzare l'indice dell'immagine associata
        thumbEl.setAttribute('data-index', index)
        thumbImgEl.src = imgSrc

        // creo elemento div per le info delle immagini
        const divInfoEl = document.createElement('div')
        divInfoEl.classList.add('image_info')
        imagesDOMEl.append(divInfoEl)

        // creo gli elementi che contengo le info (h1 e p) e le appendo al div info
        const titleEl = document.createElement('h1')
        const textEl = document.createElement('p')
        titleEl.classList.add('image_info-title')
        textEl.classList.add('image_info-description')
        divInfoEl.append(titleEl)
        divInfoEl.append(textEl)

        // aggiungo le proprietà title e text ai due elementi h1 e p
        titleEl.innerHTML = title
        textEl.innerHTML = text
    })
}

function nextImage() {
    imageDOMElements[index].classList.remove('active')
    imageInfoDOMElements[index].classList.remove('active')
    index++
    if (index >= imageDOMElements.length) {
        index = 0
    }
    imageDOMElements[index].classList.add('active')
    imageInfoDOMElements[index].classList.add('active')
}

function prevImage() {
    imageDOMElements[index].classList.remove('active')
    imageInfoDOMElements[index].classList.remove('active')
    if (index === 0) {
        index = imageDOMElements.length
    }
    index--
    imageDOMElements[index].classList.add('active')
    imageInfoDOMElements[index].classList.add('active')
}

function clickOnThumbnail() {
    const thumbDOMElements = document.getElementsByClassName('thumb')

    for (let i = 0; i < thumbDOMElements.length; i++) {
        const currentThumb = thumbDOMElements[i]
        currentThumb.addEventListener('click', function () {
            // ottengo l'indice associato al thumb cliccato
            const thumbIndex = parseInt(currentThumb.getAttribute('data-index'))

            // rimuovo la classe 'active' da tutte le immagini e relative info
            for (let k = 0; k < imageDOMElements.length; k++) {
                imageDOMElements[k].classList.remove('active')
                imageInfoDOMElements[k].classList.remove('active')
            }

            // Imposta l'immagine corrispondente al thumb cliccato come attiva e ripristino la variabile di stato index = thumbIndex per sincronizzare gli eventi
            imageDOMElements[thumbIndex].classList.add('active')
            imageInfoDOMElements[thumbIndex].classList.add('active')
            index = thumbIndex //sincronizzo gli indici 
        });
    }
}