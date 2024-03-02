import React from "react";

interface buttonInterface {
  children: React.ReactNode,
  onClick?:(e: React.MouseEvent<HTMLButtonElement>) => void,
  bgColor?: string,
  LeftIcon?: React.ReactNode
}

interface inputInterface {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    label?: string,
    placeholder?: string,
    LeftIcon?: React.ReactNode
}

const btncolor = [
    {code: "default", content: "btn btn-default btn-sm"},
    {code: "red", content: "btn btn-danger btn-sm"},
    {code: "green", content: "btn btn-success btn-sm"},
    {code: "orange", content: "btn btn-warning btn-sm"},
    {code: "blue", content: "btn btn-primary btn-sm"}
];


export function Input({
    onChange, type, label, placeholder, LeftIcon
}: inputInterface): React.ReactNode {
    let lstyle: {
        paddingLeft: string
    } = {
        paddingLeft: "0px"
    };
    if (LeftIcon) {
        lstyle.paddingLeft = "38px"
    }
    return (
        <div className="form-group" style={{paddingBottom: "5px", position: "relative"}}>
            {
                label && (
                    (<label>{label}</label>)
                )
                
            } 
            {
                LeftIcon && (
                    <div style={{
                        position: "absolute", 
                        left: "1px", 
                        bottom: "6px", 
                        width: "36px", 
                        height: "36px",
                        backgroundColor: "#ddd",
                        borderTopLeftRadius: "5px",
                        borderBottomLeftRadius: "5px"
                    }}>
                        <div style={{
                            fontSize: "12pt",
                            position: "absolute",
                            left: "10px",
                            top: "5px"
                        }}>{LeftIcon}</div>
                    </div>
                )
            }
            <input className="form-control" style={lstyle} placeholder={placeholder} type={type} onChange={onChange} />
        </div>
    )
}


// Button style

export function Button({ children, onClick, bgColor, LeftIcon
}: buttonInterface): React.ReactNode {
    return <>
        {   
           
            btncolor && btncolor.map((item) => {
                if (item.code == bgColor)
                    return (<button key={item.code} className={item.content} onClick={onClick}>{
                        LeftIcon && (
                            <>{LeftIcon}</>
                        )
                    } {children}
                    </button>)
            }) // map
            
        }
        
    </>
}

export const Card = ({children}: 
    {children: React.ReactNode}): React.ReactNode => {
    return <>
        <div className="card">
            <div className="card-body">
                { children }
            </div>
        </div>
    </>
};
