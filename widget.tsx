import React from "react";

interface buttonInterface {
  children: React.ReactNode,
  onClick?:(e: React.MouseEvent<HTMLButtonElement>) => void,
  bgColor?: string
}

interface inputInterface {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    label?: string,
    placeholder?: string
}

const btncolor = [
    {code: "default", content: "btn btn-default btn-sm"},
    {code: "red", content: "btn btn-danger btn-sm"},
    {code: "green", content: "btn btn-success btn-sm"},
    {code: "orange", content: "btn btn-warning btn-sm"},
    {code: "blue", content: "btn btn-primary btn-sm"}
];


export function Input({
    onChange, type, label, placeholder
}: inputInterface): React.ReactNode {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input className="form-control" placeholder={placeholder} type={type} onChange={onChange} />
        </div>
    )
}

export function Button({ children, onClick, bgColor
}: buttonInterface): React.ReactNode {
    return <>
        {   
           
            btncolor && btncolor.map((item) => {
                if (item.code == bgColor)
                    return (<button key={item.code} className={item.content} onClick={onClick}>{children}</button>)
            }) // map
            
        }
        
    </>
}
