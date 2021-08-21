
import React from "react";
import "./HangmanStyle.css";
interface HangmanProps {
    errors: boolean[];
}

const Hangman: React.FC<any> = (props: HangmanProps) => {
    const { errors } = props;

    const human = [
        <ellipse className="fade-in" fill="#000000" stroke="#000" cx="152.37771" cy="71.23759" id="svg_9" rx="24.46809" ry="22.69504" />,
        <rect className="fade-in" fill="#000000" stroke="#000" x="146.34934" y="88.25887" width="12.05674" height="102.12766" id="svg_10" rx="5" />,
        <rect className="fade-in" fill="#000000" x="123.80434" y="89.69282" width="9.39095" height="110.01477" id="svg_11" rx="5" stroke="#000" transform="rotate(20 128.5 144.7)" />,
        <rect className="fade-in" fill="#000000" x="167.06675" y="92.5297" width="9.39095" height="110.01477" id="svg_12" rx="5" stroke="#000" transform="rotate(-16 171.762 147.537)" />,
        <rect className="fade-in" fill="#000000" x="164.5416" y="178.01016" width="10.75444" height="117.61418" id="svg_13" rx="5" stroke="#000" transform="rotate(-16 169.919 236.817)" />,
        <rect className="fade-in" fill="#000000" x="140.45785" y="183.10698" width="10.75444" height="117.84831" id="svg_14" rx="5" stroke="#000" transform="rotate(5 145.835 242.031)" />,
    ];


    return (
        <div className="content">
            <div className="board">
                {/* <div className="hang-man">
                    {errors.length >= 6 &&
                        <>
                            <div id="pipe-vertical" className="pipe-color"></div>
                            <div id="pipe-horizontal" className="pipe-color"></div>
                            <div id="rope" className="pipe-color"></div>
                            {errors.map((item, index) => {
                                return item || true ? (human[index]) : (<></>)
                            })}

                        </>
                    }
                </div> */}
                <div className="columns is-centered">

                    <div className="column is-10 hangman-svg pt-0">
                        <div className="transform-on-mobile">
                            <svg width="200" height="400" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <title>Hangman</title>
                                    <g id="svg_15">
                                        <rect fill="#000000" stroke="#000" x="8.5621" y="17.5" width="16" height="365" id="svg_3" />
                                        <rect fill="#000000" stroke="#000" x="9.5621" y="17.5" width="156" height="14" id="svg_5" />
                                        <rect fill="#000000" stroke="#000" x="149.89544" y="20.17376" width="5.67376" height="40.42553" id="svg_8" rx="11" />
                                        {errors.length >= 6 &&
                                            <>
                                                {errors.map((item, index) => {
                                                    return item ? (human[index]) : (<></>)
                                                })}

                                            </>
                                        }
                                    </g>
                                </g>

                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Hangman;