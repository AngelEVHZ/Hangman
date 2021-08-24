
import React from "react";
import Timer from "../Timer/Timer";
import "./ScoreTable.css";
export interface ScoreTableProps {
    headers: string[];
    rows: {
        items: any[]
    }[];
    callBack: () => void;
    disableButton: boolean;
    buttonText: string;
    timer: {
        showTimer: boolean;
        time: number;
        callBack: () => void;
    }
}

const ScoreTable: React.FC<any> = (props: ScoreTableProps) => {

    const renderTableRow = (items: any[], globalIndex: number) => {
        return (
            <tr>
                {items.map((item, index) => (
                    <td key={`${globalIndex}-${index}`}>{item}</td>
                ))}
            </tr>
        );
    }

    return (
        <div className="content">
            <div className="card">
                <div className="card-content content-size table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                {props.headers.map((item) => (
                                    <th>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {props.rows.map((row, index) => renderTableRow(row.items, index))}
                        </tbody>
                    </table>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        {props.timer.showTimer &&
                            <Timer {...props.timer}></Timer>
                        }
                    </div>
                    <div className="card-footer-item">
                        <button className="btn-full-size "
                            onClick={props.callBack}
                            disabled={props.disableButton}>{props.buttonText}</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};
export default ScoreTable;