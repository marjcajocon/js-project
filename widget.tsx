import React from "react";

const colors = [
    ["red", "danger"],
    ["blue", "info"],
    ["orange", "warning"]
];
const clen = colors.length;

const fcolors = (key: string): string => {
    for (let i = 0; i < clen; i++) {
        if (colors[i][0] == key) return colors[i][1];
    }
    return "default";
};


export const Button = (
    {
        children,
        bgColor = "default",
        icon,
        style,
        onClick
    }: {
        children: React.ReactNode,
        bgColor?: string,
        icon?: string,
        style?: object,
        onClick?: (e: any | undefined) => void
    }
) => {
    return <>
        <button onClick={onClick} className={`btn btn-sm btn-${fcolors(bgColor)}`} style={style}>
            {
                icon && (
                    <i className={`fa fa-${icon}`} style={{marginRight: "5px"}}></i> 
                )
            }           
            { children }
        </button>
    </>
};

export const Input = ({
    type = "text",
    label,
    onChange,
    placeholder,
    style,
}: {
    type?: string,
    onChange?: (e: any |undefined) => void,
    label?: string,
    placeholder?: string,
    style?: object  
}) => {
    return (
        <>
            <div className="form-group">
                {
                    label && (
                        <label>{label}</label>
                    )
                }
                <input type={type} onChange={onChange} className="form-control" placeholder={placeholder} style={style} />
            </div>
        </>
    )
};

export const Card = ({
    children    
}: {
    children?: React.ReactNode
}) => {
    return <>
        <div style={{
            backgroundColor: "white",
            width: "100%",
            padding: "10px",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)"
        }}>
            { children }
        </div>
    </>  
};
