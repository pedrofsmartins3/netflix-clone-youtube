import React, { useEffect, useState } from 'react'
import axios from "./axios"
import requests from "./Requests"
import "./Banner.css"

function Banner() {

    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fecthData() {
            //axios que criamos sempre começa o fetch com o base URL
            //depois usamos um requests url que criamos
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                //quero um random movie desde 0 ao length da data
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return requests;
        }
        fecthData()
    }, [])

    function truncate(string, n) {
        return string?.length > n ? string.substring(0, n - 1) + '...' :  string;
    }

  return (
    <header className='banner' style={{
        backgroundSize: 'cover',
        // este inicio de url é o certo para sempre ter a imagem perfeita no que toca ao tmdb
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center"
    }}>
        <div className='banner_contents'>
            {/*aqui como pode vir em alguma destas formas, damos todas as opções*/}
            <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className='banner_buttons'>
                <button className='banner_button'>Play</button>
                <button className='banner_button'>My List</button>
            </div>
            <h1 className='banner_description'>{truncate(movie?.overview, 150)}</h1>  
        </div>

        
        {/*truque para criar um fade no fundo da Div que tem como fundo a imagem*/}
        <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner