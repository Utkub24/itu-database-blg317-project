import { useState } from 'react';
import MoveDto from "../dto/Move.dto";

export default function MoveCard({ move }) {

  return (
    <ul className='flex flex-col gap-2'>
      <li>Name: {move.name}</li>
      <li>Power: {move.power}</li>
      <li>Accuracy: {move.accuracy}</li>
      <li>PP: {move.powerPoints}</li>
      <li>Type: {move.type.name}</li>
    </ul>
  )
}
