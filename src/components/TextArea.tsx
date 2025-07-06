import './TextArea.css'

export type TextAreaProps = {
    isFullscreen: boolean;
    noteContent: string;
    toggleSidePanel: () => void;
    onContentChange: (content: string) => void;
}

export default function TextArea(props: TextAreaProps){
    return(
        <div className={`textarea-cont ${props.isFullscreen ? "sidepanel-open" : ""}`}>
            <div className='textarea-header'>
                <button onClick={props.toggleSidePanel}>X</button>
            </div>
            <textarea className={props.isFullscreen ? "textarea-full" : "textarea"}
                value={props.noteContent}
                onChange={(e) => props.onContentChange(e.target.value)}
            />
        </div>
    )
}