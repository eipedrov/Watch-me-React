//Componente filho

//Imports
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

//Tipagens
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

//funcoes
export function SideBar({handleClickButton,selectedGenreId } : SideBarProps) { //desestruturacao das funcoes
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => { //separa os filmes por genero
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  return( //estruturacao da sidebar
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id} //filtra quais filmes aparecerao pelo genero(funcao filho)
            />
          ))}
        </div>
      </nav>
  )
}