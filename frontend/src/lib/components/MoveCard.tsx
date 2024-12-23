import React from "react";
import MoveDto from "../dto/Move.dto";

interface MoveCardProps {
  move: MoveDto;
}

const MoveCard: React.FC<MoveCardProps> = ({ move }) => {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-md p-2 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800">{move.name}</h3>
      <ul className="text-xs text-gray-600 mt-1 space-y-1">
        <li>
          <strong>Type:</strong> {move.type.name}
        </li>
        <li>
          <strong>Power:</strong> {move.power}
        </li>
        <li>
          <strong>Accuracy:</strong> {move.accuracy}%
        </li>
        <li>
          <strong>PP:</strong> {move.powerPoints}
        </li>
      </ul>
    </div>
  );
};

export default MoveCard;
