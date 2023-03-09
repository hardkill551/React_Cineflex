import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {PageContainer, SeatsContainer, CaptionContainer, CaptionItem, CaptionCircle, FormContainer, FooterContainer} from "./styled.js"
import Seats from "../../components/Seats"

export default function SeatsPage() {
    const parameters = useParams()
    const [seat, setSeat]=useState([])
    const [seats, setSeats]=useState([])
    const [selectedseats, setSelectedSeats] = useState({ids:[], name:"", cpf:""})
    const [nextPage, setNextPage] = useState(false)
    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parameters.idSessao}/seats`)
        promise.then(res=> {
            setSeats(res.data)
            setSeat(res.data.seats)
        })
        promise.catch(err=> console.log(err.response.data))
    
    },[])
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seat.map(s=> <Seats key={s.id} selectedseats={selectedseats}setSelectedSeats={setSelectedSeats} id={s.id} seat={s.name} available={s.isAvailable}/>)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input value={selectedseats.name}onChange={e=>setSelectedSeats({...selectedseats, name:e.target.value})}placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input value={selectedseats.cpf} onChange={e=>setSelectedSeats({...selectedseats, cpf:e.target.value})} placeholder="Digite seu CPF..." />
                <Link to="/sucesso">
                <button onClick={()=>post()}>Reservar Assento(s)</button>
                </Link>
            </FormContainer>
            {seats.movie!==undefined?
            <FooterContainer>
                <div>
                    <img src={seats.movie.posterURL} alt={seats.movie.title} />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>
            :<div>
                Carregando...
            </div>
            }

        </PageContainer>
    )

    function post(){
        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", selectedseats)
        promise.then(() => console.log("Deu certo"))
        promise.catch(() => console.log("Deu erro"))
    }
}


