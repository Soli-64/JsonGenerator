type Params = {
    key: string | null | undefined,
    modifkey: string | null | undefined,
    value: string | null | undefined,
    modifvalue: any,
    modifier1: any[],
    modifier2: any[],
    lineNumber: number
}

export function generateJsonLine(pkey: any, pvalue: any): string {

    const key: string = pkey
    let value: any = pvalue 

    console.log(key, value)

    if (key && value) {

        if (typeof value === 'string') value = `"${value}"`;

        // const object: object = {}
        // object[key] = value

        return `"${key}": ${value}`

    } else {
        return `"Saisissez des valeurs corrects"`
    }
}

export function getLineParams(): any[] {
    const params: any[] = []
    const key: string | null | undefined = document.querySelector<HTMLInputElement>('#key')?.value
    params.push(key)
    const value = document.querySelector<HTMLInputElement>('#value')?.value
    params.push(value)
    return params
}

export function getMLineParams(): Params {
    const params: Params = {
        key: '',
        modifkey: '',
        value: '',
        modifvalue: '',
        modifier1: [],
        modifier2: [],
        lineNumber: 5
    }
    const initkey = document.querySelector('#initkey') as HTMLInputElement
    params.key = initkey.value
    const modifkey = document.querySelector('#modifkey') as HTMLInputElement
    params.modifkey = modifkey.value
    const initvalue: string | null | undefined = document.querySelector<HTMLInputElement>('#initvalue')?.value
    params.value = initvalue
    const modifvalue: any = document.querySelector<HTMLInputElement>('#modifvalue')?.value
    params.modifvalue = modifvalue
    const linenumber: any = document.querySelector<HTMLInputElement>('#line-number')?.value
    params.lineNumber = linenumber

    params.modifier1[0] = document.querySelector<HTMLButtonElement>(`#modif1`)?.name
    params.modifier1[1] = document.querySelector<HTMLButtonElement>(`#op1`)?.name

    params.modifier2[0] = document.querySelector<HTMLButtonElement>(`#modif2`)?.name
    params.modifier2[1] = document.querySelector<HTMLButtonElement>(`#op2`)?.name
    
    return params
}

export function modify(pvalue: any, pmodifier: any, pelement: any, pmodiftype: any) {
    const value = pvalue
    const modifierType = pmodifier
    const modifierElement = pelement
    const func = (mod: string, val: string, elem: any): any => {
        if (mod === 'add') {
            if (pmodiftype === 'int') return Number(val) + Number(elem)
            else if (pmodiftype === 'str') return val + elem
        }
        else if (mod === 'soustract') {
            if (pmodiftype === 'int') return Number(val) * 1 - Number(elem)
            else if (pmodiftype === 'str') {
                const regex = new RegExp(elem, 'gi')
                return val.replace(regex, '')
            }
        } 
        else return 'sélectionnez des boutons'
    }
    if (typeof modifierElement === 'string') {
        return func(modifierType, value, modifierElement)
    } else if (typeof modifierElement === 'number') {
        return func(modifierType, value, modifierElement * 1)
    } else {
        return 'nope'
    }
}
