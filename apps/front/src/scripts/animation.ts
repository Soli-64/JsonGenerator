
function randomColor(): number {
    const tmp = Math.round(Math.random() * 255)
    return tmp
}

export function animateColorBg(elementId: string): void {

    const element: HTMLElement | null = document.querySelector(`#${elementId}`)

    let i = 0

    document.addEventListener('mousemove', (e: any) => {
        if (!element?.contains(e.target)) {
          i = 1
          console.log('test')
        }
        else {
            console.log('test2')
            i = 0
                setTimeout(() => {
                    element.style.background = `linear-gradient(to right, rgb(${randomColor()}, ${randomColor()}, ${randomColor()}), rgb(${randomColor()}, ${randomColor()}, ${randomColor()}))`
                }, 10)
        }
      });
}

export function animateMenu(): void {
    const suggestionsList: HTMLElement | null = document.getElementById('suggestions');

    function showSuggestions(): void {
        suggestionsList?.classList.toggle('not-visible')
    }

    const triggerButton: HTMLElement | null = document.querySelector('#elements-adder');
    if (triggerButton) {
    triggerButton.addEventListener('click', () => {showSuggestions()});
    };
}

