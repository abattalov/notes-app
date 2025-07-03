import './TextArea.css'

export type TextAreaProps = {
    isFullscreen: boolean;
    toggleSidePanel: () => void;
}

export default function TextArea(props: TextAreaProps){
    return(
        <div className={`textarea-cont ${props.isFullscreen ? "sidepanel-open" : ""}`}>
            <div className='textarea-header'>
                <button onClick={props.toggleSidePanel}>X</button>
            </div>
            <div className={props.isFullscreen ? "textarea-full" : "textarea"} contentEditable="true">
                
            </div>
        </div>
    )
}