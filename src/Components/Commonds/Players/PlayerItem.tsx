import React from "react";
import './playersStyle.css';
import { UserSession } from "../../../types/UserSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faPen, faTimes, faCheck, faClock, faUserClock } from "@fortawesome/free-solid-svg-icons";
import { PlayerStatusEnum } from "../../../Constant/PlayerStatusEnum";

interface PlayerItemProps {
    player: UserSession;
    showStatus: boolean;
    getPlayerStatus?: (playerId: string) => PlayerStatusEnum;
}
const PlayerItem: React.FC<PlayerItemProps> = (props: PlayerItemProps) => {
    const { player } = props;

    const getIcon = () => {
        if (!props.showStatus || !props.getPlayerStatus)
            return player.host ? (<FontAwesomeIcon className="icon m-0" icon={faCrown} />) : (<></>);

        let html = (<></>);
        const status = props.getPlayerStatus(player.playerId);
        switch (status) {
            case PlayerStatusEnum.WAITING:
                html = (<FontAwesomeIcon className="icon m-0" icon={faClock} />);
                break;
            case PlayerStatusEnum.READY:
                html = (<FontAwesomeIcon className="icon m-0" icon={faCheck} />);
                break;
            case PlayerStatusEnum.SUCCESS:
                html = (<FontAwesomeIcon className="icon m-0" icon={faCheck} />);
                break;
            case PlayerStatusEnum.FAIL:
                html = (<FontAwesomeIcon className="icon m-0" icon={faTimes} />);
                break;
            case PlayerStatusEnum.TYPING:
                html = (<FontAwesomeIcon className="icon m-0" icon={faPen} />);
                break;
            case PlayerStatusEnum.ON_DASHBOARD:
                html = (<FontAwesomeIcon className="icon m-0" icon={faUserClock} />);
                break;
        }

        return html;
    }

    return (
        <div className="player" key={player.playerId}>
            <p className="player-text">{getIcon()}</p>
            <p className="player-text title is-4 nick-name"> {player.nickName}</p>
        </div>
    );

};
export default PlayerItem;