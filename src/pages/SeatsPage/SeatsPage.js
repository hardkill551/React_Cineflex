import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {PageContainer, SeatsContainer, CaptionContainer, CaptionItem, CaptionCircle, FormContainer, FooterContainer} from "./styled.js"
import Seats from "../../components/Seats"

export default function SeatsPage({setInformations, informations}) {
    const parameters = useParams()
    const navigate = useNavigate()
    const [seat, setSeat]=useState([])
    const [seats, setSeats]=useState([])
    const [selectedseats, setSelectedSeats] = useState({ids:[], name:"", cpf:""})

    useEffect(()=>{
        window.scrollTo(0, 0)
        setInformations({seats:[]})
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
                {seat.map(s=> <Seats key={s.id} setInformations={setInformations} informations={informations} selectedseats={selectedseats} setSelectedSeats={setSelectedSeats} id={s.id} seat={s.name} available={s.isAvailable}/>)}
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

            <FormContainer onSubmit={post}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input id="name" type="text" required data-test="client-name" value={selectedseats.name} onChange={e=>{
                    setSelectedSeats({...selectedseats, name:e.target.value})
                    setInformations({...informations, namePerson:e.target.value})
                }
                }placeholder="Digite seu nome..." />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input id="cpf" type="number" required data-test="client-cpf" value={selectedseats.cpf} onChange={e=>{
                    setSelectedSeats({...selectedseats, cpf:e.target.value})
                    setInformations({...informations, cpf:e.target.value})
                }} placeholder="Digite seu CPF..." />
                    
                <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>
            {seats.movie!==undefined?
            <FooterContainer data-test="footer">
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

    function post(e){
        e.preventDefault()
        setInformations({...informations, name:seats.movie.title, date:seats.day.date, time:seats.name})
        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", selectedseats)
        promise.then(() => {
            setSelectedSeats({ids:[], name:"", cpf:""})
            navigate("/sucesso")
            })
        promise.catch(() => alert("não conseguimos comprar os assentos"))
    }
}


