import { useState } from "react"
import styled from "styled-components"

export default function Seats({seat, available, setSelectedSeats, selectedseats, id, setInformations, informations}){
    const [yourSeat, setYourSeat] = useState(false)
    return(
        <SeatItem data-test="seat" onClick={()=>select()} yourSeat={yourSeat}available={available}>{seat}</SeatItem>
    )
    function select(){
        if(available===false){
            return alert("Esse assento não está disponível")
        }
        setYourSeat(!yourSeat)
        if(!selectedseats.ids.includes(id)){
            setInformations({...informations, seats:[...informations.seats, seat].sort()})
            setSelectedSeats({...selectedseats, ids:[...selectedseats.ids, id]})
        }
        if(selectedseats.ids.includes(id)){
            const newArray = selectedseats.ids.filter((a)=>a!==id)
            const filterSeats = informations.seats.filter((a)=>a!==seat)
            setInformations({...informations, seats:filterSeats.sort()})
            setSelectedSeats({...selectedseats, ids:newArray})
        }

    }
}

const SeatItem = styled.div`
    border: 1px solid ${a=>a.available===false?"#F7C52B":a.yourSeat===true?"#0E7D71":"#808F9D"};         // Essa cor deve mudar
    background-color: ${a=>a.available===false?"#FBE192":a.yourSeat===true?"#1AAE9E":"#C3CFD9"};   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`