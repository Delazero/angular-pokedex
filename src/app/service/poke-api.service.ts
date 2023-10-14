import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  constructor(private http: HttpClient) { }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap(res => res),
      tap(res => {
        console.log(res);
        res.results.map((resPokemons: any) => {

          this.apiGetPokemons(resPokemons.url).subscribe(
            res => {
              resPokemons.status = res
            }
          );

        })
      })
    );
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      tap(res => res),
      tap(
        res => {
          //console.log(res)
          if (res.types === null || res.types === undefined) return res = res
          for (let type of res?.types) {
            type.color = elementosCores[type?.type?.name];
          }

          res = res
        }
      )
    )
  }
}

const elementosCores: Record<string, string> = {
  normal: '#a4acaf',
  fighting: '#d56723',
  flying: '#3dc7ef',
  poison: '#b97fc9',
  ground: '#ab9842',
  rock: '#a38c21',
  bug: '#729f3f',
  ghost: '#7b62a3',
  steel: '#9eb7b8',
  fire: '#fd7d24',
  water: '#4592c4',
  grass: '#9bcc50',
  electric: '#eed535',
  psychic: '#f366b9',
  ice: '#51c4e7',
  dragon: '#f16e57',
  dark: '#707070',
  fairy: '#fdb9e9',
  unknown: '#a4acaf',
  shadow: '#707070'
};
