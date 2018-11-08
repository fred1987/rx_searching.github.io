import { from, fromEvent, Observable, of } from 'rxjs'
import { catchError, debounceTime, distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators'

const inputEl: HTMLInputElement = document.querySelector('input') as HTMLInputElement
const resEl: HTMLDivElement = document.querySelector('#result') as HTMLDivElement

type res = { incomplete_results: boolean, items: Array<any>, total_count: number }

function request$(str: string): Promise<res> {
    return fetch(`https://api.github.com/search/repositories?q=${str}&sort=stars&order=desc`)
        .then((res: Response) => res.json())
}

const stream$: Observable<string> = fromEvent(inputEl, 'input').pipe(
    pluck<Event, string>('target', 'value'),
    debounceTime(700),
    distinctUntilChanged(),
    switchMap<string, res>((x: string) => (x.length > 0) ? from(request$(x)) : of('')),
    map((x: res | string) => (typeof x === 'string') ? '' : x.items.map(x => `<p>${x.html_url}</p>`).join(''))
)

stream$.subscribe(
    (data: string) => resEl.innerHTML = data
)