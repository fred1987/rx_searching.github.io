import { from, fromEvent, interval } from 'rxjs'
import { debounce, map, pluck, switchMap } from 'rxjs/operators'

const input: HTMLInputElement = document.querySelector('input')
const res: HTMLDivElement = document.querySelector('#result')

type res = { incomplete_results: boolean, items: Array<any>, total_count: number }

function request$(str): Promise<res> {
    return fetch(`https://api.github.com/search/repositories?q=${str}&sort=stars&order=desc`)
        .then((res: Response) => res.json())
}

fromEvent(input, 'input').pipe(
    pluck('target', 'value'),
    debounce(() => interval(1000)),
    switchMap(x => from(request$(x))),
    map((x: res) => x.items.map(x => `<p>${x.html_url}</p>`).join(''))
).subscribe(
    (data: string) => res.innerHTML = data
)