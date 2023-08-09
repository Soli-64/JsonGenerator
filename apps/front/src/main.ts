import './style.scss'
import { animateMenu } from './scripts/animation.ts'
import { getMLineParams, generateJsonLine, getLineParams, modify } from './scripts/generate.ts'

//animateColorBg('create-button')

document.querySelector('#create-button')?.addEventListener('click', () => {
    document.querySelector('')
})

const classes: string[] = ['modif', 'op']

for (const classe of classes) {
    for (let x: number = 1; x <= 2; x++) {
        document.querySelectorAll(`.${classe}${x}`).forEach(e => {
            e.addEventListener('click', () => {
                if (document.querySelector(`#${classe}${x}`)) {
                    document.querySelector(`#${classe}${x}`)?.classList.remove('selected')
                    document.querySelector(`#${classe}${x}`)?.setAttribute('id', '')
                    e.setAttribute('id', `${classe}${x}`)
                    e.classList.add('selected')
                } else {
                    e.classList.add('selected')
                    e.setAttribute('id', `${classe}${x}`)
                }
            })
        })
    }
}

document.querySelector('#generate-button')?.addEventListener('click', () => {
    const lineParams = getLineParams()
    const textarea = document.querySelector('.generate-container') as HTMLTextAreaElement
    const multiLineParams = getMLineParams()
    let key: any = multiLineParams.key, value: any = multiLineParams.value;
    let modifkey = multiLineParams.modifkey, modifvalue = multiLineParams.modifvalue;
    let modifierKeySymbol = multiLineParams.modifier1[1], modifierValueSymbol = multiLineParams.modifier2[1];
    let modifierKeyType = multiLineParams.modifier1[0], modifierValueType = multiLineParams.modifier2[0];

    textarea.value = '{ \n'
    if (lineParams[0] && lineParams[1]) textarea.value += `${generateJsonLine(lineParams[0], lineParams[1])}, \n`

    if (key && value) {
        if (modifierKeyType === 'int') key = Number(key)
        if (modifierValueType === 'int') value = Number(value)
    
        textarea.value += ` ${generateJsonLine( key, value )}`
    
        for (let x  = 0; x <= multiLineParams.lineNumber - 1; x++) {
            key = modify(key, modifierKeySymbol, modifkey, modifierKeyType)
            value = modify(value, modifierValueSymbol, modifvalue, modifierValueType)
            textarea.value += `, \n ${generateJsonLine(key, value)}`
        }
    }


    textarea.value += '\n }'

})

const copyButton = document.querySelector("#copy-button") as HTMLButtonElement;
const contentToCopy = document.querySelector(".generate-container") as HTMLTextAreaElement;

copyButton.addEventListener("click", () => {
  contentToCopy.select();

  navigator.clipboard.writeText(contentToCopy.value)
    .then(() => {
      copyButton.innerText = "Copié !";
      setTimeout(() => {
        copyButton.innerText = "Copier";
      }, 2000);
    })
    .catch(err => {
      console.error("Erreur lors de la copie : ", err);
    });
});

animateMenu()
